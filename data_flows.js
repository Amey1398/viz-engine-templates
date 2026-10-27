/** Data movement and trust-boundary Sankey
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

export const templateId = "data_flows";
export const description = "Data movement and trust-boundary Sankey";
export const sampleData = {
  "systems": [
    {
      "id": "Customer",
      "classification": "public"
    },
    {
      "id": "API",
      "classification": "internal"
    },
    {
      "id": "Data Lake",
      "classification": "restricted"
    },
    {
      "id": "Vendor",
      "classification": "external"
    }
  ],
  "flows": [
    {
      "source": "Customer",
      "target": "API",
      "volume": 20,
      "sensitive": false
    },
    {
      "source": "API",
      "target": "Data Lake",
      "volume": 14,
      "sensitive": true
    },
    {
      "source": "API",
      "target": "Vendor",
      "volume": 5,
      "sensitive": true
    }
  ]
};
export function createOption(data, options = {}) {
  ensure(data.systems,'systems'); ensure(data.flows,'flows');
  return root({ series: [{ type: 'sankey', nodeWidth: 16, nodeGap: 20, top: 20, bottom: 20, left: 30, right: 40, emphasis: { focus: 'adjacency' },
    data: data.systems.map(s => ({ name: s.id, classification: s.classification, itemStyle: { color: s.classification === 'restricted' ? color('critical') : color('medium') }, label: textLabel })),
    links: data.flows.map(f => ({ source: f.source, target: f.target, value: f.volume ?? 1, ...f, lineStyle: { color: f.sensitive ? color('critical') : color('healthy'), opacity: .48 } })),
    lineStyle: { curveness: .5 } }] }, options);
}
export default { templateId, description, sampleData, createOption };
