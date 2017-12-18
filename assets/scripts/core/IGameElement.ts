import ElementAction from "./ElementAction";
import ElementEmitter from "./ElementEmitter";

export default abstract class IGameElement {  
    protected elementStatus: Object;

    abstract processAction(events?: Array<Object>): void;
    abstract emitEvents(): void;

    abstract getId(): string;
}
