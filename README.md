# 天堂ARPG 官方資料庫（Web 版）

此目錄是《Idle Lineage／天堂ARPG》專案的瀏覽器版本，包含官方首頁、掉落查詢、獵場地圖、道具／裝備／怪物／技能／NPC 圖鑑與留言板介面。整站為純靜態 HTML/CSS/JavaScript，不需要後端即可執行。

## 本機執行

需要 Python 3（或用任何靜態檔案伺服器）：

```bash
cd web
python serve.py
```

開啟 <http://127.0.0.1:8000/>。

也可以使用 Node.js：

```bash
npx serve .
```

> 不建議直接雙擊 `index.html`。部分瀏覽器會基於安全性限制 `file://` 的資源載入，請使用本機伺服器。

## 目錄結構

```
web/
├── index.html            官方首頁（公告、追憶錄、留言板）
├── drops.html            掉落查詢
├── maps-index.html       獵場地圖
├── items.html            道具圖鑑
├── equip.html            裝備圖鑑
├── mobs.html             怪物圖鑑
├── skills.html           技能圖鑑
├── npcs.html             NPC 圖鑑
├── assets/
│   ├── css/db.css        全站樣式
│   ├── js/db-common.js   共用彈窗／掉落率元件
│   ├── data/*.js         圖鑑資料（由遊戲資料表產生）
│   ├── icons/            道具、技能、裝備圖示
│   ├── images/           首頁與 NPC 圖像
│   ├── maps/             獵場預覽圖（WebP）
│   └── mobs/             怪物立繪
└── serve.py              本機靜態伺服器
```

## 部署

本專案可直接部署到 GitHub Pages、Cloudflare Pages、Netlify 或任何靜態主機。GitHub Pages 請將本目錄設為發佈來源（branch `main`，資料夾 `/`）。

## 資料來源

圖鑑資料由《Idle Lineage》遊戲資料表轉出，包含：

- 2,679 件道具
- 264 張獵場地圖
- 1,239 隻怪物
- 技能、裝備、NPC 商店與掉落關聯

## 授權

本專案為《天堂》系列之非官方粉絲作品，遊戲素材與商標權利屬原權利人所有，僅供學習與研究使用。
