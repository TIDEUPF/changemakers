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
export default class MapInit extends cc.Component {
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
        
        var map_click: Object = {
            "type": "node",
            "action": "switchScene",
            "emitter": null,
            "id": "map" + (id_count++).toString(10),
            "element_id" : "/Canvas/background/npcs",
            "resources": {
                "node" : {
                    "butler" : elements_path + "butler",
                    "chef" : elements_path + "chef",
                    "librarian" : elements_path + "librarian",
                },
                "switch" : {
                    "butler" : "palace",
                    "chef" : "palace",
                    "librarian" : "palace",
                },
            },
            "init": {
                "clickEvent": {
                    "butler" : {},
                    "chef" : {},
                    "librarian" : {},
                }
            }
        };

        map_click = gd.directory.addStatus(map_click);
        gd.directory.addStatus(map_click);
        var map_element: any = new GameElement(map_click, cc.find('/Canvas/background/npcs'));
        gd.directory.addElement(map_element);

        var clickEventListener = {
            listener : map_element.getId(),
            event : {
                    type : "click",
                    origin_type: "npcs",
                    /*origin: {'$containsAny' : ['front_wheel', 'rear_wheel', 'pattern', 'stairs', 'top', 'seat', 'chasis']},*/
            }
        };
        gd.observer.addSubscription(clickEventListener);
    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
        gd.observer.newFrame();
    }
}
