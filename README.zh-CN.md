# Foxy John's — 官方网站项目文档

**爱尔兰凯利郡丁格尔镇 • 始创于 1899 年**

> **线上地址：** <https://wrm-fw.github.io/foxy-johns/>
> **英文文档：** [README.md](./README.md)

这是丁格尔主街（Main Street）**Foxy John's** 的响应式、移动优先官方网站，采用语义化 HTML5、现代 CSS3 与原生 JavaScript 编写，零依赖、零构建步骤，直接以 GitHub Pages 分支方式托管。

**关于语言：** 网站面向爱尔兰本地顾客与自驾游客，界面只提供英文，没有中文版式或语言切换。本文档是项目说明的中文版本，仅供开发维护时阅读，不参与站点渲染。

---

## 一、店铺事实（页面内容的依据）

| 项目 | 内容 |
| --- | --- |
| 地址 | Main Street, Grove, Dingle (Daingean Uí Chúis), Co. Kerry, Ireland |
| Eircode（爱尔兰邮编） | V92 PD6F |
| GPS 坐标 | 52°08'31.3"N 10°16'09.3"W（`52.1420387, -10.2692451`） |
| 电话 | [+353 66 915 1316](tel:+353669151316) |
| Google 地图 | [Foxy John's on Google Maps](https://www.google.com/maps/place/Foxy+John's/@52.1420387,-10.27182,17z/data=!3m1!4b1!4m6!3m5!1s0x484ffbc6a20a3047:0x2a60f3acef66c4a0!8m2!3d52.1420387!4d-10.2692451!16s%2Fg%2F1q62dzmf7) |
| Instagram | [@foxy_johns](https://www.instagram.com/foxy_johns/) |
| Facebook | [Foxy John's Facebook Page](https://www.facebook.com/Foxy-Johns-162255635562/) |
| 评分 | 4.7 / 5.0（1,280+ 条 Google 评价） |

---

## 二、页面必须守住的事实口径

1. **双重身份。** 1899 年起同时经营五金杂货与爱尔兰传统酒吧，另设老式自行车租赁点，供游客骑行 Slea Head Drive 海岸线。页面任何区块都不能把它写成"餐厅"。
2. **不做线上点单。** 这是**柜台服务的湿酒吧（wet pub）加五金店**：没有餐厅厨房，不提供线上订餐、订座、外送到府。酒水、商品、自行车一律到店先到先得。首屏下方专门放了 Notice on Dining & Online Ordering 说明块。
3. **实时营业状态引擎。** `js/main.js` 按 `Europe/Dublin` 时区实时计算"营业中/已打烊/下次开门时间"，同时更新顶栏徽章、首屏徽章、底部快捷栏与营业时间表格里的今日高亮行：
   - 周一至周四 10:30 – 23:30
   - 周五、周六 10:30 – 次日 00:30
   - 周日 12:00 – 23:30
4. **可带狗。** 店内与露天庭院均欢迎狗。
5. **无障碍。** 街道层无台阶入口，店内设无障碍卫生间。
6. **支付方式。** 信用卡、借记卡、NFC 手机闪付、现金均可。

改动以上任一条时，需同步检查首屏徽章、`#visit` 区块的表格与说明块、FAQ 文案三处，避免页面自相矛盾。

---

## 三、目录结构

```text
foxy-johns/
├── index.html              # 单页站点，语义化 HTML5
├── css/
│   └── styles.css          # 移动优先响应式样式，CSS 自定义属性统一管理色板与间距
├── js/
│   └── main.js             # 营业时间引擎、移动端抽屉导航、标签页、图片灯箱、SVG 兜底
├── assets/
│   └── images/
│       ├── logo.svg        # 圆徽标：扳手与酒杯交叉
│       ├── storefront.svg  # 绿白相间的老式门头矢量插画
│       ├── pint-stout.svg  # 爱尔兰黑啤
│       ├── hardware.svg    # 五金货架与按重量卖的钉子
│       ├── trad-session.svg# 传统爱尔兰音乐现场（小提琴、宝思兰鼓、锡哨）
│       ├── bicycle.svg     # Slea Head 海岸骑行
│       ├── snug-hearth.svg # 私密小隔间 snug 与泥炭壁炉
│       └── favicon.svg     # 标签页与桌面书签图标
├── .nojekyll               # 关闭 Jekyll 处理，Pages 直接原样发布
├── README.md               # 英文文档
└── README.zh-CN.md         # 本文件（仅项目文档，站点无中文）
```

页面内所有本地资源均以 `./` 相对路径引用，因此放在子路径（`/foxy-johns/`）或自定义域名根目录都不需要改代码。

---

## 四、部署方式

本仓库当前配置：Pages → **Source: Deploy from a branch**，**Branch: `main` / `/ (root)`**（即 legacy 分支直发，无 Actions 工作流）。

### 日常更新

```bash
cd foxy-johns
# 改文件
git add -A && git commit -m "说明改动与原因"
git push origin main
```

推送后 1–2 分钟生效。确认构建状态与线上地址：

```bash
gh api repos/WRM-FW/foxy-johns/pages --jq '.status + " " + .html_url'
```

### 换到别的仓库托管

1. 新建仓库（`foxy-johns` 或 `<用户名>.github.io`），把本目录内容放到仓库根。
2. **Settings → Pages**：Source 选 `Deploy from a branch`，Branch 选 `main`，文件夹选 `/ (root)`，Save。
3. 访问 `https://<用户名>.github.io/foxy-johns/`。

### 本机网络受限时的推送备选

`github.com:443` 的 git 传输在本机偶发不通（`api.github.com` 通常仍可用）。此时可走 REST 上传：先用 `PUT /repos/<o>/<r>/contents/<path>` 建种子提交，再用 `POST /git/trees` + `POST /git/commits` + `PATCH /git/refs/heads/main` 补齐其余文件；Pages 用 `POST /repos/<o>/<r>/pages` 开启。脚本见 `RestWeb_Develop/_tools/push_via_api.py`。网络恢复后务必 `git fetch origin && git reset --soft origin/main` 把本地历史对齐，否则本地与远端会各留一套分叉提交。

---

## 五、验收标准与实测记录

移动端布局的硬性要求是**任何宽度下都不出现横向滚动**，且留白匀称——"能显示"不算通过，必须重新渲染看图再判定。

- 检查工具：`RestWeb_Develop/_tools/verify_overflow.py <站点目录> [目标宽度]`。它在临时副本里注入探针，逐档打印 `scrollWidth - clientWidth` 与最宽"不可断内容"。
- 为什么要探针：本机 headless Edge 的 CSS 视口最小约 492px，`--window-size=375` 会被静默放大，所以 375px 只能通过 min-content 反推。
- 2026-10-12 实测：492 / 640 / 768 / 992 / 1280 五档溢出均为 0px；最宽不可断内容为 264px（地图区块的 nowrap 按钮），小于 375px 视口的可用宽度 295px；13 个本地资源 URL 全部 200；浏览器控制台无报错。
- 已知踩过的坑：grid 子项默认 `min-width:auto`，一个 `white-space: nowrap` 的按钮就能把整条 `1fr` 轨道撑破页面；`display:inline-block` 的高亮 span 之后紧跟的句号会单独掉一行。

**尚未验证：** 页面里的 Google Maps 嵌入 iframe 在本机无法访问 google.com，空白属网络受限而非站点缺陷，需在能正常访问 Google 的网络下确认地图能加载。
