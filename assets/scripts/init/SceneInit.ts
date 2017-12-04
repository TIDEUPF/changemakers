const {ccclass, property} = cc._decorator;

import Observer from "../common/Observer";
//import { actions } from "../core/actions";
import * as nn from "../core/actions";

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
        
        let elementListener = {
            type : GameEventType.Input,
            subtype : GameInputEventType.Key,
        };
        this.observer.suscribeEvent(elementListener);
        console.log("listener added");

        var keyEventListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                let gameEvent = {
                    type : GameEventType.Input,
                    subtype : GameInputEventType.Key,
                };

                this.observer.addEvent(gameEvent);
            }.bind(this)
        });

        cc.eventManager.addListener(keyEventListener, 1000);

        //console.log(gamenn.moveUp);
        console.log(nn);

        console.log(cc.find('/Canvas/background1/queen'));
    }

    update (dt) {
        this.observer.notifyEvents();

        this.observer.newFrame();
    }
}
