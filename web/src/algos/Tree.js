import TreeNode from './TreeNode'

// const CommentQuery = gql`
//   query FindAnswerCommentQuery {
//     answerComments(answerId: 5) {
//       id
//       user {
//         email
//       }
//       body
//       createdAt
//       parentId
//     }
//   }
// `
export default class Tree {
  constructor() {
    //Harðkóðað en lagast þegar ég finn út hvernig hægt er að query-a
    //Fyrir utan react
    this.root = new TreeNode({
      id: 0,
      user: { email: 'Placeholder' },
      body: 'Placeholder',
      createdAt: '2022-06-27T15:16:45.279Z',
      parentId: 0,
    })
  }
  // O(n) unordered List
  add(childId, parentId) {}
  delete() {}

  preOrderTraverse(/*callback*/) {
    let currentNode = this.root
    let stack = []
    stack.push(currentNode)
    while (stack.length !== 0) {
      console.log(currentNode)
      currentNode.forEach((child) => stack.push(child))
      currentNode = stack.pop()
    }
  }
}
