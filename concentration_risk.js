/** Treemap of shared infrastructure and vendor risk concentration
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

export const templateId = "concentration_risk";
export const description = "Treemap of shared infrastructure and vendor risk concentration";
export const sampleData = {
  "items": [
    {
      "name": "Cloud",
      "value": 55,
      "status": "high",
      "children": [
        {
          "name": "Region A",
          "value": 35,
          "status": "high"
        },
        {
          "name": "Region B",
          "value": 20,
          "status": "medium"
        }
      ]
    },
    {
      "name": "Identity Vendor",
      "value": 30,
      "status": "critical"
    },
    {
      "name": "Messaging",
      "value": 15,
      "status": "low"
    }
  ]
};
export function createOption(data, options = {}) {
  ensure(data.items,'items');
  const decorate = a => a.map(n=>({ ...n, itemStyle:{color:color(n.status),borderColor:'#102034',borderWidth:3}, children:n.children?decorate(n.children):undefined }));
  return root({series:[{type:'treemap',roam:true,nodeClick:'zoomToNode',breadcrumb:{show:true,itemStyle:{color:'#213c59'},textStyle:textLabel},label:{show:true,...textLabel,formatter:'{b}\n{c}'},upperLabel:{show:true,height:25,...textLabel},data:decorate(data.items),emphasis:{focus:'descendant'}}]},options);
}
export default { templateId, description, sampleData, createOption };
