import { useAuth } from '@redwoodjs/auth'

export const QUERY = gql`
  query FindUserQuery($id: Int!) {
    user: user(id: $id) {
      id
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ user }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return <h3>Current user: {user.email}</h3>
}
