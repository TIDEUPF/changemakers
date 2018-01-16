import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class ShowElement extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        var node: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"][Object.keys(this.elementStatus["resources"]["node"])[0]]);

        node.active = true;
        var result = {};
        return result;
    }
}

export const showElement: (elementStatus: Object, element: cc.Node) => ShowElement = 
    function(elementStatus: Object, element: cc.Node): ShowElement {
        return new ShowElement(elementStatus, element)
    };
