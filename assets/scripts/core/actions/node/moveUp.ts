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

            constructor() {
                super();
            }
        }

        export const moveUp: MoveUp = new MoveUp();
    //}
//}
