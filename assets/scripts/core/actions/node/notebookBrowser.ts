import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class NotebookBrowser extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        var element: cc.Node = gd.directory.getNode('notebook');
        var canvas: cc.Node = gd.directory.getNode('Canvas');

        canvas.active = false;
        element.active = true;

        var last_displayed_entry: number = this.elementStatus["data"]["last_displayed_entry"];
        var notebookDataCollection = gd.directory.searchId("notebookDataCollection");

        var dialog_list = notebookDataCollection["data"]["dialogs"];
        var n_element_to_draw = Math.min(dialog_list.length - last_displayed_entry, 6);
        var elements_to_draw = dialog_list.splice(last_displayed_entry, last_displayed_entry + n_element_to_draw);

        var initial_page_element = this.elementStatus["data"]["current_page"] == 0 ? 1 : 0;

        var remaining_elements = n_element_to_draw;
        for(var p=initial_page_element;p<2;p++) {
            //this.elementStatus["presentation_stage"]["page"]["" + p] = [];
            var current_page_n_elements = Math.min(n_element_to_draw, 3);
            var page_node: cc.Node = gd.directory.getNode('notebook/background/dialog_page_' + p);
            for(var i=0;i<current_page_n_elements;i++) {
                var entry_node: cc.Node = gd.directory.getNode('notebook/background/dialog_page_' + p + '/dialog_entry_' + i);
                var text_node: cc.Node = entry_node.getChildByName('text');
                var text_component = text_node.getComponent('cc.Label');
                text_component.string = "new string " + i;

                entry_node.active = true;
                //this.elementStatus["presentation_stage"]["page"]["" + p].push(i);
            }
            remaining_elements -= current_page_n_elements;
            remaining_elements = Math.max(0, remaining_elements);
        }

        return;
    }
}

export const notebookBrowser: (elementStatus: Object, element: cc.Node) => NotebookBrowser = 
    function(elementStatus: Object, element: cc.Node): NotebookBrowser {
        return new NotebookBrowser(elementStatus, element)
    };
