//import * as node from './node/index';

//export { node };

import ElementAction from "../ElementAction";
import * as moveUp from './node/moveUp';
import * as moveDown from './node/moveDown';

export type ActionList = {[s: string]: ElementAction<cc.Node>};

export const node: ActionList = {
    "moveUp" : moveUp.moveUp,
    "moveDown" : moveDown.moveDown,
};

/*
export class node {
    public static readonly moveUp = moveUp.moveUp;
    public static readonly moveDown = moveDown.moveDown;
};
*/
