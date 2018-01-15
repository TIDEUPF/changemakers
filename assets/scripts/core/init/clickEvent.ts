import IInitElement from "../IInitElement";

class ClickEvent extends IInitElement {
    init(): void {
        var result = {};
        console.log("moveup");
    }

    destroy(): void {
    }
}

export const clickEvent: (elementStatus: Object) => IInitElement = 
    function(elementStatus: Object): IInitElement {
        return new ClickEvent(elementStatus);
    };
