const {ccclass, property} = cc._decorator;

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
        console.log("game init");
        
        text.i18n.init("en");

        var keyEventListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                let gameEvent = {
                    type: "keyinput",
                    emitter : {
                        type : GameEventType.Input,
                        subtype : GameInputEventType.Key,
                    },
                    data : {
                        key : keyCode
                    }
                };

                gd.observer.addEvent(gameEvent);
            }.bind(this)
        });

        cc.eventManager.addListener(keyEventListener, 1000);

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
                    "front_wheel" : "/Canvas/background/carriage/front_wheel",
                    "chasis" : "/Canvas/background/carriage/chasis",
                    "pattern" : "/Canvas/background/carriage/pattern",
                    "seat" : "/Canvas/background/carriage/seat",
                    "stairs" : "/Canvas/background/carriage/stairs",
                    "top" : "/Canvas/background/carriage/top",
                    "rear_wheel" : "/Canvas/background/carriage/rear_wheel",
                    "boot" : "/Canvas/background/carriage/boot",
                },
            },
            "init": {
                "clickEvent": {
                    "front_wheel" : {},
                    "chasis" : {},
                    "pattern" : {},
                    "seat" : {},
                    "stairs" : {},
                    "top" : {},
                    "rear_wheel" : {},
                    "boot" : {},
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
                    origin: {'$containsAny' : ['front_wheel', 'rear_wheel', 'pattern', 'stairs', 'boot', 'top', 'seat', 'chasis']},
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
                "node" : {
                    "front_wheel" : "/Canvas/background/selection/front_wheel",
                    "chasis" : "/Canvas/background/selection/chasis",
                    "pattern" : "/Canvas/background/selection/pattern",
                    "seat" : "/Canvas/background/selection/seat",
                    "stairs" : "/Canvas/background/selection/stairs",
                    "top" : "/Canvas/background/selection/top",
                    "rear_wheel" : "/Canvas/background/selection/rear_wheel",
                    "boot" : "/Canvas/background/selection/boot",
                },
            },
            "init": {
                "clickEvent": {
                    "front_wheel" : {},
                    "chasis" : {},
                    "pattern" : {},
                    "seat" : {},
                    "stairs" : {},
                    "top" : {},
                    "rear_wheel" : {},
                    "boot" : {},
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
                    origin: {'$containsAny' : ['front_wheel', 'rear_wheel', 'pattern', 'stairs', 'boot', 'top', 'seat', 'chasis']},
            }
        };
        gd.observer.addSubscription(selection_listener);


        //user built carriage
        gd.directory.addStatus({
            "id": "user_built_carriage",
            "data": {
                "front_wheel" : {
                    "part": "none",
                },
                "chasis" : {
                    "part": "none",
                },
                "pattern" : {
                    "part": "none",
                },
                "seat" : {
                    "part": "none",
                },
                "stairs" : {
                    "part": "none",
                },
                "top" : {
                    "part": "none",
                },
                "rear_wheel" : {
                    "part": "none",
                },
                "boot" : {
                    "part": "none",
                },
            },
        });

        gd.observer.addSubscription({
            listener : function() {
                cc.director.loadScene('map');
            },
            event:{
                type : "keyinput",
                "data.key": "m",
            }
        });
    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
        gd.observer.newFrame();
    }
}
