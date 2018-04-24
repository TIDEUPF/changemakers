const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {check_carriage} from "../steps/prototype/carriage";
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

        /*
        gd.scene["next"] = "courtyard";
        cc.director.loadScene('cutscene_4');
*/
        //gd.scene["next"] = "stage3_ideation_patricia";
        //cc.director.loadScene('ideation_1');

        /*
        gd.scene["next"] = "workshop_messenger";
        cc.director.loadScene('cutscene_1');
        */

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
                        "noninformative": [],
                        "disruption": [],
                        "current_disruption": null,
                        "hint": false,
                    },
                    "6" : {
                        "stage": 1,
                    },
                },
                "current_step": 1,
                "badges": [],
            }
        });

        //user built carriage
        var carriage = gd.directory.addStatus({
            "id": "user_built_carriage",
            "data": {
                "parts": {
                    "wheels" : {
                        "part": "none",
                    },
                    "chassis" : {
                        "part": "none",
                    },
                    "pattern" : {
                        "part": "none",
                    },
                    "seat" : {
                        "part": "none",
                    },
                    "pseat" : {
                        "part": "none",
                        "hidden": true,
                    },
                    "dseat" : {
                        "part": "none",
                        "active": false,
                        "hidden": true,
                    },
                    "shield" : {
                        "part": "none",
                        "active": false,
                    },
                    "entertainers" : {
                        "part": "none",
                        "active": false,
                    },
                    "boot" : {
                        "part": "none",
                    },
                },
            },
        });
        
        cc.game.addPersistRootNode(cc.find('notebook'));
        cc.game.addPersistRootNode(cc.find('badges_transparency'));
        cc.game.addPersistRootNode(cc.find('badges'));
        cc.game.addPersistRootNode(cc.find('messagebox_transparency'));
        cc.game.addPersistRootNode(cc.find('messagebox'));

        cc.director.loadScene('player_select');

        //gd.scene["next"] = "palace";
        //cc.director.loadScene('cutscene_2');

        //var player_data = gd.directory.searchId('player');
        
        //var result = check_carriage(carriage["data"]);
        
        /*
        player_data["data"]["current_step"] = 4;
        cc.director.loadScene('workshop');
        */
        
        
                
        //player_data["data"]["current_step"] = 1;
        //player_data["data"]["steps"]["1"]["stage"] = 4;
        //player_data["data"]["steps"]["1"]["info_dialogs"] = ["the_stable_boy", "the_grumpy_butcher", "Captain", "butler", "Driver", "civil_engineer", "Tailor"];
        //player_data["data"]["steps"]["1"]["information"]["high"] = ["the_stable_boy", "Captain", "butler", "Driver", "Tailor"];
        //player_data["data"]["steps"]["1"]["information"]["futile"] = ["the_grumpy_butcher"];
        //player_data["data"]["steps"]["1"]["information"]["informative"] = ["civil_engineer"];

        //cc.director.loadScene('map');
        
        //cc.director.loadScene('indicators');

/*
        player_data["data"]["current_step"] = 5;
        player_data["data"]["steps"]["5"]["stage"] = 1;
        player_data["data"]["steps"]["5"]["feedback"].push("Captain");
        player_data["data"]["steps"]["5"]["feedback"].push("Driver");
        player_data["data"]["steps"]["5"]["feedback"].push("old_lady");
        cc.director.loadScene('map_feedback');
*/

/*
        player_data["data"]["current_step"] = 5;
        player_data["data"]["steps"]["5"]["feedback"].push("Captain");
        player_data["data"]["steps"]["5"]["feedback"].push("Driver");
        player_data["data"]["steps"]["5"]["feedback"].push("old_lady");
        player_data["data"]["steps"]["5"]["stage"] = 2;
        cc.director.loadScene('map_disruption');
*/

/*
        player_data["data"]["current_step"] = 6;
        player_data["data"]["steps"]["5"]["disruption"].push("dseat");
        player_data["data"]["steps"]["5"]["disruption"].push("shield");
        player_data["data"]["steps"]["5"]["disruption"].push("entertainers");
        carriage["data"]["parts"]["dseat"]["active"] = true;
        carriage["data"]["parts"]["dseat"]["part"] = "dseat1";

        carriage["data"]["parts"]["shield"]["active"] = true;
        carriage["data"]["parts"]["shield"]["part"] = "shield1";

        carriage["data"]["parts"]["entertainers"]["active"] = true;
        carriage["data"]["parts"]["entertainers"]["part"] = "entertainers1";

        player_data["data"]["steps"]["6"]["stage"] = 1;
        gd.scene["next"] = "ending";
        cc.director.loadScene('cutscene_7');
*/
    }

    update (dt) {
        //cc.director.loadScene('carriage');
    }
}
