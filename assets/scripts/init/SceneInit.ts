const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {Badge} from "../core/Badge";
import {characters_information} from "../steps/empathise/npc";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class SceneInit extends cc.Component {
    
    onLoad() {
        gd.scene["current"] = gd.scene["next"];
        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        gd.frame["dt"] = 0;

        var id_count=0;

        var background_node = gd.directory.getNode('/Canvas/background');

        background_node.on('touchstart', function(event) {
            let gameEvent = {
                type: "keyinput",
            };
            gd.observer.addEvent(gameEvent);
        });

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

        gd.observer.addSubscription({
            listener : function(event) {
                var animations = gd.directory.getNode('Canvas/background').getComponent('cc.Animation');
                animations.play('cutscene_4_2');
            },
            event:{
                "type" : "dialog",
                "subtype": "turn_finished",
                "data.text_id": "stage1_scene3_narrator_d1",
            }
        });

        var player_data = gd.directory.searchId('player');
        var carriage_data = gd.directory.searchId('user_built_carriage');

        //stage4 pre start
        if(gd.scene["current"] == "courtyard") {
            gd.observer.addSubscription({
                listener : function(event) {
                    Badge.add({"badge_id": "critical_thinker_g"});
                    player_data["data"]["steps"]["1"]["stage"] = 4;
                },
                event:{
                    "type" : "dialog",
                    "subtype": "dialog_finished",
                    "data.id": "courtyard_2_1",
                },
            });
        }


        //stage4 dialogue counter increase
        if(player_data["data"]["current_step"] == 1 && player_data["data"]["steps"]["1"]["stage"] == 4) {
            gd.observer.addSubscription({
                listener : function(event) {
                    player_data["data"]["steps"]["1"]["info_dialogs"].push(event["data"]["speaker"]);
                    player_data["data"]["steps"]["1"]["information"][characters_information[event["data"]["speaker"]]].push(event["data"]["speaker"]);
                },
                event:{
                    "type" : "dialog",
                    "subtype": "turn_finished",
                }
            });
        }

        //step5 feedback dialogue counter increase
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 0) {
            gd.observer.addSubscription({
                listener : function(event) {
                    if(event["data"]["speaker"] != "narrator") {
                        player_data["data"]["steps"]["5"]["feedback"].push(event["data"]["speaker"]);
                    }
                },
                event:{
                    "type" : "dialog",
                    "subtype": "turn_finished",
                }
            });
        }
             
        //go to ideation
        if(player_data["data"]["current_step"] == 1 && player_data["data"]["steps"]["1"]["stage"] == 4) {
            gd.observer.addSubscription({
                listener : function(event) {
                    if(player_data["data"]["steps"]["1"]["info_dialogs"].length > 2) {
                        gd.scene["next"] = "stage3_ideation_patricia";
                        player_data["data"]["current_step"] = 3;
                        cc.director.loadScene('ideation_1');
                    } else {
                        cc.director.loadScene('map');
                    }
                },
                event:{
                    "type" : "dialog",
                    "subtype": "dialog_finished",
                }
            });
        }

        //step5 disruptions counter increase
        /*
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 1) {
            gd.observer.addSubscription({
                listener : function(event) {
                    var disruption = {
                        "disruption_1": "entertainers", 
                        "disruption_2": "dseat", 
                        "disruption_3": "shield",
                    };

                    if(event["data"]["speaker"] !== "narrator") {
                        player_data["data"]["steps"]["5"]["disruption"].push(disruption[event["data"]["speaker"]]);
                    }
                },
                event:{
                    "type" : "dialog",
                    "subtype": "turn_finished",
                }
            });
        }*/
            
        //go to disruptions
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 0) {
            gd.observer.addSubscription({
                listener : function(event) {
                    if(player_data["data"]["steps"]["5"]["feedback"].length > 2) {
                        player_data["data"]["steps"]["5"]["scene"] = 1;
                        next_scene[gd.scene["current"]]["next_scene"] = 'workshop';
                        //cc.director.loadScene('map_disruptions');
                    } else {
                        //cc.director.loadScene('map_feedback');
                    }
                },
                event:{
                    "type" : "dialog",
                    "subtype": "dialog_finished",
                }
            });
        }
        
        //finish ideation and go to workshop
        /*if(gd.scene["current"] == "stage3_ideation_tharrenos") {
            gd.observer.addSubscription({
                listener : function(event) {
                    player_data["data"]["current_step"] = 4;
                    cc.director.loadScene('workshop');
                },
                event:{
                    "type" : "dialog",
                    "subtype": "dialog_finished",
                    "data.id": "stage3_ideation_tharrenos_0",
                },
            });
        }*/

        //activate a new carriage item after a disruption
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 1) {
            gd.observer.addSubscription({
                listener : function(event) {
                    var disruption = {
                        "disruption_1": "shield", 
                        "disruption_2": "dseat", 
                        "disruption_3": "entertainers",
                    };

                    player_data["data"]["steps"]["5"]["disruption"].push(disruption[gd.scene["current"]]);
                    carriage_data["data"]["parts"][disruption[gd.scene["current"]]]["active"] = true;
                    cc.director.loadScene('workshop');
                },
                event:{
                    "type" : "dialog",
                    "subtype": "dialog_finished",
                    "data.id": {
                        "$containsAny": [
                            "disruption_1",
                            "disruption_2",
                            "disruption_3",
                        ]},
                }
            });

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
        }


        gd.observer.addSubscription({
            listener : function(event) {
                gd.scene["current"] = "courtyard_2";

                new GameElement({
                    "type": "node",
                    "action": "dialog",
                    "emitter": "alarm",
                    "id": gd.scene["current"] + "_" + (id_count++).toString(10),
                    "element_id" : "/Canvas/background/" + gd.scene["current"],
                    "language" : "en",
                    "resources": {
                        "node" : {
                            "speakers" : "/Canvas/background/",
                            "dialog" : "/Canvas/background/dialog",
                        },
                        "dialog_list" : cutscene_dialogs[gd.scene["current"]],
                    },
                    "current_dialog" : null,
                    "last_char_displayed" : 0,
                    "listen" : {
                        "type" : "keyinput",
                        /*"data.key" : "d",*/
                    },
                });
            },
            "event": {
                "type" : "anim",
                "data.event": "cutscene_4_2",
            }
        });

        var animation_start = ["workshop_messenger", "palace", "courtyard", "ending", "cutscene_1", "cutscene_2", "cutscene_4_1", "cutscene_4_2", "ending"];
        //autoplay after animation
        gd.observer.addSubscription({
            listener : function(event) {
                gd.observer.addEvent({
                    "type": "keyinput",
                    "data": {
                        "key": "d",
                    },
                });
            },
            "event": {
                "type" : "anim",
                "data.event": {"$containsAny": animation_start},
            }
        });

        //execute dialog for non animated stages
        if(animation_start.indexOf(gd.scene["current"]) === -1) {
            gd.observer.addEvent({
                "type": "keyinput",
                "data": {
                    "key": "d",
                },
            });
        }

        var cutscene_dialogs = {
            "workshop_messenger": {
                "d1" : {
                    "text_id" : "stage1_scene1_messenger_d1",
                    "speaker" : "Messenger_horse",
                    "data": {"name": player_data["data"]["name"]},
                },
                "d2" : {
                    "text_id" : "stage1_scene1_player_d1",
                    "speaker" : "main_character",
                },
                "d3" : {
                    "text_id" : "stage1_scene1_messenger_d2",
                    "speaker" : "Messenger_horse",
                },
                "d4" : {
                    "text_id" : "stage1_scene1_player_d2",
                    "speaker" : "main_character",
                },
                "d5" : {
                    "text_id" : "stage1_scene1_messenger_d3",
                    "speaker" : "Messenger_horse",
                },
            },
            "palace": {
                "d1" : {
                    "text_id" : "stage1_scene2_king_d1",
                    "speaker" : "king",
                },
                "d2" : {
                    "text_id" : "stage1_scene2_queen_d1",
                    "speaker" : "queen",
                },
                "d3" : {
                    "text_id" : "stage1_scene2_king_d2",
                    "speaker" : "king",
                },
                "d4" : {
                    "text_id" : "stage1_scene2_player_d1",
                    "speaker" : "main_character",
                },
                "d5" : {
                    "text_id" : "stage1_scene2_king_d3",
                    "speaker" : "king",
                },            
            },
            "courtyard": {
                "d1" : {
                    "text_id" : "stage1_scene2_player_d2",
                    "speaker" : "main_character",
                },
                "d2" : {
                    "text_id" : "stage1_scene3_narrator_d1",
                    "speaker" : "narrator",
                },/*
                "d3" : {
                    "text_id" : "stage1_scene3_kings_captain_d1",
                    "speaker" : "Captain",
                },
                "d4" : {
                    "text_id" : "stage1_scene3_kings_player_d1",
                    "speaker" : "main_character",
                },*/
            },

            "courtyard_2": {
/*                "d1" : {
                    "text_id" : "stage1_scene2_player_d2",
                    "speaker" : "main_character",
                },
                "d2" : {
                    "text_id" : "stage1_scene3_narrator_d1",
                    "speaker" : "narrator",
                },*/
                "d3" : {
                    "text_id" : "stage1_scene3_kings_captain_d1",
                    "speaker" : "Captain",
                },
                "d4" : {
                    "text_id" : "stage1_scene3_kings_player_d1",
                    "speaker" : "main_character",
                },
            },

            "stage1_scene4_captain": {
                "d1" : {
                    "text_id" : "stage1_scene4_captain_d1",
                    "speaker" : "Captain",
                },
            },

            "stage1_scene4_coachman_male": {
                "d1" : {
                    "text_id" : "stage1_scene4_coachman_male_d1",
                    "speaker" : "Driver",
                },
            },

            "stage1_scene4_tailor_female": {
                "d1" : {
                    "text_id" : "stage1_scene4_tailor_female_d1",
                    "speaker" : "Tailor",
                },
            },

            "stage1_scene4_butler_male": {
                "d1" : {
                    "text_id" : "stage1_scene4_butler_male_d1",
                    "speaker" : "butler",
                },
            },

            "stage1_scene4_stable_boy": {
                "d1" : {
                    "text_id" : "stage1_scene4_stable_boy_d1",
                    "speaker" : "the_stable_boy",
                },
            },

            "stage1_scene4_doctor_male": {
                "d1" : {
                    "text_id" : "stage1_scene4_doctor_male_d1",
                    "speaker" : "Doctor",
                },
            },

            "stage1_scene4_chef_female": {
                "d1" : {
                    "text_id" : "stage1_scene4_chef_female_d1",
                    "speaker" : "Chef",
                },
            },

            "stage1_scene4_civil_engineer_female": {
                "d1" : {
                    "text_id" : "stage1_scene4_civil_engineer_female_d1",
                    "speaker" : "civil_engineer",
                },
            },

            "stage1_scene4_merchant_male": {
                "d1" : {
                    "text_id" : "stage1_scene4_merchant_male_d1",
                    "speaker" : "Merchant",
                },
            },

            "stage1_scene4_old_lady_female": {
                "d1" : {
                    "text_id" : "stage1_scene4_old_lady_female_d1",
                    "speaker" : "old_lady",
                },
            },

            "stage1_scene4_librarian_female": {
                "d1" : {
                    "text_id" : "stage1_scene4_librarian_female_d1",
                    "speaker" : "Librarian",
                },
            },

            "stage1_scene4_butcher_male": {
                "d1" : {
                    "text_id" : "stage1_scene4_librarian_female_d1",
                    "speaker" : "the_grumpy_butcher",
                },
            },

            "stage1_scene4_potter_female": {
                "d1" : {
                    "text_id" : "stage1_scene4_potter_female_d1",
                    "speaker" : "potter",
                },
            },

            "stage1_scene4_vagabond_male": {
                "d1" : {
                    "text_id" : "stage1_scene4_vagabond_male_d1",
                    "speaker" : "vagabond",
                },
            },

            "stage1_scene4_huntress_female": {
                "d1" : {
                    "text_id" : "stage1_scene4_huntress_female_d1",
                    "speaker" : "Huntress",
                },
            },

            "stage3_ideation_patricia": {
                "d1" : {
                    "text_id" : "stage3_ideation_patricia",
                    "speaker" : "narrator",
                },
            },

            "stage3_ideation_mihaela": {
                "d1" : {
                    "text_id" : "stage3_ideation_mihaela",
                    "speaker" : "narrator",
                },
            },

            "stage3_ideation_pablo": {
                "d1" : {
                    "text_id" : "stage3_ideation_pablo",
                    "speaker" : "narrator",
                },
            },

            "stage3_ideation_ana": {
                "d1" : {
                    "text_id" : "stage3_ideation_ana",
                    "speaker" : "narrator",
                },
            },

            "stage3_ideation_tharrenos": {
                "d1" : {
                    "text_id" : "stage3_ideation_tharrenos",
                    "speaker" : "narrator",
                },
            },

            "stage5_feedback_captain": {
                "d1" : {
                    "text_id" : "stage5_feedback_captain",
                    "speaker" : "Captain",
                },
            },

            "stage5_feedback_coachman": {
                "d1" : {
                    "text_id" : "stage5_feedback_coachman",
                    "speaker" : "Driver",
                },
            },

            "stage5_feedback_oldlady": {
                "d1" : {
                    "text_id" : "stage5_feedback_oldlady",
                    "speaker" : "old_lady",
                },
                "d2" : {
                    "text_id" : "stage5_feedback_narrator",
                    "speaker" : "narrator",
                },
            },

            "disruption_1": {
                "d1" : {
                    "text_id" : "stage5_disruption1_narrator_d2",
                    "speaker" : "narrator",
                },
            },

            "disruption_2": {
                "d1" : {
                    "text_id" : "stage5_disruption1_narrator_d2",
                    "speaker" : "narrator",
                },
            },

            "disruption_3": {
                "d1" : {
                    "text_id" : "stage5_disruption1_narrator_d2",
                    "speaker" : "narrator",
                },
            },

            "ending": {
                "d1" : {
                    "text_id" : "stage6_ending_queen",
                    "speaker" : "queen",
                },
                "d2" : {
                    "text_id" : "stage6_ending_king",
                    "speaker" : "king",
                },
            },

        }

        var next_scene = {
            "workshop_messenger": {
                "next_scene": "cutscene_2",
                "next_dialog": "palace",
            },
            "palace": {
                "next_scene": "cutscene_4",
                "next_dialog": "courtyard",
            },
            "courtyard_2": {
                "next_scene": "map",
            },

            "stage1_scene4_captain": {
                "next_scene": "map",
            },

            "stage1_scene4_coachman_male": {
                "next_scene": "map",
            },

            "stage1_scene4_tailor_female": {
                "next_scene": "map",
            },

            "stage1_scene4_butler_male": {
                "next_scene": "map",
            },

            "stage1_scene4_stable_boy": {
                "next_scene": "map",
            },

            "stage1_scene4_doctor_male": {
                "next_scene": "map",
            },

            "stage1_scene4_chef_female": {
                "next_scene": "map",
            },

            "stage1_scene4_civil_engineer_female": {
                "next_scene": "map",
            },

            "stage1_scene4_merchant_male": {
                "next_scene": "map",
            },

            "stage1_scene4_old_lady_female": {
                "next_scene": "map",
            },

            "stage1_scene4_librarian_female": {
                "next_scene": "map",
            },

            "stage1_scene4_butcher_male": {
                "next_scene": "map",
            },

            "stage1_scene4_potter_female": {
                "next_scene": "map",
            },

            "stage1_scene4_vagabond_male": {
                "next_scene": "map",
            },

            "stage1_scene4_huntress_female": {
                "next_scene": "map",
            },

            "stage3_ideation_patricia": {

                    "next_scene": "ideation_2",
                    "next_dialog": "stage3_ideation_mihaela",

            },

            "stage3_ideation_mihaela": {

                    "next_scene": "ideation_3",
                    "next_dialog": "stage3_ideation_pablo",

            },

            "stage3_ideation_pablo": {

                    "next_scene": "ideation_4",
                    "next_dialog": "stage3_ideation_ana",

            },

            "stage3_ideation_ana": {

                    "next_scene": "ideation_5",
                    "next_dialog": "stage3_ideation_tharrenos",

            },

/*            "stage3_ideation_tharrenos": {
                    "next_scene": "map",
            },*/

            "stage5_feedback_captain": {
                "next_scene": "map_feedback",
            },

            "stage5_feedback_coachman": {
                "next_scene": "map_feedback",
            },

            "stage5_feedback_oldlady": {
                "next_scene": "map_feedback",
            },

            "disruption_1": {
                "next_scene": "workshop",
            },

            "disruption_2": {
                "next_scene": "workshop",
            },

            "disruption_3": {
                "next_scene": "workshop",
            },

        }

        var dialog_status: Object = {
            "type": "node",
            "action": "dialog",
            "emitter": "alarm",
            "id": gd.scene["current"] + "_" + (id_count++).toString(10),
            "element_id" : "/Canvas/background/" + gd.scene["current"],
            "language" : "en",
            "resources": {
                "node" : {
                    "speakers" : "/Canvas/background/",
                    "dialog" : "/Canvas/background/dialog",
                },
                "dialog_list" : cutscene_dialogs[gd.scene["current"]],
            },
            "current_dialog" : null,
            "last_char_displayed" : 0,
        };

        dialog_status = gd.directory.addStatus(dialog_status);

        var dialogelement: any = new GameElement(dialog_status, cc.find('/Canvas/background1/queen'));

        gd.directory.addElement(dialogelement);

        for(let item in cutscene_dialogs[gd.scene["current"]]) {
            if(cutscene_dialogs[gd.scene["current"]][item]["speaker"] != "narrator") {
                cc.find("/Canvas/background/" + cutscene_dialogs[gd.scene["current"]][item]["speaker"]).active = true;
            }
        }

        var dialogListener: Object = {
            listener : dialogelement.getId(),
            event : {
                    type : "keyinput",
                    /*"data.key": "d",*/
            }
        };
        gd.observer.addSubscription(dialogListener);

        console.log("listener added");

        
        var finishScene: Object = {
            listener : function() {
                if(!next_scene[gd.scene["current"]]) {
                    return;
                }

                if(next_scene[gd.scene["current"]]["next_dialog"]) {
                    gd.scene["next"] = next_scene[gd.scene["current"]]["next_dialog"];
                }
                cc.director.loadScene(next_scene[gd.scene["current"]]["next_scene"]);
            },
            event:{
                "type": "dialog",
                "subtype": "dialog_finished",
            }
        };
        gd.observer.addSubscription(finishScene);

        /*
        gd.observer.addSubscription({
            listener : function() {
                cc.director.loadScene('workshop');
            },
            event:{
                type : "keyinput",
                "data.key": "w",
            }
        });
        */
    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
