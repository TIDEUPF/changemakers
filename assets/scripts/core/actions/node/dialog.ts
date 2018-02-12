import ElementAction from "../../ElementAction";
import ActionResult from "../../ActionResult";
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
        var dialog_text_string: string = text.i18n.t(current_dialog_data["text_id"]);

        if(last_char_displayed + 1 > dialog_text_string.length) {
            //text unit finished

            result.events = [
                {
                    "type": "dialog",
                    "subtype": "turn_finished",
                    "data": {
                        "id": this.elementStatus["id"],
                        "speaker": this.elementStatus["resources"]["node"][current_dialog_data["speaker"]],
                        "text": this.elementStatus["resources"]["node"]["dialog_text"],
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

                cc.director.loadScene('carriage');

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
            dialog_text_string = text.i18n.t(current_dialog_data["text_id"]);
        }

        var character: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["speakers"] + current_dialog_data["speaker"]);
        var dialog: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"]);
        var callout_arrow: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + '/callout_arrow');

        dialog.active = true;
        //set dialog position
        dialog.x = character.x;
        //dialog.y = (character.height * ( 1 - character.anchorY )) * character.scaleY + character.y + dialog.height;
        //dialog.y = -character.y * character.scaleY - dialog.height;
        dialog.y = character.y + (character.height * ( 1 - character.anchorY )) * character.scaleY + dialog.height * ( 1 - dialog.anchorY ) * dialog.scaleY + callout_arrow.height * callout_arrow.scaleY * dialog.scaleY;
        //callout_arrow.x = character.x;// + ((character.width * ( 1 - character.anchorX ))) * character.scaleX;
        callout_arrow.x = 0;

        var dialog_text: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + "/dialog_text");
        var dialog_text_component: cc.RichText = dialog_text.getComponent('cc.RichText');
        var w_size: cc.Node = gd.directory.getNode(this.elementStatus["resources"]["node"]["dialog"] + '/w_size');
        var char_width: number = w_size.width*0.65;
        var max_chars: number = Math.floor(dialog_text.width/char_width) * balloon_max_lines;


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
