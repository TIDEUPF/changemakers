const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {Utils} from "../core/Utils";
import {Badge} from "../core/Badge";
import {Sound} from "../core/Sound";
import {Scene} from "../core/Scene";
//import {characters_information} from "../steps/empathise/npc";
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
        Sound.stopAll();

        gd.frame["dt"] = 0;

        var id_count=0;

        Utils.setFont();

        var bgm_scene_sound = {
                "sound_list": [
                    {
                        "audio_id": "introduction",
                        "events": [
                            {
                                "type": "scene_start",
                                "scene": {
                                    "$containsAny": [
                                        "palace",
                                        "indicators",
                                        "disruption_3",
                                    ]},
                            },
                        ],
                    },

                    {
                        "audio_id": "1.2_Horse_carriage",
                        "events": [
                            {
                                "type": "scene_start",
                                "scene": {
                                    "$containsAny": [
                                        "workshop_messenger",
                                        "workshop",
                                    ]},
                            },
                        ],
                    },

                    {
                        "audio_id": "1.3_White_noise_(town_sounds)",
                        "events": [
                            {
                                "type": "scene_start",
                                "scene": {
                                    "$containsAny": [
                                        "workshop_messenger",
                                        "workshop",
                                    ]},
                            },
                        ],
                    },

                    {
                        "audio_id": "1.1_Workshop_wood_carving",
                        "events": [
                            {
                                "type": "scene_start",
                                "scene": {
                                    "$containsAny": [
                                        "workshop_messenger",
                                        "workshop",
                                    ]},
                            },
                        ],
                    },

                    {
                        "audio_id": "4.1 Medieval market",
                        "events": [
                            {
                                "type": "scene_start",
                                "scene": {
                                    "$containsAny": [
                                        "cutscene_5",
                                        "courtyard",
                                    ]},
                            },
                        ],
                    },
                    {
                        "audio_id": "4.4 Gravel walking",
                        "events": [
                            {
                                "type": "scene_start",
                                "scene": {
                                    "$containsAny": [
                                        "cutscene_5",
                                        "courtyard",
                                        "ideation_1",
                                        "ideation_2",
                                        "ideation_3",
                                        "ideation_4",
                                        "ideation_5",
                                    ]},
                            },
                        ],
                    },

                    {
                        "audio_id": "4.3 Horse Walking",
                        "events": [
                            {
                                "type": "scene_start",
                                "scene": {
                                    "$containsAny": [
                                        "cutscene_5",
                                        "courtyard",
                                    ]},
                            },
                        ],
                    },


                ],
            };

        Sound.sceneBGM(bgm_scene_sound);

        var fx_scene_sound = {
                "sound_list": [{
                    "audio_id": "B.1 New badge",
                    "events": [
                        /*{
                            "type": "scene_start",
                        },*/
                    ],
                },
            ],
        };

        Sound.sceneFX(fx_scene_sound);

        gd.observer.addEvent({
            "type": "scene_start",
            "scene": gd.scene["current"],
            //"step": player_data["data"]["current_step"],
        });

        const characters_information:Object = {
            "Captain":"high",
            "Driver":"high",
            "Tailor":"high",
            "butler":"high",
            "the_stable_boy":"high",
            "Doctor":"informative",
            "Chef":"informative",
            "civil_engineer":"informative",
            "Merchant":"informative",
            "old_lady":"informative",
            "Librarian":"informative",
            "the_grumpy_butcher":"futile",
            "potter":"futile",
            "vagabond":"futile",
            "Huntress":"futile",
        }

        const characters_feedback:Object = {
            "Captain":"feedback",
            "Driver":"feedback",
            "old_lady":"feedback",
            "Tailor":"noninformative",
            "butler":"noninformative",
            "the_stable_boy":"noninformative",
            "Doctor":"noninformative",
            "Chef":"noninformative",
            "civil_engineer":"noninformative",
            "Merchant":"noninformative",
            "Librarian":"noninformative",
            "the_grumpy_butcher":"noninformative",
            "potter":"noninformative",
            "vagabond":"noninformative",
            "Huntress":"noninformative",
        }

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
                "data.text_id": "S1S3_1",
            }
        });

        var player_data = gd.directory.searchId('player');
        var carriage_data = gd.directory.searchId('user_built_carriage');

        //stage4 pre start
        if(gd.scene["current"] == "courtyard") {
            gd.observer.addSubscription({
                listener : function(event) {
                    //Badge.add({"badge_id": "critical_thinker_g"});
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
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 1) {
            gd.observer.addSubscription({
                listener : function(event) {
                    if(event["data"]["speaker"] != "narrator") {
                        player_data["data"]["steps"]["5"][characters_feedback[event["data"]["speaker"]]].push(event["data"]["speaker"]);
                    }
                },
                event:{
                    "type" : "dialog",
                    "subtype": "turn_finished",
                }
            });
        }
       
        //go to ideation
        /*
        if(player_data["data"]["current_step"] == 1 && player_data["data"]["steps"]["1"]["stage"] == 4) {
            gd.observer.addSubscription({
                listener : function(event) {
                    if(player_data["data"]["steps"]["1"]["info_dialogs"].length > 2) {
                        gd.scene["next"] = "S3S1_2";
                        player_data["data"]["current_step"] = 3;
                        Scene.load('ideation_1');
                    } else {
                        Scene.load('map');
                    }
                },
                event:{
                    "type" : "dialog",
                    "subtype": "dialog_finished",
                }
            });
        }*/

        //step5 disruptions counter increase      
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 2) {
            gd.observer.addSubscription({
                listener: function(event) {
                    var disruption = {
                        "disruption_1": "entertainers", 
                        "disruption_2": "dseat", 
                        "disruption_3": "shield",
                    };

                    if(event["data"]["speaker"] !== "narrator") {
                        player_data["data"]["steps"]["5"]["disruption"].push(disruption[event["data"]["speaker"]]);
                    }
                },
                event: {
                    "type" : "dialog",
                    "subtype": "turn_finished",
                }
            });
        }
            
        //go to disruptions
        /*
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 0) {
            gd.observer.addSubscription({
                listener : function(event) {
                    if(player_data["data"]["steps"]["5"]["feedback"].length > 2) {
                        player_data["data"]["steps"]["5"]["stage"] = 1;
                        //next_scene[gd.scene["current"]]["next_scene"] = 'workshop';
                        //Scene.load('map_disruptions');
                    } else {
                        //Scene.load('map_feedback');
                    }
                },
                event:{
                    "type" : "dialog",
                    "subtype": "dialog_finished",
                }
            });
        }*/
        
        //finish ideation and go to workshop
        if(gd.scene["current"] == "S3S1_6") {
            gd.observer.addSubscription({
                listener : function(event) {
                    Badge.add({"badge_id": "creative_mind_g"});
                },
                event:{
                    "type" : "dialog",
                    "subtype": "dialog_finished",
                    "data.id": "S3S1_6_0",
                },
            });

            gd.observer.addSubscription({
                listener : function(event) {
                    player_data["data"]["current_step"] = 4;
                    Scene.load('workshop');
                },
                event:{
                    type: "bagdes",
                    subtype: "close",
                }
            });
        }

        //show the configured carriage to receive feedback
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 1) {
            //display the carriage
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
                "first_load": true,
            });
        }
        
        //activate a new carriage item after a disruption
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] == 2) {
            gd.observer.addSubscription({
                listener : function(event) {
                    var disruption = {
                        "disruption_1": "shield", 
                        "disruption_2": "dseat", 
                        "disruption_3": "entertainers",
                    };

                    player_data["data"]["steps"]["5"]["disruption"].push(disruption[gd.scene["current"]]);
                    carriage_data["data"]["parts"][disruption[gd.scene["current"]]]["active"] = true;
                    Scene.load('workshop');
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

            //display the carriage
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
                "first_load": true,
            });
        }

        //activate a new carriage item after a disruption
        if(player_data["data"]["current_step"] == 6 && player_data["data"]["steps"]["6"]["stage"] == 1) {
            //display only the original carriage
            
            for(var part of player_data["data"]["steps"]["5"]["disruption"]) {
                carriage_data["data"]["parts"][part]["active"] = false;
            }

            //display the carriage
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
                "first_load": true,
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
                            "speakers" : "/Canvas/background",
                            "dialog" : "/dialog_widget/dialog",
                        },
                        "dialog_list" : cutscene_dialogs[gd.scene["current"]],
                        "scene" : gd.scene["current"],
                    },
                    "current_dialog" : null,
                    "last_char_displayed" : 0,
                    "listen" : {
                        "type" : {
                            "$containsAny": [
                                "keyinput",
                                "voice",
                                "dialog",
                            ]},
                    },
                });
            },
            "event": {
                "type" : "anim",
                "data.event": "cutscene_4_2",
            }
        });

        var animation_start = ["workshop_messenger", "palace", "courtyard", "cutscene_1", "cutscene_2", "cutscene_4_1", "cutscene_4_2"];
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
                    "text_id" : "S1S1_1",
                    "speaker" : "Messenger_horse",
                    "data": {"name": player_data["data"]["name"]},
                },
                "d2" : {
                    "text_id" : "S1S1_2",
                    "speaker" : "main_character",
                },
                "d3" : {
                    "text_id" : "S1S1_3",
                    "speaker" : "Messenger_horse",
                },
                "d4" : {
                    "text_id" : "S1S1_4",
                    "speaker" : "main_character",
                },
                "d5" : {
                    "text_id" : "S1S1_5",
                    "speaker" : "Messenger_horse",
                },
            },
            "palace": {
                "d1" : {
                    "text_id" : "S1S2_1",
                    "speaker" : "king",
                },
                "d2" : {
                    "text_id" : "S1S2_2",
                    "speaker" : "queen",
                },
                "d3" : {
                    "text_id" : "S1S2_3",
                    "speaker" : "king",
                },
                "d4" : {
                    "text_id" : "S1S2_4",
                    "speaker" : "main_character",
                },
                "d5" : {
                    "text_id" : "S1S2_5",
                    "speaker" : "king",
                },            
            },
            "courtyard": {
                "d1" : {
                    "text_id" : "S1S2_6",
                    "speaker" : "main_character",
                },
                "d2" : {
                    "text_id" : "S1S3_1",
                    "speaker" : "narrator",
                },/*
                "d3" : {
                    "text_id" : "S1S3_2",
                    "speaker" : "Captain",
                },
                "d4" : {
                    "text_id" : "S1S3_3",
                    "speaker" : "main_character",
                },*/
            },

            "courtyard_2": {
/*                "d1" : {
                    "text_id" : "S1S2_6",
                    "speaker" : "main_character",
                },
                "d2" : {
                    "text_id" : "S1S3_1",
                    "speaker" : "narrator",
                },*/
                "d3" : {
                    "text_id" : "S1S3_2",
                    "speaker" : "Captain",
                },
                "d4" : {
                    "text_id" : "S1S3_3",
                    "speaker" : "main_character",
                },
            },

            "stage1_scene4_captain": {
                "d1" : {
                    "text_id" : "S1S3_4",
                    "speaker" : "Captain",
                },
            },

            "stage1_scene4_coachman_male": {
                "d1" : {
                    "text_id" : "S1S4_1",
                    "speaker" : "Driver",
                },
            },

            "stage1_scene4_tailor_female": {
                "d1" : {
                    "text_id" : "S1S4_2",
                    "speaker" : "Tailor",
                },
            },

            "stage1_scene4_butler_male": {
                "d1" : {
                    "text_id" : "S1S4_3",
                    "speaker" : "butler",
                },
            },

            "stage1_scene4_stable_boy": {
                "d1" : {
                    "text_id" : "S1S4_4",
                    "speaker" : "the_stable_boy",
                },
            },

            "stage1_scene4_doctor_male": {
                "d1" : {
                    "text_id" : "S1S4_5",
                    "speaker" : "Doctor",
                },
            },

            "stage1_scene4_chef_female": {
                "d1" : {
                    "text_id" : "S1S4_6",
                    "speaker" : "Chef",
                },
            },

            "stage1_scene4_civil_engineer_female": {
                "d1" : {
                    "text_id" : "S1S4_7",
                    "speaker" : "civil_engineer",
                },
            },

            "stage1_scene4_merchant_male": {
                "d1" : {
                    "text_id" : "S1S4_8",
                    "speaker" : "Merchant",
                },
            },

            "stage1_scene4_old_lady_female": {
                "d1" : {
                    "text_id" : "S1S4_9",
                    "speaker" : "old_lady",
                },
            },

            "stage1_scene4_librarian_female": {
                "d1" : {
                    "text_id" : "S1S4_10",
                    "speaker" : "Librarian",
                },
            },

            "stage1_scene4_butcher_male": {
                "d1" : {
                    "text_id" : "S1S4_11",
                    "speaker" : "the_grumpy_butcher",
                },
            },

            "stage1_scene4_potter_female": {
                "d1" : {
                    "text_id" : "S1S4_12",
                    "speaker" : "potter",
                },
            },

            "stage1_scene4_vagabond_male": {
                "d1" : {
                    "text_id" : "S1S4_13",
                    "speaker" : "vagabond",
                },
            },

            "stage1_scene4_huntress_female": {
                "d1" : {
                    "text_id" : "S1S4_14",
                    "speaker" : "Huntress",
                },
            },

            "S3S1_2": {
                "d1" : {
                    "text_id" : "S3S1_2",
                    "speaker" : "narrator",
                },
            },

            "S3S1_3": {
                "d1" : {
                    "text_id" : "S3S1_3",
                    "speaker" : "narrator",
                },
            },

            "S3S1_4": {
                "d1" : {
                    "text_id" : "S3S1_4",
                    "speaker" : "narrator",
                },
            },

            "S3S1_5": {
                "d1" : {
                    "text_id" : "S3S1_5",
                    "speaker" : "narrator",
                },
            },

            "S3S1_6": {
                "d1" : {
                    "text_id" : "S3S1_6",
                    "speaker" : "narrator",
                },
            },

            "S5S1_1": {
                "d1" : {
                    "text_id" : "S5S1_1",
                    "speaker" : "Captain",
                },
            },

            "S5S1_2": {
                "d1" : {
                    "text_id" : "S5S1_2",
                    "speaker" : "Driver",
                },
            },

            "S5S1_3": {
                "d1" : {
                    "text_id" : "S5S1_3",
                    "speaker" : "old_lady",
                },
            },

            "stage5_noninformative_Chef": {
                "d1" : {
                    "text_id" : "S5S1_4",
                    "speaker" : "Chef",
                },
            },

            "stage5_noninformative_Doctor": {
                "d1" : {
                    "text_id" : "S5S1_5",
                    "speaker" : "Doctor",
                },
            },

            "stage5_noninformative_Huntress": {
                "d1" : {
                    "text_id" : "S5S1_6",
                    "speaker" : "Huntress",
                },
            },

            "stage5_noninformative_Librarian": {
                "d1" : {
                    "text_id" : "S5S1_4",
                    "speaker" : "Librarian",
                },
            },

            "stage5_noninformative_Merchant": {
                "d1" : {
                    "text_id" : "S5S1_5",
                    "speaker" : "Merchant",
                },
            },

            "stage5_noninformative_butler": {
                "d1" : {
                    "text_id" : "S5S1_6",
                    "speaker" : "butler",
                },
            },

            "stage5_noninformative_civil_engineer": {
                "d1" : {
                    "text_id" : "S5S1_4",
                    "speaker" : "civil_engineer",
                },
            },

            "stage5_noninformative_potter": {
                "d1" : {
                    "text_id" : "S5S1_5",
                    "speaker" : "potter",
                },
            },

            "stage5_noninformative_the_grumpy_butcher": {
                "d1" : {
                    "text_id" : "S5S1_6",
                    "speaker" : "the_grumpy_butcher",
                },
            },

            "stage5_noninformative_the_stable_boy": {
                "d1" : {
                    "text_id" : "S5S1_4",
                    "speaker" : "the_stable_boy",
                },
            },

            "stage5_noninformative_vagabond": {
                "d1" : {
                    "text_id" : "S5S1_5",
                    "speaker" : "vagabond",
                },
            },

            "stage5_noninformative_Tailor": {
                "d1" : {
                    "text_id" : "S5S1_6",
                    "speaker" : "Tailor",
                },
            },


            "disruption_1": {
                "d0" : {
                    "text_id" : "S5S2_4A",
                    "speaker" : "narrator",
                },
                "d1" : {
                    "text_id" : "S5S2B",
                    "speaker" : "narrator",
                },
            },

            "disruption_2": {
                "d0" : {
                    "text_id" : "S5S2_3A",
                    "speaker" : "narrator",
                },
                "d1" : {
                    "text_id" : "S5S2B",
                    "speaker" : "narrator",
                },
            },

            "disruption_3": {
                "d0" : {
                    "text_id" : "S5S2_2A",
                    "speaker" : "narrator",
                },
                "d1" : {
                    "text_id" : "S5S2B",
                    "speaker" : "narrator",
                },
            },

            "ending": {
                "d1" : {
                    "text_id" : "S6S1_1",
                    "speaker" : "narrator",
                },
                "d2" : {
                    "text_id" : "S6S1_2",
                    "speaker" : "queen",
                },
                "d4" : {
                    "text_id" : "S6A1",
                    "speaker" : "main_character",
                },
                "d5" : {
                    "text_id" : "S6A2",
                    "speaker" : "queen",
                },
                "d6" : {
                    "text_id" : "S6A3",
                    "speaker" : "main_character",
                },
            },
            "ending_courtyard": {
                "d1" : {
                    "text_id" : "S6S3_1",
                    "speaker" : "messenger",
                },
            },

            "stage6_scene1": {
                "d1" : {
                    "text_id" : "stage6_ending_queen",
                    "speaker" : "queen",
                },
                "d2" : {
                    "text_id" : "stage6_ending_king",
                    "speaker" : "king",
                },
                "d3": {
                    "text_id" : "stage6_main_character_suggestion",
                    "speaker" : "main_character",
                }
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

            "S3S1_2": {

                    "next_scene": "ideation_2",
                    "next_dialog": "S3S1_3",

            },

            "S3S1_3": {

                    "next_scene": "ideation_3",
                    "next_dialog": "S3S1_4",

            },

            "S3S1_4": {

                    "next_scene": "ideation_4",
                    "next_dialog": "S3S1_5",

            },

            "S3S1_5": {

                    "next_scene": "ideation_5",
                    "next_dialog": "S3S1_6",

            },

/*            "S3S1_6": {
                    "next_scene": "map",
            },*/

            "S5S1_1": {
                "next_scene": "map_feedback",
            },

            "S5S1_2": {
                "next_scene": "map_feedback",
            },

            "S5S1_3": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_Chef": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_Doctor": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_Huntress": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_Librarian": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_Merchant": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_butler": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_civil_engineer": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_potter": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_the_grumpy_butcher": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_the_stable_boy": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_vagabond": {
                "next_scene": "map_feedback",
            },

            "stage5_noninformative_Tailor": {
                "next_scene": "map_feedback",
            },

            /*
            "disruption_1": {
                "next_scene": "map_disruption",
            },

            "disruption_2": {
                "next_scene": "map_disruption",
            },

            "disruption_3": {
                "next_scene": "map_disruption",
            },
            */

            "ending": {
                "next_scene": "cutscene_8",
                "next_dialog": "ending_courtyard",
            },

        }

        var dialog_status: Object = {
            "type": "node",
            "action": "dialog",
            "emitter": "alarm",
            "update": "replace",
            "id": gd.scene["current"] + "_" + (id_count++).toString(10),
            "element_id" : "/Canvas/background/" + gd.scene["current"],
            "language" : "en",
            "resources": {
                "node" : {
                    "speakers" : "/Canvas/background",
                    "dialog" : "/dialog_widget/dialog",
                },
                "dialog_list" : cutscene_dialogs[gd.scene["current"]],
                "scene" : gd.scene["current"],
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
                    type : {
                        "$containsAny": [
                            "keyinput",
                            "voice",
                            "dialog",
                        ]},
            }
        };
        gd.observer.addSubscription(dialogListener);

        var finishScene: Object = {
            listener : function(event) {
                var finished_scene = event["data"]["scene"];
                if(!next_scene[finished_scene]) {
                    return;
                }

                if(next_scene[gd.scene["current"]]["next_dialog"]) {
                    gd.scene["next"] = next_scene[gd.scene["current"]]["next_dialog"];
                }
                Scene.load(next_scene[gd.scene["current"]]["next_scene"]);
            },
            event:{
                "type": "dialog",
                "subtype": "dialog_finished",
            }
        };
        gd.observer.addSubscription(finishScene);



        //step 6 dynamic dialog
        if(player_data["data"]["current_step"] == 6 && player_data["data"]["steps"]["6"]["stage"] == 1) {
            let last_text_id = "stage6_main_character_suggestion";

            //
            carriage_data["data"]["parts"]["dseat"]["hidden"] = false;

            //disable active disruption parts and update the screen
            for(let part_item of player_data["data"]["steps"]["5"]["disruption"]) {
                carriage_data["data"]["parts"][part_item]["active"] = false;
            }
            gd.observer.addEvent({
                "type": "carriage",
                "subtype": "update",
                "first_load": true,
            });

            if(player_data["data"]["steps"]["5"]["disruption"].length == 2) {
                var ending_disruptions_queen = [
                    player_data["data"]["steps"]["5"]["disruption"][0],
                ];

                var ending_disruptions_king = [
                    player_data["data"]["steps"]["5"]["disruption"][1],
                ];
            } else {
                var ending_disruptions_queen = [
                    player_data["data"]["steps"]["5"]["disruption"][0],
                    player_data["data"]["steps"]["5"]["disruption"][1],
                ];

                var ending_disruptions_king = [
                    player_data["data"]["steps"]["5"]["disruption"][2],
                ];
            }


            //display only the original carriage
            var stage6_parts_dialogues = {
                "stage6_scene1_dseat": "S6A5",
                "stage6_scene1_shield": "S6A7",
                "stage6_scene1_entertainers": "S6A4",            
            };

            for(let part_item of ending_disruptions_queen) {
                cutscene_dialogs["ending"][part_item] = {
                    "text_id": stage6_parts_dialogues["stage6_scene1_"+part_item],
                    "speaker": "main_character",
                }

                gd.observer.addSubscription({
                    listener : function(event) {
                        carriage_data["data"]["parts"][part_item]["active"] = true;
                        gd.observer.addEvent({
                            "type": "carriage",
                            "subtype": "update",
                            "first_load": true,
                        });
                    },
                    event:{
                        "type" : "dialog",
                        "subtype": "turn_finished",
                        "data.text_id": stage6_parts_dialogues["stage6_scene1_"+part_item],
                    },
                });

                last_text_id = stage6_parts_dialogues["stage6_scene1_"+part_item];
            }

            cutscene_dialogs["ending"]["d7"] = {
                "text_id": "S6A6",
                "speaker": "king",
            }
        
            for(let part_item of ending_disruptions_king) {
                cutscene_dialogs["ending"][part_item] = {
                    "text_id": stage6_parts_dialogues["stage6_scene1_"+part_item],
                    "speaker": "main_character",
                }

                gd.observer.addSubscription({
                    listener : function(event) {
                        carriage_data["data"]["parts"][part_item]["active"] = true;
                        gd.observer.addEvent({
                            "type": "carriage",
                            "subtype": "update",
                            "first_load": true,
                        });
                    },
                    event:{
                        "type" : "dialog",
                        "subtype": "turn_finished",
                        "data.text_id": stage6_parts_dialogues["stage6_scene1_"+part_item],
                    },
                });

                last_text_id = stage6_parts_dialogues["stage6_scene1_"+part_item];
            }

            cutscene_dialogs["ending"]["d8"] = {
                "text_id": "S6S1_3",
                "speaker": "king",
            }
        }


        /*
        gd.observer.addSubscription({
            listener : function() {
                Scene.load('workshop');
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
