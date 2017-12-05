import IGameElement from "./IGameElement";
import ElementAction from "./ElementAction";
import ElementEmitter from "./ElementEmitter";
import * as actions from "./actions";

export default class GameElement<T> extends IGameElement {
    private elementStatus: Object;
    private elementAction: ElementAction<T>;
    private elementEmitter: ElementEmitter<T>;
    private _element: T;

    private setElementStatus(status: Object): void {
        this.elementStatus = status;
    }

    private setElementAction(action: ElementAction<T>): void {
        this.elementAction = action;
    }
    
    private setElementEmitter(emitter: ElementEmitter<T>): void {
        this.elementEmitter = emitter;
    }

    processAction(): void {
        var actionResult = this.elementAction.processAction(this.elementStatus, this._element);

        if(actionResult.elementAction) {
            this.elementAction = actionResult.elementAction;
        }

        if(actionResult.elementEmitter) {
            this.elementEmitter = actionResult.elementEmitter;
        }
    }

    emitEvents(): void {
        this.elementEmitter.emitEvents(this.elementStatus);
    }

    constructor(element: T, elementStatus: Object) {
        super();
        this._element = element;
        this.setElementStatus(actions.actions[elementStatus["type"]][elementStatus["action"]]);
    }
}
