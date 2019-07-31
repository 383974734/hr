// pages/position/position.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height, 
    windowHeight: app.globalData.windowHeight,
    screenHeight: app.globalData.screenHeight,
    // 记录左侧上次所选择的索引
    seleL: 0,
    // 记录中间上次所选择的索引
    seleM: 0,
    //中间数据
    listM: [],
    //右侧数据
    listR: [],
    list:[
      {
      classA: "高级管理",
      sele: false,
      classB: [{
        name: "高级管理职位",
        sele: false,
        classC: ["CEO/总裁/总经理", "副总/裁副总经理", "事业总负责人", "区域/分公司/代表处负责人", "总裁/总经理/董事长助理", "合伙人", "创始人", "董事会秘书"],
        }]},
      {
      classA: "技术",
      sele: false,
      classB: [{
          name: "后端开发",
          sele: false,
          classC: ["Java", "C++", "PHP", "数据挖掘", "C", "C#", ".NET", "Hadoop", "Python", "Delphi", "VB", "Perl", "Ruby", "Node.js", "搜索算法", "Golang", "自然语言处理", "推荐算法", "Erlang", "算法工程师", "语言/视频/图形/开发", "数据采集"],
        }, {
          name: "移动开发",
          sele: false,
          classC: ["HTML5", "Android", "iOS", "wp", "移动web前端", "Flash", "JavaScript", "U3D", "COCOS2DX"],
        }, {
          name: "测试",
          sele: false,
          classC: ["测试工程师", "自动化测试", "功能测试", "性能测试", "测试开发", "移动端测试", "游戏测试", "硬件测试", "软件测试"],
        }, {
          name: "运维/技术支持",
          sele: false,
          classC: ["运维工程师", "运维开发工程师", "网络工程师", "IT技术支持", "系统管理员", "网络安全", "系统安全", "DBA"],
        }, {
          name: "数据",
          sele: false,
          classC: ["ETL工程师", "数据仓库", "数据开发", "数据挖掘", "数据分析师", "数据架构师", "算法研究员"],
        }, {
          name: "项目管理",
          sele: false,
          classC: ["项目经理", "项目主管", "项目专员", "实施顾问", "实施工程师", "需求分析工程师"],
        }, {
          name: "硬件开发",
          sele: false,
          classC: ["硬件", "嵌入式", "自动化", "单片机", "电路设计", "驱动开发", "系统集成", "FPGA开发", "DSP开发", "ARM开发", "PCB工艺", "模具设计", "热传导", "材料工程师", "精益工程师", "射频工程师"],
        }, {
          name: "前端开发",
          sele: false,
          classC: ["web前端", "Javascript", "Flash", "HTML5"],
        }, {
          name: "通信",
          sele: false,
          classC: ["通信技术工程师", "通信研发工程师", "数据通信工程师", "移动通信工程师", "电信网络工程师", "电信交换工程师", "有线传输工程师", "无限射频工程师", "通信电源工程师", "通信标准化工程师", "通信项目专员", "通信项目经理", "核心网络工程师", "通信测试工程师", "通信设备工程师", "光通信工程师", "光传输工程师", "光网络工程师"],
        }, {
          name: "电子/半导体",
          sele: false,
          classC: ["电子工程师", "电气工程师", "FAE", "电气设计工程师"],
        }, {
          name: "高端技术职位",
          sele: false,
          classC: ["技术经理", "技术总监", "测试经理", "架构师", "CTO", "运维总监", "技术合伙人"],
        }, {
          name: "人工智能",
          sele: false,
          classC: ["机器学习", "深度学习", "图像处理", "语音识别", "图像识别", "算法研究员"],
        }, {
          name: "软件销售支持",
          sele: false,
          classC: ["授权工程师", "售后工程师"],
        }, {
          name: "其他技术职位",
          sele: false,
          classC: ["其他技术职位"],
        }]},
      {
      classA: "产品",
      sele: false,
      classB: [{
        name: "产品经理",
        sele: false,
        classC: ["产品经理", "网页产品经理", "移动产品经理", "产品助理", "数据产品经理", "电商产品经理", "游戏策划", "产品专员"]},{
        name: "高端产品职位",
        sele: false,
        classC: ["产品总监", "游戏制作人", "产品VP"]},{
        name: "其他产品职位",
        sele: false,
        classC: ["其他产品职位"]}]},
      {
      classA: "设计",
      sele: false,
      classB: [{
          name: "视觉设计",
          sele: false,
        classC: ["视觉设计师", "网页设计师", "Flash设计师", "APP设计师", "UI设计师", "平面设计师", "没数设计师（2D/3D）", "广告设计师", "多媒体设计师", "原画师", "游戏特效", "游戏界面设计师", "游戏场景", "游戏角色", "游戏动作", "三维/CAD/制图", "美工", "包装设计", "设计师助理", "动画设计师", "插画师"],
        }, {
          name: "交互设计",
          sele: false,
          classC: ["交互设计师", "无限交互设计师", "网页交互设计师", "硬件交互设计师"],
        }, {
          name: "用户研究",
          sele: false,
          classC: ["数据分析师", "用户研究员", "游戏数值策划", "UX设计师", "用户研究经理", "用户研究总监"],
        }, {
          name: "高端设计职位",
          sele: false,
          classC: ["设计经理/主管", "设计总监", "视觉设计经理", "视觉设计总监", "交互设计经理/主管", "交互设计总监"],
        }, {
          name: "非视觉设计",
          sele: false,
          classC: ["服装设计", "工业设计", "橱柜设计", "家具设计", "家居设计", "珠宝设计", "室内设计", "陈列设计", "景观设计"],
        }, {
          name: "其他设计职位",
          sele: false,
          classC: ["其他设计职位"],
        }]},
      {
      classA: "运营",
        sele: false,
      classB: [{
        name: "运营",
        sele: false,
        classC: ["社交运营", "产品运营", "数据运营", "内容运营", "活动运营", "商家运营", "品类运营", "游戏运营", "网络推广", "网络运营", "新媒体运营", "社区运营", "微信运营", "微博运营", "策略运营", "线下拓展运营", "电商运营", "运营助理/专员", "内容审核", "营销运营"],
        }, {
          name: "编辑",
          sele: false,
          classC: ["副主编", "内容编辑", "文案策划", "网站编辑", "记着", "采编"],
        }, {
          name: "客服",
          sele: false,
          classC: ["售前咨询", "售后咨询", "网络客服", "客服经理", "客服专员/助理", "客服主管", "客服总监", "电话客服", "咨询热线/呼叫中心客服"],
        }, {
          name: "高端运营职位",
          sele: false,
          classC: ["主编", "运营总监", "COO", "客服总监", "运营经理/主管"],
        }, {
          name: "其他运营职位",
          sele: false,
          classC: ["其他运营职位"],
        }]},
      {
      classA: "市场",
      sele: false,
      classB: [{
        name: "市场/营销",
        sele: false,
        classC: ["选址开发", "市场营销", "市场策划", "市场顾问", "市场推广", "SEO", "SEM", "商务渠道", "商业数据分析", "活动策划", "网络营销", "海外市场", "政府关系", "APP推广"],
        },{
          name: "公关媒介",
          sele: false,
          classC: ["媒介经理", "广告协商", "品牌公关", "媒介专员", "活动策划执行", "媒介策划"],
        }, {
          name: "会务会展",
          sele: false,
          classC: ["会议活动销售", "会议活动策划", "会议活动执行", "会展活动销售", "会展活动策划", "会展活动执行"],
        }, {
          name: "广告",
          sele: false,
          classC: ["广告创意", "美术指导", "广告设计师", "策划经理", "文案", "广告制作", "媒介投放", "媒介合作", "媒介顾问", "广告审核"],
        }, {
          name: "高端市场职位",
          sele: false,
          classC: ["市场总监", "CMO", "公关总监", "媒介总监", "创意总监"],
        }, {
          name: "其他市场职位",
          sele: false,
          classC: ["其他市场职位"],
        }]},
      {
      classA: "人事/财务/行政",
      sele: false,
      classB: [{
        name: "人力资源",
        sele: false,
        classC: ["人力资源主管", "招聘", "HRBP", "人力资源专员/助理", "培训", "薪资福利", "绩效考核", "人力资源经理", "人力资源VP/CHO", "人力资源总监", "员工关系", "组织发展"],
        }, {
          name: "行政",
          sele: false,
          classC: ["行政专员/助理", "前台", "行政主管", "经理助理", "后勤", "商务司机", "行政经理", "行政总监"],
        }, {
          name: "财务",
          sele: false,
          classC: ["会计", "出纳", "财务顾问", "结算", "税务", "审计", "风控", "财务经理", "CFO", "财务总监", "财务主管"],
        }, {
          name: "法务",
          sele: false,
          classC: ["法务专员/助理", "律师", "专利", "法律顾问", "法务主管", "法务经理", "法务总监"],
        }, {
          name: "其他职能职位",
          sele: false,
          classC: ["其他职能职位"],
        }]},
      {
      classA: "销售",
      sele: false,
      classB: [{
          name: "销售",
          sele: false,
        classC: ["销售专员", "销售经理", "客户代表", "大客户代表", "BD经理", "商务渠道", "渠道经理", "代理商销售", "销售经理", "电话销售", "销售顾问", "商品经理", "广告销售", "网络营销", "营销主管", "销售工程师", "客户经理"],
        }, {
          name: "销售管理",
          sele: false,
          classC: ["销售总监", "商务总监", "区域总监", "市场经理", "销售VP", "团队经理"],
        }, {
          name: "其他销售职位",
          sele: false,
          classC: ["其他销售职位"],
        }]},
      {
      classA: "传媒",
      sele: false,
      classB: [{
          name: "采编/写作/出版",
          sele: false,
        classC: ["记者", "编辑", "采编", "撰稿人", "出版发行", "校对录入", "总编", "自媒体"],
        }, {
          name: "公关媒介",
          sele: false,
          classC: ["媒介经理", "媒介专员", "广告协调", "品牌公关", "活动策划执行", "媒介策划"],
        }, {
          name: "会务会馆",
          sele: false,
          classC: ["会议活动销售", "会议活动策划", "会议活动执行", "会展活动销售", "会展活动策划", "会展活动执行"],
        }, {
          name: "广告",
          sele: false,
          classC: ["广告创意", "美术指导", "广告设计师", "策划经理", "文案", "广告制作", "媒介投放", "媒介投放", "媒介合作", "媒介顾问", "广告审核"],
        }, {
          name: "影视媒体",
          sele: false,
          classC: ["助理", "统筹制片人", "执行制片人", "导演/编导", "摄影/摄像师", "视频编辑", "音频编辑", "经纪人", "后期制作", "影视制作", "影视发行", "影视策划", "主持人/主播/DJ", "演员/配音/模特", "化妆/造型/服装", "放映管理", "录音/音效", "制片人", "编剧"],
        }, {
          name: "其他传媒职位",
          sele: false,
          classC: ["其他传媒职位"],
        }]},
      {
      classA: "金融",
      sele: false,
      classB: [{
          name: "投融资",
          sele: false,
        classC: ["投资经理", "行业研究", "资产管理", "投资监管", "投资VP", "投资合伙人", "融资", "并购", "投后管理", "其他投融资职位", "投资顾问"],
        }, {
          name: "风控",
          sele: false,
          classC: ["风控", "律师", "资信评估", "合规稽查"],
        }, {
          name: "税务审计",
          sele: false,
          classC: ["审计", "法务", "合计", "清算"],
        }, {
          name: "银行",
          sele: false,
          classC: ["信用卡销售", "分析师", "柜员", "商务渠道", "大堂经理", "理财顾问", "客户经理", "信贷管理", "风控"],
        }, {
          name: "互联网金融",
          sele: false,
          classC: ["金融产品经理", "风控", "催收员", "分析师", "投资经理", "交易员", "理财顾问", "合规稽查", "审计", "清算"],
        }, {
          name: "保险",
          sele: false,
          classC: ["保险业务", "精算师", "保险理赔"],
        }, {
          name: "证券",
          sele: false,
          classC: ["证券经纪人", "证券分析师"],
        }, {
          name: "其他金融职位",
          sele: false,
          classC: ["其他金融职位"],
        }]},
      {
      classA: "汽车",
      sele: false,
      classB: [{
          name: "汽车设计与研发",
          sele: false,
        classC: ["汽车设计", "车身设计", "底盘设计", "机械设计", "动力系统设计", "电子工程设计", "零部件设计", "汽车工程项目管理", "内外饰设计工程师"],
        }, {
          name: "汽车生产与制造",
          sele: false,
          classC: ["总装工程师", "焊接工程师", "冲压工程师", "质量工程师"],
        }, {
          name: "汽车营销与服务",
          sele: false,
          classC: ["汽车销售", "汽车配件销售", "汽车售后服务", "汽车维修", "汽车美容", "汽车定损理赔", "二手车评估师", "4S店管理", "汽车改装工程师"],
        }, {
          name: "其他汽车职位",
          sele: false,
          classC: ["其他汽车职位"],
        }]},
      {
      classA: "教育培训",
        sele: false,
      classB: [{
          name: "教育产品研发",
          sele: false,
        classC: ["课程设计", "课程编辑", "教师", "培训研究", "培训师", "培训策划", "其他教育产品职位"],
        }, {
          name: "教育执行",
          sele: false,
          classC: ["校长", "教务管理", "教学管理", "班主任/辅导员"],
        }, {
          name: "教师",
          sele: false,
          classC: ["教师", "助教", "高中教师", "初中教师", "小学教师", "幼教", "理科教师", "文科教师", "外语教师", "音乐教师", "美术教师", "体育教师", "就业教师"],
        }, {
          name: "IT培训",
          sele: false,
          classC: ["JAVA培训讲师", "Android培训讲师", "iOS培训讲师", "PHP培训讲师", ".NET培训讲师", "C++培训讲师", "Unity 3D培训讲师", "Web前端培训讲师", "软件测试培训讲师", "动漫培训讲师", "UI设计培训讲师"],
        }, {
          name: "职业培训",
          sele: false,
          classC: ["财务培训讲师", "HR培训讲师", "培训师", "扩展培训"],
        }, {
          name: "招生",
          sele: false,
          classC: ["课程顾问", "招生培训", "留学顾问"],
        }, {
          name: "教练",
          sele: false,
          classC: ["舞蹈教练", "瑜伽教练", "瘦身顾问", "游泳教练", "健身教练", "篮球/羽毛球教练", "跆拳道教练"],
        }, {
          name: "其他教育培训职位",
          sele: false,
          classC: ["其他教育培训职位"],
        }]},
      {
      classA: "医疗健康",
      sele: false,
      classB: [{
          name: "医生/医技",
          sele: false,
        classC: ["医生助理", "医学影像", "B超医生", "中医", "医师", "心理医师", "药剂师", "牙科医生", "康复治疗师", "验光师", "放射科医师", "检验科医师", "医师", "其他医生职位"],
        }, {
          name: "护士/护理",
          sele: false,
          classC: ["护士长", "护士/护理", "导医"],
        }, {
          name: "健康整形",
          sele: false,
          classC: ["营养师", "整形师", "理疗师", "针灸推拿"],
        }, {
          name: "生物制药",
          sele: false,
          classC: ["生物制药", "医药注册", "药品生产", "临床研究", "临床协调", "临床数据分析", "医学总监", "医药研发"],
        }, {
          name: "医疗器械",
          sele: false,
          classC: ["医疗器械注册", "医疗器械生产/质量管理"],
        }, {
          name: "药店",
          sele: false,
          classC: ["店长", "执业药师/驻店药师", "店员/营业员"],
        }, {
          name: "市场营销/媒体",
          sele: false,
          classC: ["医疗器械销售", "医学编辑", "医学总监", "医学编辑", "医药代表", "健康顾问", "医美咨询"],
        }, {
          name: "其他医疗健康职位",
          sele: false,
          classC: ["其他医疗健康职位"],
        }]},
      {
      classA: "采购/贸易",
      sele: false,
      classB: [{
          name: "采购",
          sele: false,
        classC: ["采购总监", "采购经理", "采购专员", "买手", "采购工程师", "采购主管", "采购助理"],
        }, {
          name: "进出口贸易",
          sele: false,
          classC: ["外贸经理", "外贸专员", "外贸业务员", "外贸跟单"],
        }, {
          name: "其他采购/贸易职位",
          sele: false,
          classC: ["其他采购/贸易职位"],
        }]},
      {
      classA: "供应链/物流",
      sele: false,
      classB: [{
          name: "物流",
          sele: false,
          classC: ["供应链专员", "供应链经理", "物流专员", "物流经理", "物流运输", "物流跟单", "贸易跟单", "物仓调度", "物仓项目", "运输经理/主管", "货运代理专员", "货运代理经理", "水/空/陆运操作", "报关员", "报检员", "核销员", "单证员"],
        }, {
          name: "仓储",
          sele: false,
          classC: ["仓库物料经理", "仓库物料专员", "仓库物料项目", "仓库管理", "仓库文员", "配/理/拣/发货"],
        }, {
          name: "运输",
          sele: false,
          classC: ["货运司机", "集装箱管理", "配运", "快递"],
        }, {
          name: "高端供应链职位",
          sele: false,
          classC: ["供应链总监", "物流总监"],
        }, {
          name: "其他供应链职位",
          sele: false,
          classC: ["其他供应链职位"],
        }]},
      {
      classA: "房地产/建筑",
      sele: false,
      classB: [{
          name: "房地产规划开发",
          sele: false,
        classC: ["房产策划", "地产项目管理", "地产招投标"],
        }, {
          name: "设计装修与市政建设",
          sele: false,
          classC: ["高级建筑工程师", "建筑工程师", "建筑设计师", "土木/土建/结构工程师", "室内设计", "园林设计", "城市规划设计", "工程监理", "工程造价", "预结算", "工程资料管理", "建筑施工现场管理"],
        }, {
          name: "房地产经纪",
          sele: false,
          classC: ["地产置业顾问", "地产评估", "地产中介"],
        }, {
          name: "物业管理",
          sele: false,
          classC: ["物业管理", "物业租赁销售", "物业招商管理"],
        }, {
          name: "高端房地产职位",
          sele: false,
          classC: ["地产项目总监", "地产策划总监", "地产招投标总监", "物业总监", "房地产销售总监"],
        }, {
          name: "其他房地产职位",
          sele: false,
          classC: ["其他房地产职位"],
        }]},
      {
      classA: "咨询/翻译/法律",
      sele: false,
      classB: [{
          name: "咨询/调研",
          sele: false,
        classC: ["企业管理咨询", "数据分析师", "财务咨询顾问", "IT咨询顾问", "人力资源顾问", "咨询项目管理", "战略顾问", "猎头顾问", "市场调研", "其他咨询顾问"],
        }, {
          name: "律师",
          sele: false,
          classC: ["知识产权", "事务所律师", "公司法务"],
        }, {
          name: "翻译",
          sele: false,
          classC: ["英语翻译", "日语翻译", "韩语/朝鲜语翻译", "法语翻译", "德语翻译", "俄语翻译", "西班牙语翻译", "其他语种翻译"],
        }, {
          name: "高端资讯类职位",
          sele: false,
          classC: ["咨询总监", "咨询经理", "高级翻译", "同声传译"],
        }, {
          name: "其他资讯类职位",
          sele: false,
          classC: ["其他资讯/翻译类职位"],
        }]},
      {
      classA: "实习生/管培生",
      sele: false,
      classB: [{
          name: "实习生/培训生/储备干部",
          sele: false,
        classC: ["实习生", "管理培训生", "储备干部"],
        }, {
          name: "其他实习/培训/储备职位",
          sele: false,
          classC: ["其他实习/培训/储备职位"],
        }]},
      {
      classA: "旅游",
      sele: false,
      classB: [{
          name: "旅游服务",
          sele: false,
        classC: ["计调", "签证", "旅游顾问", "导游", "预订票务"],
        }, {
          name: "旅游产品开发/策划",
          sele: false,
          classC: ["旅游产品经理", "旅游策划师"],
        }, {
          name: "其他旅游职位",
          sele: false,
          classC: ["其他旅游职位"],
        }]},
      {
      classA: "服务业",
      sele: false,
      classB: [{
          name: "安保/家政",
          sele: false,
          classC: ["保安", "保洁"],
        }, {
          name: "酒店",
          sele: false,
          classC: ["收银", "酒店前台", "客房服务员", "酒店经理"],
        }, {
          name: "餐饮",
          sele: false,
          classC: ["后厨", "配菜打荷", "茶艺师", "西点师", "收银", "服务员", "厨师", "咖啡师", "送餐员", "餐饮店长", "领班"],
        }, {
          name: "零售",
          sele: false,
          classC: ["督导/巡店", "陈列员", "理货员", "收银", "导购", "店员/营业员", "门店店长"],
        }, {
          name: "美容/健身",
          sele: false,
          classC: ["发型师", "美甲师", "化妆师", "瑜伽教练", "瘦身顾问", "游泳教练", "美体教练", "美容师/顾问", "舞蹈教练", "健身教练"],
        }, {
          name: "其他服务业职位",
          sele: false,
          classC: ["其他服务业职位"],
        }]},
      {
      classA: "生产制造",
      sele: false,
      classB: [{
          name: "生产运营",
          sele: false,
        classC: ["厂长/工厂经理", "生产总监", "生产经理/车间主任", "生产组长/拉长", "生产员", "生产设备管理", "生产计划/物料控制", "生产跟单"],
        }, {
          name: "质量安全",
          sele: false,
          classC: ["质量管理/测试", "可靠度工程师", "故障分析师", "认证工程师", "体系工程师", "审核员", "安全员"],
        }, {
          name: "机械设计/制造",
          sele: false,
          classC: ["机械工程师", "机械设计师", "机械设备工程师", "机械维修/保养", "机械制图", "机械结构工程师", "工业工程师", "工艺/制造工程师", "材料工程师", "机电工程师", "CNC/数控", "冲压工程师", "夹具工程师", "模具工程师", "焊接工程师", "铸造/锻造工程师"],
        }, {
          name: "化工",
          sele: false,
          classC: ["化工工程师", "实验室技术员", "化学分析", "涂料研发", "化妆品研发", "食品/饮料研发"],
        }, {
          name: "服装/纺织/皮革",
          sele: false,
          classC: ["服装设计", "女装设计", "男装设计", "童装设计", "内衣设计", "面料设计", "面料辅料研发", "面料辅料采购", "打样/制版", "服装/纺织/皮革跟单"],
        }, {
          name: "技工/普工",
          sele: false,
          classC: ["普工/操作工", "叉车", "铲车", "焊工", "氩弧焊工", "电工", "木工", "漆工", "车工", "磨工", "铣工", "钳工", "钻工", "铆工", "钣金", "抛光", "机修工", "折弯工", "电镀工", "喷塑工", "注塑工", "组装工", "包装工", "空调工", "电梯工", "锅炉工", "学徒工"],
        }, {
          name: "其他生产制造职位",
          sele: false,
          classC: ["其他生产制造职位"],
        }]},
      {
      classA: "其他",
      sele: false,
      classB: [{
          name: "其他职位类别",
          sele: false,
          classC: ["其他职位"],
        }]},
        
      ],


    showModalStatus: false,
    // animationData:"",
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '职位类型',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击左侧按钮
   */
  clickL: function(e) {
    var that = this;

    that.clearL();

    var index = e.currentTarget.dataset.index;
    var arr = that.data.list[index].classB;

    // 下面这段话的语法我也是无语了  就是把要取出来的这个玩应变成字符串再赋值   不是不很无语
    var item = "list[" + index + "]sele";

    that.setData({
      seleL: index,
      [item]: true,
      listM: that.data.listM.concat(arr),
      
    })
  },

  /**
   * 点击左侧数据是  清空所选数据
   */
  clearL: function(e) {
    var tempL = "list[" + this.data.seleL + "]sele";
    var tempM = "listM[" + this.data.seleM + "]sele";
    this.setData({
      [tempL]: false,
      [tempM]: false,
      listR: [],
      listM: [],
    });
  },

  /**
   * 点击中间按钮
   */
  clickM: function (e) {
    var that = this;

    that.clearM();

    var index = e.currentTarget.dataset.index;
    var arr = that.data.listM[index].classC;

    // 下面这段话的语法我也是无语了  就是把要取出来的这个玩应变成字符串再赋值   不是不很无语
    var item = "listM[" + index + "]sele";

    that.setData({
      seleM: index,
      [item]: true,
      listR: that.data.listR.concat(arr),
    })
  },

  /**
   * 点击中间数据是  清空所选数据
   */
  clearM: function (e) {
    var temp = "listM[" + this.data.seleM + "]sele";
    this.setData({
      [temp]: false,
      listR: [],
    });
  },

  /**
   * 确定选择当前职位
   */
  determineSele: function(e) {
    console.log(e.currentTarget.dataset.sele);
    //所选择的行业数据
    wx.setStorageSync("position", e.currentTarget.dataset.sele);
    wx.navigateBack();
  }
})