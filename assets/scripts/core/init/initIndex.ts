import * as clickEvent from './clickEvent';
import IInitElement from "../IInitElement";

export type InitList = {[s: string]: () => IInitElement};

export const init: InitList = {
    "clickEvent" : clickEvent.clickEvent,
};
