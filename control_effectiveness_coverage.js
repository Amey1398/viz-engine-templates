/** Control effectiveness and assessment coverage heatmap
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

export const templateId = "control_effectiveness_coverage";
export const description = "Control effectiveness and assessment coverage heatmap";
export const sampleData = {
  "controls": [
    "Change control",
    "Access review",
    "Backup testing"
  ],
  "domains": [
    "Payments",
    "Trading",
    "Digital"
  ],
  "assessments": [
    {
      "control": "Change control",
      "domain": "Payments",
      "score": 85
    },
    {
      "control": "Change control",
      "domain": "Trading",
      "score": 45
    },
    {
      "control": "Access review",
      "domain": "Payments",
      "score": 95
    },
    {
      "control": "Backup testing",
      "domain": "Digital",
      "score": 30
    }
  ]
};
export function createOption(data, options = {}) {
  const controls=ensure(data.controls,'controls'),domains=ensure(data.domains,'domains'),assessments=ensure(data.assessments,'assessments');
  const cells=domains.flatMap((domain,x)=>controls.map((control,y)=>{const a=assessments.find(a=>a.control===control&&a.domain===domain);return {value:[x,y,a?.score??-1],assessed:!!a};}));
  return root({grid:{left:140,right:40,top:28,bottom:60},xAxis:{type:'category',data:domains,...axes},yAxis:{type:'category',data:controls,...axes},visualMap:{show:false,min:0,max:100,inRange:{color:['#bd5266','#e8aa66','#399eaa','#32bc9d']}},
    series:[{type:'heatmap',data:cells.map(c=>({...c,itemStyle:!c.assessed?{color:'#26364b',borderColor:'#0d1727',borderWidth:3}:{borderColor:'#0d1727',borderWidth:3}})),label:{show:true,color:'#fff',formatter:p=>p.value[2]<0?'N/A':`${p.value[2]}%`}}]},options);
}
export default { templateId, description, sampleData, createOption };
