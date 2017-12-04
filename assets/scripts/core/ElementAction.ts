import ElementEmitter from "./ElementEmitter";
import ActionResult from "./ActionResult";

export default abstract class ElementAction<T> {  
    abstract processAction(elementStatus: Object, element: T): ActionResult;
}  
