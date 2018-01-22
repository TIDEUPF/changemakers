import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class SelectCarriageElement extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        var element: cc.Node = gd.directory.getNode(events[0]["element_path"]);
        var selected_carriage_part_type: cc.Node = element.parent;
        var selected_carriage_part: cc.Node = gd.directory.getNode('/Canvas/background/carriage/' + selected_carriage_part_type.name + '/' + element.name);

        for (var i = 0; i < selected_carriage_part.parent.children.length; i++) {
            selected_carriage_part.parent.children[i].active = false;
        }

        selected_carriage_part.active = true;
        var result = {};
        return result;
    }
}

export const selectCarriageElement: (elementStatus: Object, element: cc.Node) => SelectCarriageElement = 
    function(elementStatus: Object, element: cc.Node): SelectCarriageElement {
        return new SelectCarriageElement(elementStatus, element)
    };
