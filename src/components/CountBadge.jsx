export default function CountBadge({ count, active }) {
  return (
    <span
      className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
        active ? 'bg-brand text-white' : 'bg-divider text-badge'
      }`}
    >
      {count}
    </span>
  )
}
