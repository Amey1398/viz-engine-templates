/** Force-directed application and infrastructure dependency graph
 * Apache ECharts v5 template. Input is JSON data; output is a declarative ECharts option.
 * No ECharts dependency is imported; call chart.setOption(createOption(data, options)).
 * Sample is SYNTHETIC. Do not use sample values in risk reporting.
 */
const PALETTE = { healthy: '#36c8ad', degraded: '#f3b55e', failed: '#f16d80', critical: '#ef6778', high: '#f3a45d', medium: '#64a8ed', low: '#43c0aa', neutral: '#7b98c0' };
const color = status => PALETTE[String(status || '').toLowerCase()] || PALETTE.neutral;
const defaults = { backgroundColor: 'transparent', animationDuration: 650, animationDurationUpdate: 500, textStyle: { color: '#dce7f5' }, tooltip: { trigger: 'item', confine: true, backgroundColor: '#17253a', borderColor: '#4c698c', textStyle: { color: '#eef5ff' } } };
const axes = { axisLine: { lineStyle: { color: '#556982' } }, axisLabel: { color: '#a9bed7' }, splitLine: { lineStyle: { color: '#23354c' } } };
const ensure = (v, name) => { if (!Array.isArray(v)) throw new TypeError(`${name} must be an array`); return v; };
const root = (extra, options = {}) => ({ ...defaults, ...extra, backgroundColor: options.backgroundColor ?? defaults.backgroundColor });
const textLabel = { color: '#dce7f5', fontSize: 11 };

export const templateId = "dependency_mapping";
export const description = "Force-directed application and infrastructure dependency graph";
export const sampleData = {
  "nodes": [
    {
      "id": "Portal",
      "status": "healthy",
      "size": 42
    },
    {
      "id": "Identity",
      "status": "degraded",
      "size": 52
    },
    {
      "id": "Cloud",
      "status": "healthy",
      "size": 50
    },
    {
      "id": "Ledger",
      "status": "critical",
      "size": 45
    }
  ],
  "links": [
    {
      "source": "Portal",
      "target": "Identity",
      "status": "healthy"
    },
    {
      "source": "Identity",
      "target": "Cloud",
      "status": "degraded"
    },
    {
      "source": "Portal",
      "target": "Ledger",
      "status": "failed"
    }
  ]
};
export function createOption(data, options = {}) {
  ensure(data.nodes,'nodes'); ensure(data.links,'links');
  return root({ series: [{ name: 'Dependency topology', type: 'graph', layout: 'force', roam: true, draggable: true,
    force: { repulsion: options.repulsion ?? 260, edgeLength: [80, 165], gravity: .08 },
    data: data.nodes.map(n => ({ name: n.id, id: n.id, value: n.value ?? 1, symbolSize: n.size ?? 32, itemStyle: { color: color(n.status), shadowBlur: 10, shadowColor: color(n.status) }, label: { show: true, position: 'right', ...textLabel }, ...n })),
    links: data.links.map(l => ({ ...l, lineStyle: { color: color(l.status), width: l.weight ?? 2, curveness: .09, opacity: .8 } })),
    emphasis: { focus: 'adjacency', lineStyle: { width: 5 } } }] }, options);
}
export default { templateId, description, sampleData, createOption };
