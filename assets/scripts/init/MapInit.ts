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
export default class MapInit extends cc.Component {

    onLoad() {
        // init logic
        var init = this;

        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        //console.log(gamenn.moveUp);
        var id_count=0;

        Notebook.registerEvents();
        
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

        //stage4 disable visited dialogues
        if(player_data["data"]["current_step"] == 1 && player_data["data"]["steps"]["1"]["stage"] == 4) {
            for(var character in player_data["data"]["steps"]["1"]["info_dialogs"]) {
                var character_node = gd.directory.getNode(elements_path + player_data["data"]["steps"]["1"]["info_dialogs"][character]);
                character_node.active = false;
            }

            MessageBox.text("Click on a character");
        }

        //stage4 dialogue counter increase
        if(player_data["data"]["current_step"] == 1 && player_data["data"]["steps"]["1"]["stage"] == 4) {
            gd.observer.addSubscription({
                listener : function(event) {
                    var informative_results = {
                        "informative_silver": player_data["data"]["steps"]["1"]["information"]["high"].length >= 5,
                        "informative_gold": player_data["data"]["steps"]["1"]["information"]["high"].length >= 6,
                        "informative_futile": player_data["data"]["steps"]["1"]["information"]["futile"].length >= 1 && player_data["data"]["steps"]["1"]["information"]["futile"].length >= 1,
                    };
        
                    if(informative_results.informative_gold) {
                        Badge.add({
                            "badge_id": "listener_g",
                        });
                    } else if(informative_results.informative_silver) {
                        Badge.add({
                            "badge_id": "listener_s",
                        });
                    } else if(informative_results.informative_futile) {
                        Badge.add({
                            "badge_id": "listener_b",
                        });
                    }
        
                    gd.observer.addSubscription({
                        listener : function(event) {
                            gd.observer.addEvent({
                                "subtype": "map_finish",
                            });
                        },
                        event:{
                            type: "bagdes",
                            subtype: "close",
                        }
                    });
                        },
                event:{
                    "type" : "badges",
                    "subtype" : "add",
                }
            });
        }

        //stage4 dialogue counter increase
        if(player_data["data"]["current_step"] == 1 && 
        player_data["data"]["steps"]["1"]["stage"] == 4 &&
        player_data["data"]["steps"]["1"]["next_step_unlocked"] == false) {
            if(player_data["data"]["steps"]["1"]["information"]["high"].length >= 5) {
                player_data["data"]["steps"]["1"]["next_step_unlocked"] = true;
                MessageBox.text("S1S5_1");

                /*
                gd.observer.addSubscription({
                    listener : function(event) {
                        player_data["data"]["current_step"] = 4;
                        cc.director.loadScene('workshop');
                    },
                    event:{
                        type: "messagebox",
                        subtype: "close",
                    }
                });
                */
            }
        }

        //activate next level button
        if(player_data["data"]["steps"]["1"]["next_step_unlocked"]) {
            gd.directory.getNode('/Canvas/background/next_step').active = true;

            gd.observer.addSubscription({
                listener : function(event) {
                    gd.observer.addEvent({
                        "type": "badges",
                        "subtype": "add",
                    });
                },
                event:{
                    "type" : "click",
                    "subtype" : "next_step",
                }
            });
        }

        gd.observer.addSubscription({
            listener : function(event) {
                player_data["data"]["current_step"] = 2;
                cc.director.loadScene('indicators');
            },
            event:{
                "subtype" : "map_finish",
            }
        });




        var map_click: Object = {
            "type": "node",
            "action": "switchScene",
            "emitter": null,
            "id": "map" + (id_count++).toString(10),
            "element_id" : "/Canvas/background/npcs",
            "resources": {
                "node" : {
                    "Captain" : elements_path + "Captain",
                    "Chef" : elements_path + "Chef",
                    "Doctor" : elements_path + "Doctor",
                    "Driver" : elements_path + "Driver",
                    "Huntress" : elements_path + "Huntress",
                    "Librarian" : elements_path + "Librarian",
                    "Merchant" : elements_path + "Merchant",
                    "Messenger_horse" : elements_path + "Messenger_horse",
                    "Messenger" : elements_path + "Messenger",
                    "butler" : elements_path + "butler",
                    "civil_engineer" : elements_path + "civil_engineer",
                    //"kingandqueen_1" : elements_path + "kingandqueen_1",
                    //"king" : elements_path + "king",
                    //"main_character_1" : elements_path + "main_character_1",
                    "potter" : elements_path + "potter",
                    "old_lady" : elements_path + "old_lady",
                    "queen" : elements_path + "queen",
                    "soldier" : elements_path + "soldier",
                    "the_grumpy_butcher" : elements_path + "the_grumpy_butcher",
                    "the_stable_boy" : elements_path + "the_stable_boy",
                    "vagabond" : elements_path + "vagabond",
                    "Tailor" : elements_path + "Tailor",
                },
                "switch" : {
                    "Captain" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_captain",
                    },
                    "Chef" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_chef_female",
                    },

                    "Doctor" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_doctor_male",
                    },

                    "Driver" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_coachman_male",
                    },

