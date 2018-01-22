import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class ShowElement extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        var element: cc.Node = gd.directory.getNode('/Canvas/background/selection/' + events[0]["origin"]);
        var available_parts: cc.Node = gd.directory.getNode('/Canvas/background/selection');

        for (var i = 0; i < available_parts.children.length; ++i) {
            available_parts.children[i].active = false;
        }

        element.active = true;
        var result = {};
        return result;
    }
}

export const showElement: (elementStatus: Object, element: cc.Node) => ShowElement = 
    function(elementStatus: Object, element: cc.Node): ShowElement {
        return new ShowElement(elementStatus, element)
    };
