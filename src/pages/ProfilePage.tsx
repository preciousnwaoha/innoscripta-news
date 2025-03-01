import Header from "../components/Header"
import Board from "../components/profile/Board"
import Liked from "../components/profile/Liked"
import Preferences from "../components/profile/Preferences"
import Sources from "../components/profile/Sources"
import Tabs from "../components/ui/Tabs"

const ProfilePage = () => {

  const profileTabs = [
    { name: 'Liked', component: Liked, query: 'liked' },
    { name: 'Board', component: Board, query: 'board' },
    { name: 'Sources', component: Sources, query: 'sources' },
    { name: 'Settings', component: Preferences, query: 'preferences' }
  ]

  return (
    <>
      <Header />
      <h1>Your space</h1>


      <Tabs items={
        profileTabs.map(tab => ({
          label: tab.name,
          component: tab.component
        }))
      } />
    </>
  )
}

export default ProfilePage