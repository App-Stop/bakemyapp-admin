// Mock orders until the API is wired up.
// `timeline` holds the time each step was reached; missing keys are still pending.

const sourdoughBasket = [
  { name: 'Artisanal Sourdough Loaf', quantity: 2, price: 6 },
  { name: 'Flaky Butter Croissant', quantity: 1, price: 2.5 },
  { name: 'Vanilla Bean Pastry Cup', quantity: 1, price: 4 },
]

export const initialOrders = [
  {
    number: 123,
    customer: 'Sarah Jenkins',
    phone: '+1 (555) 321-9876',
    type: 'delivery',
    address: '415 Sourdough Lane, Apt 3B, Austin TX',
    placed: '12 min ago',
    items: sourdoughBasket,
    deliveryFee: 2.5,
    tax: 1.5,
    payment: 'Cash',
    status: 'preparing',
    timeline: { received: '10:14 AM' },
  },
  {
    number: 124,
    customer: 'Michael Smith',
    phone: '+1 (555) 208-4410',
    type: 'pickup',
    placed: '10 min ago',
    items: [
      { name: 'Cinnamon Swirl Bun', quantity: 3, price: 3.75 },
      { name: 'Almond Croissant', quantity: 2, price: 3.75 },
    ],
    tax: 0,
    payment: 'Card',
    status: 'ready',
    timeline: { received: '10:16 AM', preparing: '10:17 AM', ready: '10:24 AM' },
  },
  {
    number: 125,
    customer: 'Emily Johnson',
    phone: '+1 (555) 774-1302',
    type: 'delivery',
    address: 'Sunset Blvrd Road, Main Street, Texas, US',
    placed: '5 min ago',
    items: [
      { name: 'Celebration Sponge Cake', quantity: 1, price: 24 },
      { name: 'Flaky Butter Croissant', quantity: 1, price: 2.5 },
    ],
    deliveryFee: 2.5,
    tax: 1,
    payment: 'Card',
    status: 'dispatched',
    timeline: {
      received: '10:09 AM',
      preparing: '10:10 AM',
      ready: '10:18 AM',
      dispatch: '10:22 AM',
    },
  },
  {
    number: 126,
    customer: 'David Brown',
    phone: '+1 (555) 610-2291',
    type: 'pickup',
    placed: '2 min ago',
    items: [{ name: 'Artisanal Sourdough Loaf', quantity: 2, price: 6.75 }],
    tax: 1.5,
    payment: 'Cash',
    status: 'ready',
    timeline: { received: '10:12 AM', preparing: '10:12 AM', ready: '10:20 AM' },
  },
  {
    number: 118,
    customer: 'Olivia Martinez',
    phone: '+1 (555) 402-8817',
    type: 'delivery',
    address: '88 Rye Street, Austin TX',
    placed: '1 hr ago',
    items: sourdoughBasket,
    deliveryFee: 2.5,
    tax: 1.5,
    payment: 'Cash',
    status: 'completed',
    timeline: {
      received: '9:02 AM',
      preparing: '9:03 AM',
      ready: '9:11 AM',
      dispatch: '9:14 AM',
      delivered: '9:40 AM',
    },
  },
  {
    number: 117,
    customer: 'James Wilson',
    phone: '+1 (555) 993-0145',
    type: 'pickup',
    placed: '1 day ago',
    items: [{ name: 'Blueberry Muffin', quantity: 5, price: 3.75 }],
    tax: 0,
    payment: 'Card',
    status: 'completed',
    timeline: {
      received: '4:10 PM',
      preparing: '4:11 PM',
      ready: '4:20 PM',
      dispatch: '4:21 PM',
      delivered: '4:35 PM',
    },
  },
]

export const orderSubtotal = (order) =>
  order.items.reduce((sum, item) => sum + item.quantity * item.price, 0)

export const orderTotal = (order) =>
  orderSubtotal(order) + (order.deliveryFee ?? 0) + order.tax
