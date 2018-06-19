const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class transferInit extends cc.Component {
    onLoad() {
        // init logic
        console.log(gd.directory);
    }

    update (dt) {
        Scene.load('palace');
    }
}
