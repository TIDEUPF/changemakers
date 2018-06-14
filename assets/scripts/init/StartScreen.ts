const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {Sound} from "../core/Sound";
import {Notebook} from "../core/Notebook";
import {Scene} from "../core/Scene";
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
        //Notebook.registerEvents();
        /*
        gd.observer.addSubscription({
            listener : function() {
                var player_data = gd.directory.searchId('player');
                player_data["current_step"] = 4;
                cc.director.loadScene('workshop');
            },
            event:{
                type : "keyinput",
                "data.key": "w",
            }
        });
        */

        /*
        gd.observer.addSubscription({
            listener : function() {
                var player_data = gd.directory.searchId('player');
                player_data["data"]["current_step"] = 1;
                player_data["data"]["steps"]["1"]["stage"] = 4;
                cc.director.loadScene('map');
            },
            event:{
                type : "keyinput",
                "data.key": "m",
            }
        });
        */

        gd.observer.addSubscription({
            listener : function(event) {
                Scene.load("player_select");
            },
            event:{
                type : "click",
                "data.custom": "start_new_game",
            }
        });

    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
