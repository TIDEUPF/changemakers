import * as Loki from "lokijs";
import Directory from "../core/Directory";
import * as gd from "../core/GameData";
import {Utils} from "../core/Utils";

export default class Observer {
    private directory: Directory;
    private _susbcriptions: Collection<any>;

    _db: Loki;
    _cl: Collection<any>;
    _cls: Collection<any>;

    addSubscription(subscription: Object) : void {
        this._susbcriptions.insert(subscription);
    }

    removeSubscription(subscription: Object) : void {
        this._susbcriptions.chain().find(subscription).remove();
    }

    clearSubscriptions() : void {
        this._susbcriptions.clear();
    }

    sendSyncMessage(message: Object) : void {
        var matched = this.directory.search(message["receiver"]);
        matched.forEach(function(item) {
            var element = this.directory.getElement(item["id"]);
            element.processAction([message["content"]]);
        }.bind(this));
    }

    addEvent(event: Object) : void {
        if(event["scheduling"]) {
            this._cls.insert(event);
            return;
        }

        this._cl.insert(event);
    }

    newFrame() : void {
        this._cl = this._db.addCollection('gameEvents');
    }

    notifyEvents() : void {
        var matched_subscriptions = [];

        //test for scheduling conditions
        var application_time = Utils.gameTime();
        for(let event of this._cls.find()) {
            if(event["scheduling"]["afterGameTime"]) {
                if(application_time > event["scheduling"]["afterGameTime"]) {
                    this._cls.remove(event);
                    delete event.$id;
                    this._cl.insert(event);
                }
            }
        }

        for(let susbcription of this._susbcriptions.find()) {
            var matched = this._cl.find(susbcription["event"]);
            matched_subscriptions.push({
                "subscription": susbcription,
                "matched": matched,
            });
        }

        this._cl.clear();

        for(let matched_subscription of matched_subscriptions) {
            var result: Object = {};
            var function_receiver = [];
            
            var susbcription = matched_subscription["subscription"];
            var receiver = susbcription["listener"];
            var matched:Array<any> = matched_subscription["matched"];

            matched.forEach(function(item) {
                if(typeof receiver === "function") {
                    function_receiver.push({
                        "matched": item,
                        "subscription": susbcription,
                    });
                } else {
                    if(typeof result[receiver] === "undefined") {
                        result[receiver] = [];
                    }

                    result[receiver].push(item);
                }
            });

            for(let key in function_receiver) {
                function_receiver[key]["subscription"]["listener"](function_receiver[key]["matched"]);
            }

            for(let key in result) {
                var element = this.directory.getElement(key);
                element.processAction(result[key]);
            }
        }
    }

    constructor() {
        this.directory = gd.directory;
        this._db = new Loki('eventsdb');
        this._cl = this._db.addCollection('gameEvents');
        this._cls = this._db.addCollection('gameEventsScheduled');
        
        this._susbcriptions = this._db.addCollection('subscriptions');
    }
}  
