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
                    "Captain" : elements_path + "Captain",
                    "Chef" : elements_path + "Chef",
                    "Doctor" : elements_path + "Doctor",
                    "Driver" : elements_path + "Driver",
                    "Huntress" : elements_path + "Huntress",
                    "Librarian" : elements_path + "Librarian",
                    "Merchant" : elements_path + "Merchant",
                    "Messenger_horse" : elements_path + "Messenger_horse",
                    "Messenger" : elements_path + "Messenger",
                    "butler" : elements_path + "butler",
                    "civil_engineer" : elements_path + "civil_engineer",
                    "kingandqueen_1" : elements_path + "kingandqueen_1",
                    "king" : elements_path + "king",
                    "main_character_1" : elements_path + "main_character_1",
                    "potter" : elements_path + "potter",
                    "old_lady" : elements_path + "old_lady",
                    "queen" : elements_path + "queen",
                    "soldier" : elements_path + "soldier",
                    "the_grumpy_butcher" : elements_path + "the_grumpy_butcher",
                    "the_stable_boy" : elements_path + "the_stable_boy",
                    "vagabond" : elements_path + "vagabond",
                    "Tailor" : elements_path + "Tailor",
                },
                "switch" : {
                    "Captain" : "cutscene_5",
                    "Chef" : "cutscene_5",
                    "Doctor" : "cutscene_5",
                    "Driver" : "cutscene_5",
                    "Huntress" : "cutscene_5",
                    "Librarian" : "cutscene_5",
                    "Merchant" : "cutscene_5",
                    "Messenger_horse" : "cutscene_5",
                    "Messenger" : "cutscene_5",
                    "butler" : "cutscene_5",
                    "civil_engineer" : "cutscene_5",
                    "kingandqueen_1" : "cutscene_5",
                    "king" : "cutscene_5",
                    "main_character_1" : "cutscene_5",
                    "potter" : "cutscene_5",
                    "old_lady" : "cutscene_5",
                    "queen" : "cutscene_5",
                    "soldier" : "cutscene_5",
                    "the_grumpy_butcher" : "cutscene_5",
                    "the_stable_boy" : "cutscene_5",
                    "vagabond" : "cutscene_5",
                    "Tailor" : "cutscene_5",
                },
            },
            "data": {
                "current_element": null,
            },
            "init": {
                "clickEvent": {
                    "Captain" : {},
                    "Chef" : {},
                    "Doctor" : {},
                    "Driver" : {},
                    "Huntress" : {},
                    "Librarian" : {},
                    "Merchant" : {},
                    "Messenger_horse" : {},
                    "Messenger" : {},
                    "butler" : {},
                    "civil_engineer" : {},
                    "kingandqueen_1" : {},
                    "king" : {},
                    "main_character_1" : {},
                    "potter" : {},
                    "old_lady" : {},
                    "queen" : {},
                    "soldier" : {},
                    "the_grumpy_butcher" : {},
                    "the_stable_boy" : {},
                    "vagabond" : {},
                    "Tailor" : {},
                }
            }
        };

        map_click = gd.directory.addStatus(map_click);
        //gd.directory.addStatus(map_click);
        var map_element: any = new GameElement(map_click, cc.find('/Canvas/background/npcs'));
        gd.directory.addElement(map_element);

        
        var clickEventListener = {
            listener : map_element.getId(),
            event : {
                    type : "click",
                    origin_type: "npcs",
            }
        };
        gd.observer.addSubscription(clickEventListener);
        
    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
        //gd.observer.newFrame();
    }
}
