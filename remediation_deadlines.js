/** Remediation timeline with Gantt-style custom bars
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

export const templateId = "remediation_deadlines";
export const description = "Remediation timeline with Gantt-style custom bars";
export const sampleData = {
  "tasks": [
    {
      "id": "R-1",
      "name": "IAM control fix",
      "start": "2026-10-01",
      "end": "2026-11-01",
      "status": "degraded"
    },
    {
      "id": "R-2",
      "name": "Failover review",
      "start": "2026-10-12",
      "end": "2026-12-15",
      "status": "healthy"
    },
    {
      "id": "R-3",
      "name": "Vendor remediation",
      "start": "2026-09-05",
      "end": "2026-10-10",
      "status": "critical"
    }
  ]
};
export function createOption(data, options = {}) {
  const tasks=ensure(data.tasks,'tasks'); const dates=tasks.flatMap(t=>[Date.parse(t.start),Date.parse(t.end)]).filter(Number.isFinite); if(dates.length!==tasks.length*2) throw Error('Invalid task date');
  return root({grid:{left:155,right:40,top:25,bottom:45},xAxis:{type:'time',min:Math.min(...dates)-86400000*5,max:Math.max(...dates)+86400000*5,...axes},yAxis:{type:'category',inverse:true,data:tasks.map(t=>t.name),...axes},
    series:[{type:'custom',name:'Remediation',data:tasks.map((t,i)=>({value:[i,Date.parse(t.start),Date.parse(t.end)],itemStyle:{color:color(t.status)},name:t.id})),
      renderItem:(params,api)=>{const i=api.value(0),start=api.coord([api.value(1),i]),end=api.coord([api.value(2),i]),height=api.size([0,1])[1]*.45;
        return {type:'rect',shape:{x:start[0],y:start[1]-height/2,width:Math.max(1,end[0]-start[0]),height},style:api.style(),transition:['shape']};},
      encode:{x:[1,2],y:0}}]},options);
}
export default { templateId, description, sampleData, createOption };
