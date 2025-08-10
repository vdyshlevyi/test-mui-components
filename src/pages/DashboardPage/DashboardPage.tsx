import { useAuth } from "../../hooks/useAuth"

export default function Dashboard() {
  const { user } = useAuth()

  // Get user display name (user is guaranteed to exist due to AuthGuard)
  const getUserDisplayName = () => {
    const firstName = user?.first_name || ""
    const lastName = user?.last_name || ""
    const fullName = `${firstName} ${lastName}`.trim()

    return fullName || user?.email
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    const firstName = user?.first_name || ""
    const lastName = user?.last_name || ""

    if (firstName && lastName)
      return `${firstName[0]}${lastName[0]}`.toUpperCase()

    return user?.email[0].toUpperCase()
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {getUserDisplayName()}!</p>
      <p>Your initials are: {getUserInitials()}</p>
    </div>
  )
}
