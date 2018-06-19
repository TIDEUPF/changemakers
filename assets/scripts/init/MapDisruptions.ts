const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {Utils} from "../core/Utils";
import {Notebook} from "../core/Notebook";
import {MessageBox} from "../core/MessageBox";
import {Scene} from "../core/Scene";
import {Badge} from "../core/Badge";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class MapDisruptions extends cc.Component {

    onLoad() {
        // init logic
        var init = this;

        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        //console.log(gamenn.moveUp);
        Notebook.registerEvents();

        var id_count=0;

        var elements_path = "/Canvas/background/npcs/";

        Scene.init();
        /*
        var player: Object = {
            "boy": elements_path + "main_character_1",
            "girl": elements_path + "main_character_2",
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
                player_node.name = 'main_character';
            }
        }
*/
        var player_data = gd.directory.searchId('player');

        //stage5 disable visited disruptions
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 2) {
            for(var disruption in player_data["data"]["steps"]["5"]["disruption"]) {
                var disruption_node = gd.directory.getNode(elements_path + player_data["data"]["steps"]["5"]["disruption"][disruption]);
                disruption_node.active = false;
            }
        }
        
        //show the first message
        if(player_data["data"]["current_step"] == 5 &&
        player_data["data"]["steps"]["5"]["stage"] == 2 &&
        player_data["data"]["steps"]["5"]["disruption"].length === 0) {
            MessageBox.text("S5S2_1");
        }

        //show the next message
        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] == 2 &&
        player_data["data"]["steps"]["5"]["disruption"].length > 0) {
            MessageBox.text("S5S2C");
        }

        //next step with 2 disruptions
        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] == 2 &&
        player_data["data"]["steps"]["5"]["disruption"].length >= 2) {
            MessageBox.text("M1");
            gd.directory.getNode('/Canvas/background/next_step').active = true;
        }

        //level 5 badge
        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] == 2 &&
        player_data["data"]["steps"]["5"]["disruption"].length >= 2) {
            gd.observer.addSubscription({
                listener : function(event) {
                    if(player_data["data"]["steps"]["5"]["disruption"].length === 3) {
                        Badge.add({"badge_id": "never_give_up_g"});
                    } else if(player_data["data"]["steps"]["5"]["disruption"].length === 2) {
                        Badge.add({"badge_id": "never_give_up_s"});
                    } else if(player_data["data"]["steps"]["5"]["disruption"].length === 1) {
                        Badge.add({"badge_id": "never_give_up_b"});
                    }

                    gd.observer.addSubscription({
                        listener : function(event) {
                            gd.observer.addEvent({
                                "type": "step",
                                "subtype": "disruptions_finish",
                            });
                        },
                        event: {
                            type: "bagdes",
                            subtype: "close",
                        }
                    });
                },
                event: {
                    "type" : "click",
                    "subtype" : "next_step",
                }
            });
        }
        
        gd.observer.addSubscription({
            listener : function(event) {
                gd.scene["next"] = 'ending';
                player_data["data"]["current_step"] = 6;
                Scene.load('cutscene_7');
            },
            event:{
                "type" : "step",
                "subtype" : "disruptions_finish",
            }
        });

        var map_click: Object = {
            "type": "node",
            "action": "switchScene",
            "emitter": null,
            "id": "map_disruption" + (id_count++).toString(10),
            "element_id" : "/Canvas/background/npcs",
            "resources": {
                "node" : {
                    "shield" : elements_path + "shield",
                    "dseat" : elements_path + "dseat",
                    "entertainers" : elements_path + "entertainers",
                },
                "switch" : {
                    "shield" : {
                        "scene" : "disruption_1",
                        "dialog" : "disruption_1",
                    },
                    "dseat" : {
                        "scene" : "disruption_2",
                        "dialog" : "disruption_2",
                    },
                    "entertainers" : {
                        "scene" : "disruption_3",
                        "dialog" : "disruption_3",
                    },
                },
            },
            "data": {
                "current_element": null,
            },
            "init": {
                "clickEvent": {
                    "shield" : {},
                    "dseat" : {},
                    "entertainers" : {},
                }
            }
        };

        map_click = gd.directory.addStatus(map_click);
        var map_element: any = new GameElement(map_click, cc.find('/Canvas/background/npcs'));
        gd.directory.addElement(map_element);
        
        gd.observer.addSubscription({
            listener : map_element.getId(),
            event : {
                    type : "click",
                    origin_type: "npcs",
            }
        });
        
/*
        gd.observer.addSubscription({
            listener : function() {

                gd.scene["next"] = "S3S1_2";
                Scene.load('ideation_1');
            },
            event:{
                type : "keyinput",
                "data.key": "i",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                Scene.load('workshop');
            },
            event:{
                type : "keyinput",
                "data.key": "w",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                gd.scene["next"] = 'disruption_1';
                Scene.load('disruption_1');
            },
            event:{
                type : "keyinput",
                "data.key": "1",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                gd.scene["next"] = 'disruption_2';
                Scene.load('disruption_2');
            },
            event:{
                type : "keyinput",
                "data.key": "2",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                gd.scene["next"] = 'disruption_3';
                Scene.load('disruption_3');
            },
            event:{
                type : "keyinput",
                "data.key": "3",
            }
        });

        
        gd.observer.addSubscription({
            listener : function() {
                gd.scene["next"] = "S5S1_1";
                Scene.load('cutscene_6');
            },
            event:{
                type : "keyinput",
                "data.key": "f",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                Scene.load('indicators');
            },
            event:{
                type : "keyinput",
                "data.key": "n",
            }
        });
*/

    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
