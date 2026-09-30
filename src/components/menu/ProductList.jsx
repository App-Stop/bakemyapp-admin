import clock from '../../assets/menu/clock.svg'
import dotSeparator from '../../assets/menu/dot-separator.svg'
import { formatMoney } from '../../lib/format'

function AvailabilitySwitch({ item, onToggle }) {
  const { available } = item
  return (
    <button
      type="button"
      role="switch"
      aria-checked={available}
      aria-label={`${item.name} in stock`}
      onClick={onToggle}
      className="flex shrink-0 cursor-pointer items-center justify-end gap-2 sm:w-[120px]"
    >
      <span
        className={`sr-only text-xs font-medium whitespace-nowrap sm:not-sr-only ${
          available ? 'text-success' : 'text-badge'
        }`}
      >
        {available ? 'In Stock' : 'Sold Out'}
      </span>
      <span
        className={`flex w-[50px] shrink-0 items-center rounded-full p-0.5 transition-colors ${
          available ? 'bg-success' : 'bg-border'
        }`}
      >
        <span
          className={`h-5 w-7 rounded-full bg-white transition-transform ${
            available ? 'translate-x-[18px]' : ''
          }`}
        />
      </span>
    </button>
  )
}

function ProductThumb({ item, fallbackIcon }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-divider bg-canvas sm:size-16">
      {item.image ? (
        <img src={item.image} alt="" loading="lazy" className="size-full object-cover" />
      ) : (
        <img src={fallbackIcon} alt="" className="size-6" />
      )}
    </div>
  )
}

function ProductRow({ item, fallbackIcon, onToggleAvailability }) {
  return (
    <li className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-brand-light sm:gap-4 sm:p-4">
      <ProductThumb item={item} fallbackIcon={fallbackIcon} />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-sm font-medium text-ink">{item.name}</p>
        <div className="flex min-w-0 items-center gap-1 text-xs text-muted">
          <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
            <img src={clock} alt="" className="size-4" />
            {item.prepMinutes} min
          </span>
          <img src={dotSeparator} alt="" className="hidden size-0.5 shrink-0 sm:block" />
          <span className="hidden truncate sm:block">{item.description}</span>
        </div>
      </div>

      {/* Stacked on phones to leave room for the name */}
      <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-sm font-medium text-ink sm:w-[80px]">{formatMoney(item.price)}</p>
        <AvailabilitySwitch item={item} onToggle={onToggleAvailability} />
      </div>
    </li>
  )
}

export default function ProductList({ category, items, onToggleAvailability }) {
  return (
    <section
      aria-label={category.label}
      className="flex max-h-full min-h-0 min-w-0 flex-col gap-5 overflow-y-auto rounded-[20px] bg-white px-2 py-5 sm:px-3.5 sm:py-6 lg:flex-1"
    >
      <div className="flex items-center gap-3.5 px-3">
        <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full border-[0.92px] border-divider bg-canvas">
          <img src={category.panelIcon ?? category.activeIcon} alt="" className="size-[29.44px]" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-semibold text-ink">{category.label}</h2>
          <p className="text-xs text-muted">
            {items.length} {items.length === 1 ? 'item' : 'items'} in this category
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="p-6 text-center text-sm text-muted">No items found.</p>
      ) : (
        <ul className="flex flex-col">
          {items.map((item) => (
            <ProductRow
              key={item.id}
              item={item}
              fallbackIcon={category.icon}
              onToggleAvailability={() => onToggleAvailability(item.id)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
