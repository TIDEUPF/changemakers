import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import {Utils} from "../../../core/Utils";
import {Sound} from "../../../core/Sound";
import * as gd from "../../../core/GameData";
import * as text from "../../../text/i18n";

class Dialog extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        const balloon_max_size = 150;
        const balloon_max_lines = 3;
        let result: ActionResult = {};

        var dialog = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);

        if(this.elementStatus["voice_active"]) {
            if(events[0]["subtype"] !== "voice_finished")
                return;
        }
        
        var dialog_navigation: cc.Node = Utils.dialogNavigation();

        var current_dialog = this.elementStatus["current_dialog"];
        var last_char_displayed = this.elementStatus["last_char_displayed"];
        if(!current_dialog) {
            current_dialog = Object.keys(this.elementStatus["resources"]["dialog_list"])[0];
        }

        var current_dialog_data = this.elementStatus["resources"]["dialog_list"][current_dialog];
        var dialog_text_string: string = text.i18n.t(current_dialog_data["text_id"], current_dialog_data["data"]);

        var dialog_key_list = Object.keys(this.elementStatus["resources"]["dialog_list"]);
        var current_index = dialog_key_list.indexOf(current_dialog);

        if(this.elementStatus["dialog_navigation"]) {
            if(events[0]["subtype"] !== "dialog_navigation")
                return;

            var index=0;
            switch(events[0]["data"]["dialog_action"]) {
                case "dialog_next":
                    result.events = [
                        {
                            "type": "dialog",
                            "subtype": "turn_finished",
                            "data": {
                                "id": this.elementStatus["id"],
                                "speaker": current_dialog_data["speaker"],
                                "text_id": current_dialog_data["text_id"],
                            },
                        },
                    ];
                    index=1;
                    break;
                case "dialog_previous":
                    index=-1;
                    break;
                default:
            }
            
            current_index += index;
            current_index = current_index < 0 ? 0 : current_index;
            if(current_index < dialog_key_list.length) {
                current_dialog = dialog_key_list[current_index];
                this.elementStatus["current_dialog"] = current_dialog;
                current_dialog_data = this.elementStatus["resources"]["dialog_list"][current_dialog];
                dialog_text_string = text.i18n.t(current_dialog_data["text_id"], current_dialog_data["data"]);
                last_char_displayed = 0;
            }
        
            gd.observer.removeSubscription({
                "id": "dialog_navigation_listener",
            });

            this.elementStatus["dialog_navigation"] = false;
            dialog_navigation.active = false;
        }
        
        if(last_char_displayed + 1 > dialog_text_string.length) {
            //text unit finished                     
            //last_char_displayed = 0;
            //var dialog_key_list = Object.keys(this.elementStatus["resources"]["dialog_list"]);
            //var current_index = dialog_key_list.indexOf(current_dialog);

            if(current_index + 1 > dialog_key_list.length) {
                //finish
                var dialogListener = {
                    "listener" : this.elementStatus["id"],
                    /*"event.type" : "keyinput",*/
                };

                gd.observer.removeSubscription(dialogListener);

                dialog.active = false;

                result.events.push({
                        "type": "dialog",
                        "subtype": "dialog_finished",
                        "data": {
                            "id": this.elementStatus["id"],
                            "scene": this.elementStatus["resources"]["scene"],
                        },
                    },
                );

                return result;
            } else {
                //deactivate the voice
                this.elementStatus["voice_active"] = false;

                this.elementStatus["dialog_navigation"] = true;

                //
                if(gd.scene["dialog_auto_jump"] === true) {
                    result.events.push({
                        "type": "dialog",
                        "subtype": "dialog_navigation",
                        "data": {
                            "dialog_action": "dialog_next",
                            "id": this.elementStatus["id"],
                            "scene": this.elementStatus["resources"]["scene"],
                        },
                    });
                } else {
                    var dialog_control = {
                        "dialog_previous": current_index > 0,
                        "dialog_next": true,//!(current_index + 2 > dialog_key_list.length),
                        "dialog_repeat": true,
                    }

                    dialog.active = false;
                    Utils.showDialogNavigation(dialog_control);

                    //register dialog navigation
                    var key_control = ["s"];
                    if(dialog_control["dialog_previous"])
                        key_control.push("a");
                    if(dialog_control["dialog_next"])
                        key_control.push("d");

                    var eventStatus = this.elementStatus;
                    gd.observer.addSubscription({
                        id: "dialog_navigation_listener",
                        listener : function(event) {
                            var action: string;

                            switch(event["data"]["key"]) {
                                case "a":
                                    action = "dialog_previous";
                                    break;
                                case "d":
                                    action = "dialog_next";
                                    break;
                                case "s":
                                    action = "dialog_repeat";
                                    break;
                                default:
                                //action = "dialog_next";
                            }
                            gd.observer.addEvent({
                                "type": "dialog",
                                "subtype": "dialog_navigation",
                                "data": {
                                    "dialog_action": action,
                                    "id": eventStatus["id"],
                                    "scene": eventStatus["resources"]["scene"],
                                },
                            });
                        },
                        event:{
                            type : "keyinput",
                            "data.key": {
                                "$containsAny": [
                                    "a",
                                    "d",
                                    "s",
                                ]},
                        }
                    });
                }

                return result;
                /*
                current_dialog = dialog_key_list[current_index+1];
                this.elementStatus["current_dialog"] = current_dialog;
                current_dialog_data = this.elementStatus["resources"]["dialog_list"][current_dialog];
                dialog_text_string = text.i18n.t(current_dialog_data["text_id"], current_dialog_data["data"]);
                */
            }
        }


        var dialog_text: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + "/dialog_text");

        if(current_dialog_data["speaker"] == "narrator") {
            var speaker_dialog = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);
            
            //TODO: search for every parent to properly position the callout
            var background = gd.directory.getNode('/Canvas/background');

            speaker_dialog.active = false;
            dialog_text = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + "/dialog_text");
            Utils.showDialogWidget();
            dialog.active = true;
            var callout_arrow: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + '/callout_arrow');
            callout_arrow.active = false;
            var canvas: cc.Node = gd.directory.getNode('/Canvas');
            dialog.x = 0;
            dialog.y = canvas.height - dialog.height/2;
        } else {
            var narrator_dialog = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);
            narrator_dialog.active = false;
            var character: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["speakers"] + '/' + current_dialog_data["speaker"]);
            var callout_arrow: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + '/callout_arrow');
            character.active = true;
            dialog = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);
            dialog_text = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + "/dialog_text");
            Utils.showDialogWidget();
            dialog.active = true;
            
            var background = gd.directory.getNode(this.elementStatus["resources"]["node"]["speakers"]);

            callout_arrow.active = true;
            //set dialog position
            dialog.x = background.x + character.x;
            dialog.y = background.y + character.y + (character.height * ( 1 - character.anchorY )) * character.scaleY + dialog.height * ( 1 - dialog.anchorY ) * dialog.scaleY + callout_arrow.height * callout_arrow.scaleY * dialog.scaleY;
            callout_arrow.x = 0;
        }

        
        var dialog_text_component: cc.Label = dialog_text.getComponent('cc.Label');
        var w_size: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + '/w_size');
        var char_width: number = w_size.width*0.55;
        var max_chars: number = Math.floor(dialog_text.width/char_width) * balloon_max_lines;

        //voice support
        var voices: Object = gd.directory.searchId("game_voices");
        if(/*last_char_displayed == 0 && */voices["data"][current_dialog_data["text_id"]]) {
            var voice_duration: number = voices["data"][current_dialog_data["text_id"]]["duration"];
            var n_splits = Math.ceil(dialog_text_string.length/max_chars);
            var split_duration = voice_duration/n_splits;
            var current_game_time = Utils.gameTime();

            //schedule events
            var event_time = current_game_time + /*(i+1) * */Math.floor(split_duration*1000);

            gd.observer.addEvent({
                type: "voice",
                subtype: "voice_finished",
                data: {
                    voice_id: current_dialog_data["text_id"],
                },
                scheduling: {
                    afterGameTime : event_time,
                },
            });
            /*
            for(var i=0;i<n_splits;i++) {
                var event_time = current_game_time + (i+1) * Math.floor(split_duration*1000);

                gd.observer.addEvent({
                    type: "voice",
                    subtype: "voice_finished",
                    data: {
                        voice_id: current_dialog_data["text_id"],
                    },
                    scheduling: {
                        afterGameTime : event_time,
                    },
                });
            }*/

            if(last_char_displayed === 0)
                Sound.voice(current_dialog_data["text_id"]);

            var n_chars_full_dialog = dialog_text_string.length;

            max_chars = Math.ceil(n_chars_full_dialog/(n_splits));
            this.elementStatus["voice_active"] = true;
        } else {
            var voice_duration: number = dialog_text_string.length * 0.1;
            var n_splits = Math.ceil(dialog_text_string.length/max_chars);
            var split_duration = voice_duration/n_splits;
            var current_game_time = Utils.gameTime();

            //schedule events
            var event_time = current_game_time + /*(i+1) * */Math.floor(split_duration*1000);

            gd.observer.addEvent({
                type: "voice",
                subtype: "voice_finished",
                data: {
                    voice_id: current_dialog_data["text_id"],
                },
                scheduling: {
                    afterGameTime : event_time,
                },
            });
            /*
            for(var i=0;i<n_splits;i++) {
                var event_time = current_game_time + (i+1) * Math.floor(split_duration*1000);

                gd.observer.addEvent({
                    type: "voice",
                    subtype: "voice_finished",
                    data: {
                        voice_id: current_dialog_data["text_id"],
                    },
                    scheduling: {
                        afterGameTime : event_time,
                    },
                });
            }*/

            //if(last_char_displayed === 0)
                //Sound.voice(current_dialog_data["text_id"]);

            var n_chars_full_dialog = dialog_text_string.length;

            max_chars = Math.ceil(n_chars_full_dialog/(n_splits));
            this.elementStatus["voice_active"] = true;           
        }
        
        
        dialog_text_string = dialog_text_string.substring(last_char_displayed);

        if(dialog_text_string.length > max_chars) {
            dialog_text_string = dialog_text_string.substring(0, max_chars);
            var dialog_text_string_words = dialog_text_string.split(' ');
            dialog_text_string_words.pop();
            dialog_text_string = dialog_text_string_words.join(' ');
        }

        this.elementStatus["last_char_displayed"] = dialog_text_string.length + last_char_displayed;

        //dialog_text_component.string = '<color=#343434><b>' + dialog_text_string + '</b></color>';
        dialog_text_component.string = dialog_text_string;
        
        return result;
    }
}

export const dialog: (elementStatus: Object, element: cc.Node) => Dialog = 
    function(elementStatus: Object, element: cc.Node): Dialog {
        return new Dialog(elementStatus, element)
    };
