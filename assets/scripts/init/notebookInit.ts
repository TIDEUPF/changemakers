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
export default class NotebookInit extends cc.Component {
    onLoad() {
        
        gd.directory.addStatus({
            "id": "notebookDataCollection",
            "data": {
                "dialogs": [
                    'item1',
                    'item2',
                    'item3',
                    'item4',
                ],
                "badges": [],
            },
        });

        new GameElement({
            "action": "notebookManagement",
            "data": {
                "notebook_id": "notebookDataCollection"
            },
            "listen" : {
                "type" : {'$containsAny' : ['dialog', 'step_start', 'step_finish']},
            }
        });

        new GameElement({
            "action": "notebookBrowser",
            "id": "notebookPresentation",
            "data": {
                "notebook_id": "notebookDataCollection",
                "current_page": 0,
                "last_displayed_entry": 0,
            },
            "listen" : {
                "type" : {'$containsAny' : ['show_notebook', 'next_page', 'previous_page', 'first_page']},
            }
        });

        gd.observer.addSubscription({
            listener : function() {
                gd.observer.addEvent({
                    type: "show_notebook",
                });
            },
            event:{
                type : "keyinput",
                "data.key": "k",
            }
        });

        /*
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
        */
    }
}
