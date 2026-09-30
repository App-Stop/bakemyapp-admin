import dotDispatch from '../../assets/orders/dot-dispatch.svg'
import dotPending from '../../assets/orders/dot-pending.svg'
import dotPreparingActive from '../../assets/orders/dot-preparing-active.svg'
import dotPreparing from '../../assets/orders/dot-preparing.svg'
import dotReady from '../../assets/orders/dot-ready.svg'
import dotReceived from '../../assets/orders/dot-received.svg'
import ringDelivered from '../../assets/orders/ring-delivered.svg'
import ringDispatch from '../../assets/orders/ring-dispatch.svg'

/**
 * Visual treatment + next action for each order state, per the four Figma frames:
 * Preparing (68:4200), Ready (68:4884), Dispatched (68:5102), Completed (68:5320).
 */
export const ORDER_STATUS = {
  preparing: {
    label: 'Preparing',
    accent: 'bg-subtle',
    pill: 'bg-canvas text-subtle',
    selectedRow: 'bg-canvas',
    action: {
      label: 'Mark as Ready',
      className: 'bg-brand',
      next: 'ready',
      stamps: 'ready',
    },
  },
  ready: {
    label: 'Ready',
    accent: 'bg-brand',
    pill: 'bg-brand-light text-brand',
    selectedRow: 'bg-brand-light',
    action: {
      label: 'Dispatch Order',
      className: 'bg-blue',
      next: 'dispatched',
      stamps: 'dispatch',
    },
  },
  dispatched: {
    label: 'Dispatched',
    accent: 'bg-blue',
    pill: 'bg-blue-light text-blue',
    selectedRow: 'bg-blue-light',
    action: {
      label: 'Mark as Delivered',
      className: 'bg-success',
      next: 'completed',
      stamps: 'delivered',
    },
  },
  completed: {
    label: 'Completed',
    accent: null,
    pill: null,
    selectedRow: 'bg-brand-light',
    action: null,
  },
}

export const TIMELINE_STEPS = [
  { key: 'received', label: 'Received', doneDot: dotReceived },
  { key: 'preparing', label: 'Preparing', doneDot: dotPreparing },
  { key: 'ready', label: 'Ready', doneDot: dotReady },
  { key: 'dispatch', label: 'Dispatch', doneDot: dotDispatch },
  { key: 'delivered', label: 'Delivered', doneDot: dotReceived },
]

export const PENDING_DOT = dotPending
export const COMPLETED_DOT = dotReceived

/**
 * How far along the timeline each state is. The step at index `done` is the
 * current one; everything after it is pending.
 */
export const TIMELINE_PROGRESS = {
  preparing: { done: 1, current: { dot: dotPreparingActive, note: 'In Progress' } },
  ready: { done: 3, current: { dot: ringDispatch, ring: true, note: 'Pending' } },
  dispatched: { done: 4, current: { dot: ringDelivered, ring: true, note: 'Pending' } },
  completed: { done: TIMELINE_STEPS.length, current: null },
}
