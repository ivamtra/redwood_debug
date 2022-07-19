import { useAuth } from '@redwoodjs/auth'

/*
  type = [question, answer, comment]
*/
export default function useHidden(componentObject) {
  const { currentUser, hasRole } = useAuth()

  return (
    componentObject.isHidden &&
    componentObject.user.id !== currentUser.id &&
    !hasRole(['admin', 'moderator'])
  )
}
