import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";
import {Slider} from "../core/Slider";

export const Sound = {
    voice: function(id) {
        var voices: Object = gd.directory.searchId("game_voices");
        cc.audioEngine.play(voices["data"][id]["path"], false, 1);
    },
    scene: function(data) {
        
    }
}
