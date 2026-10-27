/** Material-risk scatter bubble matrix with severity and response status
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

export const templateId = "findings_material_incidents";
export const description = "Material-risk scatter bubble matrix with severity and response status";
export const sampleData = {
  "findings": [
    {
      "id": "F-101",
      "impact": 4,
      "likelihood": 5,
      "exposure": 85,
      "status": "critical"
    },
    {
      "id": "F-102",
      "impact": 2,
      "likelihood": 4,
      "exposure": 40,
      "status": "high"
    },
    {
      "id": "INC-30",
      "impact": 5,
      "likelihood": 3,
      "exposure": 75,
      "status": "degraded"
    }
  ]
};
export function createOption(data, options = {}) {
  const rows = ensure(data.findings,'findings');
  return root({ grid: { left: 62, right: 30, top: 24, bottom: 55 }, xAxis: { type: 'value', name: 'Likelihood', min: 0, max: 5.5, ...axes }, yAxis: { type: 'value', name: 'Impact', min: 0, max: 5.5, ...axes },
    visualMap: { show: false, min: 0, max: 100, dimension: 2, inRange: { symbolSize: [12, 48] } },
    series: [{ type: 'scatter', name: 'Material risk', data: rows.map(f => ({ name: f.id, value: [f.likelihood, f.impact, f.exposure ?? 20], ...f, itemStyle: { color: color(f.status), opacity: .85, borderColor: '#fff', borderWidth: .5 } })),
      label: { show: !!options.showLabels, position: 'top', formatter: p => p.name, ...textLabel }, emphasis: { focus: 'self', scale: 1.25 } }] }, options);
}
export default { templateId, description, sampleData, createOption };
