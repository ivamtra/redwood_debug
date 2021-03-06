/*
 * Reikniritið byggir upp net með
 * key-value adjacency list og
 * ítrar í gegnum það með DFS
 * til að skila kommentum í rétta röð
 *
 * Tímaflækja O(n)
 */
export default function commentSort(answerComments) {
  if (answerComments === undefined || answerComments === null) return null
  if (answerComments.length === 0) return answerComments
  console.log(answerComments)
  // Stilla hakkatöflu
  // Ætti að vera O(n) ef append er O(1)
  const hashMap = new Map()
  answerComments.forEach((item) => {
    try {
      hashMap.set(item.parentId, [...hashMap.get(item.parentId), item])
    } catch {
      hashMap.set(item.parentId, [item])
    }
  })
  console.log(hashMap)

  // Upphafsstilling
  const stack = []
  let currentChildren = hashMap.get(0)
  currentChildren.forEach((child) => {
    stack.push(child)
  })
  console.log(stack)
  let currentNode
  let returnList = []

  // Ítra í gegn með DFS
  while (stack.length !== 0) {
    currentNode = stack.pop()
    returnList.push(currentNode)
    currentChildren = hashMap.get(currentNode.id)
    console.log(currentChildren)
    try {
      currentChildren.forEach((item) => stack.push(item))
    } catch {
      /* Engin börn */
    }
  }
  console.log(returnList)
  return returnList
}
