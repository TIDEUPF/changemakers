import * as gd from "./GameData";
import * as text from "../text/i18n";
import {Scene} from "../core/Scene";
import {Slider} from "../core/Slider";

var user_agent_key: string;
var user_agent_key_length = 32;
var game_number: number;
var frame: number;
var log = [];
var log_index = 0;
const alphabet = "abcdefghijklmnoprstuvwxyz0123456789";
var sender_ready = true;

export const ActivityLog = {
    init: function() {
        frame = 0;
        user_agent_key = "";
        for(var i=0;i<user_agent_key_length;i++) {
            user_agent_key += alphabet[Math.floor(Math.random()*alphabet.length)];
        }
        
        if(localStorage.getItem("game_number") === null) {
            game_number = 1;
        } else {
            game_number = parseInt(localStorage.getItem("game_number"), 10) + 1;
        }
        localStorage.setItem("game_number", game_number.toString());

        if(localStorage.getItem("user_agent_key") === null) {
            localStorage.setItem("user_agent_key", user_agent_key);
        } else {
            user_agent_key = localStorage.getItem("user_agent_key");
        }
    },
    addFrame: function() {
        frame++;
    },
    addFrameLog: function(start: boolean) {
        var player = gd.directory.searchId("player");
        var carriage = gd.directory.searchId("user_built_carriage");
        var indicators = gd.directory.searchId("indicators0");

        var frame_item = {
            type: start ? "frame_start" : "frame_end",
            event: JSON.stringify({
                player: player,
                carriage: carriage,
                indicators: indicators,
                scene: gd.scene,
            }),
        };

        this.addItem(frame_item);
    },
    addEvent: function(event) {
        var event_item = {
            type: event["type"] ? event["type"] : "unknown",
            event: JSON.stringify(event),
        };

        this.addItem(event_item);
    },
    addItem: function(data) {
        var date = new Date();
        data["user_agent_key"] = user_agent_key;
        data["game_number"] = game_number;
        data["date"] = Date.now();
        data["timezoneoffset"] = date.getTimezoneOffset();

        log.push(data);
    },
    send: function() {
        if(log_index>=log.length-1)
            return;

        ActivityLog.addFrameLog(false);
        var index_end = Math.min(log_index+150, log.length);
        var to_send = log.slice(log_index, index_end);
        log_index = index_end;

        if(to_send.length === 0)
            return;

            /*
        console.log(to_send);

        var log_url = window["log_url"] || "http://192.168.1.200/cmk_log/log.php";

        if(window["$"]) {
            if(!sender_ready)
                return;
            sender_ready = false;
            window["$"].ajax({     
                url: log_url,
                data: {data:JSON.stringify(to_send)},
                method: "POST",
                complete: function () {
                    sender_ready = true;
                },
                timeout: 30*1000,
            });
        }
        */
    },
    register: function() {
        return Date.now();
    },
}
