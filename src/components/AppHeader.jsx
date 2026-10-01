import { useEffect, useState } from 'react'
import logo from '../assets/common/bakemyapp-logo.svg'
import logOut from '../assets/common/log-out.svg'
import menuRestaurantActive from '../assets/common/menu-restaurant-active.svg'
import menuRestaurantInactive from '../assets/common/menu-restaurant-inactive.svg'
import shoppingBasketActive from '../assets/common/shopping-basket-active.svg'
import shoppingBasketInactive from '../assets/common/shopping-basket-inactive.svg'
import { formatLongDate, formatTime } from '../lib/format'

const NAV_ITEMS = [
  {
    page: 'orders',
    label: 'Orders',
    icon: shoppingBasketInactive,
    activeIcon: shoppingBasketActive,
  },
  {
    page: 'menu',
    label: 'Menu',
    icon: menuRestaurantInactive,
    activeIcon: menuRestaurantActive,
  },
]

function useNow(intervalMs = 15_000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

export default function AppHeader({ branchName, activePage, onLogout }) {
  const now = useNow()

  return (
    // Below xl the brand and clock size to their content and the nav takes the rest;
    // at xl it matches the design (flexible sides, fixed 600px nav).
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-outline bg-white px-4 py-3 sm:gap-6 md:p-5 xl:gap-10">
      <div className="flex shrink-0 items-center gap-2.5 xl:min-w-0 xl:flex-1">
        {/* The logo is white-only, so it sits on a brand-coloured chip */}
        <div className="flex h-10 shrink-0 items-center justify-center rounded-xl bg-brand px-3 md:h-[46px]">
          <img src={logo} alt="Bake My App" className="h-6 w-auto md:h-7" />
        </div>
        <p className="hidden min-w-0 truncate text-xs text-muted sm:block">{branchName}</p>
      </div>

      <nav
        aria-label="Main"
        className="flex max-w-[600px] min-w-0 flex-1 items-center gap-2 xl:w-[600px] xl:flex-none"
      >
        {NAV_ITEMS.map((item) => {
          const active = item.page === activePage
          return (
            <a
              key={item.page}
              href={`#${item.page}`}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-1 items-center justify-center gap-3 rounded-xl p-3 transition-colors ${
                active ? 'bg-brand-light' : 'hover:bg-canvas'
              }`}
            >
              <img src={active ? item.activeIcon : item.icon} alt="" className="size-5" />
              <span
                className={`sr-only text-sm sm:not-sr-only ${
                  active ? 'font-medium text-brand' : 'text-ink-soft'
                }`}
              >
                {item.label}
              </span>
            </a>
          )
        })}
      </nav>

      <div className="flex shrink-0 items-center gap-2 md:gap-5 xl:min-w-0 xl:flex-1">
        <div className="flex flex-1 flex-col gap-1 text-right">
          <time
            dateTime={now.toISOString()}
            className="text-sm font-semibold whitespace-nowrap text-ink md:text-base"
          >
            {formatTime(now)}
          </time>
          <p className="hidden text-xs whitespace-nowrap text-muted md:block">
            {formatLongDate(now)}
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          aria-label="Log out"
          className="flex shrink-0 cursor-pointer items-center justify-center rounded-xl p-3 transition-colors hover:bg-canvas"
        >
          <img src={logOut} alt="" className="size-5" />
        </button>
      </div>
    </header>
  )
}
