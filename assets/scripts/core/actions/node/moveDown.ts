import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";

//namespace gamenn {
//        export namespace node {
        class MoveDown extends ElementAction<cc.Node> {
            processAction(): ActionResult {
                let result: ActionResult;
                result = {};
                return result;
            }
        }

        export const moveDown: (elementStatus: Object, element: cc.Node) => MoveDown = 
            function(elementStatus: Object, element: cc.Node): MoveDown {
                return new MoveDown(elementStatus, element)
            };
//    }
//}
