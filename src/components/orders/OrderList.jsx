import { Fragment } from 'react'
import packaging from '../../assets/orders/packaging.svg'
import scooter from '../../assets/orders/scooter.svg'
import { orderTotal } from '../../data/orders'
import { formatMoney } from '../../lib/format'
import Divider from './Divider'
import { ORDER_STATUS } from './orderStatus'

const ORDER_TYPE = {
  delivery: { label: 'Delivery', icon: scooter },
  pickup: { label: 'Pickup', icon: packaging },
}

function OrderRow({ order, selected, onSelect }) {
  const status = ORDER_STATUS[order.status]
  const type = ORDER_TYPE[order.type]

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected || undefined}
      className={`relative flex w-full cursor-pointer flex-col gap-1 rounded-xl p-2.5 text-left transition-colors ${
        selected ? status.selectedRow : 'hover:bg-canvas/60'
      }`}
    >
      <span className="flex w-full items-center justify-between">
        <span className="text-base font-medium text-ink">ORD-{order.number}</span>
        <span className="text-[13px] whitespace-nowrap text-muted">{order.placed}</span>
      </span>

      <span className="flex w-full items-center justify-between gap-4 text-base font-medium whitespace-nowrap text-ink">
        <span className="truncate">{order.customer}</span>
        <span>{formatMoney(orderTotal(order))}</span>
      </span>

      <span className="flex w-full items-center justify-between gap-4">
        <span className="flex min-w-0 items-center gap-2">
          <span className="flex shrink-0 items-center gap-1">
            <img src={type.icon} alt="" className="size-5" />
            <span className="text-[13px] font-medium whitespace-nowrap text-ink">{type.label}</span>
          </span>
          {order.type === 'delivery' && (
            <span className="truncate text-[13px] text-muted">{order.address}</span>
          )}
        </span>
        {status.pill && (
          <span
            className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${status.pill}`}
          >
            {status.label}
          </span>
        )}
      </span>

      {status.accent && (
        <span
          aria-hidden="true"
          className={`absolute top-1/2 left-0 h-[31px] w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${status.accent}`}
        />
      )}
    </button>
  )
}

export default function OrderList({ orders, selectedNumber, onSelect, className = '' }) {
  return (
    <section
      aria-label="Orders"
      className={`flex max-h-full min-w-0 flex-1 flex-col gap-1.5 overflow-y-auto rounded-[20px] bg-white p-2.5 ${className}`}
    >
      {orders.length === 0 ? (
        <p className="p-6 text-center text-sm text-muted">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <Fragment key={order.number}>
            {index > 0 && <Divider />}
            <OrderRow
              order={order}
              selected={order.number === selectedNumber}
              onSelect={() => onSelect(order.number)}
            />
          </Fragment>
        ))
      )}
    </section>
  )
}
