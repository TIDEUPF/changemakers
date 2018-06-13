import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";
import {Slider} from "../core/Slider";

export const Utils = {
    gameTime: function() {
        return Date.now();
    },
    dialogNavigation: function() {
        var dialog_navigation: cc.Node = gd.directory.getNode("/dialog_widget/dialog_navigation");

        if(!dialog_navigation) 
            return;

        if(dialog_navigation["navigationSetupComplete"])
            return dialog_navigation;

        for(var item of dialog_navigation.children) {
            item.on('touchstart', function(event) {
                gd.observer.addEvent({
                    type: "dialog",
                    subtype: "dialog_navigation",
                    "data": {
                        "dialog_action": event.target.name,
                    },
                });
            });
        }    

        dialog_navigation["navigationSetupComplete"] = true;

        return dialog_navigation;
    },
    setFont: function(node_path?: string) {
        if(!node_path)
            node_path = "/Canvas"
        var cn = gd.directory.getNode(node_path);
        var cs = cn.getComponentsInChildren(cc.Label);
        "GrandHotel-Regular";
        for(var csi of cs) {
        csi["useSystemFont"] = true;
        csi.fontFamily = "sans-serif";
        csi.fontSize *= 0.75;
        }
    },
    showDialogNavigation: function(enabled_buttons) {
        var navigation = this.dialogNavigation();

        for(var button of navigation.children) {
            button.active = enabled_buttons[button.name] ? true: false;
        }

        navigation.active = true;
    },
    showDialogWidget: function() {
        //var navigation = this.dialogNavigation();
        var dialog_navigation: cc.Node = gd.directory.getNode("/dialog_widget");
        dialog_navigation.active = true;
    },
    hideDialogWidget: function() {
        var navigation = this.dialogNavigation();
        var dialog_widget: cc.Node = gd.directory.getNode("/dialog_widget");
        dialog_widget.active = false;
        navigation.active = false;
    },
    translate: function(node: string | cc.Node) {
        if(typeof node === "string")
            node = gd.directory.getNode(node);

        if(node === null)
            return;
        
        //labels
        var components = node.getComponentsInChildren("cc.Label");

        for(var item of components) {
            item.string = text.i18n.t(item.node.name);
        }

        //EditBox
        var components = node.getComponentsInChildren("cc.EditBox");

        for(var item of components) {
            item.placeholder = text.i18n.t(item.placeholder);
        }
    },
}
