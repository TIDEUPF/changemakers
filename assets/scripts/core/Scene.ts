import * as gd from "./GameData";
import {Utils} from "./Utils";
import {Sound} from "./Sound";
import {SaveManager} from "./SaveManager";

export const Scene:{ [s: string]: Function } = {
    "click": function(item) {
        var node_item = cc.find(item);
        node_item.on('touchstart', function(event) {
            gd.observer.addEvent({
                type: "click",
                subtype: "scene_click",
                origin: node_item.name,
                element_path: item,
            });
        });
    },

    "init": function() {
        //stop previous sound
        Sound.stopAll();

        //common fx
        var fx_scene_sound = {
            "sound_list": [
                {
                    "audio_id": "B.1 New badge",
                    "events": [
                        {
                            "type": "badges",
                            "subtype": "added",
                        },
                    ],
                },
            ],
        };

        Sound.sceneFX(fx_scene_sound);

        //BGM sound
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
                                    "ending",
                                    "ending_courtyard",
                                    "start_screen",
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
                                    "ideation",
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
                                    "ideation",
                                    "S5S1_1",
                                    "S5S1_2",
                                    "S5S1_3",
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
                                    "disruption_3",
                                    "cutscene_5",
                                    "courtyard",
                                    "map_feedback",
                                    "S5S1_1",
                                    "S5S1_2",
                                    "S5S1_3",
                                ]},
                        },
                    ],
                },
                {
                    "audio_id": "4.1 Medieval market",
                    "events": [
                        {
                            "type": "scene_start",
                            "scene": "map",
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
                                    "map_disruptions",
                                    "disruption_2",
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

        //translate
        Utils.translate("/Canvas");
    },

    "load": function(scene) {
        gd.scene["game_scene"] = scene;
        SaveManager.create_save();
        cc.director.loadScene(scene);
    },
};
