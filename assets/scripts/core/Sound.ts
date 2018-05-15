import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";
import {Slider} from "../core/Slider";

export const Sound = {
    voice: function(id) {
        var voices: Object = gd.directory.searchId("game_voices");
        voices["data"][id]["path"]
        return Date.now();
    },
}
