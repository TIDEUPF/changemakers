const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class PlayeSelect extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        gd.scene["current"] = gd.scene["next"];
        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        gd.frame["dt"] = 0;

        var id_count=0;

        gd.observer.addSubscription({
            listener : function(event) {
                gd.directory.addStatus({
                    "type": "data",
                    "id": "player",
                    "data": {
                        "gender": event.data.name,
                    }
                });

                event.data.node.parent.active = false;
                event.data.node.parent.parent.getChildByName('name_input').active = true;

                //cc.director.loadScene('map');
            },
            event:{
                type : "click",
                "subtype": "player_select",
            }
        });

        gd.observer.addSubscription({
            listener : function(event) {
                var player = gd.directory.searchId("player");
                player["data"]["name"] = event.data.node.parent.getComponent('cc.EditBox').string;
                
                //cc.director.loadScene('cutscene_1');
            },
            event:{
                type : "click",
                "subtype": "name_input",
            }
        });

        /*var url = cc.url.raw("sprites/characters/main_character_1.png");
        var texture = cc.textureCache.addImage(url);
        var a = cc.find('Canvas/background/player_select/girl')
        var s = a.getComponent('cc.Sprite')
        s.spriteFrame = new cc.SpriteFrame(texture)*/

    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
