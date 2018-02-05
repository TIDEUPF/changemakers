import * as Loki from "lokijs";
import Directory from "../core/Directory";
import * as gd from "../core/GameData";

export default class Observer {
    private directory: Directory;
    private _susbcriptions: Collection<any>;

    _db: Loki;
    _cl: Collection<any>;

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
        this._cl.insert(event);
    }

    newFrame() : void {
        this._cl = this._db.addCollection('gameEvents');
    }

    notifyEvents() : void {
        var result: Object = {};

        for(let susbcription of this._susbcriptions.find()) {
            var matched = this._cl.find(susbcription["event"]);
            var receiver = susbcription["listener"];

            matched.forEach(function(item) {
                if(typeof result[receiver] === "undefined") {
                    result[receiver] = [];
                }

                result[receiver].push(item);
            });
        }

        for(let key in result) {
            var element = this.directory.getElement(key);
            element.processAction(result[key]);
        }
    }

    constructor() {
        this.directory = gd.directory;
        this._db = new Loki('eventsdb');
        this._cl = this._db.addCollection('gameEvents');
        this._susbcriptions = this._db.addCollection('subscriptions');
    }
}  
