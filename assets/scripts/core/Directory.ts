export default class Directory {  
    private elements: Array<Object>;

    addElement(element: Object) : void {
        this.elements.push(element);
    }

    search(properties : Object) : Object {
        var keys: Array<string> = ["attributes"];

        for(let keys_item of keys) {
            if (!properties[keys_item])
                continue;

            switch(typeof properties[keys_item])
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
        this.elements = [];
    }
}  

