const {ccclass, property} = cc._decorator;

import * as gd from "../core/GameData";

@ccclass
export default class ReadSlider extends cc.Component {

    @property(cc.Label)
    label: cc.Label;

    @property({
        default: 'hello'
    })
    text: string = 'hello';


    readValue(val, extra) {
        let gameEvent = {
            type: "slider",
            origin: extra,
            origin_type: this.node.name,
            value: val.progress,
        };

        gd.observer.addEvent(gameEvent);
    }
}
