const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

enum GameEventType {
    Input = 1,
};

enum GameInputEventType {
    Key = 1,
};

@ccclass
export default class WorkshopInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        // init logic
        var init = this;


        //console.log(gamenn.moveUp);
        var id_count=0;

        var elements_path = "/Canvas/background/npcs/";
        
        var element_click = {
            "type": "node",
            "action": null,
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "/Canvas/background/carriage/front_wheel",
            "resources": {
                "node" : {
                    "front_wheel" : "/Canvas/background/npcs/front_wheel",
                    "chasis" : "/Canvas/background/carriage/chasis",
                    "pattern" : "/Canvas/background/carriage/pattern",
                    "seat" : "/Canvas/background/carriage/seat",
                    "stairs" : "/Canvas/background/carriage/stairs",
                    "top" : "/Canvas/background/carriage/top",
                    "rear_wheel" : "/Canvas/background/carriage/rear_wheel",
                },
            },
            "init": {
                "clickEvent": {
                    "front_wheel" : {},
                    "chasis" : {},
                    "pattern" : {},
                    "seat" : {},
                    "stairs" : {},
                    "top" : {},
                    "rear_wheel" : {},
                }
            }
        };

        gd.directory.addStatus(element_click);

        var front_wheel_element: any = new GameElement(element_click, cc.find('/Canvas/background/carriage/front_wheel'));

        gd.directory.addElement(front_wheel_element);


        var selection_chasis = {
            "type": "node",
            "action": "showElement",
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "Canvas/background/selection/chasis",
            "resources": {
                "node" : {
                    "selection_chasis" : "Canvas/background/selection/chasis",
                },
            },
        };

        gd.directory.addStatus(selection_chasis);
        var selection_chasis_element: any = new GameElement(selection_chasis, cc.find('Canvas/background/selection/chasis'));
        gd.directory.addElement(selection_chasis_element);

        //listen to the wheel click event
        var dialogListener = {
            listener : selection_chasis_element.getId(),
            event : {
                    type : "click",
                    origin_type: "carriage",
                    origin: {'$containsAny' : ['front_wheel', 'rear_wheel', 'pattern', 'stairs', 'top', 'seat', 'chasis']},
            }
        };
        gd.observer.addSubscription(dialogListener);


        //set a carriage piece
        var set_carriage_element = {
            "type": "node",
            "action": "selectCarriageElement",
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "Canvas/background/carriage",
            "resources": {
                "node" : {
                    "front_wheel" : "/Canvas/background/selection/front_wheel",
                    "chasis" : "/Canvas/background/selection/chasis",
                    "pattern" : "/Canvas/background/selection/pattern",
                    "seat" : "/Canvas/background/selection/seat",
                    "stairs" : "/Canvas/background/selection/stairs",
                    "top" : "/Canvas/background/selection/top",
                    "rear_wheel" : "/Canvas/background/selection/rear_wheel",
                },
            },
            "init": {
                "clickEvent": {
                    "front_wheel" : {},
                    "chasis" : {},
                    "pattern" : {},
                    "seat" : {},
                    "stairs" : {},
                    "top" : {},
                    "rear_wheel" : {},
                }
            }
        };

        gd.directory.addStatus(set_carriage_element);
        var carriage_element: any = new GameElement(set_carriage_element, cc.find('Canvas/background/carriage'));
        gd.directory.addElement(carriage_element);

        //listen to the wheel click event
        var selection_listener = {
            listener : carriage_element.getId(),
            event : {
                    type : "click",
                    origin_type: "selection",
                    origin: {'$containsAny' : ['front_wheel', 'rear_wheel', 'pattern', 'stairs', 'top', 'seat', 'chasis']},
            }
        };
        gd.observer.addSubscription(selection_listener);

    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
        gd.observer.newFrame();
    }
}
