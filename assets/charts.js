/* ============================================================
   影刀RPA 知识库 - charts.js
   Mermaid 初始化 + ECharts 初始化（按页面是否存在容器决定）
   读取 CSS 变量作为配色，保持与品牌色一致
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mermaid 初始化 ---------- */
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#e3edf5',
        primaryTextColor: '#0d3559',
        primaryBorderColor: '#1a4d7a',
        lineColor: '#5a7a99',
        secondaryColor: '#eaf2fa',
        tertiaryColor: '#fafafa',
        fontSize: '13px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif'
      },
      flowchart: { curve: 'basis', htmlLabels: true, useMaxWidth: true }
    });
  }

  /* ---------- 工具：读 CSS 变量 ---------- */
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    v = v ? v.trim() : '';
    return v || fallback;
  }
  var ACCENT = cssVar('--accent', '#1a4d7a');
  var ACCENT2 = cssVar('--accent2', '#2a6dad');
  var INK = cssVar('--ink', '#3c3c43');
  var MUTED = cssVar('--muted', '#63666e');
  var RULE = cssVar('--rule', '#e6e6e8');

  /* ---------- ECharts 通用配置 + 自动初始化 ---------- */
  if (window.echarts) {
    echarts.registerTheme('yd', {
      color: [ACCENT, ACCENT2, '#0a6bd1', '#059669', '#d97706', '#7c3aed'],
      textStyle: { color: INK, fontFamily: 'inherit', fontSize: 12 },
      title: { textStyle: { color: INK, fontWeight: 700 } },
      legend: { textStyle: { color: MUTED }, top: 6 },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0.98)',
        borderColor: RULE, borderWidth: 1, textStyle: { color: INK }
      },
      grid: { left: 12, right: 22, top: 50, bottom: 14, containLabel: true },
      xAxis: { axisLine: { lineStyle: { color: RULE } }, axisLabel: { color: MUTED }, splitLine: { lineStyle: { color: RULE, type: 'dashed' } } },
      yAxis: { axisLine: { lineStyle: { color: RULE } }, axisLabel: { color: MUTED }, splitLine: { lineStyle: { color: RULE, type: 'dashed' } } }
    });

    function render(container, opt) {
      var dom = typeof container === 'string' ? document.getElementById(container) : container;
      if (!dom) return;
      var chart = echarts.init(dom, 'yd');
      chart.setOption(opt);
      window.addEventListener('resize', function () { chart.resize(); });
      return chart;
    }

    window.YDCharts = { render: render, ACCENT: ACCENT, ACCENT2: ACCENT2, INK: INK, MUTED: MUTED };

    document.addEventListener('DOMContentLoaded', function () {
      // 自动渲染带 data-chart 配置的容器
      document.querySelectorAll('.chart-box[data-chart]').forEach(function (box) {
        var fn = window[box.getAttribute('data-chart')];
        if (typeof fn === 'function') { try { fn(box); } catch (e) { console.warn(e); } }
      });
    });
  }
})();
