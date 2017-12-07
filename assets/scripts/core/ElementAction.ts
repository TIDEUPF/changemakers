import ActionResult from "./ActionResult";

export default abstract class ElementAction<T> {  
    abstract processAction(): ActionResult;
    constructor(elementStatus: Object, element: T) {
    }
}  
