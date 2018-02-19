import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class NotebookBrowser extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        var element: cc.Node = gd.directory.getNode('notebook');
        var canvas: cc.Node = gd.directory.getNode('Canvas');

        canvas.active = false;
        element.active = true;

        var last_displayed_entry: number = this.elementStatus["last_displayed_entry"];
        var notebookDataCollection = gd.directory.searchId("notebookDataCollection");

        var dialog_list = notebookDataCollection["data"]["dialogs"];
        var n_element_to_draw = Math.min(dialog_list.length - last_displayed_entry, 6);
        var element_to_draw = dialog_list.splice(last_displayed_entry, last_displayed_entry + n_element_to_draw);

        return;
    }
}

export const notebookBrowser: (elementStatus: Object, element: cc.Node) => NotebookBrowser = 
    function(elementStatus: Object, element: cc.Node): NotebookBrowser {
        return new NotebookBrowser(elementStatus, element)
    };
