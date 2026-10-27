# Tech & Cyber Risk ECharts Templates

**16 individual ES modules**: the 15 requested technology/cyber risk use cases plus a standalone particle flow template.

Each module exports:
- `templateId`: stable registry key
- `description`: purpose
- `sampleData`: synthetic fixture
- `createOption(data, options = {})`: returns an Apache ECharts 5 `option` object
- default export: `{templateId, description, sampleData, createOption}`

## Usage (JavaScript with bundler)

```js
import * as echarts from 'echarts';
import { createOption, sampleData } from './particle_flow.js';
const chart = echarts.init(document.getElementById('chart'));
chart.setOption(createOption(sampleData, { animate: true, speed: 70 }));
chart.on('click', params => console.log(params.data));
```

## Browser usage without bundler

```html
<div id="chart" style="height:540px"></div>
<script src="https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js"></script>
<script type="module">
  import {createOption, sampleData} from './particle_flow.js';
  const chart = echarts.init(document.getElementById('chart'));
  chart.setOption(createOption(sampleData));
</script>
```

Use a local web server (`python -m http.server 8000`) rather than opening local ES modules using `file://` when testing in a browser.

## Agent tool integration

1. Fetch data with tool 1.
2. Tool 2 chooses `template_id`, uses dataset-to-template field bindings, and passes a JSON object matching the module's `sampleData` shape.
3. The trusted backend/frontend imports the approved template and calls `createOption(data, options)`.
4. `echarts.init(...).setOption(option)` renders the chart.

The AI does not generate or execute JavaScript. Do not accept arbitrary executable formatter functions, raw chart options, or template paths from the agent. Validate permissions, field names, data types and maximum row counts in your existing binder.

## Notes

- All fixtures are synthetic. Data semantics and numeric measures should be reviewed before making risk decisions.
- Node/edge selection events can be captured with `chart.on('click', ...)`; action handlers and evidence retrieval belong in your existing frontend.
- `particle_flow.js` is a native **2D ECharts** template. The earlier Three.js 3D prototype is a separate renderer and is not silently included in the ECharts template module.
- Some templates use ECharts callback functions defined **inside trusted modules** for `custom` series/labels, not code supplied by the AI.
- Test with your deployed ECharts version and browser before production use.
