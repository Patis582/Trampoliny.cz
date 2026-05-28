import { PricingGroup } from '@/sanity/lib/queries'

export function PricingTable({ group }: { group: PricingGroup }) {
  const { title, subtitle, columnHeaders, rows, infoBlock } = group

  return (
    <div className="mb-10 last:mb-0">
      <div className="mb-4">
        <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="font-body-md text-body-md text-outline font-light mt-1">{subtitle}</p>
        )}
      </div>

      {infoBlock ? (
        <div className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed whitespace-pre-line">
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
                  <td className="py-3 pr-8">
                    <span className="font-body-md text-body-md text-border-dark font-medium">
                      {row.label}
                    </span>
                    {row.note && (
                      <span className="block font-body-md text-[13px] text-outline font-light">
                        {row.note}
                      </span>
                    )}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className="py-3 px-4 text-right font-body-md text-body-md text-border-dark font-medium whitespace-nowrap"
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
