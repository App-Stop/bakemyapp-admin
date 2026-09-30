const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/** "10:14 AM" */
export const formatTime = (date) => timeFormatter.format(date)

/** "Monday, 18 September" */
export const formatLongDate = (date) =>
  `${date.toLocaleDateString('en-GB', { weekday: 'long' })}, ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`

/** "$22.50" */
export const formatMoney = (amount) => moneyFormatter.format(amount)
