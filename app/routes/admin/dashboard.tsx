import { Header, StatsCard, TripCard } from 'components'

const Dashboard = () => {
  const user = { name: 'Ken' }

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? 'Guest'} 👋`}
        description="Track activity, trends and popular destinations in  real time"
      />
      
      <StatsCard />
      <TripCard />
    </main>
  )
}

export default Dashboard
