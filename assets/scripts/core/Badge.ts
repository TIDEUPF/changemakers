import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";

export const badge_labels: Object = {
    "creative_mind_b": "B1",
    "creative_mind_g": "B1",
    "creative_mind_s": "B1",
    "critical_thinker_b": "B2",
    "critical_thinker_g": "B2",
    "critical_thinker_s": "B2",
    "listener_b": "B3",
    "listener_g": "B3",
    "listener_s": "B3",
    "never_give_up_b": "B4",
    "never_give_up_g": "B4",
    "never_give_up_s": "B4",
    "problem_solver_b": "B5",
    "problem_solver_g": "B5",
    "problem_solver_s": "B5",
}

var badge_count = 0;

export class Badge {
    static add(params) {

        var player_data = gd.directory.searchId('player');
        var badges: cc.Node = gd.directory.getNode('/badges/sprites');
        var badges_transparency: cc.Node = gd.directory.getNode('/badges_transparency');
        badges_transparency.active = true;
        badges.parent.active = true;
        badges.children.forEach(function(item) {
            item.active = false;
        });

        var badge_sprite: cc.Node = gd.directory.getNode('/badges/sprites/' + params["badge_id"]);
        badge_sprite.active = true;

        var badge_label = gd.directory.getNode('/badges/label');
        var badge_label_component: cc.Label = badge_label.getComponent('cc.Label');

        badge_label_component.string = text.i18n.t(badge_labels[params["badge_id"]]);

        if(!(player_data["data"]["badges"].length > 4)) {
            player_data["data"]["badges"].push({
                "badge_id": params["badge_id"],
                "step": player_data["data"]["current_step"],
            });
        }

        if(badge_count === 0)
            Scene.click('/badges_transparency');

        var badge_id = badge_count++;

        gd.observer.addSubscription({
            listener : function(event) {
                Badge.close();

                gd.observer.addEvent({
                    type: "bagdes",
                    subtype: "close",
                    "data": {
                        "badge_id": badge_id,
                    },
                });

            },
            event:{
                "type" : "click",
                "origin": "badges_transparency",
            }
        });

        return badge_id;
    }

    static close() {
        var badges: cc.Node = gd.directory.getNode('/badges');
        var badges_transparency: cc.Node = gd.directory.getNode('/badges_transparency');
        badges.active = false;
        badges_transparency.active = false;
    }
};
 

