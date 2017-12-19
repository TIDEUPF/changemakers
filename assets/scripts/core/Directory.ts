import IGameElement from "./IGameElement";
import * as Loki from "lokijs";

export default class Directory {
    private elements: Array<Object>;
    private elementKeys: Object;
    private statusId: Object;
    private nodePath: Object;

    _db: Loki;
    _cl: Collection<any>;

    addStatus(status: Object) : void {

        /*
        this.elements.push(element);

        var addValueKey: (key: string, elementId: string) => void =
            function(key: string, elementId: string): void {
                if(typeof this.elementKeys[key] === "undefined") {
                    this.elementKeys[key] = [];
                }
                this.elementKeys[key].push(elementId);
            }.bind(this);

        var addObject: (prefix: string, element: Object) => void =
            function(prefix: string, element: Object): void {
                for(var element_key in element) {
                    if(element[element_key] instanceof Array) {
                        for(var element_item of element[element_key]) {
                            var value_key = prefix + element_key + ':' + element_item;
                            addValueKey(value_key, element["id"]);
                        }
                    } else if(typeof element[element_key] === "string") {
                        var value_key = prefix + element_key + ':' + element[element_key];
                        addValueKey(value_key, element["id"]);
                    } else if(element[element_key] instanceof Object) {
                        addObject(prefix + element_key + ':' + element_key + ':', element[element_key]);
                    }
                }
            }
            
            addObject("", element);
*/

        this._cl.insert(status);
        this.statusId[status["id"]] = status;
    }

    addElement(element: IGameElement) {
        this.elementKeys[element.getId()] = element;
    }

    getElement(elementId: string): IGameElement {
        return this.elementKeys[elementId];
    }

    getNode(nodePath: string): cc.Node {
        if(typeof this.nodePath[nodePath] === "undefined") {
            this.nodePath[nodePath] = cc.find(nodePath);
        }

        return this.nodePath[nodePath];
    }

    search(properties : Object) : Array<Object> {
        /*
        var keys: Array<string> = [];
        var elementCount: Object;
        var result: Array<Object>;

        var addObject: (prefix: string, element: Object) => void =
        function(prefix: string, element: Object): void {
            for(var element_key in element) {
                if(element[element_key] instanceof Array) {
                    for(var element_item of element[element_key]) {
                        var value_key = prefix + element_key + ':' + element_item;
                        keys.push(value_key);
                    }
                } else if(element[element_key] instanceof String) {
                    var value_key = prefix + element_key + ':' + element[element_key];
                    keys.push(value_key);
                } else if(element[element_key] instanceof Object) {
                    addObject(prefix + element_key + ':' + element_key + ':', element[element_key]);
                }
            }
        }
        
        addObject("", properties);

        for(var keys_item of keys) {
            for(var elementId of keys_item) {
                if(elementCount[elementId] === "undefined") {
                    elementCount[elementId] = {};
                }

                elementCount[elementId][keys_item] = true;
            }
        }

        for(var elementCount_item in elementCount) {
            if(Object.keys(elementCount[elementCount_item]).length === keys.length) {
                result.push(this.elementId[elementCount_item]);
            }
        }

        return result;
        */

        return this._cl.find(properties);
    }

    constructor() {
        this.elements = [];
        this.statusId = {};
        this.elementKeys = {};
        this.nodePath = {};

        this._db = new Loki('directory.json');
        this._cl = this._db.addCollection('directory')
    }
}
