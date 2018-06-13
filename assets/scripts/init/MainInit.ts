const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {Notebook} from "../core/Notebook";
import {Utils} from "../core/Utils";
import {ActivityLog} from "../core/ActivityLog";
import {check_carriage} from "../steps/prototype/carriage";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

enum GameEventType {
    Input = 1,
};

enum GameInputEventType {
    Key = 1,
};

const asset_preload_path = "res/raw-assets/";

const asset_preload = [
    "sprites/ui/transparency.png",
    "sprites/dialog/messagebox_alpha.png",
    "sprites/symbols/energy.png",
    "sprites/characters/vagabond.png",
    "sprites/characters/the_stable_boy.png",
    "sprites/characters/the_grumpy_butcher.png",
    "sprites/characters/soldier.png",
    "sprites/characters/queen.png",
    "sprites/characters/potter.png",
    "sprites/characters/main_character_2.png",
    "sprites/characters/old_lady.png",
    "sprites/characters/main_character_1.png",
    "sprites/characters/king.png",
    "sprites/characters/kingandqueen_1.png",
    "sprites/characters/civil_engineer.png",
    "sprites/characters/butler.png",
    "sprites/characters/Librarian.png",
    "sprites/characters/Messenger.png",
    "sprites/characters/Huntress.png",
    "sprites/characters/Merchant.png",
    "sprites/characters/Driver.png",
    "sprites/characters/Doctor.png",
    "sprites/characters/Chef.png",
    "sprites/characters/Captain.png",
    "sprites/characters/Tailor.png",
    "sprites/characters/extra_people_09.png",
    "sprites/characters/extra_people_11.png",
    "sprites/characters/extra_people_back_01.png",
    "sprites/characters/extra_people_back_07.png",
    "sprites/characters/lord_christophe.png",
    "sprites/symbols/likeness.png",
    "sprites/symbols/ruler.png",
    "sprites/symbols/strongness.png",
    "sprites/symbols/luxury.png",
    "sprites/notebook/notebook_bg.jpg",
    "sprites/notebook/notebook_mini.png",
    "sprites/backgrounds/palace.png",
    "sprites/dialog/callout.png",
    "sprites/dialog/callout_arrow.png",
    "sprites/characters/Messenger_horse.png",
    "csprites/backgrounds/CM_Workplace.jpg",
    "csprites/backgrounds/courtyard/background.jpg",
    "csprites/backgrounds/courtyard/left_flowers.png",
    "csprites/backgrounds/courtyard/right_flowers.png",
    "csprites/backgrounds/cmmapalowcost-01.jpg",
    "csprites/backgrounds/citadel.png",
    "csprites/backgrounds/ideation_background.jpg",
    "csprites/backgrounds/countryside.jpg",
    "sprites/new_carriages/carriage_patricia.png",
    "sprites/new_carriages/carriage_mihaela.png",
    "sprites/backgrounds/CM_Disruptive_Entertainers.png",
    "sprites/new_carriages/carriage_pablo.png",
    "sprites/backgrounds/CM_Disruptive_Royal Family.png",
    "sprites/new_carriages/carriage_anna.png",
    "sprites/new_carriages/carriage_tharrenos.png",
    "sprites/alt/chasis1.png",
    "sprites/alt/chasis2.png",
    "sprites/alt/chasis3.png",
    "sprites/alt/chasis.png",
    "sprites/alt/chasis1.png",
    "sprites/alt/carriage.png",
    "sprites/alt/carriage1.png",
    "sprites/alt/carriage2.png",
    "sprites/alt/carriage3.png",
    "sprites/alt/trunk.png",
    "sprites/alt/trunk1.png",
    "sprites/alt/trunk2.png",
    "sprites/alt/trunk3.png",
    "sprites/alt/seat1.png",
    "sprites/alt/seat2.png",
    "sprites/alt/seat3.png",
    "sprites/alt/seat.png",
    "sprites/alt/seat1.png",
    "csprites/carriage/shield/shield1.png",
    "csprites/carriage/shield/shield2.png",
    "csprites/carriage/shield/shield3.png",
    "sprites/alt/wheel.png",
    "sprites/alt/wheel1.png",
    "sprites/alt/wheel2.png",
    "sprites/alt/wheel3.png",
    "csprites/characters/entertainer_04_SDS.png",
    "csprites/characters/entertainer_02_SDS_mixed.png",
    "csprites/characters/entertainer_03_SDS_mixed.png",
    "sprites/alt/pseat.png",
    "sprites/alt/pseat1.png",
    "sprites/alt/pseat2.png",
    "sprites/alt/pseat3.png",
    "sprites/alt/dseat.png",
    "sprites/alt/dseat1.png",
    "sprites/alt/dseat2.png",
    "sprites/alt/dseat3.png",
    "sprites/carriage/skel/carriage1.png",
    "sprites/symbols/price.png",
    "sprites/symbols/time.png",
    "sprites/alt/desk_color.png",
    "sprites/backgrounds/citadel.png",
    "csprites/alt/background.jpg",

    "sprites/carriage/shield/shield1.png",
    "sprites/carriage/shield/shield2.png",
    "sprites/carriage/shield/shield3.png",

    "sprites/characters/entertainer_02_SDS_mixed.png",
    "sprites/characters/entertainer_03_SDS_mixed.png",
    "sprites/characters/entertainer_04_SDS.png",

    "sprites/backgrounds/disruptions/disruption_1.png",
    "sprites/backgrounds/disruptions/disruption_2.png",
    "sprites/backgrounds/disruptions/disruption_3.png",
    "sprites/backgrounds/disruptions/map_disruptions.png",

    "sprites/backgrounds/CM_Disruptive_attackers.png",
    "sprites/backgrounds/disruptive_entartainers.png",
    "sprites/characters/kingandqueen2.png",

    "sprites/characters/main_character_1.png",
    "sprites/characters/main_character_2.png",

    "sprites/full_carriages/carriage_sharing.png",
    
];

