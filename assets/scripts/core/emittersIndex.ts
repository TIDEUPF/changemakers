import * as nodeEmitters from './emitters/nodeEmittersIndex';

export const emitters: { [s: string]: Object } = {
    "node" : nodeEmitters.node,
};
