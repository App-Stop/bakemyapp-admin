import CountBadge from '../CountBadge'

export default function CategoryList({ categories, counts, activeKey, onSelect }) {
  return (
    // A vertical panel from lg up; a sideways-scrolling strip above the products below that.
    <aside
      aria-label="Categories"
      className="flex shrink-0 flex-col gap-5 rounded-[20px] bg-white p-2.5 lg:w-[280px] lg:py-5"
    >
      <h2 className="hidden px-2.5 text-base font-semibold text-ink lg:block">Categories</h2>
      <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] lg:flex-col">
        {categories.map((category) => {
          const active = category.key === activeKey
          return (
            <li key={category.key} className="shrink-0 lg:w-full">
              <button
                type="button"
                onClick={() => onSelect(category.key)}
                aria-current={active || undefined}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl py-3 pr-3 pl-2 text-left text-sm transition-colors ${
                  active ? 'bg-brand-light font-semibold text-brand' : 'text-ink-soft hover:bg-canvas'
                }`}
              >
                <img
                  src={active ? category.activeIcon : category.icon}
                  alt=""
                  className="size-6 shrink-0"
                />
                <span className="whitespace-nowrap lg:flex-1">{category.label}</span>
                <CountBadge count={counts[category.key]} active={active} />
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
