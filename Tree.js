import { buildTree } from "./index.js";

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}

 export {
    Tree
 }
