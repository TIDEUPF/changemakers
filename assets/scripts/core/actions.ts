//import * as node from './actions/node';

//export { actions };

import * as node from './actions/node';

export const actions: { [s: string]: Object } = {
    "node" : node.node,
};

/*export class actions {
    public static readonly node = node.node;
};*/
