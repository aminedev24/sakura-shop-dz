const ROWS = [
  ['S',   '84 – 88',   '64 – 68', '90 – 94'],
  ['M',   '88 – 94',   '68 – 74', '94 – 100'],
  ['L',   '94 – 100',  '74 – 80', '100 – 106'],
  ['XL',  '100 – 108', '80 – 88', '106 – 114'],
  ['XXL', '108 – 116', '88 – 96', '114 – 122'],
];

export default function SizeGuide() {
  return (
    <section className="sec reveal" id="guide">
      <details>
        <summary>Guide des tailles — mesures en cm</summary>
        <div className="scrollx">
          <table>
            <thead>
              <tr><th>Taille</th><th>Poitrine</th><th>Tour de taille</th><th>Hanches</th></tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
