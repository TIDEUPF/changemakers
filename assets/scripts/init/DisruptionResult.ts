const {ccclass, property} = cc._decorator;
 
import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {MessageBox} from "../core/MessageBox";
import {check_carriage} from "../steps/prototype/carriage";
import {Badge} from "../core/Badge";
import {Scene} from "../core/Scene";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";
 
@ccclass
export default class WorkshopInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;
 
    onLoad() {
        //var clip: cc.AudioClip = cc.loader.load(cc.url.raw('assets/sound/fx/testaudio.mp3'));
        //cc.audioEngine.play("db://assets/sound/fx/testaudio.mp3", true, 1);
 
        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();
 
        //cc.audioEngine.play("res/raw-assets/sound/fx/testaudio.mp3", true, 1);
 
        // init logic
        var init = this;  
 
        //console.log(gamenn.moveUp);
        var id_count=0;
 
        var player_data = gd.directory.searchId('player');
        var carriage_data = gd.directory.searchId('user_built_carriage');

        gd.observer.addEvent({
            "type": "scene_start",
            "scene": gd.scene["game_scene"],
        });

        Scene.init();

        var player: Object = {
            "boy": "Canvas/background/main_character/main_character_1",
            "girl": "Canvas/background/main_character/main_character_2",
        }

        for(let player_key in player) {
            var player_node = gd.directory.getNode(player[player_key]);

            if(player_node === null) {
                continue;
            }

            player_node.active = false;
            var player_data = gd.directory.searchId("player");

            if(player_data["data"]["gender"] == player_key) {
                player_node.active = true;
                player_node.parent.height = player_node.height;
                player_node.parent.width = player_node.width;
            }
        }
        
        new GameElement({
            "action": "selectCarriageElement",
            "id": "disruption_carriage",
            "resources": {
                "carriage_data": "user_built_carriage",
            },
            "listen" : {
                "type" : "carriage",
                "subtype" : "update",
            },
        });

        gd.observer.addEvent({
            "type": "carriage",
            "subtype": "update",
        });

        gd.observer.addSubscription({
            listener : function(event) {
                Scene.load("map_disruption");
            },
            event:{
                "type" : "click",
            }
        });

        Scene.click('/Canvas/background');
    }
 
    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
