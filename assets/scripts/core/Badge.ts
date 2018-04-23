import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";

const badge_labels:Object = {
    "creative_mind_b": "creative_mind",
    "creative_mind_g": "creative_mind",
    "creative_mind_s": "creative_mind",
    "critical_thinker_b": "critical_thinker",
    "critical_thinker_g": "critical_thinker",
    "critical_thinker_s": "critical_thinker",
    "listener_b": "listener",
    "listener_g": "listener",
    "listener_s": "listener",
    "never_give_up_b": "never_give_up",
    "never_give_up_g": "never_give_up",
    "never_give_up_s": "never_give_up",
    "problem_solver_b": "problem_solver",
    "problem_solver_g": "problem_solver",
    "problem_solver_s": "problem_solver",
}

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

        player_data["data"]["badges"].push({
            "badge_id": params["badge_id"],
            "step": player_data["current_step"],
        });

        Scene.click('/badges_transparency');

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
                "origin": "badges_transparency",
            }
        });

    }

    static close() {
        var badges: cc.Node = gd.directory.getNode('/badges');
        var badges_transparency: cc.Node = gd.directory.getNode('/badges_transparency');
        badges.active = false;
        badges_transparency.active = false;
    }
};
 

