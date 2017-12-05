import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";

//namespace gamenn {
//        export namespace node {
        class MoveDown extends ElementAction<cc.Node> {
            processAction(elementStatus: Object, element: cc.Node): ActionResult {
                let result: ActionResult;
                result = {};
                return result;
            }
        }

        export const moveDown: (element: cc.Node) => MoveDown = function(element: cc.Node): MoveDown {return new MoveDown(element)};
//    }
//}
