import arrowDown from '../../assets/common/arrow-down.svg'
import { orderSubtotal, orderTotal } from '../../data/orders'
import { formatMoney } from '../../lib/format'
import Divider from './Divider'
import {
  COMPLETED_DOT,
  ORDER_STATUS,
  PENDING_DOT,
  TIMELINE_PROGRESS,
  TIMELINE_STEPS,
} from './orderStatus'

function SummaryRow({ label, value }) {
  return (
    <div className="flex w-full justify-between text-[13px]">
      <span className="text-muted">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  )
}

function TimelineDot({ src, ring }) {
  return (
    <span className="relative size-2 shrink-0">
      <img
        src={src}
        alt=""
        className={`absolute block max-w-none ${ring ? '-inset-1/4 size-3' : 'inset-0 size-2'}`}
      />
    </span>
  )
}

function Timeline({ order }) {
  const progress = TIMELINE_PROGRESS[order.status]
  const isCompleted = order.status === 'completed'

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-[13px] font-semibold text-muted">Timeline</p>
      <ol className="flex w-full flex-col gap-3">
        {TIMELINE_STEPS.map((step, index) => {
          const done = index < progress.done
          const current = index === progress.done && progress.current

          let dot = PENDING_DOT
          if (done) dot = isCompleted ? COMPLETED_DOT : step.doneDot
          else if (current) dot = progress.current.dot

          return (
            <li
              key={step.key}
              aria-current={current ? 'step' : undefined}
              className="flex w-full items-center gap-3"
            >
              <TimelineDot src={dot} ring={current && progress.current.ring} />
              <span
                className={`text-[13px] ${
                  done ? 'text-ink' : current ? 'font-semibold text-muted' : 'text-muted'
                }`}
              >
                {step.label}
              </span>
              <span
                className={`flex-1 text-right text-xs text-muted ${current ? 'font-semibold' : ''}`}
              >
                {done ? order.timeline[step.key] : current ? progress.current.note : 'Pending'}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** Phone-only: the list and detail are separate screens below md. */
function BackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="-ml-1 flex cursor-pointer items-center gap-1 self-start rounded-lg py-1 pr-2 text-[13px] font-medium text-ink md:hidden"
    >
      <img src={arrowDown} alt="" className="size-5 rotate-90" />
      All orders
    </button>
  )
}

export default function OrderDetail({ order, onAdvance, onBack, className = '' }) {
  if (!order) {
    return (
      <section
        className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-4 self-stretch rounded-[20px] bg-white p-6 ${className}`}
      >
        <BackButton onClick={onBack} />
        <p className="text-sm text-muted">Select an order to see its details.</p>
      </section>
    )
  }

  const { action } = ORDER_STATUS[order.status]
  const isDelivery = order.type === 'delivery'

  return (
    <section
      aria-label={`Order #${order.number}`}
      className={`flex min-w-0 flex-1 flex-col gap-5 self-stretch overflow-y-auto rounded-[20px] bg-white p-4 sm:p-6 ${className}`}
    >
      <BackButton onClick={onBack} />

      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-semibold text-ink">Order #{order.number}</h2>
        <p className="text-xs text-muted">Received at {order.timeline.received}</p>
      </div>

      <div className="flex w-full flex-col gap-3 rounded-xl bg-canvas p-4">
        <p className="text-[13px] font-semibold text-ink">
          {isDelivery ? 'Delivery Details' : 'Pickup Details'}
        </p>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-ink">{order.customer}</p>
          <p className="text-[13px] text-muted">{order.phone}</p>
          {isDelivery && <p className="text-[13px] text-muted">{order.address}</p>}
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 text-[13px]">
        <p className="font-semibold text-muted">Items</p>
        <ul className="flex w-full flex-col gap-2 text-ink">
          {order.items.map((item) => (
            <li key={item.name} className="flex w-full justify-between gap-4">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium">{formatMoney(item.quantity * item.price)}</span>
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      <div className="flex w-full flex-col gap-2">
        <SummaryRow label="Subtotal" value={formatMoney(orderSubtotal(order))} />
        {isDelivery && <SummaryRow label="Delivery Fee" value={formatMoney(order.deliveryFee)} />}
        <SummaryRow label="Tax" value={formatMoney(order.tax)} />
        <div className="flex w-full justify-between text-sm font-semibold">
          <span className="text-ink">Total</span>
          <span className="text-brand">
            {formatMoney(orderTotal(order))} ({order.payment})
          </span>
        </div>
      </div>

      <Divider />

      <Timeline order={order} />

      {action ? (
        <button
          type="button"
          onClick={() => onAdvance(order.number)}
          className={`flex h-[60px] w-full shrink-0 cursor-pointer items-center justify-center rounded-[10px] p-3 text-base font-semibold text-white transition-opacity hover:opacity-90 ${action.className}`}
        >
          {action.label}
        </button>
      ) : (
        <p className="flex min-h-[60px] flex-1 items-center justify-center text-xl font-semibold text-border">
          Complete
        </p>
      )}
    </section>
  )
}
