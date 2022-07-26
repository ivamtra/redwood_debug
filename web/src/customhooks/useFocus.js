import { useLayoutEffect } from 'react'

/*
  Hook sem tekur inn reference á element sem þarf focus,
  id hjá hlutnum og parameterId sem er id-ið á elementinn
  sem þarf focus.


*/
export default function useFocus(ref, componentId, paramId) {
  const focus = () => {
    if (componentId === parseInt(paramId))
      ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  useLayoutEffect(focus, [ref, componentId, paramId])
}
