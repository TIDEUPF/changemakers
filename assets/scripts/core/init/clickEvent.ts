import IInitElement from "../IInitElement";
import * as gd from "../../core/GameData";
import * as EventType from "../../core/Events";

class ClickEvent extends IInitElement {
    init(): void {
        
        for(let clickableElement in this.elementStatus["init"]["clickEvent"]) {
            let elementPath = this.elementStatus["resources"]["node"][clickableElement]
            let element: cc.Node = gd.directory.getNode(elementPath);
            let hitboxes = this.elementStatus["init"]["clickEvent"][element.name]["hitboxes"];
            let hitboxes_elements = [];

            if(!hitboxes) {
                hitboxes_elements.push(element);
            } else {
                for(let hitboxes_item of hitboxes) {
                    hitboxes_elements.push(gd.directory.getNode(elementPath + '/' + hitboxes_item));
                }
            }

            for(let hitboxes_elements_item of hitboxes_elements) {
                let apply_to_elements = hitboxes_elements_item.children.length 
                    ? hitboxes_elements_item.children : [hitboxes_elements_item];

                for(let i = 0; i < apply_to_elements.length; i++) {
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
    }

    destroy(): void {
    }
}

export const clickEvent: (elementStatus: Object) => IInitElement = 
    function(elementStatus: Object): IInitElement {
        return new ClickEvent(elementStatus);
    };
