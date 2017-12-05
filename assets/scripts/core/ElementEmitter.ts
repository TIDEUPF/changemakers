export default abstract class ElementEmitter<T> {  
    abstract emitEvents(status: Object): Array<Object>;
    constructor(element: T) {
    }
}  
