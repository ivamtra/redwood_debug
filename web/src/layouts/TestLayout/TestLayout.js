import { Link, routes } from '@redwoodjs/router'

const TestLayout = ({ children }) => {
  return (
    <>
      <h2>Links</h2>
      <h2>
        <Link to={routes.forms()}>Forms </Link>
        <Link to={routes.home()}>Home</Link>
      </h2>
      <main>{children}</main>
    </>
  )
}

export default TestLayout
