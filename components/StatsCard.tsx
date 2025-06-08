import { calculateTrendPercentage } from 'lib/utils'

const StatsCard = ({
  headerTitle,
  total,
  lastMonthCount,
  currentMonthCount
}: StatsCard) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  )

  const isDecrement = trend === 'decrement'
  const isIncrement = trend === 'increment'

  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>

      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>

          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img
                src={
                  isIncrement
                    ? '/icons/increment.svg'
                    : isDecrement
                    ? '/icons/decrement.svg'
                    : '/icons/neutral.svg'
                }
                alt="trend"
              />
            </figure>
          </div>
        </div>
      </div>
    </article>
  )
}

export default StatsCard
