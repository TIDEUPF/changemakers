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
        //cc.audioEngine.play("assets/sound/introduction.ogg", true, 1);
        //cc.loader.load(cc.url.raw('assets/sound/introduction.ogg'));
        cc.audioEngine.play("res/raw-assets/sound/music/introduction.ogg", true, 1);

        gd.scene["current"] = gd.scene["next"];
        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        gd.frame["dt"] = 0;

        var id_count=0;

        gd.observer.addSubscription({
            listener : function() {
                var player_data = gd.directory.searchId('player');
                player_data["current_step"] = 4;
                cc.director.loadScene('workshop');
            },
            event:{
                type : "keyinput",
                "data.key": "w",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                var player_data = gd.directory.searchId('player');
                player_data["data"]["current_step"] = 1;
                player_data["data"]["steps"]["1"]["stage"] = 4;
                cc.director.loadScene('map');
            },
            event:{
                type : "keyinput",
                "data.key": "m",
            }
        });

        gd.observer.addSubscription({
            listener : function(event) {
                var player_data = gd.directory.searchId('player');
                player_data["data"]["gender"] = event.data.name;
                event.data.node.parent.active = false;
                event.data.node.parent.parent.getChildByName('name_input').active = true;
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
                
                gd.scene["next"] = "workshop_messenger";
                cc.director.loadScene('cutscene_1');
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
