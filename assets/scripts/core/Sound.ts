import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";
import {Slider} from "../core/Slider";

export const Sound = {
    voice: function(id) {
        var voices: Object = gd.directory.searchId("game_voices");
        cc.audioEngine.play(voices["data"][id]["path"], false, 1);
    },
    play: function(id) {
        return cc.audioEngine.play(id, false, 1);
    },
    scene: function(data) {
        for(let scene_sound of data["sound_list"]) {
            for(let trigger_event of scene_sound["events"]) {
                let event = JSON.parse(JSON.stringify(trigger_event));
                event["listener"] = function(event) {
                    Sound.play(scene_sound["audio_id"]);
                };
                event["data"] = {};
                for(var data_item in scene_sound) {
                    if(data_item === "events")
                        continue;

                    event[data_item] = scene_sound[data_item];
                }
                
                event["event"] = trigger_event;
                gd.observer.addEvent(event);
            }
        }
    }
}
