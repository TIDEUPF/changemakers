import EmitterResult from "./EmitterResult";

export default abstract class ElementEmitter<T> {  
    abstract emitEvents(): EmitterResult;
    constructor(elementStatus: Object, element: T) {
    }
}
