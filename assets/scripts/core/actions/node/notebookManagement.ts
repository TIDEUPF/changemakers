import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class NotebookManagement extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        var data: Object = gd.directory.searchId(this.elementStatus["notebook_id"]);

        if(events[0]["type"] === "step_finish") {
            data["data"]["badges"].push({
                "step": events[0]["data"]["step"],
            });
        }

        if(events[0]["type"] === "dialog") {
            data["data"]["dialogs"].push({
                "speaker": events[0]["data"]["character"],
                "text": events[0]["data"]["text"],
            });
        }

        return;
    }
}

export const notebookManagement: (elementStatus: Object, element: cc.Node) => NotebookManagement = 
    function(elementStatus: Object, element: cc.Node): NotebookManagement {
        return new NotebookManagement(elementStatus, element)
    };
