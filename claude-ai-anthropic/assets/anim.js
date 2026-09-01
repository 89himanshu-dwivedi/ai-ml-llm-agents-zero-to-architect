/* anim.js - animation engine for the Claude AI course
   Provides: reading progress bar, scroll reveal, stat counters,
             animated step flows (success + failure lanes),
             animated architecture diagrams (packet travelling a route).

   Usage in a page:
     <link rel="stylesheet" href="../assets/style.css">
     <script src="../assets/anim.js" defer></script>

   Flow markup (JSON inside the div, no escaping headaches):
     <div class="flow">
       <script type="application/json">
       { "title": "Agent loop",
         "steps": ["User message", "Claude plans", "tool_use", "tool_result", "Final answer"],
         "fail":  { "at": 2, "label": "Tool throws 500", "then": ["Retry w/ backoff", "Degrade to text answer"] },
         "tip":   "The loop only ends when stop_reason is end_turn." }
       </script>
     </div>

   Architecture markup:
     <div class="flow">
       <script type="application/json">
       { "type": "arch", "title": "MCP request path",
         "nodes": ["Claude Code", "MCP client", "MCP server", "Database"],
         "route": [0, 1, 2, 3, 2, 1, 0],
         "labels": ["tool call", "JSON-RPC", "SQL", "rows", "result", "render"] }
       </script>
     </div>
*/
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ CSS */
  var CSS = [
    '.afx{border:1px solid var(--line,#d7dde5);background:#fff;border-radius:14px;padding:16px 16px 18px;margin:22px 0;box-shadow:0 1px 2px rgba(16,24,40,.05)}',
    '.afx-hd{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;flex-wrap:wrap}',
    '.afx-t{font-weight:700;font-size:15px}',
    '.afx-btns{display:flex;gap:8px}',
    '.afx-b{font:600 12px/1 inherit;border:1px solid var(--line,#d7dde5);background:#f7f9fc;color:#1a1f26;border-radius:999px;padding:7px 12px;cursor:pointer}',
    '.afx-b:hover{background:#eef2f8}',
    '.afx-b.on{border-color:#0b62d6;color:#0b62d6}',
    '.afx-lane{display:flex;align-items:stretch;flex-wrap:wrap;gap:0}',
    '.afx-lane+.afx-lane{margin-top:14px;padding-top:14px;border-top:1px dashed var(--line,#d7dde5)}',
    '.afx-n{flex:1 1 120px;min-width:110px;border:1px solid var(--line,#d7dde5);background:#f7f9fc;border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.45;color:#5a6470;transition:background .3s,border-color .3s,color .3s,transform .3s,box-shadow .3s}',
    '.afx-n .afx-i{display:inline-block;font:700 10px/16px ui-monospace,Menlo,monospace;min-width:16px;height:16px;text-align:center;border-radius:5px;background:#e9eef5;color:#5a6470;margin-right:6px;transition:background .3s,color .3s}',
    '.afx-n.hit{background:#e9f7ee;border-color:#8ecfa5;color:#14532d;transform:translateY(-2px);box-shadow:0 6px 16px rgba(26,127,55,.14)}',
    '.afx-n.hit .afx-i{background:#1a7f37;color:#fff}',
    '.afx-fail .afx-n.hit{background:#fdecea;border-color:#f0a9a2;color:#7f1d1d;box-shadow:0 6px 16px rgba(198,40,40,.14)}',
    '.afx-fail .afx-n.hit .afx-i{background:#c62828}',
    '.afx-c{flex:0 0 34px;align-self:center;height:3px;background:#e3e8ef;border-radius:3px;position:relative;overflow:hidden}',
    '.afx-c i{position:absolute;inset:0 auto 0 0;width:0;background:#1a7f37;border-radius:3px;transition:width .38s linear}',
    '.afx-fail .afx-c i{background:#c62828}',
    '.afx-c.run i{width:100%}',
    '.afx-tag{font:700 10px/1 inherit;letter-spacing:1px;text-transform:uppercase;color:#5a6470;flex:0 0 100%;margin-bottom:7px}',
    '.afx-tag.ok{color:#1a7f37}.afx-tag.bad{color:#c62828}',
    '.afx-tip{margin-top:14px;font-size:13.5px;color:#5a6470;background:#f7f9fc;border-radius:8px;padding:9px 12px}',
    '.afx-arch{position:relative;display:flex;flex-wrap:wrap;gap:14px}',
    '.afx-box{flex:1 1 150px;min-width:130px;border:1px solid var(--line,#d7dde5);background:#f7f9fc;border-radius:10px;padding:14px 12px;text-align:center;font-size:13.5px;font-weight:600;transition:background .3s,border-color .3s,box-shadow .3s,transform .3s}',
    '.afx-box.hit{background:#e8f1fd;border-color:#8fb8ee;box-shadow:0 8px 20px rgba(11,98,214,.16);transform:translateY(-2px)}',
    '.afx-pk{position:absolute;left:0;top:0;pointer-events:none;display:flex;align-items:center;gap:6px;opacity:0;transition:transform .7s cubic-bezier(.4,0,.2,1),opacity .25s}',
    '.afx-pk b{width:12px;height:12px;border-radius:50%;background:#0b62d6;box-shadow:0 0 0 5px rgba(11,98,214,.18)}',
    '.afx-pk span{background:#0b62d6;color:#fff;font:600 11px/1 inherit;padding:4px 8px;border-radius:999px;white-space:nowrap}',
    '@media(max-width:700px){.afx-lane{flex-direction:column}.afx-c{flex:0 0 18px;width:3px;height:18px;margin:0 0 0 22px}.afx-c i{inset:0 0 auto 0;width:100%;height:0;transition:height .38s linear}.afx-c.run i{height:100%}}',
    '@media(prefers-reduced-motion:reduce){.afx-n,.afx-box,.afx-pk{transition:none}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('afx-css')) return;
    var s = document.createElement('style');
    s.id = 'afx-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* --------------------------------------------------------- small helpers */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* -------------------------------------------------- reading progress bar */
  function progressBar() {
    var bar = document.getElementById('readbar');
    if (!bar) {
      bar = el('div');
      bar.id = 'readbar';
      document.body.appendChild(bar);
    }
    var tick = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    tick();
  }

  /* ------------------------------------------------------- scroll reveal */
  function reveal() {
    var targets = document.querySelectorAll('.card, .tip, .warn, .info, .prac, .assign, .flow, table, pre, h2');
    if (REDUCED || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('rv-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    Array.prototype.forEach.call(targets, function (t, i) {
      t.classList.add('rv');
      t.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
      io.observe(t);
    });
  }

  /* ------------------------------------------------------- stat counters */
  function counters() {
    var nodes = document.querySelectorAll('[data-count]');
    if (!nodes.length) return;
    var run = function (n) {
      var to = parseFloat(n.getAttribute('data-count')) || 0;
      var suffix = n.getAttribute('data-suffix') || '';
      if (REDUCED) { n.textContent = to + suffix; return; }
      var t0 = performance.now(), dur = 900;
      var step = function (t) {
        var p = Math.min((t - t0) / dur, 1);
        n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { Array.prototype.forEach.call(nodes, run); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: .4 });
    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  /* ------------------------------------------------------------ step flow */
  function buildSteps(host, cfg) {
    var timers = [];
    var touched = false;   // a manual click wins over the scroll autoplay
    var clear = function () { timers.forEach(clearTimeout); timers = []; };

    var box = el('div', 'afx');
    var hd = el('div', 'afx-hd');
    hd.appendChild(el('span', 'afx-t', esc(cfg.title || 'Flow')));
    var btns = el('div', 'afx-btns');
    var bOk = el('button', 'afx-b', 'Play happy path');
    btns.appendChild(bOk);
    var bBad = null;
    if (cfg.fail) { bBad = el('button', 'afx-b', 'Play failure path'); btns.appendChild(bBad); }
    hd.appendChild(btns);
    box.appendChild(hd);

    function lane(kind, labels, tagText) {
      var l = el('div', 'afx-lane ' + kind);
      l.appendChild(el('div', 'afx-tag ' + (kind === 'afx-fail' ? 'bad' : 'ok'), esc(tagText)));
      var nodes = [], conns = [];
      labels.forEach(function (lab, i) {
        if (i) { var c = el('div', 'afx-c', '<i></i>'); l.appendChild(c); conns.push(c); }
        var n = el('div', 'afx-n', '<span class="afx-i">' + (i + 1) + '</span><span>' + esc(lab) + '</span>');
        l.appendChild(n);
        nodes.push(n);
      });
      return { root: l, nodes: nodes, conns: conns };
    }

    var okLane = lane('afx-ok', cfg.steps || [], cfg.okLabel || 'Happy path');
    box.appendChild(okLane.root);

    var badLane = null;
    if (cfg.fail) {
      var at = Math.min(Math.max(cfg.fail.at || 1, 0), (cfg.steps || []).length - 1);
      var badLabels = [(cfg.steps || [])[at]].concat([cfg.fail.label]).concat(cfg.fail.then || []);
      badLane = lane('afx-fail', badLabels, cfg.fail.tag || 'What breaks in production');
      box.appendChild(badLane.root);
    }

    if (cfg.tip) box.appendChild(el('div', 'afx-tip', '<b>Why it matters:</b> ' + esc(cfg.tip)));
    host.appendChild(box);

    function reset(l) {
      l.nodes.forEach(function (n) { n.classList.remove('hit'); });
      l.conns.forEach(function (c) { c.classList.remove('run'); });
    }
    function play(l, btn) {
      clear();
      reset(okLane);
      if (badLane) reset(badLane);
      if (btn) { bOk.classList.remove('on'); if (bBad) bBad.classList.remove('on'); btn.classList.add('on'); }
      if (REDUCED) {
        l.nodes.forEach(function (n) { n.classList.add('hit'); });
        l.conns.forEach(function (c) { c.classList.add('run'); });
        return;
      }
      var t = 0, gap = 620;
      l.nodes.forEach(function (n, i) {
        timers.push(setTimeout(function () { n.classList.add('hit'); }, t));
        if (i < l.conns.length) timers.push(setTimeout(function () { l.conns[i].classList.add('run'); }, t + 240));
        t += gap;
      });
    }

    bOk.addEventListener('click', function () { touched = true; play(okLane, bOk); });
    if (bBad) bBad.addEventListener('click', function () { touched = true; play(badLane, bBad); });
    return { box: box, autoplay: function () { if (!touched) play(okLane, bOk); } };
  }

  /* -------------------------------------------------- architecture diagram */
  function buildArch(host, cfg) {
    var timers = [];
    var touched = false;
    var box = el('div', 'afx');
    var hd = el('div', 'afx-hd');
    hd.appendChild(el('span', 'afx-t', esc(cfg.title || 'Architecture')));
    var btn = el('button', 'afx-b', 'Trace a request');
    var btns = el('div', 'afx-btns');
    btns.appendChild(btn);
    hd.appendChild(btns);
    box.appendChild(hd);

    var arch = el('div', 'afx-arch');
    var boxes = (cfg.nodes || []).map(function (n) {
      var b = el('div', 'afx-box', esc(n));
      arch.appendChild(b);
      return b;
    });
    var pk = el('div', 'afx-pk', '<b></b><span></span>');
    arch.appendChild(pk);
    box.appendChild(arch);
    if (cfg.tip) box.appendChild(el('div', 'afx-tip', '<b>Why it matters:</b> ' + esc(cfg.tip)));
    host.appendChild(box);

    var route = cfg.route || [];
    var labels = cfg.labels || [];

    function moveTo(i, label) {
      var b = boxes[i];
      if (!b) return;
      var x = b.offsetLeft + b.offsetWidth / 2 - 6;
      var y = b.offsetTop + b.offsetHeight / 2 - 8;
      pk.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      pk.style.opacity = '1';
      pk.querySelector('span').textContent = label || '';
      boxes.forEach(function (o) { o.classList.remove('hit'); });
      b.classList.add('hit');
    }

    function play() {
      timers.forEach(clearTimeout);
      timers = [];
      boxes.forEach(function (o) { o.classList.remove('hit'); });
      if (REDUCED || !route.length) { boxes.forEach(function (o) { o.classList.add('hit'); }); return; }
      pk.style.transition = 'none';
      moveTo(route[0], labels[0] || '');
      // force reflow so the first hop animates instead of jumping
      void pk.offsetWidth;
      pk.style.transition = '';
      var t = 300;
      route.forEach(function (idx, k) {
        if (!k) return;
        timers.push(setTimeout(function () { moveTo(idx, labels[k - 1] || ''); }, t));
        t += 850;
      });
      timers.push(setTimeout(function () {
        pk.style.opacity = '0';
        boxes.forEach(function (o) { o.classList.remove('hit'); });
      }, t + 500));
    }

    btn.addEventListener('click', function () { touched = true; play(); });
    return { box: box, autoplay: function () { if (!touched) play(); } };
  }

  /* ------------------------------------------------------------- bootstrap */
  function flows() {
    var hosts = document.querySelectorAll('.flow');
    Array.prototype.forEach.call(hosts, function (host) {
      if (host.dataset.afx) return;
      host.dataset.afx = '1';
      var src = host.querySelector('script[type="application/json"]');
      if (!src) return;
      var cfg;
      try { cfg = JSON.parse(src.textContent); } catch (e) {
        host.appendChild(el('div', 'afx', 'Flow config is not valid JSON.'));
        return;
      }
      src.remove();
      var built = (cfg.type === 'arch') ? buildArch(host, cfg) : buildSteps(host, cfg);
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (!e.isIntersecting) return;
            io.unobserve(e.target);
            setTimeout(built.autoplay, 250);
          });
        }, { threshold: .35 });
        io.observe(built.box);
      }
    });
  }

  function init() {
    injectCSS();
    progressBar();
    flows();
    reveal();
    counters();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
