import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "./Scene";
import {badge_labels} from "./Badge";
import {Slider} from "./Slider";
import GameElement from "./GameElement";

const indicators = [
    [
        'speed',
        'fancyness',
    ],
    [
        'comfort',
        'size',
        'strongness',
    ],
]; 

const notebook_steps = {
    "1" : [
    ],
    "2" : [
        "indicators_page_0",
        "indicators_page_1",
    ],
    "3" : [
        "examples_1",
        "examples_2",
    ],
    "4" : [
        "carriage_page",
    ],
    "5" : [
    ],
}

var notebook_max_page = 0;
var notebook_current_page = 0;
var notebook_current_page_list = [];
var notebook_visited_init = false;


const characters_dialogs = {
    "Captain": "S1S3_4",
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
            listener : this.next_page,
            event:{
                "type" : "click",
                "data.custom": "notebook_next",
            }
        });

        gd.observer.addSubscription({
            listener : this.back_page,
            event:{
                "type" : "click",
                "data.custom": "notebook_back",
            }
        });

        gd.observer.addSubscription({
            listener : this.show,
            event:{
                "type" : "click",
                "data.custom": "notebook_show",
            }
        });

        gd.observer.addSubscription({
            listener : this.close,
            event:{
                "type" : "click",
                "data.custom": "notebook_close",
            }
        });
    },
    next_page: function() {
        var player_data = gd.directory.searchId("player");

        notebook_max_page = notebook_current_page_list.length;
        var notebook_next_current_page = Math.min(notebook_max_page, notebook_current_page + 2);
   
        for(var i=0; i<notebook_max_page; i++) {
            var page = gd.directory.getNode('/notebook/background/' + notebook_current_page_list[i]);
            page.active = false;
        }

        for(var i=notebook_current_page; i<notebook_next_current_page; i++) {
            var page = gd.directory.getNode('/notebook/background/' + notebook_current_page_list[i]);
            page.x = (i-notebook_current_page)*424;
            page.active = true;
        }

        notebook_current_page = notebook_next_current_page;

        var next_button = gd.directory.getNode('/notebook/background/next_button');
        var back_button = gd.directory.getNode('/notebook/background/back_button');

        next_button.active = false;
        back_button.active = true;

        if(notebook_current_page < notebook_max_page) {
            next_button.active = true;
        }
    },
    back_page: function() {
        var player_data = gd.directory.searchId("player");

        notebook_max_page = notebook_current_page_list.length;
        var notebook_next_current_page = Math.max(0, notebook_current_page - (2-notebook_current_page%2));
   
        for(var i=0; i<notebook_max_page; i++) {
            var page = gd.directory.getNode('/notebook/background/' + notebook_current_page_list[i]);
            page.active = false;
        }

        for(var i=notebook_next_current_page-1; i>notebook_next_current_page-3; i--) {
            var page = gd.directory.getNode('/notebook/background/' + notebook_current_page_list[i]);
            page.x = (1-(notebook_next_current_page-i-1))*424;
            page.active = true;
        }

        notebook_current_page = notebook_next_current_page;

        var next_button = gd.directory.getNode('/notebook/background/next_button');
        var back_button = gd.directory.getNode('/notebook/background/back_button');

        next_button.active = true;
        back_button.active = false;

        if(notebook_current_page > 2) {
            back_button.active = true;
        }
    },
    close: function() {
        gd.directory.getNode('/notebook').active = false;
    },
    show: function() {
        var player_data = gd.directory.searchId("player");

        gd.directory.getNode('/notebook').active = true;

        switch(player_data["data"]["current_step"]) {
            case 6:
            case 5:
            Notebook.initCarriage();
            case 4:
            Notebook.initIndicators();
            case 3:
            case 2:
            case 1:
            Notebook.initVisitedCharacters();
            default:
            Notebook.initBadges();
        }

        notebook_current_page_list = [];

        if(player_data["data"]["badges"].length)
            notebook_current_page_list.push("badges");

        for(var i=parseInt(player_data["data"]["current_step"], 10)-1; i>0; i--) {
            notebook_current_page_list = notebook_current_page_list.concat(notebook_steps[i.toString()]);
        }

        if(player_data["data"]["steps"]["1"]["info_dialogs"].length)
        notebook_current_page_list.push("dialogs");

        notebook_current_page_list.push("mission");

        notebook_max_page = notebook_current_page_list.length;
        notebook_current_page = Math.min(2, notebook_max_page);
        
        for(var i=0; i<notebook_max_page; i++) {
            var page = gd.directory.getNode('/notebook/background/' + notebook_current_page_list[i]);
            page.active = false;
        }

        for(var i=0; i<notebook_current_page; i++) {
            var page = gd.directory.getNode('/notebook/background/' + notebook_current_page_list[i]);
            page.active = true;
            page.x = i*424;
        }

        var next_button = gd.directory.getNode('/notebook/background/next_button');
        var back_button = gd.directory.getNode('/notebook/background/back_button');

        next_button.active = false;
        back_button.active = false;

        if(notebook_current_page < notebook_max_page) {
            next_button.active = true;
        }
    },

    initBadges: function() {
        var player_data = gd.directory.searchId("player");

        for(var badge of player_data["data"]["badges"]) {
            var badge_entry: cc.Node = gd.directory.getNode('/notebook/background/badges/badge_entry_' + badge["step"]);
            badge_entry.active = true;

            var badge_sprite: cc.Node = gd.directory.getNode('/notebook/background/badges/badge_entry_' + badge["step"] + '/icon/' + badge["badge_id"]);
            badge_sprite.active = true;

            var badge_label: cc.Node = gd.directory.getNode('/notebook/background/badges/badge_entry_' + badge["step"] + '/label');
            var badge_label_component: cc.Label = badge_label.getComponent('cc.Label');

            badge_label_component.string = text.i18n.t(badge_labels[badge["badge_id"]]);
        }
    },
    initIndicators: function() {
        var indicators_data = gd.directory.searchId(indicatorsid);

        for(var i in indicators) {
            var indicators_path = "/notebook/background/indicators_page_" + i + "/indicators";

            for(var indicator of indicators[i]) {
                var path = indicators_path + '/' + indicator;
                
                Slider.setValue(path, indicators_data["resources"]["value"][indicator]);
            }
        }
    },
    initVisitedCharacters: function() {
        const characters_path = "/notebook/background/dialogs";
        var player_data = gd.directory.searchId("player");
        var dialog_text = gd.directory.getNode(characters_path + '/dialog_text');
        var label: cc.Label = dialog_text.getComponent('cc.Label')

        label.string = "";

        var row1_characters,
        row2_characters,
        character_array: Array<cc.Node> = [];

        var n_visited = player_data["data"]["steps"]["1"]["info_dialogs"].length;
        var n_split = Math.ceil(n_visited/2);

        for(let character of gd.directory.getNode(characters_path + "/row1").children) {
            character.active = false;
        }

        for(let character of gd.directory.getNode(characters_path + "/row2").children) {
            character.active = false;
        }

        row1_characters = player_data["data"]["steps"]["1"]["info_dialogs"].slice(0, n_split);
        row2_characters = player_data["data"]["steps"]["1"]["info_dialogs"].slice(n_split);

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

        if(notebook_visited_init === false) {
            notebook_visited_init = true;

            for(let character of gd.directory.getNode(characters_path + "/row1").children) {
                character.on('touchstart', function(event) {
                    label.string = text.i18n.t(characters_dialogs[character.name]);
                });
            }

            for(let character of gd.directory.getNode(characters_path + "/row2").children) {
                character.on('touchstart', function(event) {
                    label.string = text.i18n.t(characters_dialogs[character.name]);
                });
            }
        }
    },
    initCarriage: function() {
        new GameElement({
            "action": "selectCarriageElement",
            "id": "notebook_carriage",
            "resources": {
                "carriage_data": "user_built_carriage",
                "carriage_path": "/notebook/background/carriage_page/carriage/",
            },
            "listen" : {
                "type" : "carriage",
                "subtype" : "update",
                "carriage" : "notebook_carriage",
            },
        });

        gd.observer.addEvent({
            "type": "carriage",
            "subtype": "update",
            "carriage" : "notebook_carriage",
        });

    },
    
};
