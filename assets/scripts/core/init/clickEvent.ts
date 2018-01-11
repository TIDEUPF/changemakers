import IInitElement from "../IInitElement";

class ClickEvent extends IInitElement {
    init(events?: Array<Object>): void {
        var result = {};
        console.log("moveup");
    }

    destroy(): void {
    }
}

export const clickEvent: () => IInitElement = 
    function(): IInitElement {
        return new ClickEvent()
    };