const voices_preload_path = "res/raw-assets/sound/voices/";

const voices_preload = [
    "S1S1_1",
    "S1S1_2",
    "S1S1_3",
    "S1S1_4",
    "S1S1_5",
    "S1S2_1",
    "S1S2_2",
    "S1S2_3",
    "S1S2_4",
    "S1S2_5",
    "S1S2_6",
    "S1S3_1",
    "S1S3_2",
    "S1S3_3",
    "S1S3_4",
    "S1S4_1",
    "S1S4_10",
    "S1S4_11",
    "S1S4_12",
    "S1S4_13",
    "S1S4_14",
    "S1S4_2",
    "S1S4_3",
    "S1S4_4",
    "S1S4_5",
    "S1S4_6",
    "S1S4_7",
    "S1S4_8",
    "S1S4_9",
    "S1S5_1",
    "S2S0",
    "S2S1",
    "S2S2",
    "S3S1_1",
    "S3S1_2",
    "S3S1_3",
    "S3S1_4",
    "S3S1_5",
    "S3S1_6",
    "S3S3_1",
    "S4S1_1",
    "S4S2_1",
    "S4S2_2",
    "S4S2_3",
    "S4S2_4",
    "S4S2_5",
    "S4S2_6",
    "S4S2_7",
    "S4S2_8",
    "S4S3_1",
    "S4S3_2",
    "S5S0_1",
    "S5S1_1",
    "S5S1_2",
    "S5S1_3",
    "S5S1_4",
    "S5S1_5",
    "S5S1_6",
    "S5S1_7",
    "S5S2_1",
    "S5S2_2",
    "S5S2_3",
    "S5S2_4",
    "S6S1_1",
    "S6S1_2",
    "S6S1_3",
    "S6S2_1",
    "S6S2_2",
    "S6S2_3",
    "S6S2_4",
    /*"S6S3_1",    */
];

const bgm_preload_path = "res/raw-assets/sound/bgm/";

const bgm_preload = [
    "introduction",
    "1.2_Horse_carriage",
    "1.3_White_noise_(town_sounds)",
    "1.1_Workshop_wood_carving",
    "4.1 Medieval market",
    "4.2 Soft horse neigh",
    "4.3 Horse Walking",
    "4.4 Gravel walking",
];

const fx_preload_path = "res/raw-assets/sound/fx/";

