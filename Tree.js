import { Node } from "./Node.js";
import { buildTree } from "./index.js";

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }

    insert(value, newNode = this.root) {
        if (newNode === null) {
            return newNode = new Node(value);
        }

        if (newNode.value > value) {
            newNode.left = this.insert(value, newNode.left)
        }
        else if (newNode.value < value) {
            newNode.right = this.insert(value, newNode.right)
        }
        return newNode;
    }

    delete(value, newNode = this.root) {
        if (newNode === null) {
            return newNode;
        }

        if (newNode.value > value) {
            newNode.left = this.delete(value, newNode.left);
        }
        else if (newNode.value < value) {
            newNode.right = this.delete(value, newNode.right);
        }
        else {
            if (newNode.left === null) return newNode.right;
            if (newNode.right === null) return newNode.left;

            let successorParent = newNode;
            let successor = newNode.right;

            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

            if (successorParent !== newNode) {
                successorParent.left = successor.right;
            }
            else {
                successorParent.right = successor.right;
            }

            newNode.value = successor.value;
            successor = null;
        }
        return newNode;
    }

    find(value, current = this.root) {
        if (current === null) return;
        if (current.value === value) return current;
        if (current.value > value) return this.find(value, current.left);
        if (current.value < value) return this.find(value, current.right);
    }
}

 export {
    Tree
 }
