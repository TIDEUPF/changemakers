import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class SwitchScene extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        this.elementStatus["data"]["current_element"] = events[0]["origin"];
        cc.director.loadScene(this.elementStatus["resources"]["switch"][events[0]["origin"]]);
        return;
    }
}

export const switchScene: (elementStatus: Object, element: cc.Node) => SwitchScene = 
    function(elementStatus: Object, element: cc.Node): SwitchScene {
        return new SwitchScene(elementStatus, element)
    };
