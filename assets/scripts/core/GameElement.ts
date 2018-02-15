import IGameElement from "./IGameElement";
import ElementAction from "./ElementAction";
import ElementEmitter from "./ElementEmitter";
import * as gd from "../core/GameData";
import * as emitters from "./emittersIndex";
import * as actions from "./actionsIndex";
import * as inits from "./init/initsIndex";
 
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
 
        if(typeof actionResult !== "object") {
            return;
        }

        if(actionResult.updateElementAction) {
            //update
        }
 
        if(actionResult.updateElementEmitter) {
            //update
        }

        //emitted events
        if(actionResult.events) {
            for(let e of actionResult.events) {
                gd.observer.addEvent(e);
            }
        }
    }
 
    emitEvents(): void {
        this.elementEmitter.emitEvents();
    }
 
    constructor(elementStatus: Object, element?: T) {
        super();
        
        //deprecated
        if(element) {
            this._element = element;
        } else {
            element = null;
        }

        this.setElementStatus(elementStatus);

        if(elementStatus["action"]) {
            this.setElementAction(actions.actions["node"][elementStatus["action"]](elementStatus, element));
        }

        if(elementStatus["emitter"]) {
            this.setElementEmitter(emitters.emitters["node"][elementStatus["emitter"]](elementStatus, element));
        }

        if(elementStatus["init"]) {
            for(let initTarget in elementStatus["init"]) {
                var initInstance = inits.inits[initTarget](elementStatus);
                initInstance.init();
            }
        }

        gd.directory.addStatus(elementStatus);
        gd.directory.addElement(this);

        if(elementStatus["listen"]) {
            gd.observer.addSubscription({
                "listener" : elementStatus["id"],
                "event" : elementStatus["listen"],
            });
        }
    }
}