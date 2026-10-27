/** Evidence to claim interactive reasoning network
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

export const templateId = "visual_argument";
export const description = "Evidence to claim interactive reasoning network";
export const sampleData = {
  "nodes": [
    {
      "id": "Claim: Elevated risk",
      "role": "claim"
    },
    {
      "id": "Incident trend",
      "role": "supports"
    },
    {
      "id": "Control test",
      "role": "supports"
    },
    {
      "id": "Compensating control",
      "role": "challenges"
    }
  ],
  "links": [
    {
      "source": "Incident trend",
      "target": "Claim: Elevated risk",
      "relation": "supports"
    },
    {
      "source": "Control test",
      "target": "Claim: Elevated risk",
      "relation": "supports"
    },
    {
      "source": "Compensating control",
      "target": "Claim: Elevated risk",
      "relation": "challenges"
    }
  ]
};
export function createOption(data, options = {}) {
  ensure(data.nodes,'nodes'); ensure(data.links,'links'); const roleColor={claim:color('critical'),supports:color('healthy'),challenges:color('degraded')};
  return root({legend:{data:['claim','supports','challenges'],textStyle:textLabel},series:[{type:'graph',layout:'force',roam:true,force:{repulsion:260,edgeLength:[90,155]},categories:[{name:'claim'},{name:'supports'},{name:'challenges'}],label:{show:true,position:'right',...textLabel},
    data:data.nodes.map(n=>({name:n.id,category:['claim','supports','challenges'].indexOf(n.role),symbolSize:n.role==='claim'?55:32,itemStyle:{color:roleColor[n.role]||color('neutral')},...n})),
    links:data.links.map(e=>({...e,lineStyle:{color:e.relation==='challenges'?color('critical'):color('healthy'),width:2,type:e.relation==='challenges'?'dashed':'solid',curveness:.12}})),emphasis:{focus:'adjacency'}}]},options);
}
export default { templateId, description, sampleData, createOption };
