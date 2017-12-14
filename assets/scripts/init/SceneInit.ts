const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import GameElement from "../core/GameElement";
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

    onLoad() {
        // init logic
        var init = this;
        console.log("game init");
        this.observer = new Observer();
        console.log("observer created");
        
        var keyEventListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                let gameEvent = {
                    emitter : {
                        type : GameEventType.Input,
                        subtype : GameInputEventType.Key,
                    },
                    data : {
                        key : keyCode
                    }
                };

                this.observer.addEvent(gameEvent);
            }.bind(this)
        });

        cc.eventManager.addListener(keyEventListener, 1000);

        //console.log(gamenn.moveUp);
        var id_count=0;
        console.log(cc.find('/Canvas/background1/queen'));

        var queen_status = {
            "type": "node",
            "action": "moveUp",
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "/Canvas/background1/queen",
        };

        var gameelement: any = new GameElement(queen_status, cc.find('/Canvas/background1/queen'));

        let elementListener = {
            receiver : queen_status.id,
            emitter : {
                type : GameEventType.Input,
                subtype : GameInputEventType.Key,
                },
        };
        this.observer.suscribeEvent(elementListener);
        console.log("listener added");

        this.observer.suscribeEvent({
            receiver : queen_status.id,
            attributes : {
                "speed" : "high",
                "altitude" : "low",
                },
            emitter : {
                type : "npc",
                subtype : "farmer",
                },
        });

        console.log(queen_status);

    }

    update (dt) {
        this.observer.notifyEvents();

        this.observer.newFrame();
    }
}
