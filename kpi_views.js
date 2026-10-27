/** KPI target vs actual performance with threshold-coded bars
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

export const templateId = "kpi_views";
export const description = "KPI target vs actual performance with threshold-coded bars";
export const sampleData = {
  "kpis": [
    {
      "name": "Patch Compliance",
      "actual": 91,
      "target": 95,
      "unit": "%"
    },
    {
      "name": "MFA Coverage",
      "actual": 98,
      "target": 99,
      "unit": "%"
    },
    {
      "name": "Recovery Tests",
      "actual": 79,
      "target": 90,
      "unit": "%"
    }
  ]
};
export function createOption(data, options = {}) {
  const rows = ensure(data.kpis,'kpis');
  return root({ grid: { left: 140, right: 48, top: 25, bottom: 35 }, xAxis: { type: 'value', max: options.max ?? 100, ...axes }, yAxis: { type: 'category', data: rows.map(x=>x.name), inverse: true, ...axes },
    legend: { top: 0, textStyle: textLabel }, series: [
      { type: 'bar', name: 'Actual', barWidth: 15, data: rows.map(x=>({ value: x.actual, name:x.name, target:x.target, itemStyle:{ color: x.actual >= x.target ? color('healthy') : color('degraded') } })), label: { show:true, position:'right', color:'#dce7f5' } },
      { type: 'scatter', name: 'Target', symbol: 'rect', symbolSize: [4,24], data: rows.map((x,i)=>[x.target,i]), itemStyle: { color:'#eff6ff' } }
    ] }, options);
}
export default { templateId, description, sampleData, createOption };
