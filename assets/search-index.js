/* RPA软件使用教程知识库 - 站内搜索索引
   索引覆盖：所有页面的 h2/h3/h4 标题、关键表格表头、流程图标题、提示框标题 */
const SEARCH_INDEX = [
  /* ===== index.html 首页 ===== */
  { p: "index.html", a: "overview", s: "首页总览", t: "RPA是什么：机器人流程自动化与无代码可视化编程，主力蓝印RPA", y: "标题" },
  { p: "index.html", a: "scenarios", s: "适用场景", t: "RPA适用场景：数据录入/报表生成/网页采集/电商运营/财务单据", y: "标题" },
  { p: "index.html", a: "compare", s: "工具对比", t: "蓝印RPA vs 影刀RPA vs UiPath 能力对比（免费版/SAP/桌面元素拾取/EXE打包）", y: "表格" },
  { p: "index.html", a: "path", s: "学习路径", t: "RPA学习路径流程图：基础→实战→AI→SAP原理→独立开发", y: "流程图" },
  { p: "index.html", a: "versions", s: "版本差异", t: "蓝印RPA 5档版本：社区版免费无限制/标准版/高级版/专业版/创业版", y: "表格" },
  { p: "index.html", a: "concepts", s: "核心概念", t: "RPA核心概念：流程/指令/变量/元素xpath/元素拾取/子流程/自定义指令", y: "标题" },

  /* ===== basics.html 基础使用 ===== */
  { p: "basics.html", a: "install", s: "安装与注册", t: "蓝印RPA下载安装、内置浏览器、社区版免费无时长限制", y: "标题" },
  { p: "basics.html", a: "ui", s: "界面概览", t: "蓝印编辑器界面：指令列表/流程编辑区/属性配置/内置浏览器/变量管理", y: "标题" },
  { p: "basics.html", a: "concepts", s: "核心概念", t: "蓝印16大类指令、自定义变量(任意类型)、xpath路径、标签页对象", y: "标题" },
  { p: "basics.html", a: "capture", s: "元素拾取", t: "蓝印元素拾取：选择元素按钮→高亮→自动生成xpath、校验元素、相似元素", y: "标题" },
  { p: "basics.html", a: "first-flow", s: "第一个流程", t: "搭建第一个蓝印流程：加载URL→填写输入框→点击元素→运行", y: "标题" },
  { p: "basics.html", a: "debug", s: "调试与运行", t: "蓝印单步调试、运行日志查看", y: "标题" },
  { p: "basics.html", a: "schedule", s: "定时调度与EXE打包", t: "蓝印定时器指令、应用级定时(标准版起)、EXE打包(专业版起)、离线内网、IM Agent", y: "标题" },
  { p: "basics.html", a: "faq", s: "常见问题", t: "FAQ：元素拾取不到、xpath失效、定时不可用、EXE打包不可用", y: "标题" },
  { p: "basics.html", a: "pitfalls", s: "踩坑速查", t: "踩坑速查表：社区版限制/桌面应用弱/无SAP指令/无数据表/DPI失效", y: "表格" },

  /* ===== cases.html 实战案例 ===== */
  { p: "cases.html", a: "commands", s: "指令分类", t: "蓝印RPA 16大类指令分类列表（浏览器/鼠标/元素/页面/Excel/流程控制等）", y: "表格" },
  { p: "cases.html", a: "case-excel", s: "案例1 Excel批量处理", t: "Excel 批量数据处理自动化：清洗去重拆分导出", y: "标题" },
  { p: "cases.html", a: "case-excel-flow", s: "案例1流程", t: "Excel批量处理流程图：导入清洗筛选保存", y: "流程图" },
  { p: "cases.html", a: "case-web", s: "案例2 网页采集", t: "网页数据采集（电商比价）翻页循环与反爬", y: "标题" },
  { p: "cases.html", a: "case-web-flow", s: "案例2流程", t: "网页采集流程图：打开登录获取相似元素翻页保存", y: "流程图" },
  { p: "cases.html", a: "case-mail", s: "案例3 邮件+录入", t: "自动化办公：邮件自动发送与系统数据录入", y: "标题" },
  { p: "cases.html", a: "case-mail-flow", s: "案例3流程", t: "邮件+录入流程图：定时触发登录采集汇总发邮件", y: "流程图" },
  { p: "cases.html", a: "case-oa", s: "案例4 OA下载归档", t: "OA流程批量下载发票/合同文件并按流程名建文件夹归档", y: "标题" },
  { p: "cases.html", a: "case-oa", s: "案例4流程", t: "OA下载归档流程图：遍历流程列表进入详情建文件夹下载附件移动归档", y: "流程图" },
  { p: "cases.html", a: "errors", s: "通用报错", t: "跨案例通用报错速查表", y: "表格" },

  /* ===== ai.html RPA结合AI ===== */
  { p: "ai.html", a: "overview", s: "AI能力总览", t: "RPA+AI三种融合路线：蓝印MCP开放接入/影刀AI Power原生四件套/UiPath AI Center", y: "表格" },
  { p: "ai.html", a: "matrix", s: "蓝印MCP路线", t: "蓝印MCP协议接入大模型(DeepSeek/Claude/GPT)、AI生成流程、IM Agent", y: "标题" },
  { p: "ai.html", a: "magic", s: "影刀AI Power路线", t: "影刀魔法指令/智能元素/智能修复/智能助理/AI WorkOS", y: "标题" },
  { p: "ai.html", a: "uipath", s: "UiPath AI Center路线", t: "UiPath AI Center模型管理/Document Understanding/Communications Miner", y: "标题" },
  { p: "ai.html", a: "unstructured", s: "非结构化数据", t: "三种路线处理合同/发票/邮件非结构化数据对比", y: "标题" },
  { p: "ai.html", a: "case-contract", s: "实战案例", t: "AI抽取合同/发票关键信息填入业务系统流程", y: "流程图" },
  { p: "ai.html", a: "compare", s: "AI vs 规则", t: "规则自动化 vs AI增强对比（非结构化数据/网页结构变化/自然语言指令）", y: "图表" },
  { p: "ai.html", a: "version", s: "版本差异", t: "蓝印/影刀/UiPath AI版本与额度差异", y: "表格" },
  { p: "ai.html", a: "best", s: "最佳实践", t: "AI踩坑提示与最佳实践（MCP配置/魔法指令校验/AI抽取复核）", y: "标题" },

  /* ===== sap.html SAP自动化原理 ===== */
  { p: "sap.html", a: "overview", s: "SAP自动化概述", t: "SAP GUI自动化四大难点与为什么需要RPA（蓝印不适用SAP内部元素）", y: "标题" },
  { p: "sap.html", a: "scenarios", s: "常见场景", t: "SAP自动化常见场景：凭证录入/采购订单/报表导出", y: "表格" },
  { p: "sap.html", a: "prepare", s: "前提准备", t: "SAP GUI Scripting 启用：服务端RZ11与客户端配置", y: "标题" },
  { p: "sap.html", a: "capture", s: "元素拾取", t: "SAP元素拾取三种方式：标准捕获/图像识别/脚本录制（需影刀/UiPath）", y: "标题" },
  { p: "sap.html", a: "strategies", s: "拾取策略对比", t: "SAP GUI Scripting/图像识别/坐标/快捷键 拾取策略对比", y: "表格" },
  { p: "sap.html", a: "ops", s: "常用操作", t: "SAP登录/事务码T-Code/ALV表格/录制回放", y: "标题" },
  { p: "sap.html", a: "case-po", s: "采购订单实战", t: "采购订单ME21N批量创建完整流程", y: "流程图" },
  { p: "sap.html", a: "fico-cases", s: "CO/FI财务案例", t: "SAP财务CO/FI模块9大案例（FB01/FBL1N/AS01/FF67/KS01/KO01/CO11N/CK11N/CK24）", y: "标题" },
  { p: "sap.html", a: "fico-cases", s: "案例8 标准成本滚算", t: "批量滚算制造件及半成品标准价格CK11N/CK24流程图（状态机KA→VO→FR）", y: "流程图" },
  { p: "sap.html", a: "errors", s: "常见报错", t: "SAP自动化常见报错与排查表", y: "表格" },
  { p: "sap.html", a: "pitfalls", s: "踩坑提示", t: "SAP自动化9条踩坑提示与核心路径", y: "标题" }
];
