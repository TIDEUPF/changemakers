const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class WorkshopInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        //var clip: cc.AudioClip = cc.loader.load(cc.url.raw('assets/sound/fx/testaudio.mp3'));
        //cc.audioEngine.play("db://assets/sound/fx/testaudio.mp3", true, 1);

        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        //cc.audioEngine.play("res/raw-assets/sound/fx/testaudio.mp3", true, 1);

        // init logic
        var init = this;  

        //console.log(gamenn.moveUp);
        var id_count=0;

        var element_click = {
            "type": "node",
            "action": null,
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "/Canvas/background/carriage/front_wheel",
            "resources": {
                "node" : {
                    "wheels" : "/Canvas/background/carriage/wheels",
                    "chassis" : "/Canvas/background/carriage/chassis",
                    "pattern" : "/Canvas/background/carriage/pattern",
                    "seat" : "/Canvas/background/carriage/seat",
                    "stairs" : "/Canvas/background/carriage/stairs",
                    "top" : "/Canvas/background/carriage/top",
                    "boot" : "/Canvas/background/carriage/boot",
                    "shield" : "/Canvas/background/carriage/shield",
                    "entertainers" : "/Canvas/background/carriage/entertainers",
                },
            },
            "init": {
                "clickEvent": {
                    "wheels" : {
                        "hitbox": ["front_wheel", "rear_wheel"],
                    },
                    "chassis" : {},
                    "pattern" : {},
                    "seat" : {},
                    "stairs" : {},
                    "top" : {},
                    "boot" : {},
                    "shield" : {},
                    "entertainers" : {},
                }
            }
        };

        gd.directory.addStatus(element_click);

        var front_wheel_element: any = new GameElement(element_click, cc.find('/Canvas/background/carriage/front_wheel'));

        gd.directory.addElement(front_wheel_element);


        var selection_chasis = {
            "type": "node",
            "action": "showElement",
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "Canvas/background/selection/chasis",
            "resources": {
                "node" : {
                    "selection_chasis" : "Canvas/background/selection/chasis",
                },
            },
        };

        gd.directory.addStatus(selection_chasis);
        var selection_chasis_element: any = new GameElement(selection_chasis, cc.find('Canvas/background/selection/chasis'));
        gd.directory.addElement(selection_chasis_element);

        //listen to the wheel click event
        var dialogListener = {
            listener : selection_chasis_element.getId(),
            event : {
                    type : "click",
                    origin_type: "carriage",
                    origin: {'$containsAny' : ['wheels', 'pattern', 'stairs', 'boot', 'top', 'seat', 'chassis', 'shield', 'entertainers']},
            }
        };
        gd.observer.addSubscription(dialogListener);


        //set a carriage piece
        var set_carriage_element = {
            "type": "node",
            "action": "selectCarriageElement",
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "Canvas/background/carriage",
            "resources": {
                "carriage_data": "user_built_carriage",
                "node" : {
                    "wheels" : [
                        "/Canvas/background/selection/front_wheel",
                        "/Canvas/background/selection/rear_wheel",
                    ],
                    "chassis" : "/Canvas/background/selection/chassis",
                    "pattern" : "/Canvas/background/selection/pattern",
                    "seat" : "/Canvas/background/selection/seat",
                    "stairs" : "/Canvas/background/selection/stairs",
                    "top" : "/Canvas/background/selection/top",
                    "boot" : "/Canvas/background/selection/boot",
                    "shield" : "/Canvas/background/selection/shield",
                    "entertainers" : "/Canvas/background/selection/entertainers",
                },
            },
            "init": {
                "clickEvent": {
                    "wheels" : {},
                    "chassis" : {},
                    "pattern" : {},
                    "seat" : {},
                    "stairs" : {},
                    "top" : {},
                    "boot" : {},
                    "shield" : {},
                    "entertainers" : {},
                }
            }
        };

        gd.directory.addStatus(set_carriage_element);
        var carriage_element: any = new GameElement(set_carriage_element, cc.find('Canvas/background/carriage'));
        gd.directory.addElement(carriage_element);

        //listen to the wheel click event
        var selection_listener = {
            listener : carriage_element.getId(),
            event : {
                    type : "click",
                    origin_type: "selection",
                    origin: {'$containsAny' : ['front_wheel', 'rear_wheel', 'pattern', 'stairs', 'boot', 'top', 'seat', 'chasis', 'shield', 'entertainers']]},
            }
        };
        gd.observer.addSubscription(selection_listener);

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

        var player_data = gd.directory.searchId('player');
        var carriage_data = gd.directory.searchId('user_built_carriage');
    
        //enable stage 5
        gd.observer.addSubscription({
            listener : function(event) {
                var n_selected_parts = 0;
                var n_total_parts = 0;
                for(var carriage_part in carriage_data["data"]["parts"]) {
                    if(carriage_data["data"]["parts"][carriage_part]["active"] || carriage_data["data"]["parts"][carriage_part]["active"] === undefined) {
                        n_total_parts++;
                        if(carriage_data["data"]["parts"][carriage_part]["part"] != "none") {
                            n_selected_parts++;
                        }
                    }
                }

                if(n_selected_parts == n_total_parts) {
                    gd.directory.getNode('/Canvas/background/next_step').active = true;
                }
            },
            event:{
                "type" : "carriage",
                "subtype" : "part_assigned",
            }
        });

        gd.observer.addSubscription({
            listener : function(event) {
                gd.observer.addEvent({
                    "type": "action",
                    "subtype": "workshop_finish",
                });
            },
            event:{
                "type" : "click",
                "subtype" : "next_step",
            }
        });

        //stage5
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] === 0) {
            gd.observer.addSubscription({
                listener : function(event) {
                    //var next_disruption = ["disruption_1"/*, "disruption_2"*/, "disruption_3"];
                    //gd.scene["next"] = next_disruption[player_data["data"]["steps"]["5"]["disruptions"].length];
                    //player_data["data"]["current_step"] = 5;
                    //cc.director.loadScene(next_disruption[player_data["data"]["steps"]["5"]["disruptions"].length]);
                    cc.director.loadScene('map_feedback');
                },
                event:{
                    "subtype" : "workshop_finish",
                }
            });
        }
        
        //stage5 disruption
        if(player_data["data"]["current_step"] >= 4 && player_data["data"]["steps"]["5"]["disruption"].length < 2) {
            gd.observer.addSubscription({
                listener : function(event) {
                    //var next_disruption = ["disruption_1"/*, "disruption_2"*/, "disruption_3"];
                    //gd.scene["next"] = next_disruption[player_data["data"]["steps"]["5"]["disruptions"].length];
                    //player_data["data"]["current_step"] = 5;
                    //cc.director.loadScene(next_disruption[player_data["data"]["steps"]["5"]["disruptions"].length]);
                    cc.director.loadScene('map_disruption');
                },
                event:{
                    "subtype" : "workshop_finish",
                }
            });
        }

        //stage5 disruptions completed
        if(player_data["data"]["current_step"] >= 4 && player_data["data"]["steps"]["5"]["disruption"].length == 2) {
            gd.observer.addSubscription({
                listener : function(event) {
                    //var next_disruption = ["disruption_1"/*, "disruption_2"*/, "disruption_3"];
                    //gd.scene["next"] = next_disruption[player_data["data"]["steps"]["5"]["disruptions"].length];
                    //player_data["data"]["current_step"] = 5;
                    //cc.director.loadScene(next_disruption[player_data["data"]["steps"]["5"]["disruptions"].length]);
                    gd.scene["next"] = 'ending';
                    cc.director.loadScene('cutscene_2');
                },
                event:{
                    "subtype" : "workshop_finish",
                }
            });
        }

        //update the carriage
        new GameElement({
            "action": "selectCarriageElement",
            "id": "disruption_carriage",
            "resources": {
                "carriage_data": "user_built_carriage",
            },
            "listen" : {
                "type" : "carriage",
                "subtype" : "update",
            },
        });
        gd.observer.addEvent({
            "type": "carriage",
            "subtype": "update",
        });

    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
