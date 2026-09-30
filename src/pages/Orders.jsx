import { useMemo, useState } from 'react'
import PageToolbar from '../components/PageToolbar'
import OrderDetail from '../components/orders/OrderDetail'
import OrderList from '../components/orders/OrderList'
import { ORDER_STATUS } from '../components/orders/orderStatus'
import { initialOrders } from '../data/orders'
import { formatTime } from '../lib/format'

const isActive = (order) => order.status !== 'completed'

const TABS = [
  { key: 'active', label: 'All Active', matches: isActive },
  { key: 'pickup', label: 'Pickup', matches: (o) => isActive(o) && o.type === 'pickup' },
  { key: 'delivery', label: 'Delivery', matches: (o) => isActive(o) && o.type === 'delivery' },
  { key: 'completed', label: 'Completed', matches: (o) => !isActive(o) },
]

function matchesQuery(order, query) {
  const q = query.trim().toLowerCase().replace(/^#/, '')
  if (!q) return true
  return (
    `ord-${order.number}`.includes(q) ||
    String(order.number).includes(q) ||
    order.customer.toLowerCase().includes(q)
  )
}

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [tab, setTab] = useState('active')
  const [query, setQuery] = useState('')
  const [selectedNumber, setSelectedNumber] = useState(null)
  // Phones show one pane at a time; from md up both panes are always visible.
  const [showDetailOnPhone, setShowDetailOnPhone] = useState(false)

  const selectOrder = (number) => {
    setSelectedNumber(number)
    setShowDetailOnPhone(true)
  }

  const counts = useMemo(
    () =>
      Object.fromEntries(TABS.map((t) => [t.key, orders.filter(t.matches).length])),
    [orders],
  )

  const visibleOrders = useMemo(() => {
    const { matches } = TABS.find((t) => t.key === tab)
    return orders.filter((o) => matches(o) && matchesQuery(o, query))
  }, [orders, tab, query])

  // Keep the chosen order if it's still visible, otherwise fall back to the first one.
  const selectedOrder =
    visibleOrders.find((o) => o.number === selectedNumber) ?? visibleOrders[0] ?? null

  const advanceOrder = (number) => {
    const stampedAt = formatTime(new Date())
    setOrders((current) =>
      current.map((order) => {
        const action = ORDER_STATUS[order.status].action
        if (order.number !== number || !action) return order
        return {
          ...order,
          status: action.next,
          timeline: { ...order.timeline, [action.stamps]: stampedAt },
        }
      }),
    )
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 p-4 md:gap-5 md:px-[30px] md:py-5">
      <PageToolbar
        tabs={TABS}
        activeTab={tab}
        counts={counts}
        onTabChange={setTab}
        query={query}
        onQueryChange={setQuery}
        searchLabel="Search orders"
        searchPlaceholder="Search order #, customer..."
        className={showDetailOnPhone ? 'max-md:hidden' : ''}
      />

      <div className="flex min-h-0 flex-1 items-start gap-5 lg:gap-[30px]">
        <OrderList
          orders={visibleOrders}
          selectedNumber={selectedOrder?.number}
          onSelect={selectOrder}
          className={showDetailOnPhone ? 'max-md:hidden' : ''}
        />
        <OrderDetail
          order={selectedOrder}
          onAdvance={advanceOrder}
          onBack={() => setShowDetailOnPhone(false)}
          className={showDetailOnPhone ? '' : 'max-md:hidden'}
        />
      </div>
    </main>
  )
}
