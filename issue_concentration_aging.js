/** Stacked aging profile by risk domain
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

export const templateId = "issue_concentration_aging";
export const description = "Stacked aging profile by risk domain";
export const sampleData = {
  "groups": [
    {
      "risk": "Change",
      "age0to30": 12,
      "age31to90": 8,
      "age91to180": 4,
      "age180plus": 6
    },
    {
      "risk": "Cyber",
      "age0to30": 16,
      "age31to90": 9,
      "age91to180": 8,
      "age180plus": 4
    },
    {
      "risk": "Resilience",
      "age0to30": 8,
      "age31to90": 7,
      "age91to180": 5,
      "age180plus": 9
    }
  ]
};
export function createOption(data, options = {}) {
  const groups=ensure(data.groups,'groups'), buckets=[['age0to30','0–30 days','healthy'],['age31to90','31–90 days','medium'],['age91to180','91–180 days','degraded'],['age180plus','180+ days','critical']];
  return root({legend:{top:0,textStyle:textLabel},grid:{left:115,right:20,top:48,bottom:30},xAxis:{type:'value',...axes},yAxis:{type:'category',data:groups.map(g=>g.risk),...axes},
    series:buckets.map(([k,name,c])=>({type:'bar',name,stack:'issues',data:groups.map(g=>g[k]??0),barWidth:22,itemStyle:{color:color(c)},emphasis:{focus:'series'}}))},options);
}
export default { templateId, description, sampleData, createOption };
