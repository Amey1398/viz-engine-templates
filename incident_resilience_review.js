/** RTO vs recovery incident-review comparison
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

export const templateId = "incident_resilience_review";
export const description = "RTO vs recovery incident-review comparison";
export const sampleData = {
  "incidents": [
    {
      "id": "INC-01",
      "service": "Payments",
      "duration": 4.2,
      "rto": 2,
      "status": "critical"
    },
    {
      "id": "INC-02",
      "service": "Trading",
      "duration": 1.5,
      "rto": 3,
      "status": "healthy"
    },
    {
      "id": "INC-03",
      "service": "Portal",
      "duration": 6,
      "rto": 4,
      "status": "degraded"
    }
  ]
};
export function createOption(data, options = {}) {
  const incidents=ensure(data.incidents,'incidents');
  return root({legend:{top:0,textStyle:textLabel},grid:{left:90,right:38,top:52,bottom:32},xAxis:{type:'value',name:'Hours',...axes},yAxis:{type:'category',inverse:true,data:incidents.map(i=>i.service),...axes},
    series:[{name:'Actual restoration',type:'bar',barWidth:14,data:incidents.map(i=>({value:i.duration,name:i.id,itemStyle:{color:i.duration>i.rto?color('critical'):color('healthy')}}))},
      {name:'RTO',type:'scatter',symbol:'rect',symbolSize:[4,22],data:incidents.map((i,j)=>[i.rto,j]),itemStyle:{color:'#f3d590'}}]},options);
}
export default { templateId, description, sampleData, createOption };
