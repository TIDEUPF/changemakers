import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";

export const Slider = {
    setValue: function(slider_path, value) {
        var node = gd.directory.getNode(slider_path);
        var slider: cc.Slider = node.getComponent("cc.Slider");
        slider.progress = value;
    },
};
