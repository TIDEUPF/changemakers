import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";
import {Slider} from "../core/Slider";

const indicators = [
    'speed',
    'fancyness',
    'comfort',
    'size',
    'strongness',
];

const characters_dialogs = {
    "Captain": "stage1_scene4_captain_d1",
"Driver": "S1S4_1",
"Tailor": "S1S4_2",
"butler": "S1S4_3",
"the_stable_boy": "S1S4_4",
"Doctor": "S1S4_5",
"Chef": "S1S4_6",
"civil_engineer": "S1S4_7",
"Merchant": "S1S4_8",
"old_lady": "S1S4_9",
"Librarian": "S1S4_10",
"the_grumpy_butcher": "S1S4_11",
"potter": "S1S4_12",
"vagabond": "S1S4_13",
"Huntress": "S1S4_14",
}

const indicatorsid = "indicators0";

export const Notebook = {
    registerEvents: function() {
        gd.observer.addSubscription({
            listener : function(event) {
                var notebook = gd.directory.getNode("/notebook");
                notebook.active = false;
            },
            event:{
                "type" : "click",
                "data.custom": "notebook_back",
            }
        });
    },
    initIndicators: function() {
        const indicators_path = "/notebook/background/indicators_entry/indicators";

        var indicators_data = gd.directory.searchId(indicatorsid);

        for(var indicator of indicators) {
            var path = indicators_path + '/' + indicator;
            
            Slider.setValue(path, indicators_data["resources"]["value"][indicator]);
        }
    },
    initVisitedCharacters: function() {
        const characters_path = "/notebook/background/dialogs";
        var player_data = gd.directory.searchId("player");

        var row1_characters,
        row2_characters,
        character_array: Array<cc.Node> = [];

        var n_visited = player_data["data"]["steps"]["1"]["info_dialogs"].length;
        var n_split = Math.ceil(n_visited/2);

        row1_characters = player_data["data"]["steps"]["1"]["info_dialogs"].split(0, n_split-1);
        row2_characters = player_data["data"]["steps"]["1"]["info_dialogs"].split(n_split);

        for(var character_id of row1_characters) {
            var character: cc.Node = gd.directory.getNode(characters_path + "/row1/" + character_id);
            character.active = true;
            character_array.push(character);
        }

        for(var character_id of row2_characters) {
            var character: cc.Node = gd.directory.getNode(characters_path + "/row2/" + character_id);
            character.active = true;
            character_array.push(character);
        }

        
        var dialog_label = gd.directory.getNode('');
        for(let character of character_array) {
            character.on('touchstart', function(event) {
                character.name
        }

        
    },
    
};
