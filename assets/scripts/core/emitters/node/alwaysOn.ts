import ElementEmitter from "../../ElementEmitter";
import EmitterResult from "../../EmitterResult";

class AlwaysOnEmitter extends ElementEmitter<cc.Node> {
    emitEvents(): EmitterResult {
        let result: EmitterResult;
        result = {};
        console.log("alwaysOn emitter");
        return result;
    }
}

export const alwaysOn: (elementStatus: Object, element: cc.Node) => ElementEmitter<cc.Node> = 
    function(elementStatus: Object, element: cc.Node): ElementEmitter<cc.Node> {
        return new AlwaysOnEmitter(elementStatus, element);
    };
