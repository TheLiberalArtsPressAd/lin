/* ==========================================================================
   Lineage ARPG 官方資料庫 — 共用前端模組
   ==========================================================================
   這個檔案提供所有資料庫頁面共用的 UI 元件與工具函式：
   - openDrawer / closeDrawer：掉落、商店、地圖詳情側邊彈窗
   - getRateBadge：掉落機率標籤
   - escapeHtml：安全輸出文字
   ========================================================================== */
(function () {
  'use strict';

  var OVERLAY_ID = 'db-drawer-overlay';

  function ensureOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.className = 'db-drawer-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = [
      '<div class="db-drawer" role="document">',
      '  <div class="db-drawer-header">',
      '    <div class="db-drawer-title" id="db-drawer-title"></div>',
      '    <button type="button" class="db-drawer-close" aria-label="關閉視窗" title="關閉 (Esc)">&times;</button>',
      '  </div>',
      '  <div class="db-drawer-body" id="db-drawer-body"></div>',
      '</div>'
    ].join('');

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeDrawer();
    });
    overlay.querySelector('.db-drawer-close').addEventListener('click', closeDrawer);

    document.body.appendChild(overlay);
    return overlay;
  }

  function openDrawer(title, bodyHtml) {
    var overlay = ensureOverlay();
    var titleEl = overlay.querySelector('#db-drawer-title');
    var bodyEl = overlay.querySelector('#db-drawer-body');

    titleEl.innerHTML = title == null ? '' : String(title);
    bodyEl.innerHTML = bodyHtml == null ? '' : String(bodyHtml);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    var closeBtn = overlay.querySelector('.db-drawer-close');
    if (closeBtn) closeBtn.focus();

    // 讓彈窗內的表格可以獨立捲動
    bodyEl.scrollTop = 0;
  }

  function closeDrawer() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === 'Esc') closeDrawer();
  });

  /**
   * 掉落率標籤。資料中的 p 為百分比（0.1 ~ 100）。
   */
  function getRateBadge(p) {
    var rate = Number(p);
    if (!isFinite(rate) || rate <= 0) {
      return '<span class="badge cat" title="沒有掉落資料">—</span>';
    }

    var cls = 'rate-legend';
    var label = '傳說';
    if (rate >= 50) {
      cls = 'rate-high';
      label = '常見';
    } else if (rate >= 10) {
      cls = 'rate-mid';
      label = '普通';
    } else if (rate >= 1) {
      cls = 'rate-low';
      label = '稀有';
    } else if (rate >= 0.1) {
      cls = 'rate-rare';
      label = '極稀有';
    }

    var shown = rate >= 10 ? String(Math.round(rate)) : String(Math.round(rate * 100) / 100);
    return '<span class="badge ' + cls + '" title="掉落率 ' + shown + '%">' +
      shown + '% · ' + label + '</span>';
  }

  function escapeHtml(value) {
    if (value == null) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  window.openDrawer = openDrawer;
  window.closeDrawer = closeDrawer;
  window.getRateBadge = getRateBadge;
  if (typeof window.escapeHtml !== 'function') window.escapeHtml = escapeHtml;
})();
