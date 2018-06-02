import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";
import {Slider} from "../core/Slider";

export const Sound = {
    voice: function(id) {
        var voices: Object = gd.directory.searchId("game_voices");
        cc.audioEngine.play(voices["data"][id]["path"], false, 1);
    },

    fx: function(id) {
        var fx: Object = gd.directory.searchId("game_fx");
        cc.audioEngine.play(fx["data"][id]["path"], false, 1);
    },
    
    bgm: function(id) {
        var bgms: Object = gd.directory.searchId("game_bgms");
        return cc.audioEngine.play(bgms["data"][id]["path"], true, 0.4);
    },

    sceneFX: function(data) {
        Sound.scene(data, 'fx');
    },

    sceneBGM: function(data) {
        Sound.scene(data, 'bgm');
    },

    stopAll: function() {
        cc.audioEngine.stopAll();
    },

    scene: function(data, type) {
        for(let scene_sound of data["sound_list"]) {
            for(let trigger_event of scene_sound["events"]) {
                let event = JSON.parse(JSON.stringify(trigger_event));
                event["listener"] = function(event) {
                    if(type === "bgm") {
                        Sound.bgm(scene_sound["audio_id"]);
                    } else {
                        Sound.fx(scene_sound["audio_id"]);
                    }
                };
                event["data"] = {};
                for(var data_item in scene_sound) {
                    if(data_item === "events")
                        continue;

                    event["data"][data_item] = scene_sound[data_item];
                }
                
                event["event"] = trigger_event;
                gd.observer.addSubscription(event);
            }
        }
    }
}
