const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {Sound} from "../core/Sound";
import {Notebook} from "../core/Notebook";
import {Scene} from "../core/Scene";
import {SaveManager} from "../core/SaveManager";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class StartScreen extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        gd.frame["dt"] = 0;

        var id_count=0;


        var bgm_scene_sound = {
            "sound_list": [
                {
                    "audio_id": "introduction",
                    "events": [
                        {
                            "type": "scene_start",
                            "scene": {
                                "$containsAny": [
                                    "player_select",
                                ]},
                        },
                    ],
                },


            ],
        };

        Sound.sceneBGM(bgm_scene_sound);

        gd.observer.addEvent({
            "type": "scene_start",
            "scene": "player_select",
        });

        Scene.init();


        gd.observer.addSubscription({
            listener : function(event) {
                cc.director.loadScene("player_select");
            },
            event:{
                type : "click",
                "data.custom": "start_new_game",
            }
        });

        if(SaveManager.save_exists()) {
            gd.directory.getNode("/Canvas/background/B11").active = true;
            var username = SaveManager.get_save_username();

            if(username) {
                gd.directory.getNode("/Canvas/background/B11").getComponent("cc.Label").string += ' - ' + username;
            }

            "Canvas/background/load_previous_game/B11";
            gd.observer.addSubscription({
                listener : function(event) {
                    SaveManager.load_save();
                },
                event:{
                    type : "click",
                    "data.custom": "load_previous_game",
                }
            });
        }

    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
