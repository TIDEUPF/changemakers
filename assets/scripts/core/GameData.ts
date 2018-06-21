import Observer from "../core/Observer";
import Directory from "../core/Directory";

export var directory = new Directory();
export var observer = new Observer();
export var frame: Object = {dt : 0};
export var scene: Object = {
    "game_scene": "",
    "current" : null,
    "next" : null,
}
