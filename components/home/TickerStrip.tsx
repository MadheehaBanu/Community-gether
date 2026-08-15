import { TICKER_ITEMS } from "@/lib/constants";

export default function TickerStrip() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker-strip">
      <div className="ticker-content">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold text-[#faf8f5] tracking-wide flex items-center gap-12"
          >
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}
