const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import {Sound} from "../core/Sound";
import {Notebook} from "../core/Notebook";
import {Scene} from "../core/Scene";
import {SaveManager} from "../core/SaveManager";
import * as text from "../text/i18n";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
import * as Polyglot from "node-polyglot";

@ccclass
export default class StartScreen extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        gd.observer.clearSubscriptions();
        gd.directory.clearElements();
        gd.directory.clearNodes();

        gd.frame["dt"] = 0;

        var id_count=0;

        var settings = gd.directory.searchId("settings");
        if(settings["language"] === "el") {
            gd.directory.getNode("/Canvas/background/cover_title").active = false;
            gd.directory.getNode("/Canvas/background/greek_title").active = true;
        }

        gd.observer.addEvent({
            "type": "scene_start",
            "scene": "start_screen",
        });

        Scene.init();

        //start new game
        gd.observer.addSubscription({
            listener : function(event) {
                cc.director.loadScene("player_select");
            },
            event:{
                type : "click",
                "data.custom": "start_new_game",
            }
        });

        if(SaveManager.save_exists()) {
            gd.directory.getNode("/Canvas/background/sprite_load").active = true;
            var username = SaveManager.get_save_username();

            if(username && username !== "undefined") {
                gd.directory.getNode("/Canvas/background/sprite_load/B11").getComponent("cc.Label").string += ' - ' + username;
            }

            gd.observer.addSubscription({
                listener : function(event) {
                    SaveManager.load_save();
                },
                event:{
                    type : "click",
                    "data.custom": "load_previous_game",
                }
            });
        }

        //show credits
        var credits_node = gd.directory.getNode("/Canvas/background/credits");
        var credits_iframe_node = gd.directory.getNode("/Canvas/background/credits/credits_webview");
        var credits_iframe_component: cc.WebView = credits_iframe_node.getComponent("cc.WebView");
        var url_folder;

        if(window["location"]["href"].endsWith("/")) {
            url_folder = window["location"]["href"];
        } else {
            var slice_pos = window["location"]["href"].lastIndexOf("/");
            url_folder = window["location"]["href"].slice(0,slice_pos+1);
        }

        credits_iframe_component.url = url_folder + 'res/raw-assets/html/credits/index.html?t=' + Date.now();
        
        gd.observer.addSubscription({
            listener : function(event) {
                credits_node.y = 0;
            },
            event:{
                type : "click",
                "data.custom": "show_credits",
            }
        });

        //close credits
        gd.observer.addSubscription({
            listener : function(event) {
                credits_node.y = 772;
            },
            event:{
                type : "click",
                "data.custom": "close_credits",
            }
        });


    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();
    }
}
