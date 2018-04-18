import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import * as gd from "../../../core/GameData";

class SelectCarriageElement extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        var result: ActionResult = {};
        var carriage_data = gd.directory.searchId(this.elementStatus["resources"]["carriage_data"]);

        if(events[0]["type"] == "click") {
            /*var element: cc.Node = gd.directory.getNode(events[0]["element_path"]);
            var selected_carriage_part_type: cc.Node = element.parent;
            carriage_data["data"]["parts"][selected_carriage_part_type.name]["part"] = element.name;*/

            var element: cc.Node = gd.directory.getNode(events[0]["element_path"]);
            carriage_data["data"]["parts"][events[0]["origin"]]["part"] = element.name;

            result.events = [
                {
                    "type": "carriage",
                    "subtype": "part_assigned",
                    "data": {
                        "id": this.elementStatus["id"],
                        "part_type": events[0]["origin"],
                        "part": element.name,
                    },
                },
            ];
    
        }

        //just update all elements
        for(var part in carriage_data["data"]["parts"]) {
            var selected_carriage_part_type: cc.Node = gd.directory.getNode('/Canvas/background/carriage/' + part);

            if(!selected_carriage_part_type) {
                continue;
            }

            if(carriage_data["data"]["parts"][selected_carriage_part_type.name]["active"] === false) {
                selected_carriage_part_type.active = false;
            }

            var hitboxes = [];/*this.elementStatus["resources"]["node"][selected_carriage_part_type.name] ?
            this.elementStatus["resources"]["node"][selected_carriage_part_type.name] :
            [];*/

            
            if(this.elementStatus["resources"]["node"][selected_carriage_part_type.name]) {
                for(var item of this.elementStatus["resources"]["node"][selected_carriage_part_type.name]) {
                    hitboxes.push(gd.directory.getNode('/Canvas/background/carriage/' + part + '/' + item));
                }
            } else {
                hitboxes.push(selected_carriage_part_type);
            }

            for(var hitboxes_item of hitboxes) {
                for (var concrete_part in hitboxes_item.children) {
                    selected_carriage_part_type.children[concrete_part].active = false;
                }
            }
 
            var concrete_selected_part = selected_carriage_part_type.getChildByName(carriage_data["data"]["parts"][part]["part"]);
            if(concrete_selected_part) {
                concrete_selected_part.active = true;
            }
        }

        return result;
    }
}

export const selectCarriageElement: (elementStatus: Object, element: cc.Node) => SelectCarriageElement = 
    function(elementStatus: Object, element: cc.Node): SelectCarriageElement {
        return new SelectCarriageElement(elementStatus, element)
    };
