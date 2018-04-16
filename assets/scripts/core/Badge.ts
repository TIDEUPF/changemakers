import * as gd from "./GameData";
import {Scene} from "../core/Scene";

/*
const badge_labels:Object = {
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
}
*/

export class Badge {
    static add(params) {

        var player_data = gd.directory.searchId('player');
        var badges: cc.Node = gd.directory.getNode('/badges/sprites');
        badges.parent.active = true;
        badges.children.forEach(function(item) {
            item.active = false;
        });

        var badge_sprite: cc.Node = gd.directory.getNode('/badges/sprites/' + params["badge_id"]);
        badge_sprite.active = true;

        var badge_label = gd.directory.getNode('/badges/label');
        var badge_label_component: cc.Label = badge_label.getComponent('cc.Label');

        badge_label_component.string = 'New badge A';

        player_data["data"]["badges"].push({
            "badge_id": params["badge_id"],
            "step": player_data["current_step"],
        });

        Scene.click('/badges');

        gd.observer.addSubscription({
            listener : function(event) {
                Badge.close();

                gd.observer.addEvent({
                    type: "bagdes",
                    subtype: "close",
                });

            },
            event:{
                "type" : "click",
                "origin": "badges",
            }
        });

    }

    static close() {
        var badges: cc.Node = gd.directory.getNode('/bagdes');
        badges.active = false;
    }
};
 

