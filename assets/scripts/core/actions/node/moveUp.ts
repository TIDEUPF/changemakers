import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";

class MoveUp extends ElementAction<cc.Node> {
    processAction(): ActionResult {
        let result: ActionResult;
        result = {};
        console.log("moveup");
        return result;
    }
}

export const moveUp: (elementStatus: Object, element: cc.Node) => ElementAction<cc.Node> = 
    function(elementStatus: Object, element: cc.Node): ElementAction<cc.Node> {
        return new MoveUp(elementStatus, element)
    };