const fx_preload = [
    "B.1 New badge",
];

@ccclass
export default class SceneInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        //current language
        var lang = window["lang"] || "en";

        // init logic
        var init = this;
        console.log("game init");
        
        text.i18n.init(lang);

        Utils.setFont("/notebook");
        Utils.translate("/notebook");
        Utils.setFont("/dialog_widget");

        var s1 = false,
        s2 = false,
        s3 = false,
        s4 = false;

        ActivityLog.init();

        setInterval(ActivityLog.send, 20*1000);

        Utils.translate("/notebook");
        
        var load_complete = setInterval(function(){
            if(s1 && s2 && s3 && s4 && load_complete !== null) {
                clearInterval(load_complete);
                load_complete = null;
                
                cc.director.loadScene('player_select');

                /*
                gd.scene["next"] = "courtyard";
                cc.director.loadScene('cutscene_4');
                */

                /*
                player_data["data"]["current_step"] = 5;
                player_data["data"]["steps"]["5"]["feedback"].push("Captain");
                player_data["data"]["steps"]["5"]["feedback"].push("Driver");
                player_data["data"]["steps"]["5"]["feedback"].push("old_lady");
                player_data["data"]["steps"]["5"]["stage"] = 2;
                cc.director.loadScene('map_disruption');
                */

                /*
               player_data["data"]["current_step"] = 5;
               player_data["data"]["steps"]["5"]["stage"] = 1;
               cc.director.loadScene('map_feedback');
               */

                //Notebook.initVisitedCharacters();
                /*
                gd.observer.clearSubscriptions();
                gd.directory.clearElements();
                gd.directory.clearNodes();
                Notebook.initCarriage();
                gd.frame["dt"] = 0;
                gd.observer.notifyEvents();
                */
                //gd.observer.notifyEvents();

                /*
                Notebook.registerEvents();
                Notebook.show();
                */

                /*
                gd.scene["next"] = "workshop_messenger";
                cc.director.loadScene('cutscene_1');
                */
                

                /*
                player_data["data"]["current_step"] = 1;
                player_data["data"]["steps"]["1"]["stage"] = 4;
                cc.director.loadScene('map');
                */
                
/*
                player_data["data"]["current_step"] = 5;
                player_data["data"]["steps"]["5"]["stage"] = 2;
                cc.director.loadScene('map_disruption');
                */

                

                /*
                gd.scene["next"] = "palace";
                cc.director.loadScene('cutscene_2');
                */
                
               /*
               gd.scene["next"] = "courtyard";
               cc.director.loadScene('cutscene_4');
               */

               /*
                gd.scene["next"] = "S3S1_2";
                cc.director.loadScene('ideation_1');
                */
                
                
               /*
               player_data["data"]["current_step"] = 2;
               cc.director.loadScene('indicators');
               */

/*
               player_data["data"]["current_step"] = 4;
               cc.director.loadScene('workshop');
               */

               /*
                player_data["data"]["current_step"] = 5;
                player_data["data"]["steps"]["5"]["stage"] = 1;
                cc.director.loadScene('map_feedback');
                */

               /*
               player_data["data"]["current_step"] = 6;
               player_data["data"]["steps"]["5"]["disruption"].push("dseat");
               player_data["data"]["steps"]["5"]["disruption"].push("shield");
               //player_data["data"]["steps"]["5"]["disruption"].push("entertainers");
               carriage["data"]["parts"]["dseat"]["active"] = true;
               carriage["data"]["parts"]["dseat"]["part"] = "dseat1";
       
               carriage["data"]["parts"]["shield"]["active"] = true;
               carriage["data"]["parts"]["shield"]["part"] = "shield1";
       
               carriage["data"]["parts"]["entertainers"]["active"] = true;
               carriage["data"]["parts"]["entertainers"]["part"] = "entertainers1";
       
               //carriage["data"] = {"parts":{"wheels":{"part":"wheel3"},"chassis":{"part":"chassis3"},"pattern":{"part":"pattern1"},"seat":{"part":"seat3"},"pseat":{"part":"pseat3","hidden":true},"dseat":{"part":"dseat3","active":false,"hidden":false},"shield":{"part":"shield3","active":false},"entertainers":{"part":"none","active":false},"boot":{"part":"boot1"}}};
               player_data["data"]["steps"]["6"]["stage"] = 1;
               gd.scene["next"] = "ending";
               */




               //cc.director.loadScene('cutscene_7');
               
               
               
            }
        }, 200);


        //var clip: cc.AudioClip = cc.loader.load(cc.url.raw('assets/sound/fx/testaudio.mp3'));
        //cc.audioEngine.play("res/raw-assets/sound/introduction.ogg", true, 1);
        
        var keyEventListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                let gameEvent = {
                    type: "keyinput",
                    emitter : {
                        type : GameEventType.Input,
                        subtype : GameInputEventType.Key,
                    },
                    data : {
                        key : String.fromCharCode(keyCode).toLowerCase()
                    }
                };

                gd.observer.addEvent(gameEvent);
            }.bind(this)
        });

        cc.eventManager.addListener(keyEventListener, 1000);

        var keyEventListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                var key = String.fromCharCode(keyCode).toLowerCase();

                if(key == "w") {
                    Utils.hideDialogWidget();
                    player_data["data"]["current_step"] = 4;
                    cc.director.loadScene('workshop');
                }
            }
        });

        cc.eventManager.addListener(keyEventListener, 1000);

        /*
        gd.scene["next"] = "courtyard";
        cc.director.loadScene('cutscene_4');
*/
        //gd.scene["next"] = "S3S1_2";
        //cc.director.loadScene('ideation_1');

        /*
        gd.scene["next"] = "workshop_messenger";
        cc.director.loadScene('cutscene_1');
        */

        gd.directory.addStatus({
            "type": "data",
            "id": "player",
            "data": {
                "gender": "boy",
                "steps": {
                    "0" : {},
                    "1" : {
                        "dialogs": [],
                        "stage": 0,
                        "info_dialogs": [],
                        "next_step_unlocked": false,
                        "information": {
                            "high": [],
                            "informative": [],
                            "futile": [],
                        }
                    },
                    "5" : {
                        "stage": 0,
                        "feedback": [],
                        "noninformative": [],
                        "disruption": [],
                        "current_disruption": null,
                        "hint": false,
                    },
                    "6" : {
                        "stage": 1,
                    },
                },
                "current_step": 1,
                "badges": [],
            }
        });

        //user built carriage
        var carriage = gd.directory.addStatus({
            "id": "user_built_carriage",
            "data": {
                "parts": {
                    "wheels" : {
                        "part": "none",
                    },
                    "chassis" : {
                        "part": "none",
                    },
                    "pattern" : {
                        "part": "none",
                    },
                    "seat" : {
                        "part": "none",
                    },
                    "pseat" : {
                        "part": "none",
                        "hidden": true,
                    },
                    "dseat" : {
                        "part": "none",
                        "active": false,
                        "hidden": true,
                    },
                    "shield" : {
                        "part": "none",
                        "active": false,
                    },
                    "entertainers" : {
                        "part": "none",
                        "active": false,
                    },
                    "boot" : {
                        "part": "none",
                    },
                },
            },
        });
        
        cc.game.addPersistRootNode(cc.find('notebook'));
        cc.game.addPersistRootNode(cc.find('badges_transparency'));
        cc.game.addPersistRootNode(cc.find('badges'));
        cc.game.addPersistRootNode(cc.find('messagebox_transparency'));
        cc.game.addPersistRootNode(cc.find('messagebox'));
        cc.game.addPersistRootNode(cc.find('dialog_widget'));


        var slider_update: Object = {
            "type": "node",
            "action": "updateValue",
            "emitter": null,
            "id": "indicators0",
            "element_id" : "/Canvas/background/sliders",
            "resources": {
                "value" : {
                    "speed" : 0.5,
                    "fancyness" : 0.5,
                    "comfort" : 0.5,
                    "size" : 0.5,
                    "strongness" : 0.5,
                },
            },
            "init": {
            }
        };

        //Notebook.initIndicators();

        gd.directory.addStatus(slider_update);


        
        var voices = {
            "id": "game_voices",
            "data": {},
        };

        var voices_path_preload_array = [];

        for(var voice_filename of voices_preload) {
            var current_voice_path = voices_preload_path + 'i18n/' + lang + '/' + voice_filename + '.ogg';
            voices["data"][voice_filename] = {};
            voices["data"][voice_filename]["path"] = current_voice_path;
            voices_path_preload_array.push(current_voice_path);
        }

        
        cc.loader.load(
            voices_path_preload_array,
            function(c,t) {
                console.log(c);console.log(t);
            }, 
            function(error, item) {
                console.log(item); 
                console.log(error);
                gd.directory.addStatus(voices);
                
                for(var voice_filename of voices_preload) {
                    var current_voice_path = voices_preload_path + 'i18n/' + lang + '/' + voice_filename + '.ogg';
                    var audioID = cc.audioEngine.play(current_voice_path, false, 0);
                    var duration = cc.audioEngine.getDuration(audioID);
                    
                    voices["data"][voice_filename]["duration"] = duration;
                    cc.audioEngine.stop(audioID);
                    console.log(duration);
                    
                }
                s1 = true;
            }
        );


        var bgms = {
            "id": "game_bgms",
            "data": {},
        };

        var bgms_path_preload_array = [];

        for(var bgm_filename of bgm_preload) {
            var current_bgm_path = bgm_preload_path + bgm_filename + '.ogg';
            bgms["data"][bgm_filename] = {};
            bgms["data"][bgm_filename]["path"] = current_bgm_path;
            bgms_path_preload_array.push(current_bgm_path);
        }

        
        cc.loader.load(
            bgms_path_preload_array,
            function(c,t) {
                console.log(c);console.log(t);
            }, 
            function(error, item) {
                console.log(item); 
                console.log(error);
                gd.directory.addStatus(bgms);
                
                for(var bgm_filename of bgm_preload) {
                    var current_bgm_path = bgm_preload_path + bgm_filename + '.ogg';
                    var audioID = cc.audioEngine.play(current_bgm_path, false, 0);
                    var duration = cc.audioEngine.getDuration(audioID);
                    
                    bgms["data"][bgm_filename]["duration"] = duration;
                    cc.audioEngine.stop(audioID);
                    console.log(duration);
                    
                }
                s2 = true;
            }
        );

        var fxs = {
            "id": "game_fx",
            "data": {},
        };

        var fxs_path_preload_array = [];

        for(var fx_filename of fx_preload) {
            var current_fx_path = fx_preload_path + fx_filename + '.ogg';
            fxs["data"][fx_filename] = {};
            fxs["data"][fx_filename]["path"] = current_fx_path;
            fxs_path_preload_array.push(current_fx_path);
        }

        
        cc.loader.load(
            fxs_path_preload_array,
            function(c,t){
                console.log(c);console.log(t);
            }, 
            function(error, item) {
                console.log(item); 
                console.log(error);
                gd.directory.addStatus(fxs);
                
                for(var fx_filename of fx_preload) {
                    var current_fx_path = fx_preload_path + fx_filename + '.ogg';
                    var audioID = cc.audioEngine.play(current_fx_path, false, 0);
                    var duration = cc.audioEngine.getDuration(audioID);
                    
                    fxs["data"][fx_filename]["duration"] = duration;
                    cc.audioEngine.stop(audioID);
                    console.log(duration);
                    
                }
                s3 = true;

            }
        );


        var assets = {
            "id": "game_asset",
            "data": {},
        };

        var assets_path_preload_array = [];

        for(var asset_filename of asset_preload) {
            var current_asset_path = asset_preload_path + asset_filename;
            assets["data"][asset_filename] = {};
            assets["data"][asset_filename]["path"] = current_asset_path;
            assets_path_preload_array.push(current_asset_path);
        }

        cc.loader.load(
            assets_path_preload_array,
            function(c,t){
                console.log(c);console.log(t);
            }, 
            function(error, item) {
                console.log(item); 
                console.log(error);
                gd.directory.addStatus(assets);
                s4 = true;
            }
        );

        /*var id = cc.audioEngine.play(voices_path_preload_array[0], false, 1);
        console.log(id);
        setTimeout(function(){
        console.log(cc.audioEngine.getDuration(id));},1);*/

        //cc.director.loadScene('player_select');

        //gd.scene["next"] = "palace";
        //cc.director.loadScene('cutscene_2');

        var player_data = gd.directory.searchId('player');
        
        //var result = check_carriage(carriage["data"]);
        
        /*
        player_data["data"]["current_step"] = 4;
        cc.director.loadScene('workshop');
        */
        
        
                
        //player_data["data"]["current_step"] = 1;
        //player_data["data"]["steps"]["1"]["stage"] = 4;
        //player_data["data"]["steps"]["1"]["info_dialogs"] = ["the_stable_boy", "the_grumpy_butcher", "Captain", "butler", "Driver", "civil_engineer", "Tailor"];
        //player_data["data"]["steps"]["1"]["information"]["high"] = ["the_stable_boy", "Captain", "butler", "Driver", "Tailor"];
        //player_data["data"]["steps"]["1"]["information"]["futile"] = ["the_grumpy_butcher"];
        //player_data["data"]["steps"]["1"]["information"]["informative"] = ["civil_engineer"];

        //cc.director.loadScene('map');
        
        //cc.director.loadScene('indicators');

