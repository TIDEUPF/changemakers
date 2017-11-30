import ElementAction from "./ElementAction";
import ElementEmitter from "./ElementEmitter";

export default class GameElement {  
    private elementStatus: Object;
    private elementAction: ElementAction;
    private elementEmitter: ElementEmitter;

    setElementStatus(status: Object): void {
        this.elementStatus = status;
    }

    setElementAction(action: ElementAction): void {
        this.elementAction = action;
    }
    
    setElementEmitter(emitter: ElementEmitter): void {
        this.elementEmitter = emitter;
    }

    processAction(): void {
        var actionResult = this.elementAction.processAction(this.elementStatus);

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

    constructor() {
    }
}
