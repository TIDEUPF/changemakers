import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class Dialog extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        let result: ActionResult;

        var queen = gd.directory.getNode(this.elementStatus["resources"]["node"]["queen"]);
        var dialog: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);

        dialog.active = !dialog.active;
        result = {};
        return result;
    }
}

export const dialog: (elementStatus: Object, element: cc.Node) => Dialog = 
    function(elementStatus: Object, element: cc.Node): Dialog {
        return new Dialog(elementStatus, element)
    };
