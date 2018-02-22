const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class InputEvent extends cc.Component {
    onButtonClick(event) {
        gd.observer.addEvent({
            "type": "click",
            "subtype": event.target.parent.getName(),
            "data": {
                "uuid": event.target.uuid,
                "location": event.touch.getLocation(),
                "name": event.target.getName(),
                "node": event.target,
            },
        });
    }

    onAnimEvent(event) {
        gd.observer.addEvent({
            "type": "anim",
            "data": {
                "event": event,
            },
        });
    }
}
