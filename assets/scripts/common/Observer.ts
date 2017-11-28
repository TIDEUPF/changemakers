export default class Observer {  
    private suscribedElements: Array<Object>;
    private eventList: Array<Object>;

    suscribeEvent(event: Object) : void {
        this.suscribedElements.push(event);
    }

    addEvent(event: Object) : void {
        this.eventList.push(event);
    }

    newFrame() : void {
        this.eventList = [];
    }

    notifyEvents() : void {
        for(let element of this.suscribedElements) {
            for(let event of this.eventList) {
                if(element["type"] === event["type"]) {
                    console.log("event notified");
                    console.log(element);
                    console.log(event);
                }
            }
        }
    }

    constructor() {
        this.suscribedElements = [];
        this.eventList = [];
    }
}  

var obs = 2;
