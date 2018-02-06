import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class UpdateValue extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        this.elementStatus["resources"]["value"][events[0]["origin"]] = events[0]["value"];
        return;
    }
}

export const updateValue: (elementStatus: Object, element: cc.Node) => UpdateValue = 
    function(elementStatus: Object, element: cc.Node): UpdateValue {
        return new UpdateValue(elementStatus, element)
    };
