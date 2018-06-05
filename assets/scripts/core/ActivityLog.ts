import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";
import {Slider} from "../core/Slider";

var key: string;
const alphabet = "abcdefghijklmnoprstuvwxyz0123456789";

export const ActivityLog = {
    init: function() {
        
        Math.floor(Math.random()*alphabet.length);
        return Date.now();
    },
    register: function() {
        return Date.now();
    },
}
