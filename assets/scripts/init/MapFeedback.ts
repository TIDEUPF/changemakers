const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {Utils} from "../core/Utils";
import {Notebook} from "../core/Notebook";
import {MessageBox} from "../core/MessageBox";
import {Scene} from "../core/Scene";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class MapFeedback extends cc.Component {

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

        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["feedback"].length === 0 &&
        player_data["data"]["steps"]["5"]["noninformative"].length === 0) {
            MessageBox.text("S5S0_1");
        }

        //stage5 disable visited dialogues
        if(player_data["data"]["current_step"] == 5) {
            for(var character of player_data["data"]["steps"]["5"]["feedback"]) {
                var character_node = gd.directory.getNode(elements_path + character);
                character_node.active = false;
            }

            for(var character of player_data["data"]["steps"]["5"]["noninformative"]) {
                var character_node = gd.directory.getNode(elements_path + character);
                character_node.active = false;
            }
            //MessageBox.text("Click on a character to recieve feedback");
        }

        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] == 1 &&
        player_data["data"]["steps"]["5"]["feedback"].length >=3) {
            gd.directory.getNode('/Canvas/background/next_step').active = true;
            gd.directory.getNode('/Canvas/background/go_to_workshop').active = true;
        }

        gd.observer.addSubscription({
            listener : function(event) {
                player_data["data"]["steps"]["5"]["stage"] = 2;
                Scene.load('map_disruption');
            },
            event:{
                "type" : "click",
                "subtype" : "next_step",
            }
        });

        gd.observer.addSubscription({
            listener : function(event) {
                Scene.load('workshop');
            },
            event:{
                "type" : "click",
                "subtype" : "go_to_workshop",
            }
        });

        var map_click: Object = {
            "type": "node",
            "action": "switchScene",
            "emitter": null,
            "id": "map_feedback" + (id_count++).toString(10),
            "element_id" : "/Canvas/background/npcs",
            "resources": {
                "node" : {
                    "Captain" : elements_path + "Captain",
                    "Driver" : elements_path + "Driver",
                    "old_lady" : elements_path + "old_lady",
                    /*"Chef" : elements_path + "Chef",
                    "Doctor" : elements_path + "Doctor",
                    "Huntress" : elements_path + "Huntress",
                    "Librarian" : elements_path + "Librarian",
                    "Merchant" : elements_path + "Merchant",
                    "Messenger_horse" : elements_path + "Messenger_horse",
                    "Messenger" : elements_path + "Messenger",
                    "butler" : elements_path + "butler",
                    "civil_engineer" : elements_path + "civil_engineer",
                    "potter" : elements_path + "potter",
                    "queen" : elements_path + "queen",
                    "soldier" : elements_path + "soldier",
                    "the_grumpy_butcher" : elements_path + "the_grumpy_butcher",
                    "the_stable_boy" : elements_path + "the_stable_boy",
                    "vagabond" : elements_path + "vagabond",
                    "Tailor" : elements_path + "Tailor",
                    */
                },
                "switch" : {
                    "Captain" : {
                        "scene" : "cutscene_6",
                        "dialog" : "S5S1_1",
                    },
                    "Driver" : {
                        "scene" : "cutscene_6",
                        "dialog" : "S5S1_2",
                    },
                    "old_lady" : {
                        "scene" : "cutscene_6",
                        "dialog" : "S5S1_3",
                    },

/*
                    "Chef" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_Chef",
                    },

                    "Doctor" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_Doctor",
                    },

                    "Huntress" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_Huntress",
                    },

                    "Librarian" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_Librarian",
                    },

                    "Merchant" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_Merchant",
                    },

                    "butler" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_butler",
                    },

                    "civil_engineer" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_civil_engineer",
                    },

                    "potter" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_potter",
                    },

                    "the_grumpy_butcher" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_the_grumpy_butcher",
                    },

                    "the_stable_boy" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_the_stable_boy",
                    },

                    "vagabond" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_vagabond",
                    },

                    "Tailor" : {
                        "scene" : "cutscene_6",
                        "dialog" : "stage5_noninformative_Tailor",
                    },
*/

                },
            },
            "data": {
                "current_element": null,
            },
            "init": {
                "clickEvent": {
                    "Captain" : {},
                    "Driver" : {},
                    "old_lady" : {},
                    /*
                    "Chef" : {},
                    "Doctor" : {},
                    "Huntress" : {},
                    "Librarian" : {},
                    "Merchant" : {},
                    "Messenger_horse" : {},
                    "Messenger" : {},
                    "butler" : {},
                    "civil_engineer" : {},
                    "potter" : {},
                    "queen" : {},
                    "soldier" : {},
                    "the_grumpy_butcher" : {},
                    "the_stable_boy" : {},
                    "vagabond" : {},
                    "Tailor" : {},
                    */

                }
            }
        };

        map_click = gd.directory.addStatus(map_click);
        //gd.directory.addStatus(map_click);
        var map_element: any = new GameElement(map_click, cc.find('/Canvas/background/npcs'));
        gd.directory.addElement(map_element);
        
        gd.observer.addSubscription({
            listener : map_element.getId(),
            event : {
                    type : "click",
                    origin_type: "npcs",
            }
        });
        
        const hints = [
            "Captain",
            "Driver",
            "old_lady",
        ];

        for(var item of hints) {
            Scene.click('/Canvas/background/npcs/' + item);
        }

        gd.observer.addSubscription({
            listener : function(event) {
                for(var item of hints) {
                    gd.directory.getNode('/Canvas/background/npcs/' + item + '/balloon').active = true;

                    Scene.click('/Canvas/background/npcs/' + item + '/balloon/s1');
                    Scene.click('/Canvas/background/npcs/' + item + '/balloon/s2');
                }
            },
            event: {
                "type" : "hint",
                "subtype": "feedback",
            }
        });

        gd.observer.addSubscription({
            listener : function(event) {
                var balloon = cc.find(event["element_path"]);
                gd.observer.addEvent({
                    "type" : "click",
                    "origin_type": "npcs",
                    "origin": balloon.parent.parent.name,
                });
            },
            event: {
                "type" : "click",
                "origin": {
                    "$containsAny": [
                        "s1",
                        "s2",
                    ]
                },
            }
        });

        gd.observer.addSubscription({
            listener : function(event) {
                var character = cc.find(event["element_path"]);
                gd.observer.addEvent({
                    "type" : "click",
                    "origin_type": "npcs",
                    "origin": character.name,
                });
            },
            event: {
                "type" : "click",
                "subtype": "scene_click",
                "origin": {
                    "$containsAny": [
                        "Captain",
                        "Driver",
                        "old_lady",
                    ]
                },
            }
        });

        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["hint"] === true) {
            gd.observer.addEvent({
                "type" : "hint",
                "subtype": "feedback",
            });
        }

        gd.observer.addSubscription({
            listener : function(event) {
                player_data["data"]["steps"]["5"]["hint"] = true;

                gd.observer.addEvent({
                    "type" : "hint",
                    "subtype": "feedback",
                });
            },
            event:{
                "type" : "click",
                "subtype" : "show_hint",
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
