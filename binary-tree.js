/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinaryTree {
	constructor(root = null) {
		this.root = root;
	}

	/** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

	minDepth() {
		// declare depth var
		if (!this.root) return 0;
		let count = 1;
		const minDepthHelper = (node) => {
			// Truthfully I find this recursive transversal very diffucult to logic through
			if (node.left === null && node.right === null) return count;
			if (node.left === null) return minDepthHelper(node.right) + 1;
			if (node.right === null) return minDepthHelper(node.left) + 1;
			return Math.min(minDepthHelper(node.left, minDepthHelper(node.right)) + 1);
		};

		return minDepthHelper(this.root);
	}

	/** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

	maxDepth() {
		const maxDepthHelper = (node) => {
			if (!this.root) return 0;
			let count = 1;
			// if "tree" is just a single node, mexDepth is 1
			if (node.left === null && node.right === null) return count;
			if (node.left === null) return this.maxDepth(node.right) + 1;
			if (node.right === null) return this.maxDepth(node.left) + 1;

			return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1;
		};

		return maxDepthHelper(this.root);
	}

	/** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

	maxSum() {
		let result = 0;

		const maxSumHelper = (node) => {
			if (node === null) return 0;

			let leftSum = maxSumHelper(node.left);
			let rightSum = maxSumHelper(node.right);
			result = Math.max(result, node.val + leftSum + rightSum);
			return Math.max(0, leftSum + node.val, rightSum + node.val);
		};

		maxSumHelper(this.root);
		return result;
	}

	/** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

	nextLarger(lowerBound) {
		if (!this.root) {
			return null;
		}
		// Bredth First Traversal or Level Order Traversal
		// traverses and accesses each level

		let queue = [ this.root ];
		// why is this an array?
		let closest = null;

		while (queue.length) {
			// .shift() method? returns first element of array (this.root)
			let currentNode = queue.shift();
			let currentVal = currentNode.val;
			let higherThanLowerBound = currentVal > lowerBound;
			let shouldReassignClosest = currentVal < closest || closest === null;

			if (higherThanLowerBound && shouldReassignClosest) {
				closest = currentVal;
			}

			if (currentNode.left) queue.push(currentNode.right);
			if (currentNode.right) queue.push(currentNode.left);
		}

		return closest;
	}

	/** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

	areCousins(node1, node2) {}

	/** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

	static serialize() {}

	/** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

	static deserialize() {}

	/** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

	lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
