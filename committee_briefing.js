/** Executive risk briefing with category movements and latest position
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

export const templateId = "committee_briefing";
export const description = "Executive risk briefing with category movements and latest position";
export const sampleData = {
  "risks": [
    {
      "name": "Cyber",
      "current": 75,
      "previous": 60
    },
    {
      "name": "Resilience",
      "current": 62,
      "previous": 68
    },
    {
      "name": "Change",
      "current": 82,
      "previous": 72
    },
    {
      "name": "Third Party",
      "current": 46,
      "previous": 44
    }
  ]
};
export function createOption(data, options = {}) {
  const risks=ensure(data.risks,'risks');
  return root({legend:{top:0,textStyle:textLabel},grid:{left:125,right:30,top:50,bottom:35},xAxis:{type:'value',min:0,max:options.max??100,...axes},yAxis:{type:'category',data:risks.map(r=>r.name),inverse:true,...axes},
    series:[{name:'Prior period',type:'bar',barGap:'-100%',barWidth:24,data:risks.map(r=>r.previous),itemStyle:{color:'#304962',borderRadius:3},z:1},
      {name:'Current period',type:'bar',barWidth:12,data:risks.map(r=>({value:r.current,itemStyle:{color:r.current>r.previous?color('degraded'):color('healthy')}})),label:{show:true,position:'right',color:'#dce7f5'},z:3}]},options);
}
export default { templateId, description, sampleData, createOption };
