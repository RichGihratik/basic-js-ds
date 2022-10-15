const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  head = null;

  root() {
    return this.head;
  }

  add(value) {
    if (this.head === null) this.head = new Node(value);
    else {
      let parent = this.head;
      let current = this.head;
      while(current !== null) {
        parent = current;
        if (value <= current.data) current = current.left;  
        else current = current.right;
      }

      if (value <= parent.data) parent.left = new Node(value);  
      else parent.right = new Node(value); 
    }
  }

  has(value) {
    return this.find(value) !== null;
  }

  findNodeAndParent(value) {
    let parent = null;
    let current = this.head;
    while(current !== null) {
      if (value === current.data) return [current, parent];
      parent = current;
      if (value < current.data) current = current.left;  
      else current = current.right;
    }
    return null;
  }

  find(value) {
    let nodes = this.findNodeAndParent(value);
    return nodes === null ? null: nodes[0];
  }

  remove(value) {
    let pair = this.findNodeAndParent(value);
    if (pair !== null) {
      let [child, parent] = pair;
      
      if (parent === null) this.head = null;
      else if (parent.left === child) parent.left = null;
      else parent.right = null;
      
      while (child.left !== null || child.right !== null) {
        let current = child;
        let head = null;
        
        while (current.left !== null || current.right !== null) {
          if (current.left !== null) { 
            head = current;
            current = current.left; 
          }
          else if (current.right !== null) {
            head = current;
            current = current.right;
          }
        }

        this.add(current.data);
        if (head.left === current) head.left = null;
        else head.right = null;
      }
    }
  }

  min() {
    if (this.head !== null) {
      let current = this.head;
      while(current.left !== null) current = current.left;
      return current.data;
    }
    return null;
  }

  max() {
    if (this.head !== null) {
      let current = this.head;
      while(current.right !== null) current = current.right;
      return current.data;
    }
    return null;
  }
}

module.exports = {
  BinarySearchTree
};