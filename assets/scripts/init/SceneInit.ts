const {ccclass, property} = cc._decorator;

import Observer from "../common/Observer";

@ccclass
export default class SceneInit extends cc.Component {
    onLoad() {
        // init logic
        console.log("game init");
        var observer = new Observer();
        console.log("observer created");     
    }
}
