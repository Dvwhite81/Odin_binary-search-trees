import { Node } from "./Node.js";
import { buildTree } from "./index.js";

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value, newNode = this.root) {
    if (newNode === null) {
      return (newNode = new Node(value));
    }

    if (newNode.value > value) {
      newNode.left = this.insert(value, newNode.left);
    } else if (newNode.value < value) {
      newNode.right = this.insert(value, newNode.right);
    }
    return newNode;
  }

  delete(value, newNode = this.root) {
    if (newNode === null) {
      return newNode;
    }

    if (newNode.value > value) {
      newNode.left = this.delete(value, newNode.left);
    } else if (newNode.value < value) {
      newNode.right = this.delete(value, newNode.right);
    } else {
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
      } else {
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

  levelOrder(callback) {
    if (this.root === null) return;
    const queue = [this.root];
    const array = [];

    while (queue.length) {
      let current = queue.shift();
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);

      if (callback) array.push(callback(current));
      else array.push(current.value);
    }
    return array;
  }

  // For the next three:
  // I'm not sure if I'm supposed to have an optional
  // function argument like levelOrder
  inorder(current = this.root, array = []) {
    if (current === null) return array;
    if (current.left) this.inorder(current.left, array);
    array.push(current.value);
    if (current.right) this.inorder(current.right, array);
    return array;
  }

  preorder(current = this.root, array = []) {
    if (current === null) return array;
    array.push(current.value);
    if (current.left) this.preorder(current.left, array);
    if (current.right) this.preorder(current.right, array);
    return array;
  }

  postorder(current = this.root, array = []) {
    if (current === null) return array;
    if (current.left) this.postorder(current.left, array);
    if (current.right) this.postorder(current.right, array);
    array.push(current.value);
    return array;
  }

  height(current = this.root) {
    if (current === null) return -1;

    let left = this.height(current.left);
    let right = this.height(current.right);

    return Math.max(left, right) + 1;
  }

  depth(current = this.root, node, depth = 0) {
    if (current === null || node === null) return;
    if (current === node) return depth;

    if (node.value < current.value) {
      depth++;
      return this.depth(current, node, depth);
    }
    if (node.value > current.value) {
      depth++;
      return this.depth(current, node, depth);
    }
  }

  isBalanced(current = this.root) {
    const left = this.height(current.left);
    const right = this.height(current.right);

    if (Math.abs(left - right) <= 1) return true;
    else return false;
  }

  rebalance(current = this.root) {
    let arr = this.levelOrder();
    arr.sort((a,b) => a - b);
    return this.root = buildTree(arr);
  }
}

export { Tree };
