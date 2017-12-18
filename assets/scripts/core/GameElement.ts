import IGameElement from "./IGameElement";
import ElementAction from "./ElementAction";
import ElementEmitter from "./ElementEmitter";
import * as emitters from "./emittersIndex";
import * as actions from "./actionsIndex";
 
export default class GameElement<T> extends IGameElement {
    private elementAction: ElementAction<T>;
    private elementEmitter: ElementEmitter<T>;
    private _element: T;
 
    getId(): string {
        return this.elementStatus["id"];
    }

    private setElementStatus(status: Object): void {
        this.elementStatus = status;
    }
 
    private setElementAction(action: ElementAction<T>): void {
        this.elementAction = action;
    }
    
    private setElementEmitter(emitter: ElementEmitter<T>): void {
        this.elementEmitter = emitter;
    }
 
    processAction(events = []): void {
        var actionResult = this.elementAction.processAction(events);
 
        if(actionResult.updateElementAction) {
            //update
        }
 
        if(actionResult.updateElementEmitter) {
            //update
        }
    }
 
    emitEvents(): void {
        this.elementEmitter.emitEvents();
    }
 
    constructor(elementStatus: Object, element: T) {
        super();
        this._element = element;
        this.setElementStatus(elementStatus);
        console.log(actions.actions);
        this.setElementAction(actions.actions[elementStatus["type"]][elementStatus["action"]](element));
        this.setElementEmitter(emitters.emitters[elementStatus["type"]][elementStatus["emitter"]](element));
    }
}