/** Time-series technology risk and incident trend analysis
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

export const templateId = "historical_trends";
export const description = "Time-series technology risk and incident trend analysis";
export const sampleData = {
  "months": [
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct"
  ],
  "series": [
    {
      "name": "SEV1",
      "values": [
        2,
        3,
        2,
        4,
        3,
        5
      ],
      "status": "critical"
    },
    {
      "name": "SEV2",
      "values": [
        7,
        5,
        9,
        8,
        11,
        10
      ],
      "status": "medium"
    }
  ]
};
export function createOption(data, options = {}) {
  const months=ensure(data.months,'months'),series=ensure(data.series,'series');
  return root({legend:{top:0,textStyle:textLabel},grid:{left:52,right:22,top:50,bottom:43},xAxis:{type:'category',data:months,boundaryGap:false,...axes},yAxis:{type:'value',...axes},dataZoom:options.dataZoom===false?[]:[{type:'inside',start:0,end:100}],
    series:series.map(s=>({name:s.name,type:'line',data:s.values,smooth:!!options.smooth,showSymbol:true,symbolSize:6,lineStyle:{width:3,color:color(s.status)},itemStyle:{color:color(s.status)},areaStyle:options.area?{opacity:.07}:undefined,emphasis:{focus:'series'}}))},options);
}
export default { templateId, description, sampleData, createOption };
