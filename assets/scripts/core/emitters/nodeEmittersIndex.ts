import ElementEmitter from "../ElementEmitter";
import * as alarm from './node/alarm';

export type EmitterList = {[s: string]: (elementStatus: Object, element: cc.Node) => ElementEmitter<cc.Node>};

export const node: EmitterList = {
    "alarm" : alarm.alarm
};
