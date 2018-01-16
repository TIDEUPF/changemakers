import IInitElement from "../IInitElement";
import * as gd from "../../core/GameData";
import * as EventType from "../../core/Events";

class ClickEvent extends IInitElement {
    init(): void {
        
        for(let clickableElement in this.elementStatus["init"]["clickEvent"]) {
            var elementPath = this.elementStatus["resources"]["node"][clickableElement]

            var element: cc.Node = gd.directory.getNode(elementPath);

            element.on(cc.Node.EventType.MOUSE_DOWN, function(event) {
                let gameEvent = {
                    type: "click",
                    origin: clickableElement,
                };

                gd.observer.addEvent(gameEvent);
            });
  
        }
    }

    destroy(): void {
    }
}

export const clickEvent: (elementStatus: Object) => IInitElement = 
    function(elementStatus: Object): IInitElement {
        return new ClickEvent(elementStatus);
    };
