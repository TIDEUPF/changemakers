export default class Observer {  
    private suscribedEvents: Array<Object>;

    suscribeEvent(event: Object) : void {
        this.suscribedEvents.push(event);
    }

    statusUpdate(element: Object) : void {
        for(let item of this.suscribedEvents) {
            if(item["trigger"] === element["trigger"]) {
                console.log("triggered event");
            }
        }
    }

    constructor() {
    }
}  

var obs = 2;
