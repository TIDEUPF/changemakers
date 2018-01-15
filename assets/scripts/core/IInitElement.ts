export default abstract class IInitElement {
    protected elementStatus: Object;

    abstract init(): void;
    abstract destroy(): void;

    constructor(elementStatus: Object) {
        this.elementStatus = elementStatus;
    }
}
