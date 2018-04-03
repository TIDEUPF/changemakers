import * as gd from "./GameData";

export class Badge {
    static add(params) {

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
    }

    static remove() {

    }
};
 

