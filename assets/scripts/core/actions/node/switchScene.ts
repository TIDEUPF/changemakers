import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";
import {Scene} from "../../../core/Scene";

class SwitchScene extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        this.elementStatus["data"]["current_element"] = events[0]["origin"];

        if(this.elementStatus["resources"]["switch"][events[0]["origin"]]["dialog"]) {
            gd.scene["next"] = this.elementStatus["resources"]["switch"][events[0]["origin"]]["dialog"];
        }
        Scene.load(this.elementStatus["resources"]["switch"][events[0]["origin"]]["scene"]);
        return;
    }
}

export const switchScene: (elementStatus: Object, element: cc.Node) => SwitchScene = 
    function(elementStatus: Object, element: cc.Node): SwitchScene {
        return new SwitchScene(elementStatus, element)
    };
