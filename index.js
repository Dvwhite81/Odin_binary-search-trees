import { Node } from "./Node.js";
import { Tree } from "./Tree.js";

const buildTree = (array) => {
  if (array.length < 1) return null;

  array = mergeSort(array);
  array = removeDupes(array);

  const mid = Math.floor(array.length / 2);
  const root = new Node(array[mid]);

  const queue = [[root, [0, mid - 1]], [root, [mid + 1, array.length - 1]]];
  while (queue.length > 0) {
      const [parent, [left, right]] = queue.shift();

      if (left <= right && parent != null) {
          const mid = Math.floor((left + right) / 2);
          const child = new Node(array[mid]);

          if (array[mid] < parent.value) {
              parent.left = child;
          } else {
              parent.right = child;
          }

          queue.push([child, [left, mid - 1]]);
          queue.push([child, [mid + 1, right]]);
      }
  };

  return root;
};

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  const results = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) results.push(left.shift());
    else results.push(right.shift());
  }

  return [...results, ...left, ...right];
};

function removeDupes(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const makeRandomArray = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      let num = Math.floor(Math.random() * 100) + 1;
      arr.push(num);
    }
    return arr;
  }

export { buildTree };

const randomArr = makeRandomArray();
const myTree = new Tree(randomArr);
console.log(myTree.isBalanced());
console.log(myTree.levelOrder());
console.log(myTree.preorder());
console.log(myTree.postorder());
console.log(myTree.inorder());
console.log(myTree.insert(400));
console.log(myTree.insert(500));
console.log(myTree.insert(600));
console.log(myTree.insert(700));
console.log(myTree.insert(800));
console.log(myTree.isBalanced());
console.log(myTree.rebalance());
console.log(myTree.levelOrder());
console.log(myTree.preorder());
console.log(myTree.postorder());
console.log(myTree.inorder());
