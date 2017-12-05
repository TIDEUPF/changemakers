import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";

//namespace gamenn {
        //export namespace node {
        class MoveUp extends ElementAction<cc.Node> {
            processAction(elementStatus: Object, element: cc.Node): ActionResult {
                let result: ActionResult;
                result = {};
                return result;
            }
        }

        export const moveUp: (element: cc.Node) => ElementAction<cc.Node> = function(element: cc.Node): ElementAction<cc.Node> {return new MoveUp(element)};
    //}
//}
