import { PricingGroup } from '@/sanity/lib/queries'

export function PricingTable({ group }: { group: PricingGroup }) {
  const { title, subtitle, columnHeaders, rows, infoBlock } = group

  return (
    <div className="mb-8 last:mb-0">
      <div className="mb-4">
        <h3
          className="font-black uppercase tracking-tight leading-none text-border-dark mb-1"
          style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
        >
          {title}
        </h3>
        {subtitle && (
          <p className="text-outline font-light text-sm mt-1">{subtitle}</p>
        )}
      </div>

      {infoBlock ? (
        <div className="text-on-surface-variant font-light leading-relaxed whitespace-pre-line text-sm">
          {infoBlock}
        </div>
      ) : rows && rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[300px] text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border-dark">
                <th className="font-label-bold text-[10px] uppercase tracking-widest text-outline pb-3 pr-8 min-w-[180px]">
                  Položka
                </th>
                {columnHeaders.map((h) => (
                  <th
                    key={h}
                    className="font-label-bold text-[10px] uppercase tracking-widest text-outline pb-3 px-4 text-right whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row._key}
                  className={`border-b border-surface-container-high last:border-0 ${row.highlight ? 'bg-brand-orange/5' : ''}`}
                >
                  <td className="py-2.5 pr-8">
                    <span className="text-border-dark font-medium text-sm">
                      {row.label}
                    </span>
                    {row.note && (
                      <span className="block text-outline font-light text-xs mt-0.5">
                        {row.note}
                      </span>
                    )}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className="py-2.5 px-4 text-right text-border-dark font-medium text-sm whitespace-nowrap"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
