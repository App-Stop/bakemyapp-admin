import arrowDown from '../assets/common/arrow-down.svg'
import search from '../assets/common/search.svg'
import CountBadge from './CountBadge'

function FilterTabs({ tabs, activeKey, counts, onChange }) {
  return (
    // Scrolls sideways on phones instead of squashing the labels
    <div
      role="tablist"
      className="flex h-[45px] w-full min-w-0 gap-1 overflow-x-auto overflow-y-hidden border-b border-border [scrollbar-width:none] sm:gap-2 lg:max-w-[660px]"
    >
      {tabs.map((tab) => {
        const active = tab.key === activeKey
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.key)}
            className={`flex flex-1 shrink-0 cursor-pointer items-center justify-center gap-2 px-3 py-3 text-sm whitespace-nowrap sm:px-4 ${
              active
                ? 'border-b-2 border-brand font-semibold text-brand'
                : 'font-medium text-muted hover:text-ink'
            }`}
          >
            {tab.label}
            <CountBadge count={counts[tab.key]} active={active} />
          </button>
        )
      })}
    </div>
  )
}

/** Tabs + search + filter row shared by the Orders and Menu pages. */
export default function PageToolbar({
  tabs,
  activeTab,
  counts,
  onTabChange,
  query,
  onQueryChange,
  searchLabel,
  searchPlaceholder,
  className = '',
}) {
  return (
    <div
      className={`flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6 ${className}`}
    >
      <FilterTabs tabs={tabs} activeKey={activeTab} counts={counts} onChange={onTabChange} />

      <div className="flex items-center gap-2.5 lg:shrink-0">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-outline bg-white p-3 focus-within:border-brand lg:w-[260px] lg:flex-none xl:w-[320px]">
          <img src={search} alt="" className="size-5" />
          <span className="sr-only">{searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full min-w-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
          />
        </label>
        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-outline bg-white py-3 pr-3 pl-4 text-[13px] text-ink"
        >
          Filter
          <img src={arrowDown} alt="" className="size-5" />
        </button>
      </div>
    </div>
  )
}
