# AI Chat Rendering

The chat UI renders assistant text with Comark instead of raw HTML.

Use normal markdown for prose, lists, links, and code. Use GitHub Flavored
Markdown tables for tabular data; the chat renderer maps table elements to
Pixel table components.

Use `::pixel-chart` for charts. The chat renderer maps this component to a
controlled `MpChart` wrapper and accepts only these props:

- `title`
- `type`: `bar`, `line`, `pie`, `doughnut`, or `radar`
- `labels`: string array
- `datasets`: array of `{ label: string, data: number[] }`
- `horizontal`
- `stacked`
- `area`
- `showLegend`

````md
::pixel-chart
```yaml [props]
title: Monthly revenue
type: bar
labels:
  - Jan
  - Feb
datasets:
  - label: Revenue
    data:
      - 120
      - 180
showLegend: false
```
::
````
