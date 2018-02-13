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
export default class MapInit extends cc.Component {
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


        //console.log(gamenn.moveUp);
        var id_count=0;

        var elements_path = "/notebook";
        
        var notebook: Object = {
            "type": "node",
            "action": "notebookManagement",
            "emitter": null,
            "id": "notebook" + (id_count++).toString(10),
            "element_id" : "/notebook",
            "data": {
                "dialogs": [],
                "badges": [],
            },
        };

        notebook = gd.directory.addStatus(notebook);
        var notebook_element: any = new GameElement(notebook, cc.find('/notebook'));
        gd.directory.addElement(notebook_element);

        var clickEventListener = {
            listener : notebook_element.getId(),
            event : {
                    type : {'$containsAny' : ['dialog', 'step_start', 'step_finish']},
            }
        };
        gd.observer.addSubscription(clickEventListener);


        var notebook_browser: Object = {
            "type": "node",
            "action": "notebookBrowser",
            "emitter": null,
            "id": "notebook" + (id_count++).toString(10),
            "element_id" : "/notebook",
            "resources": {
                "node" : {
                    "page_1" : elements_path + "background/page_1",
                    "page_2" : elements_path + "background/page_2",
                    "badges" : elements_path + "background/page_1/badges",
                    "back" : elements_path + "background/page_2/back",
                    "next" : elements_path + "background/page_2/next",
                },
                "data_id": notebook_element.getId(),
            },
        };

        notebook_browser = gd.directory.addStatus(notebook_browser);
        var notebook_browser_element: any = new GameElement(notebook_browser, cc.find('/notebook'));
        gd.directory.addElement(notebook_browser_element);

        var keyListener = {
            listener : notebook_browser_element.getId(),
            event: {
                    "type" : "keyinput",
                    "data.key" : "n",
            }
        };
        gd.observer.addSubscription(keyListener);


    }

    update (dt) {
        gd.frame["dt"] = dt;
        //gd.observer.notifyEvents();
        //gd.observer.newFrame();
    }
}