/*
        player_data["data"]["current_step"] = 5;
        player_data["data"]["steps"]["5"]["stage"] = 1;
        player_data["data"]["steps"]["5"]["feedback"].push("Captain");
        player_data["data"]["steps"]["5"]["feedback"].push("Driver");
        player_data["data"]["steps"]["5"]["feedback"].push("old_lady");
        cc.director.loadScene('map_feedback');
*/

/*
        player_data["data"]["current_step"] = 5;
        player_data["data"]["steps"]["5"]["feedback"].push("Captain");
        player_data["data"]["steps"]["5"]["feedback"].push("Driver");
        player_data["data"]["steps"]["5"]["feedback"].push("old_lady");
        player_data["data"]["steps"]["5"]["stage"] = 2;
        cc.director.loadScene('map_disruption');
*/

/*
        player_data["data"]["current_step"] = 6;
        player_data["data"]["steps"]["5"]["disruption"].push("dseat");
        player_data["data"]["steps"]["5"]["disruption"].push("shield");
        player_data["data"]["steps"]["5"]["disruption"].push("entertainers");
        carriage["data"]["parts"]["dseat"]["active"] = true;
        carriage["data"]["parts"]["dseat"]["part"] = "dseat1";

        carriage["data"]["parts"]["shield"]["active"] = true;
        carriage["data"]["parts"]["shield"]["part"] = "shield1";

        carriage["data"]["parts"]["entertainers"]["active"] = true;
        carriage["data"]["parts"]["entertainers"]["part"] = "entertainers1";

        player_data["data"]["steps"]["6"]["stage"] = 1;
        gd.scene["next"] = "ending";
        cc.director.loadScene('cutscene_7');
*/

