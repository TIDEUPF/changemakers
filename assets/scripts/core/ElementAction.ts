import ElementEmitter from "./ElementEmitter";

interface ActionResult {
    elementAction?: ElementAction,
    elementEmitter?: ElementEmitter,
}

export default abstract class ElementAction {  
    abstract processAction(elementStatus: Object): ActionResult;
}  
