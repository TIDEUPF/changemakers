const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

//import { actions } from "../core/actions";
//import * as nn from "../core/actions";

enum GameEventType {
    Input = 1,
};

enum GameInputEventType {
    Key = 1,
};

@ccclass
export default class SceneInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        gd.scene["current"] = gd.scene["next"];
        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        gd.frame["dt"] = 0;

        var id_count=0;

        var cutscene_dialogs = {
            "workshop_messenger": {
                "d1" : {
                    "text_id" : "stage1_scene1_messenger_d1",
                    "speaker" : "Messenger_horse",
                    "data": {"name": "Phil"}
                },
                "d2" : {
                    "text_id" : "stage1_scene1_player_d1",
                    "speaker" : "main_character",
                },
                "d3" : {
                    "text_id" : "stage1_scene1_messenger_d2",
                    "speaker" : "Messenger_horse",
                },
                "d4" : {
                    "text_id" : "stage1_scene1_player_d2",
                    "speaker" : "main_character",
                },
                "d5" : {
                    "text_id" : "stage1_scene1_messenger_d3",
                    "speaker" : "Messenger_horse",
                },
            }
        }

        var dialog_status: Object = {
            "type": "node",
            "action": "dialog",
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "/Canvas/background1/queen",
            "language" : "en",
            "resources": {
                "node" : {
                    "speakers" : "/Canvas/background/",
                    "dialog" : "/Canvas/background/dialog",
                },
                "dialog_list" : cutscene_dialogs[gd.scene["current"]],
            },
            "current_dialog" : null,
            "last_char_displayed" : 0,
        };

        dialog_status = gd.directory.addStatus(dialog_status);

        var dialogelement: any = new GameElement(dialog_status, cc.find('/Canvas/background1/queen'));

        gd.directory.addElement(dialogelement);

        var dialogListener: Object = {
            listener : dialogelement.getId(),
            event : {
                    type : "keyinput",
                    "data.key": "d",
            }
        };
        gd.observer.addSubscription(dialogListener);

        console.log("listener added");

        var finishScene: Object = {
            listener : function() {
                cc.director.loadScene("cutscene_1");
            },
            event:{
                "type": "dialog",
                "subtype": "dialog_finished",
            }
        };
        gd.observer.addSubscription(finishScene);
    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
