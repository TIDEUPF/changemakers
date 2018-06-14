import * as gd from "./GameData";
import {Utils} from "./Utils";

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
        cc.director.loadScene(scene);
    },

    "save": function() {
        var player_data = gd.directory.searchId('player');
        gd.directory.searchId('indicators0');
        gd.directory.searchId('user_built_carriage');
        gd.scene;
    }
};
