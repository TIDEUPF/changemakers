import ElementAction from "../ElementAction";
import * as moveUp from './node/moveUp';
import * as moveDown from './node/moveDown';
import * as dialog from './node/dialog';
import * as showElement from './node/showElement';
import * as selectCarriageElement from './node/selectCarriageElement';

export type ActionList = {[s: string]: (elementStatus: Object, element: cc.Node) => ElementAction<cc.Node>};

export const node: ActionList = {
    "moveUp" : moveUp.moveUp,
    "moveDown" : moveDown.moveDown,
    "dialog" : dialog.dialog,
    "showElement" : showElement.showElement,
    "selectCarriageElement" : selectCarriageElement.selectCarriageElement,
};
