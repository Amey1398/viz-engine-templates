/** Reusable particle-animated service/dependency/data-flow topology
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

export const templateId = "particle_flow";
export const description = "Reusable particle-animated service/dependency/data-flow topology";
export const sampleData = {
  "nodes": [
    {
      "id": "Payments",
      "label": "Payments",
      "layer": 0,
      "status": "healthy"
    },
    {
      "id": "API",
      "label": "Payment API",
      "layer": 1,
      "status": "healthy"
    },
    {
      "id": "DB",
      "label": "Database",
      "layer": 2,
      "status": "degraded"
    },
    {
      "id": "Vendor",
      "label": "Vendor",
      "layer": 2,
      "status": "failed"
    }
  ],
  "edges": [
    {
      "source": "Payments",
      "target": "API",
      "status": "healthy",
      "volume": 40
    },
    {
      "source": "API",
      "target": "DB",
      "status": "degraded",
      "volume": 20
    },
    {
      "source": "API",
      "target": "Vendor",
      "status": "failed",
      "volume": 10
    }
  ]
};
export function createOption(data, options = {}) {
  const nodes=ensure(data.nodes,'nodes'),edges=ensure(data.edges,'edges');
  const layers=[...new Set(nodes.map(n=>n.layer??0))].sort((a,b)=>a-b),point={};
  for(const [i,layer] of layers.entries()){ const group=nodes.filter(n=>(n.layer??0)===layer); for(const [j,n] of group.entries()) point[n.id]=[100+i*800/Math.max(1,layers.length-1),100+(j+1)*400/(group.length+1)]; }
  for(const e of edges){if(!point[e.source]||!point[e.target])throw Error('Unknown edge endpoint');}
  const animate=options.animate!==false, speed=options.speed??60;
  return root({grid:{left:0,right:0,top:0,bottom:0},xAxis:{type:'value',min:0,max:1000,show:false},yAxis:{type:'value',min:0,max:600,inverse:true,show:false},
    series:[{type:'lines',name:'Connections',coordinateSystem:'cartesian2d',z:1,effect:{show:animate,symbol:'circle',symbolSize:5,constantSpeed:speed,trailLength:.25},
      data:edges.map(e=>({name:`${e.source} → ${e.target}`,coords:[point[e.source],point[e.target]],status:e.status,volume:e.volume,
        lineStyle:{color:color(e.status),width:Math.max(1.5,Math.min(6,(e.volume??20)/12)),opacity:.75,curveness:.15,type:e.status==='failed'?'dashed':'solid'},effect:{show:animate&&e.status!=='failed',color:color(e.status),constantSpeed:e.status==='degraded'?speed*.5:speed}}))},
      {type:'scatter',name:'Entities',z:5,symbolSize:options.nodeSize??30,label:{show:true,position:'bottom',distance:11,...textLabel,formatter:p=>p.data.name},
       data:nodes.map(n=>({name:n.label??n.id,id:n.id,status:n.status,value:point[n.id],itemStyle:{color:color(n.status),borderColor:'#e9f4ff',borderWidth:1.5,shadowBlur:12,shadowColor:color(n.status)}}))}]},options);
}
export default { templateId, description, sampleData, createOption };
