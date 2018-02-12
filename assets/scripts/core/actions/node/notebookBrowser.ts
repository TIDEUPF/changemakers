import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class NotebookBrowser extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        var element: cc.Node = gd.directory.getNode('/notebook/background');

        element.active = true;
        return;
    }
}

export const notebookBrowser: (elementStatus: Object, element: cc.Node) => NotebookBrowser = 
    function(elementStatus: Object, element: cc.Node): NotebookBrowser {
        return new NotebookBrowser(elementStatus, element)
    };
