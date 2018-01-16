import * as clickEvent from './clickEvent';
import IInitElement from "../IInitElement";

export type InitList = {[s: string]: (elementStatus: Object) => IInitElement};

export const inits: InitList = {
    "clickEvent" : clickEvent.clickEvent,
};
