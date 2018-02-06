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
export default class IndicatorsInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        // init logic
        var init = this;


        //console.log(gamenn.moveUp);
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
                    origin_type: "indicators",
            }
        };
        gd.observer.addSubscription(sliderEventListener);
    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
        //gd.observer.newFrame();
    }
}
