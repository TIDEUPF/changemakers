import IGameElement from "./IGameElement";
import ElementAction from "./ElementAction";
import ElementEmitter from "./ElementEmitter";

export default class GameElement<T> extends IGameElement {  
    private elementStatus: Object;
    private elementAction: ElementAction<T>;
    private elementEmitter: ElementEmitter;
    private element: T;

    private setElementStatus(status: Object): void {
        this.elementStatus = status;
    }

    private setElementAction(action: ElementAction<T>): void {
        this.elementAction = action;
    }
    
    private setElementEmitter(emitter: ElementEmitter): void {
        this.elementEmitter = emitter;
    }

    processAction(): void {
        var actionResult = this.elementAction.processAction(this.elementStatus, this.element);

        if(actionResult.elementAction) {
            this.elementAction = actionResult.elementAction;
        }

        if(actionResult.elementAction) {
            this.elementAction = actionResult.elementAction;
        }
    }

    emitEvents(): void {
        this.elementEmitter.emitEvents(this.elementStatus);
    }

    constructor(element: T) {
        super();
        this.element = element;
    }
}
