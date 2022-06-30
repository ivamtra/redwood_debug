export default class TreeNode {
  // Tekur inn comment hlut sem fæst úr gagnagrunni
  constructor(commentId) {
    this.comment = commentId
    this.children = []
  }
  add(commentId) {
    const commentNode = new TreeNode(commentId)
    this.children.unshift(commentNode)
  }
}
