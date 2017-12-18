const {ccclass, property} = cc._decorator;

import Observer from "../core/Observer";
import Directory from "../core/Directory";
import GameElement from "../core/GameElement";
import * as gd from "../core/GameData";
import * as Loki from "lokijs";
//import { actions } from "../core/actions";
//import * as nn from "../core/actions";

enum GameEventType {
    Input = 1,
};

enum GameInputEventType {
    Key = 1,
};

@ccclass
export default class SceneInit extends cc.Component {
    observer: Observer;
    directory: Directory;
    db: Loki;
    cl: Collection<any>;

    onLoad() {
        // init logic
        var init = this;
        console.log("game init");
        
        gd.frame["dt"] = 0;
        //gd.directory = new Directory();
        //this.observer = new Observer();
        console.log("observer created");
        
        var keyEventListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                let gameEvent = {
                    type: "keyinput",
                    emitter : {
                        type : GameEventType.Input,
                        subtype : GameInputEventType.Key,
                    },
                    data : {
                        key : keyCode
                    }
                };

                gd.observer.addEvent(gameEvent);
            }.bind(this)
        });

        cc.eventManager.addListener(keyEventListener, 1000);

        //console.log(gamenn.moveUp);
        var id_count=0;
        console.log(cc.find('/Canvas/background1/queen'));

        /*this.db = new Loki('mydb');
        this.cl = this.db.addCollection('children')
        this.cl.insert({name:'Sleipnir', legs: 8})
        this.cl.insert({name:'Jormungandr', legs: 0})
        this.cl.insert({name:'Hel', legs: 2})

        for(var i=0;i<500;i++)
        this.cl.insert({name:'Hel'+i, legs: 2+i});

        console.log(this.cl.get(1)); // returns Sleipnir
        console.log(this.cl.find( {'name':'Sleipnir'} ))
        console.log(this.cl.find( { legs: { '$gt' : 2 } } ))
*/

        var queen_status = {
            "type": "node",
            "action": "moveUp",
            "emitter": "alarm",
            "id": (id_count++).toString(10),
            "element_id" : "/Canvas/background1/queen",
            "metals" : [
                "copper",
                "ore"
            ]
        };

        //this.cl.insert(queen_status)

        gd.directory.addStatus(queen_status);

        var gameelement: any = new GameElement(queen_status, cc.find('/Canvas/background1/queen'));

        gd.directory.addElement(gameelement);

        let elementListener = {
            listener : gameelement.getId(),
            event : {
                    type : "keyinput",
            }
        };
        gd.observer.addSubscription(elementListener);
        console.log("listener added");

        gd.observer.sendSyncMessage({
            receiver : {id : queen_status.id},
            content: {
                attributes : {
                "speed" : "high",
                "altitude" : "low",
                },
                emitter : {
                    type : "npc",
                    subtype : "farmer",
                }
            }
        });



        let gameEvent = {
            type: "keyinput",
            emitter : {
                type : GameEventType.Input,
                subtype : GameInputEventType.Key,
            },
        };

        gd.observer.addEvent(gameEvent);
        console.log(queen_status);
    }

    update (dt) {
        gd.frame["dt"] = dt;
        gd.observer.notifyEvents();

        gd.observer.newFrame();
        //console.log(this.cl.find( { legs: { '$gt' : 2 } } ));
        var b = Math.random();
        //for(var i=b;i<b+50;i++)
        //    gd.cl.find( { legs: { '$gt' : i } } );
    }
}
