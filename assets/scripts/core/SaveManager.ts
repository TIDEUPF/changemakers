import * as gd from "./GameData";
import {Utils} from "./Utils";

export const SaveManager:{ [s: string]: Function } = {
    "create_save": function() {
        var player_data = gd.directory.searchId('player');
        var indicators = gd.directory.searchId('indicators0');
        var carriage = gd.directory.searchId('user_built_carriage');
        var game_scene = gd.game_scene;
        var scene = gd.scene;

        localStorage.setItem("game_save_0", JSON.stringify({
            "player_data": player_data,
            "indicators": indicators,
            "carriage": carriage,
            "game_scene": game_scene,
            "scene": scene,
        }));
    },

    "load_save": function() {
        var save_json: string = localStorage.getItem("game_save_0");
        var save = JSON.parse(save_json);

        var player_data = save['player'];
        var indicators = save['indicators'];
        var carriage = save['carriage'];
        var game_scene = save['game_scene'];
        var scene = save['scene'];

        gd.directory.addStatus(player_data, {replace: true});
        gd.directory.addStatus(indicators, {replace: true});
        gd.directory.addStatus(carriage, {replace: true});
        gd.directory.addStatus(game_scene, {replace: true});
        gd.directory.addStatus(scene, {replace: true});
    },

    "save_exists": function() {
        return localStorage.getItem("game_save_0") === null;
    }
};
