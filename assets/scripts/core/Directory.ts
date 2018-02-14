import IGameElement from "./IGameElement";
import * as Loki from "lokijs";

export default class Directory {
    private elements: Array<Object>;
    private elementKeys: Object;
    private statusId: Object;
    private nodePath: Object;

    _db: Loki;
    _cl: Collection<any>;

    addStatus(status: Object): Object {
        var stored_status = this._cl.find({"id": status["id"]});
        if(stored_status.length > 0) {
            return stored_status[0];
        }

        this._cl.insert(status);
        this.statusId[status["id"]] = status;

        return status;
    }

    addElement(element: IGameElement) {
        this.elementKeys[element.getId()] = element;
    }

    getElement(elementId: string): IGameElement {
        return this.elementKeys[elementId];
    }


    clearElements() {
        this.elementKeys = [];
    }

    clearNodes() {
        this.nodePath = [];
    }

    getNode(nodePath: string): cc.Node {
        if(typeof this.nodePath[nodePath] === "undefined") {
            this.nodePath[nodePath] = cc.find(nodePath);
        }

        return this.nodePath[nodePath];
    }

    search(properties : Object, first?: boolean) : Array<Object> {
        return this._cl.find(properties);
    }

    searchId(id: string): Object {
        var result = this._cl.find({
            "id": id,
        });

        if(result.length) {
            return result[0];
        }
        
        return null;
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
