/** Bow-tie threat, barrier, top event and consequence Sankey
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

export const templateId = "visual_risk_bowtie";
export const description = "Bow-tie threat, barrier, top event and consequence Sankey";
export const sampleData = {
  "threats": [
    "Malicious change",
    "Vendor outage"
  ],
  "preventiveControls": [
    "Change gates",
    "Vendor monitoring"
  ],
  "topEvent": "Critical outage",
  "recoveryControls": [
    "Failover",
    "Incident response"
  ],
  "consequences": [
    "Customer disruption",
    "RTO breach"
  ],
  "paths": [
    {
      "source": "Malicious change",
      "target": "Change gates",
      "value": 3
    },
    {
      "source": "Change gates",
      "target": "Critical outage",
      "value": 3
    },
    {
      "source": "Vendor outage",
      "target": "Vendor monitoring",
      "value": 2
    },
    {
      "source": "Vendor monitoring",
      "target": "Critical outage",
      "value": 2
    },
    {
      "source": "Critical outage",
      "target": "Failover",
      "value": 3
    },
    {
      "source": "Failover",
      "target": "Customer disruption",
      "value": 3
    },
    {
      "source": "Critical outage",
      "target": "Incident response",
      "value": 2
    },
    {
      "source": "Incident response",
      "target": "RTO breach",
      "value": 2
    }
  ]
};
export function createOption(data, options = {}) {
  const stages=[ensure(data.threats,'threats'),ensure(data.preventiveControls,'preventiveControls'),[data.topEvent],ensure(data.recoveryControls,'recoveryControls'),ensure(data.consequences,'consequences')];
  const colors=['high','medium','critical','healthy','degraded'];
  return root({series:[{type:'sankey',nodeAlign:'justify',nodeWidth:15,nodeGap:24,top:45,left:25,right:30,bottom:25,emphasis:{focus:'adjacency'},
    data:stages.flatMap((group,i)=>group.map(name=>({name,itemStyle:{color:color(colors[i])},label:textLabel}))),
    links:ensure(data.paths,'paths').map(p=>({source:p.source,target:p.target,value:p.value??1,lineStyle:{color:'#7295bf',opacity:.4}})),lineStyle:{curveness:.45}}]},options);
}
export default { templateId, description, sampleData, createOption };
