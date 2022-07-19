import { useAuth } from '@redwoodjs/auth'

/*
  Tekur inn component hlut
  Skilar true ef fela á componentinn
*/
export default function useHidden(componentObject) {
  const { currentUser, hasRole } = useAuth()
  if (currentUser === null) return componentObject.isHidden

  return (
    componentObject.isHidden &&
    componentObject.user.id !== currentUser.id &&
    !hasRole(['admin', 'moderator'])
  )
}
