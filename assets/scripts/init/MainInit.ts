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
export default class SceneInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        // init logic
        var init = this;
        console.log("game init");
        
        text.i18n.init("en");

        //var clip: cc.AudioClip = cc.loader.load(cc.url.raw('assets/sound/fx/testaudio.mp3'));
        //cc.audioEngine.play("res/raw-assets/sound/introduction.ogg", true, 1);
        
        var keyEventListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                let gameEvent = {
                    type: "keyinput",
                    emitter : {
                        type : GameEventType.Input,
                        subtype : GameInputEventType.Key,
                    },
                    data : {
                        key : String.fromCharCode(keyCode).toLowerCase()
                    }
                };

                gd.observer.addEvent(gameEvent);
            }.bind(this)
        });

        cc.eventManager.addListener(keyEventListener, 1000);

        //gd.scene["next"] = "courtyard";
        //cc.director.loadScene('cutscene_4');

        //gd.scene["next"] = "stage3_ideation_patricia";

        //gd.scene["next"] = "workshop_messenger";
        //cc.director.loadScene('cutscene_1');

        gd.directory.addStatus({
            "type": "data",
            "id": "player",
            "data": {
                "gender": "boy",
                "steps": {
                    "0" : {},
                    "1" : {
                        "dialogs": [],
                        "stage": 0,
                        "info_dialogs": [],
                        "next_step_unlocked": false,
                        "information": {
                            "high": [],
                            "informative": [],
                            "futile": [],
                        }
                    },
                    "5" : {
                        "stage": 0,
                        "feedback": [],
                        "disruption": [],
                        "current_disruption": null,
                    },
                },
                "current_step": 1,
                "badges": [],
            }
        });

        //user built carriage
        gd.directory.addStatus({
            "id": "user_built_carriage",
            "data": {
                "parts": {
                    "front_wheel" : {
                        "part": "none",
                    },
                    "chasis" : {
                        "part": "none",
                    },
                    "pattern" : {
                        "part": "none",
                    },
                    "seat" : {
                        "part": "seat1",
                    },
                    "pseat" : {
                        "part": "pseat1",
                    },
                    "dseat" : {
                        "part": "dseat1",
                        "active": false,
                    },
                    "shield" : {
                        "part": "shield1",
                        "active": false,
                    },
                    "entertainers" : {
                        "part": "entertainers1",
                        "active": false,
                    },
                    "rear_wheel" : {
                        "part": "none",
                    },
                    "boot" : {
                        "part": "boot1",
                    },
                },
            },
        });
        
        cc.game.addPersistRootNode(cc.find('notebook'));
        cc.game.addPersistRootNode(cc.find('badges'));
        cc.game.addPersistRootNode(cc.find('messagebox'));
        //cc.director.loadScene('player_select');

        //gd.scene["next"] = "palace";
        //cc.director.loadScene('cutscene_2');

        var player_data = gd.directory.searchId('player');

        //player_data["current_step"] = 4;
        //cc.director.loadScene('workshop');

        /*
        player_data["data"]["current_step"] = 1;
        player_data["data"]["steps"]["1"]["stage"] = 4;
        cc.director.loadScene('map');
        */

        /*
        player_data["data"]["current_step"] = 5;
        player_data["data"]["steps"]["5"]["stage"] = 0;
        cc.director.loadScene('map_feedback');
        */

        player_data["data"]["current_step"] = 5;
        player_data["data"]["steps"]["5"]["feedback"].push({});
        player_data["data"]["steps"]["5"]["feedback"].push({});
        player_data["data"]["steps"]["5"]["feedback"].push({});
        player_data["data"]["steps"]["5"]["stage"] = 1;
        cc.director.loadScene('map_disruption');

        /*
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 0) {
            gd.observer.addSubscription({
                listener : function(event) {
                    if(player_data["data"]["steps"]["5"]["feedback"].length > 2) {
                        player_data["data"]["steps"]["5"]["scene"] = 1;
                        next_scene[gd.scene["current"]]["next_scene"] = 'workshop';*/
    }

    update (dt) {
        //cc.director.loadScene('carriage');
    }
}
