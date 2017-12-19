import ActionResult from "./ActionResult";

export default abstract class ElementAction<T> {
    protected elementStatus: Object;
    protected element: T;

    abstract processAction(events?: Array<Object>): ActionResult;
    constructor(elementStatus: Object, element: T) {
        this.elementStatus = elementStatus;
        this.element = element;
    }
}  
