import ElementEmitter from "../../ElementEmitter";
import EmitterResult from "../../EmitterResult";

class AlarmEmitter extends ElementEmitter<cc.Node> {
    emitEvents(): EmitterResult {
        let result: EmitterResult;
        result = {};
        console.log("alarm emitter");
        return result;
    }
}

export const alarm: (elementStatus: Object, element: cc.Node) => ElementEmitter<cc.Node> = 
    function(elementStatus: Object, element: cc.Node): ElementEmitter<cc.Node> {
        return new AlarmEmitter(elementStatus, element)
    };
