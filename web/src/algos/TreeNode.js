export default class TreeNode {
  // Tekur inn comment hlut sem fæst úr gagnagrunni
  constructor(comment) {
    this.comment = comment
    this.children = []
  }
  // Tekur inn TreeNode
  add(treeNode) {
    this.children.unshift(treeNode)
  }
}
