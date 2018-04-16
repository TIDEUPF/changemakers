import * as gd from "./GameData";
import {Scene} from "../core/Scene";

export class MessageBox {
    static text(text) {

        var messagebox: cc.Node = gd.directory.getNode('/messagebox');
        var label: cc.Node = gd.directory.getNode('/messagebox/text');
        messagebox.active = true;

        var label_component: cc.Label = label.getComponent('cc.Label');
        label_component.string = text;

        Scene.click('/messagebox');

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
                "origin": "messagebox",
            }
        });

    }

    static close() {
        var messagebox: cc.Node = gd.directory.getNode('/messagebox');
        messagebox.active = false;
    }

    static path() {
        return '/messagebox';
    }
};
