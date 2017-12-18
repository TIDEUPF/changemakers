import ActionResult from "./ActionResult";

export default abstract class ElementAction<T> {  
    abstract processAction(events?: Array<Object>): ActionResult;
    constructor(elementStatus: Object, element: T) {
    }
}  
