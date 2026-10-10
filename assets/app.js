/* ============================================================
   影刀RPA 知识库 - app.js
   侧栏目录自动生成 + 滚动监听(进度/返回顶部/章节高亮) + 站内搜索 + A11Y
   纯原生JS，无依赖
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 移动端导航控制 ---------- */
  function setSidebar(open) {
    var sb = document.getElementById('docsSidebar');
    var ov = document.querySelector('.sidebar-overlay');
    if (!sb) return;
    if (open) sb.classList.add('open'); else sb.classList.remove('open');
    if (ov) { if (open) ov.classList.add('show'); else ov.classList.remove('show'); }
  }
  window.setSidebar = setSidebar;

  function setTopNav(open) {
    var links = document.querySelector('.topnav-links');
    if (links) { if (open) links.classList.add('open'); else links.classList.remove('open'); }
  }
  window.setTopNav = setTopNav;

  /* ---------- 侧栏目录自动生成 ---------- */
  function buildSidebar() {
    var wrap = document.getElementById('sbAccordion');
    if (!wrap) return;
    var main = document.querySelector('main.docs-main');
    if (!main) return;

    var sections = main.querySelectorAll('section[id]');
    if (!sections.length) return;

    var html = '<div class="sb-label">本页目录</div>';
    sections.forEach(function (sec) {
      var h2 = sec.querySelector('h2');
      if (!h2) return;
      var id = sec.getAttribute('id');
      var title = h2.textContent.trim();

      // 取直接属于此 section 的 h3（排除嵌套子 section 内的）
      var directH3s = Array.prototype.filter.call(sec.querySelectorAll('h3'), function (h3) {
        var p = h3.parentElement;
        while (p && p.tagName !== 'SECTION') p = p.parentElement;
        return p === sec;
      });

      var hasSub = directH3s.length > 0;
      html += '<div class="sb-item' + (hasSub ? '' : ' leaf') + '">';
      html += '<div class="sb-head" role="button" tabindex="0" aria-expanded="false" data-target="#' + id + '">';
      if (hasSub) {
        html += '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>';
      } else {
        html += '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="5" cy="12" r="1.2" fill="currentColor"/></svg>';
      }
      html += '<a href="#' + id + '">' + escapeHTML(title) + '</a>';
      html += '</div>';

      if (hasSub) {
        html += '<ul class="sb-sub">';
        directH3s.forEach(function (h3) {
          var subId = (h3.id) ? h3.id : (id + '--' + slug(h3.textContent));
          if (!h3.id) h3.id = subId;
          html += '<li><a href="#' + subId + '">' + escapeHTML(h3.textContent.trim()) + '</a></li>';
        });
        html += '</ul>';
      }
      html += '</div>';
    });

    wrap.innerHTML = html;

    // 折叠交互（含 leaf 类型直接跳转）
    wrap.querySelectorAll('.sb-head').forEach(function (head) {
      var item = head.parentElement;
      var link = head.querySelector('a');
      function toggle(e) {
        if (item.classList.contains('leaf')) { return; } // 叶子节点由链接处理
        e.preventDefault();
        var open = item.classList.toggle('open');
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      head.addEventListener('click', function (e) {
        if (e.target === link) { return; } // 点链接让其跳转
        toggle(e);
      });
      head.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); toggle(e); }
      });
    });
  }

  /* ---------- 滚动监听：进度条 + 返回顶部 + 章节高亮 ---------- */
  function initScroll() {
    var bar = document.getElementById('progressBar');
    var btt = document.getElementById('backToTop');
    var ticking = false;

    function onScroll() {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (st / h * 100) : 0) + '%';
      if (btt) { if (st > 360) btt.classList.add('show'); else btt.classList.remove('show'); }
      highlightActive();
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });

    function highlightActive() {
      var sections = document.querySelectorAll('main section[id]');
      if (!sections.length) return;
      var cur = sections[0].getAttribute('id');
      var pos = window.pageYOffset || document.documentElement.scrollTop;
      var offset = 120;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop - offset <= pos) cur = sections[i].getAttribute('id');
      }
      var links = document.querySelectorAll('.sb-sub a, .sb-head > a');
      links.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        if (href === '#' + cur) a.classList.add('active'); else a.classList.remove('active');
      });
      // 自动展开当前章节父项
      var activeHead = document.querySelector('.sb-sub a.active');
      if (activeHead) {
        var item = activeHead.closest('.sb-item');
        if (item && !item.classList.contains('open')) {
          item.classList.add('open');
          var head = item.querySelector('.sb-head');
          if (head) head.setAttribute('aria-expanded', 'true');
        }
      }
    }
    onScroll();
  }

  /* ---------- 站内搜索 ---------- */
  function initSearch() {
    var input = document.getElementById('globalSearch');
    var box = document.getElementById('searchResults');
    if (!input || !box) return;
    if (typeof SEARCH_INDEX === 'undefined') return;

    var base = getBasePath();
    var timer = null;

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      clearTimeout(timer);
      timer = setTimeout(function () { render(q); }, 80);
    });
    input.addEventListener('focus', function () { if (input.value.trim()) render(input.value.trim().toLowerCase()); });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.topnav-search')) box.classList.remove('show');
    });

    function render(q) {
      if (!q) { box.classList.remove('show'); box.innerHTML = ''; return; }
      var res = [];
      for (var i = 0; i < SEARCH_INDEX.length; i++) {
        var it = SEARCH_INDEX[i];
        var hay = (it.t + ' ' + it.s + ' ' + it.y).toLowerCase();
        if (hay.indexOf(q) !== -1) res.push(it);
        if (res.length >= 12) break;
      }
      if (!res.length) {
        box.innerHTML = '<div class="sr-empty">未找到「' + escapeHTML(q) + '」相关内容</div>';
        box.classList.add('show');
        return;
      }
      var html = '';
      res.forEach(function (it) {
        var href = base + it.p + (it.a ? '#' + it.a : '');
        html += '<a class="sr-item" href="' + href + '">';
        html += '<div class="sr-title">' + escapeHTML(it.t) + '</div>';
        html += '<div class="sr-meta">' + escapeHTML(it.s) + ' · ' + escapeHTML(it.y) + '</div>';
        html += '</a>';
      });
      box.innerHTML = html;
      box.classList.add('show');
    }
  }
  function getBasePath() {
    var p = location.pathname;
    var idx = p.lastIndexOf('/');
    return idx >= 0 ? p.substring(0, idx + 1) : '';
  }

  /* ---------- 工具 ---------- */
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function slug(s) {
    return String(s).trim().toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  /* ---------- 启动 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    buildSidebar();
    initScroll();
    initSearch();
    // 汉堡菜单
    var toggle = document.querySelector('.topnav-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var links = document.querySelector('.topnav-links');
        if (links) links.classList.toggle('open');
      });
    }
    var ov = document.querySelector('.sidebar-overlay');
    if (ov) ov.addEventListener('click', function () { setSidebar(false); });
  });
})();