                    "Huntress" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_huntress_female",
                    },

                    "Librarian" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_librarian_female",
                    },

                    "Merchant" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_merchant_male",
                    },

                    "butler" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_butler_male",
                    },

                    "civil_engineer" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_civil_engineer_female",
                    },

                    "potter" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_potter_female",
                    },

                    "old_lady" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_old_lady_female",
                    },

                    "the_grumpy_butcher" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_butcher_male",
                    },

                    "the_stable_boy" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_stable_boy",
                    },

                    "vagabond" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_vagabond_male",
                    },

                    "Tailor" : {
                        "scene" : "cutscene_5",
                        "dialog" : "stage1_scene4_tailor_female",
                    },

                },
            },
            "data": {
                "current_element": null,
            },
            "init": {
                "clickEvent": {
                    "Captain" : {},
                    "Chef" : {},
                    "Doctor" : {},
                    "Driver" : {},
                    "Huntress" : {},
                    "Librarian" : {},
                    "Merchant" : {},
                    "Messenger_horse" : {},
                    "Messenger" : {},
                    "butler" : {},
                    "civil_engineer" : {},
                    "potter" : {},
                    "old_lady" : {},
                    "queen" : {},
                    "soldier" : {},
                    "the_grumpy_butcher" : {},
                    "the_stable_boy" : {},
                    "vagabond" : {},
                    "Tailor" : {},
                }
            }
        };

        map_click = gd.directory.addStatus(map_click);
        //gd.directory.addStatus(map_click);
        var map_element: any = new GameElement(map_click, cc.find('/Canvas/background/npcs'));
        gd.directory.addElement(map_element);

        
        var clickEventListener = {
            listener : map_element.getId(),
            event : {
                    type : "click",
                    origin_type: "npcs",
            }
        };
        gd.observer.addSubscription(clickEventListener);
        
/*
        gd.observer.addSubscription({
            listener : function() {

                gd.scene["next"] = "S3S1_2";
                cc.director.loadScene('ideation_1');
            },
            event:{
                type : "keyinput",
                "data.key": "i",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                cc.director.loadScene('workshop');
            },
            event:{
                type : "keyinput",
                "data.key": "w",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                gd.scene["next"] = 'disruption_1';
                cc.director.loadScene('disruption_1');
            },
            event:{
                type : "keyinput",
                "data.key": "1",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                gd.scene["next"] = 'disruption_2';
                cc.director.loadScene('disruption_2');
            },
            event:{
                type : "keyinput",
                "data.key": "2",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                gd.scene["next"] = 'disruption_3';
                cc.director.loadScene('disruption_3');
            },
            event:{
                type : "keyinput",
                "data.key": "3",
            }
        });

        
        gd.observer.addSubscription({
            listener : function() {
                gd.scene["next"] = "S5S1_1";
                cc.director.loadScene('cutscene_6');
            },
            event:{
                type : "keyinput",
                "data.key": "f",
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                cc.director.loadScene('indicators');
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
