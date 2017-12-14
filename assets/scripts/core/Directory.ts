export default class Directory {  
    private elements: Array<Object>;

    addElement(element: Object) : void {
        this.elements.push(element);
    }

    search(properties : Object) : Object {
        //this.eventList = [];
    }

    constructor() {
        this.elements = [];
    }
}  

var obs = 2;
