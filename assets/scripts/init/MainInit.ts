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

        //cc.director.loadScene('map');
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
                    },
                    "5" : {
                        "disruptions": [],
                        "current_disruption": null,
                    },
                },
                "current_step": 1,
            }
        });

        //cc.game.addPersistRootNode(cc.find('notebook'));
        //cc.director.loadScene('player_select');

        //gd.scene["next"] = "palace";
        //cc.director.loadScene('cutscene_2');

        var player_data = gd.directory.searchId('player');

        player_data["current_step"] = 4;
        cc.director.loadScene('workshop');

    }

    update (dt) {
        //cc.director.loadScene('carriage');
    }
}
