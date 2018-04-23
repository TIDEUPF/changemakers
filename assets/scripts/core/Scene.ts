import * as gd from "./GameData";

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
    }
};
