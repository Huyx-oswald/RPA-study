/* 影刀RPA 知识库 - 站内搜索索引
   索引覆盖：所有页面的 h2/h3/h4 标题、关键表格表头、流程图标题、提示框标题 */
const SEARCH_INDEX = [
  /* ===== index.html 首页 ===== */
  { p: "index.html", a: "overview", s: "首页总览", t: "影刀RPA 是什么：数字化劳动力与无代码可视化编程", y: "标题" },
  { p: "index.html", a: "scenarios", s: "适用场景", t: "影刀RPA 适用场景：数据录入/报表生成/网页采集/电商运营/财务单据", y: "标题" },
  { p: "index.html", a: "compare", s: "工具对比", t: "影刀RPA vs UiPath vs Power Automate 能力对比", y: "表格" },
  { p: "index.html", a: "path", s: "学习路径", t: "影刀RPA 学习路径流程图：入门到进阶", y: "流程图" },
  { p: "index.html", a: "versions", s: "版本差异", t: "社区版/创业版/企业版/专业版 区别与授权模式", y: "表格" },
  { p: "index.html", a: "concepts", s: "核心概念", t: "应用/指令/变量/元素拾取/数据表/触发器/机器人", y: "标题" },

  /* ===== basics.html 基础使用 ===== */
  { p: "basics.html", a: "install", s: "安装与注册", t: "影刀RPA 下载安装步骤、注册登录、浏览器插件安装", y: "标题" },
  { p: "basics.html", a: "ui", s: "界面概览", t: "客户端界面：综合管理界面与应用开发界面五大功能区", y: "标题" },
  { p: "basics.html", a: "concepts", s: "核心概念", t: "流程、指令四要素、局部/全局变量、元素拾取三种方式", y: "标题" },
  { p: "basics.html", a: "capture", s: "元素拾取", t: "元素捕获操作步骤、XPath/CSS 选择器、元素捕获原理", y: "标题" },
  { p: "basics.html", a: "first-flow", s: "第一个流程", t: "搭建第一个流程：自动打开百度搜索关键词五步", y: "标题" },
  { p: "basics.html", a: "debug", s: "调试与运行", t: "断点、单步调试、运行日志、回放速度", y: "标题" },
  { p: "basics.html", a: "schedule", s: "定时调度", t: "定时触发器配置、控制台云端调度、本地与云端选型", y: "标题" },
  { p: "basics.html", a: "faq", s: "常见问题", t: "FAQ：找不到元素、云端不一致、定时卡住、路径报错", y: "标题" },
  { p: "basics.html", a: "pitfalls", s: "踩坑速查", t: "踩坑速查表：机器人离线/发布失败/参数超限/上传失败", y: "表格" },

  /* ===== cases.html 实战案例 ===== */
  { p: "cases.html", a: "commands", s: "指令分类", t: "影刀RPA 指令/组件完整分类列表（12大类）", y: "表格" },
  { p: "cases.html", a: "case-excel", s: "案例1 Excel批量处理", t: "Excel 批量数据处理自动化：清洗去重拆分导出", y: "标题" },
  { p: "cases.html", a: "case-excel-flow", s: "案例1流程", t: "Excel批量处理流程图：启动读取清洗筛选保存", y: "流程图" },
  { p: "cases.html", a: "case-web", s: "案例2 网页采集", t: "网页数据采集（电商比价）翻页循环与反爬", y: "标题" },
  { p: "cases.html", a: "case-web-flow", s: "案例2流程", t: "网页采集流程图：打开登录获取相似元素翻页保存", y: "流程图" },
  { p: "cases.html", a: "case-mail", s: "案例3 邮件+录入", t: "自动化办公：邮件自动发送与系统数据录入", y: "标题" },
  { p: "cases.html", a: "case-mail-flow", s: "案例3流程", t: "邮件+录入流程图：定时触发登录采集汇总发邮件", y: "流程图" },
  { p: "cases.html", a: "case-oa", s: "案例4 OA下载归档", t: "OA流程批量下载发票/合同文件并按流程名建文件夹归档", y: "标题" },
  { p: "cases.html", a: "case-oa", s: "案例4流程", t: "OA下载归档流程图：遍历流程列表进入详情建文件夹下载附件移动归档", y: "流程图" },
  { p: "cases.html", a: "errors", s: "通用报错", t: "跨案例通用报错速查表", y: "表格" },

  /* ===== ai.html 结合AI ===== */
  { p: "ai.html", a: "overview", s: "AI能力总览", t: "影刀四大原生AI能力：智能元素/魔法指令/智能修复/智能助理", y: "表格" },
  { p: "ai.html", a: "matrix", s: "产品矩阵", t: "影刀RPA/AI Power/AI Weave/DataConnect 产品矩阵", y: "表格" },
  { p: "ai.html", a: "magic", s: "魔法指令", t: "魔法指令四步上手：创建测试修改稳定运行", y: "标题" },
  { p: "ai.html", a: "unstructured", s: "非结构化数据", t: "影刀结合大模型处理合同/发票/邮件非结构化数据", y: "标题" },
  { p: "ai.html", a: "case-contract", s: "实战案例", t: "AI抽取合同/发票关键信息填入业务系统流程", y: "流程图" },
  { p: "ai.html", a: "compare", s: "AI vs 规则", t: "影刀AI增强 vs 传统规则自动化对比", y: "表格" },
  { p: "ai.html", a: "version", s: "版本差异", t: "魔法指令体验额度与企业版AI能力差异", y: "表格" },
  { p: "ai.html", a: "best", s: "最佳实践", t: "AI踩坑提示与最佳实践", y: "标题" },

  /* ===== sap.html 操作SAP ===== */
  { p: "sap.html", a: "overview", s: "SAP自动化概述", t: "SAP GUI自动化四大难点与为什么需要RPA", y: "标题" },
  { p: "sap.html", a: "scenarios", s: "常见场景", t: "SAP自动化常见场景：凭证录入/采购订单/报表导出", y: "表格" },
  { p: "sap.html", a: "prepare", s: "前提准备", t: "SAP GUI Scripting 启用：服务端RZ11与客户端配置", y: "标题" },
  { p: "sap.html", a: "capture", s: "元素拾取", t: "SAP元素拾取三种方式：标准捕获/图像识别/脚本录制", y: "标题" },
  { p: "sap.html", a: "strategies", s: "拾取策略对比", t: "SAP GUI Scripting/图像识别/坐标/快捷键 拾取策略对比", y: "表格" },
  { p: "sap.html", a: "ops", s: "常用操作", t: "SAP登录/事务码T-Code/ALV表格/录制回放", y: "标题" },
  { p: "sap.html", a: "case-po", s: "实战案例", t: "采购订单ME21N批量创建完整流程", y: "流程图" },
  { p: "sap.html", a: "errors", s: "常见报错", t: "SAP自动化常见报错与排查表", y: "表格" },
  { p: "sap.html", a: "pitfalls", s: "踩坑提示", t: "SAP自动化9条踩坑提示与核心路径", y: "标题" }
];
