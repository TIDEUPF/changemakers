import ElementAction from "../ElementAction";
import * as moveUp from './node/moveUp';
import * as moveDown from './node/moveDown';
import * as dialog from './node/dialog';
import * as showElement from './node/showElement';
import * as switchScene from './node/switchScene';
import * as selectCarriageElement from './node/selectCarriageElement';
import * as updateValue from './node/updateValue';
import * as notebookManagement from './node/notebookManagement';


export type ActionList = {[s: string]: (elementStatus: Object, element: cc.Node) => ElementAction<cc.Node>};

export const node: ActionList = {
    "moveUp" : moveUp.moveUp,
    "moveDown" : moveDown.moveDown,
    "dialog" : dialog.dialog,
    "showElement" : showElement.showElement,
    "switchScene" : switchScene.switchScene,
    "selectCarriageElement" : selectCarriageElement.selectCarriageElement,
    "updateValue" : updateValue.updateValue,
    "notebookManagement" : notebookManagement.notebookManagement,
};
