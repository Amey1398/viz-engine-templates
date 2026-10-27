/** Five-by-five impact likelihood matrix with occurrence counts
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

export const templateId = "risk_matrices";
export const description = "Five-by-five impact likelihood matrix with occurrence counts";
export const sampleData = {
  "cells": [
    {
      "likelihood": 1,
      "impact": 2,
      "count": 3
    },
    {
      "likelihood": 3,
      "impact": 4,
      "count": 9
    },
    {
      "likelihood": 5,
      "impact": 5,
      "count": 4
    },
    {
      "likelihood": 4,
      "impact": 3,
      "count": 7
    }
  ]
};
export function createOption(data, options = {}) {
  const cells = ensure(data.cells,'cells');
  const all = Array.from({length:25},(_,i)=>{ const x=i%5+1,y=Math.floor(i/5)+1; const found=cells.find(c=>c.likelihood===x&&c.impact===y); return [x-1,y-1,found?.count??0]; });
  return root({ grid: {left:75,right:35,top:25,bottom:55}, xAxis: {type:'category',name:'Likelihood',data:['1','2','3','4','5'],...axes}, yAxis: {type:'category',name:'Impact',data:['1','2','3','4','5'],...axes}, visualMap: {show:false,min:0,max:options.maxCount??10,inRange:{color:['#18344c','#397c9d','#efbf6c','#e76a7a']}},
    series:[{type:'heatmap',name:'Risk count',data:all,label:{show:true,color:'#eef6ff'},itemStyle:{borderColor:'#0d1727',borderWidth:4},emphasis:{itemStyle:{borderColor:'#fff',borderWidth:2}}}] },options);
}
export default { templateId, description, sampleData, createOption };
