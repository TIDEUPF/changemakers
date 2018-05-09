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
    
};
