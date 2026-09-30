import { useMemo, useState } from 'react'
import PageToolbar from '../components/PageToolbar'
import CategoryList from '../components/menu/CategoryList'
import ProductList from '../components/menu/ProductList'
import { CATEGORIES } from '../components/menu/categories'
import { initialMenuItems } from '../data/menu'

const TABS = [
  { key: 'all', label: 'All', matches: () => true },
  { key: 'in-stock', label: 'In Stock', matches: (item) => item.available },
  { key: 'out-of-stock', label: 'Out of Stock', matches: (item) => !item.available },
]

function matchesQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
}

export default function Menu() {
  const [items, setItems] = useState(initialMenuItems)
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [categoryKey, setCategoryKey] = useState(CATEGORIES[0].key)

  const tabCounts = useMemo(
    () => Object.fromEntries(TABS.map((t) => [t.key, items.filter(t.matches).length])),
    [items],
  )

  // Tab + search apply across every category; the category list shows where matches are.
  const filteredItems = useMemo(() => {
    const { matches } = TABS.find((t) => t.key === tab)
    return items.filter((item) => matches(item) && matchesQuery(item, query))
  }, [items, tab, query])

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        CATEGORIES.map((c) => [c.key, filteredItems.filter((i) => i.category === c.key).length]),
      ),
    [filteredItems],
  )

  const category = CATEGORIES.find((c) => c.key === categoryKey)
  const categoryItems = filteredItems.filter((item) => item.category === categoryKey)

  const toggleAvailability = (id) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, available: !item.available } : item)),
    )
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 p-4 md:gap-5 md:px-[30px] md:py-5">
      <PageToolbar
        tabs={TABS}
        activeTab={tab}
        counts={tabCounts}
        onTabChange={setTab}
        query={query}
        onQueryChange={setQuery}
        searchLabel="Search menu items"
        searchPlaceholder="Search items.."
      />

      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <CategoryList
          categories={CATEGORIES}
          counts={categoryCounts}
          activeKey={categoryKey}
          onSelect={setCategoryKey}
        />
        <ProductList
          category={category}
          items={categoryItems}
          onToggleAvailability={toggleAvailability}
        />
      </div>
    </main>
  )
}
