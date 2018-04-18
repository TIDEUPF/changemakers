const {ccclass, property} = cc._decorator;

import {MessageBox} from "../core/MessageBox";
import {Badge} from "../core/Badge";
import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

enum GameEventType {
    Input = 1,
};

enum GameInputEventType {
    Key = 1,
};

@ccclass
export default class IndicatorsInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        // init logic
        var init = this;

        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        var player_data = gd.directory.searchId("player");

        var id_count=0;

        var elements_path = "/Canvas/background/sliders/";
        
        var slider_update: Object = {
            "type": "node",
            "action": "updateValue",
            "emitter": null,
            "id": "indicators" + (id_count++).toString(10),
            "element_id" : "/Canvas/background/sliders",
            "resources": {
                "node" : {
                    "speed" : elements_path + "speed",
                    "fancyness" : elements_path + "fancyness",
                    "comfort" : elements_path + "comfort",
                    "size" : elements_path + "size",
                    "strongness" : elements_path + "strongness",
                },
                "value" : {
                    "speed" : 0.5,
                    "fancyness" : 0.5,
                    "comfort" : 0.5,
                    "size" : 0.5,
                    "strongness" : 0.5,
                },
            },
            "init": {
            }
        };

        slider_update = gd.directory.addStatus(slider_update);
        gd.directory.addStatus(slider_update);
        var slider_update_element: any = new GameElement(slider_update, cc.find('/Canvas/background/sliders'));
        gd.directory.addElement(slider_update_element);

        var sliderEventListener = {
            listener : slider_update_element.getId(),
            event : {
                    type : "slider",
                    origin_type: "indicators_fixed",
            }
        };
        gd.observer.addSubscription(sliderEventListener);

        gd.observer.addSubscription({
            listener : function(event) {
                var value = 0;
                if(event["value"] < 0.35) {
                    value = 0;
                } else if(event["value"] > 0.65) {
                    value = 1.0;
                } else {
                    value = 0.5;
                }

                gd.observer.addEvent({
                    origin: event["origin"],
                    origin_type:"indicators_fixed",
                    type:"slider",
                    value: value,
                });
            },
            event:{
                type : "slider",
                origin_type: "indicators",
            }
        });

        /*
        gd.observer.addSubscription({
            listener : function() {
                cc.director.loadScene('map');
            },
            event:{
                type : "keyinput",
                "data.key": "m",
            }
        });
        */

        MessageBox.text("Welcome back to your workshop ! Based on of you have heard it is now time to make some choices about what type of carriage you are thinking would best fit the needs of the King and the Queen.");

        gd.observer.addSubscription({
            listener : function(event) {
                var modified_sliders = 0;
                for(var item in slider_update["resources"]["value"]) {
                    if(slider_update["resources"]["value"][item] != 0.5) {
                        modified_sliders++;
                    }
                }

                if(modified_sliders >= 4) {
                    MessageBox.text("What a promising carriage! Well done!");

                    gd.observer.addSubscription({
                        listener : function(event) {
                            gd.observer.addEvent({
                                "type" : "badges",
                                "subtype" : "add",
                            });
                        },
                        event:{
                            type: "messagebox",
                            subtype: "close",
                        }
                    });
                } else {
                    MessageBox.text("My friend, it seems you have taken no real decisions. A medium carriage will not fit the needs of the King and the Queen. Make real choices.");
                }
            },
            event:{
                "type" : "click",
                "subtype" : "next_step",
            }
        });

        gd.observer.addSubscription({
            listener : function(event) {
                Badge.add({
                    "badge_id": "critical_thinker_g",
                });

                gd.observer.addSubscription({
                    listener : function(event) {
                        gd.observer.addEvent({
                            "subtype": "indicators_finish",
                        });
                    },
                    event:{
                        type: "bagdes",
                        subtype: "close",
                    }
                });
            },
            event:{
                "type" : "badges",
                "subtype" : "add",
            }
        });

        gd.observer.addSubscription({
            listener : function(event) {
                player_data["data"]["current_step"] = 4;
                cc.director.loadScene('workshop');
            },
            event:{
                "subtype" : "indicators_finish",
            }
        });

    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
        //gd.observer.newFrame();
    }
}
