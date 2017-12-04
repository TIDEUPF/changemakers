import ElementAction from "./ElementAction";
import ElementEmitter from "./ElementEmitter";

export default abstract class IGameElement {  
    abstract processAction(): void;
    abstract emitEvents(): void;
}
