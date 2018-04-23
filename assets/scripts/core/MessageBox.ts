import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";

export class MessageBox {
    static text(content) {

        var tcontent = text.i18n.t(content);

        var messagebox: cc.Node = gd.directory.getNode('/messagebox');
        var messagebox_transparency: cc.Node = gd.directory.getNode('/messagebox_transparency');
        var label: cc.Node = gd.directory.getNode('/messagebox/text');
        messagebox_transparency.active = true;
        messagebox.active = true;

        var label_component: cc.Label = label.getComponent('cc.Label');
        label_component.string = tcontent;

        //TODO: avoid multiple click events assignment
        Scene.click('/messagebox_transparency');

        gd.observer.addSubscription({
            listener : function(event) {
                MessageBox.close();

                gd.observer.addEvent({
                    type: "messagebox",
                    subtype: "close",
                });

            },
            event:{
                "type" : "click",
                "origin": "messagebox_transparency",
            }
        });

    }

    static close() {
        var messagebox: cc.Node = gd.directory.getNode('/messagebox');
        var messagebox_transparency: cc.Node = gd.directory.getNode('/messagebox_transparency');
        messagebox.active = false;
        messagebox_transparency.active = false;
    }

    static path() {
        return '/messagebox';
    }
};
