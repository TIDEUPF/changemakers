const {ccclass, property} = cc._decorator;
 
import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {MessageBox} from "../core/MessageBox";
import {check_carriage} from "../steps/prototype/carriage";
import {Badge} from "../core/Badge";
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
 
        var player_data = gd.directory.searchId('player');
        var carriage_data = gd.directory.searchId('user_built_carriage');

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
                    "boot" : "/Canvas/background/carriage/boot",
                    "shield" : "/Canvas/background/carriage/shield",
                    "entertainers" : "/Canvas/background/carriage/entertainers",
                    "dseat" : "/Canvas/background/carriage/dseat",
                    "pseat" : "/Canvas/background/carriage/pseat",
                },
            },
            "init": {
                "clickEvent": {
                    "wheels" : {
                        "hitboxes": ["front_wheel", "rear_wheel"],
                    },
                    "chassis" : {},
                    "pattern" : {},
                    "seat" : {},
                    "boot" : {
                        "hitboxes": ["rear", "top"],
                    },
                    "shield" : {},
                    "entertainers" : {},
                    "dseat" : {},
                    "pseat" : {},
                }
            }
        };
 
        gd.directory.addStatus(element_click);
 
        if(!(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] === 2)) {
            var front_wheel_element: any = new GameElement(element_click, cc.find('/Canvas/background/carriage/front_wheel'));
    
            gd.directory.addElement(front_wheel_element);
        }

         
        var selection_chasis = {
            "type": "node",
            "action": "showElement",
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "Canvas/background/selection/chassis",
            "resources": {
                "node" : {
                    "selection_chasis" : "Canvas/background/selection/chassis",
                },
            },
        };
 
        gd.directory.addStatus(selection_chasis);
        var selection_chasis_element: any = new GameElement(selection_chasis, cc.find('Canvas/background/selection/chasis'));
        gd.directory.addElement(selection_chasis_element);

        //carriage clicked
        if(!(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] === 2)) {
            var dialogListener = {
                listener : selection_chasis_element.getId(),
                event : {
                        type : "click",
                        origin_type: "carriage",
                        origin: {'$containsAny' : ['wheels', 'pattern', 'boot', 'seat', 'pseat', 'dseat', 'chassis', 'shield', 'entertainers']},
                }
            };
            gd.observer.addSubscription(dialogListener);
        }

        //buttons click to carriage click
        gd.observer.addSubscription({
            listener : function(event) {
                let gameEvent = {
                    type: "click",
                    origin: event["data"]["custom"],
                    origin_type: "carriage",
                };

                gd.observer.addEvent(gameEvent);
            },
            event:{
                "type" : "click",
                "subtype" : "category_buttons",
                "data.custom" : {'$containsAny' : ['wheels', 'pattern', 'boot', 'seat', 'pseat', 'dseat', 'chassis', 'shield', 'entertainers']},
            }
        });

        //enable inside elements when clicking on the interior seat
        gd.observer.addSubscription({
            listener : function(event) {
                gd.observer.addEvent({
                    "type" : "click",
                    "subtype" : "interior_switch",
                    "data": {
                        "visible": event["origin"] === "pseat" || event["origin"] === "dseat",
                    },
                });
            },
            event:{
                "type" : "click",
                "origin_type" : "carriage",
            }
        });

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
                    "wheels" : "/Canvas/background/selection/wheels",
                    "chassis" : "/Canvas/background/selection/chassis",
                    "pattern" : "/Canvas/background/selection/pattern",
                    "seat" : "/Canvas/background/selection/seat",
                    "boot" : "/Canvas/background/selection/boot",
                    "shield" : "/Canvas/background/selection/shield",
                    "entertainers" : "/Canvas/background/selection/entertainers",
                    "dseat" : "/Canvas/background/selection/dseat",
                    "pseat" : "/Canvas/background/selection/pseat",
                },
            },
            "init": {
                "clickEvent": {
                    "wheels" : {},
                    "chassis" : {},
                    "pattern" : {},
                    "seat" : {},
                    "boot" : {},
                    "shield" : {},
                    "entertainers" : {},
                    "dseat" : {},
                    "pseat" : {},
                }
            }
        };
    
        gd.directory.addStatus(set_carriage_element);
        var carriage_element: any = new GameElement(set_carriage_element, cc.find('Canvas/background/carriage'));
        gd.directory.addElement(carriage_element);
    
        //element selected
        var selection_listener = {
            listener : carriage_element.getId(),
            event : {
                    type : "click",
                    origin_type: "selection",
                    origin: {'$containsAny' : ['wheels', 'pattern', 'boot', 'seat', 'pseat', 'dseat', 'chassis', 'shield', 'entertainers']},
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
 
        //toogle interior elements
        gd.observer.addSubscription({
            listener : function(event) {
                var interior_list = ["dseat", "pseat"];

                for(var interior_list_item of interior_list) {
                    if(carriage_data["data"]["parts"][interior_list_item]["active"] !== false) {
                        var item_node = gd.directory.getNode('/Canvas/background/carriage' + '/' + interior_list_item);
                        item_node.active = event["data"]["visible"];
                    }
                }
            },
            event:{
                "type" : "click",
                "subtype" : "interior_switch",
            }
        });

        //print results
        gd.observer.addSubscription({
            listener : function(event) {
                var result = check_carriage(carriage_data["data"]);
                console.log(result);
            },
            event:{
                "type": "carriage",
                "subtype": "part_assigned",
            }
        });


        //level 4 badge
        if(player_data["data"]["current_step"] == 4 ||
        (player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] === 1)) {
            gd.observer.addSubscription({
                listener : function(event) {
                    var result = check_carriage(carriage_data["data"]);

                    if(result["pass"]) {
                        if(player_data["data"]["current_step"] == 4) {
                            Badge.add({"badge_id": "problem_solver_g"});

                            gd.observer.addSubscription({
                                listener : function(event) {
                                    gd.observer.addEvent({
                                        "type": "action",
                                        "subtype": "workshop_finish",
                                    });
                                },
                                event:{
                                    type: "bagdes",
                                    subtype: "close",
                                }
                            });
                        } else {
                            gd.observer.addEvent({
                                "type": "action",
                                "subtype": "start_disruptions",
                            });
                        }

                    } else {
                        if(result["failed"].length > 0) {
                            MessageBox.text(result["indicators_result"][result["failed"][0]]["warning"]);
                        }
                    }
                },
                event:{
                    "type" : "click",
                    "subtype" : "next_step",
                }
            });

            gd.observer.addSubscription({
                listener : function(event) {
                    player_data["data"]["current_step"] = 5
                    player_data["data"]["steps"]["5"]["stage"] = 1;
                    cc.director.loadScene('map_feedback');
                },
                event:{
                    "subtype" : "workshop_finish",
                }
            });

            gd.observer.addSubscription({
                listener : function(event) {
                    player_data["data"]["current_step"] = 5
                    player_data["data"]["steps"]["5"]["stage"] = 2;
                    cc.director.loadScene('map_disruption');
                },
                event:{
                    "subtype" : "start_disruptions",
                }
            });
        }

        //step5 stage1
        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] === 1) {
            gd.observer.addSubscription({
                listener : function(event) {
                    player_data["data"]["steps"]["5"]["stage"] = 2;
                    cc.director.loadScene('map_disruption');
                },
                event:{
                    "subtype" : "workshop_finish",
                }
            });
        }

        if(player_data["data"]["current_step"] == 5 && player_data["data"]["steps"]["5"]["stage"] === 2) {
            var disruption = {
                "disruption_1": "shield", 
                "disruption_2": "dseat", 
                "disruption_3": "entertainers",
            };

            gd.observer.addSubscription({
                listener: function(event) {
                    gd.directory.getNode('/Canvas/background/see_result').active = true;
                },
                event: {
                        type : "click",
                        origin_type: "selection",
                        origin: disruption[gd.scene["current"]],
                }
            });

            gd.observer.addSubscription({
                listener: function(event) {
                    gd.observer.addEvent({
                        "type": "action",
                        "subtype": "workshop_finish",
                    });
                },
                event:{
                    "type" : "click",
                    "subtype" : "see_result",
                }
            });

            gd.directory.getNode('/Canvas/empty_desktop').active = true;
            gd.directory.getNode('/Canvas/background/category_buttons').active = false;
        }

        //stage5 disruption message
        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] === 2) {
            var disruption = {
                "disruption_1": "stage5_disruption1_narrator_d1", 
                "disruption_2": "stage5_disruption2_narrator_d1", 
                "disruption_3": "stage5_disruption2_narrator_d1",
            };

            MessageBox.text(disruption[gd.scene["current"]]);
        }
        
        //stage5 disruption next scene
        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] === 2) {
            gd.observer.addSubscription({
                listener : function(event) {
                    var disruption = {
                        "disruption_1": "disruption_1_result", 
                        "disruption_2": "disruption_2_result", 
                        "disruption_3": "disruption_2_result",
                    };
        
                    gd.scene["next"] = disruption[gd.scene["current"]];
                    cc.director.loadScene(disruption[gd.scene["current"]]);
                },
                event:{
                    "subtype" : "workshop_finish",
                }
            });
        }

        //stage5 activate the new element
        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] === 2) {
            var disruption = {
                "disruption_1": "shield", 
                "disruption_2": "dseat", 
                "disruption_3": "entertainers",
            };

            gd.observer.addEvent({
                type : "click",
                subtype: "category_buttons",
                data: { 
                    custom: disruption[gd.scene["current"]]
                },
            });

            gd.observer.addSubscription({
                listener : selection_chasis_element.getId(),
                event : {
                    type : "click",
                    origin_type: "carriage",
                    "origin": disruption[gd.scene["current"]],
                }
            });
        }

/*        
        //stage5 disruption
        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] === 2 &&
        player_data["data"]["steps"]["5"]["disruption"].length < 2) {
            gd.observer.addSubscription({
                listener : function(event) {
                    cc.director.loadScene('map_disruption');
                },
                event:{
                    "subtype" : "workshop_finish",
                }
            });
        }

        //stage5 disruptions completed
        if(player_data["data"]["current_step"] == 5 && 
        player_data["data"]["steps"]["5"]["stage"] === 2 &&
        player_data["data"]["steps"]["5"]["disruption"].length == 2) {
            gd.observer.addSubscription({
                listener : function(event) {
                    gd.scene["next"] = 'ending';
                    cc.director.loadScene('cutscene_2');
                },
                event:{
                    "subtype" : "workshop_finish",
                }
            });
        }
 */
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
            "first_load": true,
        });
 
    }
 
    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
