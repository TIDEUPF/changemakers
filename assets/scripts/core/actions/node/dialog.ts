import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
import {Utils} from "../../../core/Utils";
import * as gd from "../../../core/GameData";
import * as text from "../../../text/i18n";

class Dialog extends ElementAction<cc.Node> {
    processAction(events?: Array<Object>): ActionResult {
        const balloon_max_size = 150;
        const balloon_max_lines = 3;
        let result: ActionResult = {};

        var current_dialog = this.elementStatus["current_dialog"];
        var last_char_displayed = this.elementStatus["last_char_displayed"];
        if(!current_dialog) {
            current_dialog = Object.keys(this.elementStatus["resources"]["dialog_list"])[0];
        }

        var current_dialog_data = this.elementStatus["resources"]["dialog_list"][current_dialog];
        var dialog_text_string: string = text.i18n.t(current_dialog_data["text_id"], current_dialog_data["data"]);

        if(last_char_displayed + 1 > dialog_text_string.length) {
            //text unit finished                     

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

            last_char_displayed = 0;
            var dialog_key_list = Object.keys(this.elementStatus["resources"]["dialog_list"]);
            var current_index = dialog_key_list.indexOf(current_dialog);

            if(current_index + 2 > dialog_key_list.length) {
                //finish
                var dialogListener = {
                    "listener" : this.elementStatus["id"],
                    "event.type" : "keyinput",
                };

                gd.observer.removeSubscription(dialogListener);

                var dialog: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);
                dialog.active = false;

                gd.directory.getNode('/Canvas/dialog').active = false;

                result.events.push({
                        "type": "dialog",
                        "subtype": "dialog_finished",
                        "data": {
                            "id": this.elementStatus["id"],
                        },
                    },
                );

                return result;
            }

            current_dialog = dialog_key_list[current_index+1];
            this.elementStatus["current_dialog"] = current_dialog;
            current_dialog_data = this.elementStatus["resources"]["dialog_list"][current_dialog];
            dialog_text_string = text.i18n.t(current_dialog_data["text_id"], current_dialog_data["data"]);
        }


        var dialog: cc.Node;
        var dialog_text: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + "/dialog_text");

        if(current_dialog_data["speaker"] == "narrator") {
            var speaker_dialog = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);
            speaker_dialog.active = false;
            dialog = gd.directory.getNode('/Canvas/dialog');
            dialog_text = gd.directory.getNode('/Canvas/dialog' + "/dialog_text");
            dialog.active = true;
            var canvas: cc.Node = gd.directory.getNode('/Canvas');
            dialog.x = 0;
            dialog.y = (canvas.height/2)*1.5;
        } else {
            var narrator_dialog = gd.directory.getNode('/Canvas/dialog');
            narrator_dialog.active = false;
            var character: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["speakers"] + current_dialog_data["speaker"]);
            var callout_arrow: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + '/callout_arrow');
            character.active = true;
            dialog = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);
            dialog_text = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + "/dialog_text");
            dialog.active = true;
            
            callout_arrow.active = true;
            //set dialog position
            dialog.x = character.x;
            dialog.y = character.y + (character.height * ( 1 - character.anchorY )) * character.scaleY + dialog.height * ( 1 - dialog.anchorY ) * dialog.scaleY + callout_arrow.height * callout_arrow.scaleY * dialog.scaleY;
            callout_arrow.x = 0;
        }

        
        var dialog_text_component: cc.RichText = dialog_text.getComponent('cc.RichText');
        var w_size: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + '/w_size');
        var char_width: number = w_size.width*0.55;
        var max_chars: number = Math.floor(dialog_text.width/char_width) * balloon_max_lines;

        //voice support
        var voices: Object = gd.directory.searchId("game_voices");
        if(last_char_displayed == 0 && voices["data"][current_dialog_data["text_id"]]) {
            var voice_duration = voices["data"][current_dialog_data["text_id"]]["duration"];
            var n_splits = Math.ceil(dialog_text_string.length/max_chars);
            var split_duration = voice_duration/n_splits;
            var current_game_time = Utils.gameTime();

            //schedule events
            for(var i=0;i<n_splits;i++) {
                var event_time = current_game_time + (i+1) * Math.floor(split_duration*1000);

                gd.observer.addEvent({
                    type: "keyinput",
                    scheduling: {
                        afterGameTime : event_time,
                    },
                });
            }
            Sound.play(current_dialog_data["text_id"]);
        }
        
        dialog_text_string = dialog_text_string.substring(last_char_displayed);

        if(dialog_text_string.length > max_chars) {
            dialog_text_string = dialog_text_string.substring(0, max_chars);
            var dialog_text_string_words = dialog_text_string.split(' ');
            dialog_text_string_words.pop();
            dialog_text_string = dialog_text_string_words.join(' ');
        }

        this.elementStatus["last_char_displayed"] = dialog_text_string.length + last_char_displayed;

        dialog_text_component.string = '<color=#343434><b>' + dialog_text_string + '</b></color>';
        console.log(text.i18n.t("coachman_male_d1"));

        return result;
    }
}

export const dialog: (elementStatus: Object, element: cc.Node) => Dialog = 
    function(elementStatus: Object, element: cc.Node): Dialog {
        return new Dialog(elementStatus, element)
    };
