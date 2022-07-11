import { useState } from 'react'

export const useForceUpdate = () => {
  const [boolean, setBoolean] = useState(false)
  return () => setBoolean(!boolean)
}
