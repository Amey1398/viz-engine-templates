/** Essential service to application mapping with criticality weighted Sankey
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

export const templateId = "essential_services_mapping";
export const description = "Essential service to application mapping with criticality weighted Sankey";
export const sampleData = {
  "nodes": [
    {
      "id": "Payments",
      "type": "service"
    },
    {
      "id": "Trading",
      "type": "service"
    },
    {
      "id": "Identity API",
      "type": "application"
    },
    {
      "id": "Core Ledger",
      "type": "application"
    }
  ],
  "links": [
    {
      "source": "Payments",
      "target": "Identity API",
      "value": 9,
      "status": "degraded"
    },
    {
      "source": "Payments",
      "target": "Core Ledger",
      "value": 8,
      "status": "healthy"
    },
    {
      "source": "Trading",
      "target": "Identity API",
      "value": 6,
      "status": "healthy"
    }
  ]
};
export function createOption(data, options = {}) {
  const nodes = ensure(data.nodes, 'nodes'); const links = ensure(data.links, 'links');
  return root({ series: [{ type: 'sankey', name: 'Service dependencies', draggable: true, emphasis: { focus: 'adjacency' }, nodeAlign: 'justify', nodeWidth: 18, nodeGap: 20, top: 25, left: 35, right: 35, bottom: 25,
    data: nodes.map(n => ({ name: n.id, itemStyle: { color: color(n.status || (n.type === 'service' ? 'medium' : 'neutral')) }, label: textLabel, ...('value' in n ? { value: n.value } : {}) })),
    links: links.map(l => ({ source: l.source, target: l.target, value: l.value ?? 1, status: l.status, lineStyle: { color: color(l.status), opacity: .38, curveness: .5 } })),
    lineStyle: { curveness: .5 } }] }, options);
}
export default { templateId, description, sampleData, createOption };
