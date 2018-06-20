import * as gd from "./GameData";
import {Utils} from "./Utils";
import {SaveManager} from "./SaveManager";

export const Scene:{ [s: string]: Function } = {
    "click": function(item) {
        var node_item = cc.find(item);
        node_item.on('touchstart', function(event) {
            gd.observer.addEvent({
                type: "click",
                subtype: "scene_click",
                origin: node_item.name,
                element_path: item,
            });
        });
    },

    "init": function() {
        //translate
        Utils.translate("/Canvas");
    },

    "load": function(scene) {
        SaveManager.create_save();
        cc.director.loadScene(scene);
    },
};
