import IInitElement from "../IInitElement";
import * as gd from "../../core/GameData";
import * as EventType from "../../core/Events";

class ClickEvent extends IInitElement {
    init(): void {
        
        for(let clickableElement in this.elementStatus["init"]["clickEvent"]) {
            let elementPath = this.elementStatus["resources"]["node"][clickableElement]

            let element: cc.Node = gd.directory.getNode(elementPath);

            var apply_to_elements = element.children.length ? element.children : [element];

            for (let i = 0; i < apply_to_elements.length; ++i) {
                apply_to_elements[i].on('touchstart', function(event) {
                    let gameEvent = {
                        type: "click",
                        origin: clickableElement,
                        origin_type: element.parent.name,
                        element_path: elementPath + '/' + apply_to_elements[i].name,
                    };
    
                    gd.observer.addEvent(gameEvent);
                });
            }
        }
    }

    destroy(): void {
    }
}

export const clickEvent: (elementStatus: Object) => IInitElement = 
    function(elementStatus: Object): IInitElement {
        return new ClickEvent(elementStatus);
    };
