import * as gd from "./GameData";
import {Scene} from "./Scene";
import {Utils} from "./Utils";

export const SaveManager:{ [s: string]: Function } = {
    "create_save": function() {
        var player_data = gd.directory.searchId('player');
        var indicators = gd.directory.searchId('indicators0');
        var carriage = gd.directory.searchId('user_built_carriage');
        var scene = gd.scene;

        localStorage.setItem("username", player_data["data"]["name"]);

        localStorage.setItem("game_save_0", JSON.stringify({
            "player_data": player_data,
            "indicators": indicators,
            "carriage": carriage,
            "scene": scene,
        }));
    },

    "load_save": function() {
        var save_json: string = localStorage.getItem("game_save_0");
        var save = JSON.parse(save_json);

        var player_data = save['player_data'];
        var indicators = save['indicators'];
        var carriage = save['carriage'];
        var scene = save['scene'];

        gd.directory.addStatus(player_data, {replace: true});
        gd.directory.addStatus(indicators, {replace: true});
        gd.directory.addStatus(carriage, {replace: true});

        for(var key in gd.scene) {
            gd.scene[key] = scene[key];
        }
        cc.director.loadScene(gd.scene["game_scene"]);
    },

    "save_exists": function() {
        return localStorage.getItem("game_save_0") !== null;
    },
    "get_save_username": function() {
        return localStorage.getItem("username");
    }
};
