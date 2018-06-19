import Observer from "../core/Observer";
import Directory from "../core/Directory";

export var directory = new Directory();
export var observer = new Observer();
export var frame: Object = {dt : 0};
export var game_scene: String = "";
export var scene: Object = {
    "current" : null,
    "next" : null,
}