/*
player_data["data"]["current_step"] = 4;

slider_update["resources"]["value"] = {
    "speed" : 1.0,
    "fancyness" : 0.0,
    "comfort" : 0.5,
    "size" : 0.0,
    "strongness" : 0.0,
};

player_data["data"]["badges"] = [
    {"badge_id": "creative_mind_g", "step": 1},
    {"badge_id": "never_give_up_g", "step": 2},
];

carriage["data"]["parts"] = {
                    "wheels" : {
                        "part": "none",
                    },
                    "chassis" : {
                        "part": "none",
                    },
                    "pattern" : {
                        "part": "none",
                    },
                    "seat" : {
                        "part": "seat1",
                    },
                    "pseat" : {
                        "part": "none",
                        "hidden": true,
                    },
                    "dseat" : {
                        "part": "none",
                        "active": false,
                        "hidden": true,
                    },
                    "shield" : {
                        "part": "none",
                        "active": false,
                    },
                    "entertainers" : {
                        "part": "none",
                        "active": false,
                    },
                    "boot" : {
                        "part": "none",
                    },
                }

                player_data["data"]["steps"]["1"]["info_dialogs"] = ["the_stable_boy", "the_grumpy_butcher", "Captain", "butler", "Driver", "civil_engineer", "Tailor"];
*/
    }

    update (dt) {
        //cc.director.loadScene('carriage');
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
