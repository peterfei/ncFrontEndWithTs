export const mockNavLists = [
  {
    index: '1',
    name: '首页',
    link: 'home',
    children: []
  },
  {
    index: '2',
    name: '精品课',
    link: 'course',
    children: []
  },
  {
    index: '3',
    name: '职业路径',
    link: 'skill',
    children: []
  },
  {
    index: '4',
    name: '班级',
    link: 'classes',
    children: []
  },
  {
    index: '5',
    name: '商学院',
    link: 'cloud',
    children: []
  },
  {
    index: '6',
    name: '活动',
    link: 'community',
    children: []
  },
  {
    index: '7',
    name: '社区',
    link: 'activity',
    children: []
  },
  {
    index: '8',
    name: '教学包',
    link: 'resource?type=all&keyword=&sort=&filter',
    children: []
  },
  {
    index: '9',
    name: '备课区',
    link: 'prepare',
    children: []
  }
]

export const listItemFooter = [
  {
    index: 1,
    name: '关于我们',
    link: ''
  },
  {
    index: 2,
    name: '联系我们',
    link: ''
  },
  {
    index: 3,
    name: '服务条款',
    link: ''
  },
  {
    index: 4,
    name: 'i+计划',
    link: ''
  },
  {
    index: 5,
    name: '意见反馈',
    link: ''
  },
  {
    index: 6,
    name: '合作伙伴',
    link: ''
  }
]

export const mokHotSearchTag = [
  {
    index: 1,
    name: '电商概论'
  },
  {
    index: 3,
    name: '网络营销'
  },
  {
    index: 4,
    name: '网络营销'
  },
  {
    index: 5,
    name: '网店营销'
  },
  {
    index: 6,
    name: '移动电商'
  },
  {
    index: 7,
    name: '新媒体'
  },
  {
    index: 8,
    name: '跨境电商'
  }
]
export const mockBannerUrl = [
  {
    id: 1,
    // eslint-disable-next-line
    url: require('../../public/image/bg/1.jpg')
  },
  {
    id: 2,
    // eslint-disable-next-line
    url: require('../../public/image/bg/2.jpg')
  },
  {
    id: 3,
    // eslint-disable-next-line
    url: require('../../public/image/bg/3.jpg')
  }
]
export const mockCourseCategory = [
  {
    id: 1,
    name: '课程类别'
  },
  {
    id: 2,
    name: '网络营销'
  },
  {
    id: 3,
    name: '跨境电商'
  },
  {
    id: 4,
    name: '电商运营'
  }
]
export const mockQueryParams = [
  {
    label: '学科类别',
    key: 'subject',
    options: [
      {
        id: 1,
        name: '网络营销'
      },
      {
        id: 2,
        name: '跨境电商'
      },
      {
        id: 3,
        name: '跨境物流'
      }
    ],
    query_isAll: true,
    value: null,
    eventName: 'hander'
  },
  {
    label: '课程类别',
    key: 'course',
    options: [
      {
        id: 11,
        name: '电商基础概念'
      },
      {
        id: 12,
        name: '跨境电商物流'
      },
      {
        id: 13,
        name: '跨境电子商务'
      }
    ],
    query_isAll: true,
    value: null,
    eventName: 'hander'
  },
  {
    label: '收费类型',
    key: 'payment',
    options: [
      {
        id: 21,
        name: '收费'
      },
      {
        id: 22,
        name: '免费'
      }
    ],
    query_isAll: true,
    value: null,
    eventName: 'hander'
  },
  {
    label: '发布方',
    key: 'publisher',
    options: [
      {
        id: 31,
        name: '教师'
      },
      {
        id: 32,
        name: '企业'
      },
      {
        id: 33,
        name: '专家'
      },
      {
        id: 34,
        name: '学生'
      }
    ],
    query_isAll: true,
    value: null,
    eventName: 'hander'
  },
  {
    label: '适合层次',
    key: 'scope',
    options: [
      {
        id: 41,
        name: '中职'
      },
      {
        id: 42,
        name: '高职'
      },
      {
        id: 43,
        name: '本科及以上'
      },
      {
        id: 44,
        name: '其他'
      }
    ],
    query_isAll: true,
    value: null,
    eventName: 'hander'
  },
  {
    label: '排序',
    key: 'sort',
    options: [
      {
        id: 51,
        name: '创建时间'
      },
      {
        id: 52,
        name: '摘录量'
      },
      {
        id: 53,
        name: '价格'
      }
    ],
    query_isAll: false,
    value: null,
    eventName: 'hander'
  }
]

export const mockCateLists = [
  {
    id: 'cate1',
    activeId: 1,
    title: '学科类别',
    children: []
  },
  {
    id: 'cate2',
    activeId: 1,
    title: '学习方向',
    children: []
  },
  {
    id: 'cate3',
    activeId: 1,
    title: '课程类别',
    children: []
  }
]

export const mockCateFixedList = [
  {
    id: 'cate4',
    activeId: 0,
    title: '学习资料',
    types: 'isPrice',
    children: [
      {
        name: '免费',
        value: 'free',
        id: 'free',
        types: 'isPrice'
      },
      {
        name: '收费',
        value: 'charge',
        id: 'charge',
        types: 'isPrice'
      }
    ]
  }
]
export const mockRoleRigister = [
  {
    id: 1,
    label: '学生'
  },
  {
    id: 2,
    label: '教师'
  },
  {
    id: 3,
    label: '企业'
  },
  {
    id: 4,
    label: '专家'
  }
]

export const mockResPackFilter = [
  {
    value: 0,
    label: '待审核'
  },
  {
    value: 1,
    label: '已通过'
  },
  {
    value: 2,
    label: '未通过'
  },
  {
    value: 9,
    label: '未发布'
  }
]
export const mockBackendCloudData = [
  {
    class: '第一学期',
    name: '王小虎',
    status: '已结束',
    date: '2016-05-02'
  },
  {
    class: '第一学期',
    name: '王小虎',
    status: '已结束',
    date: '2016-05-02'
  },
  {
    class: '第一学期',
    name: '王小虎',
    status: '已结束',
    date: '2016-05-02'
  },
  {
    class: '第一学期',
    name: '王小虎',
    status: '已结束',
    date: '2016-05-02'
  }
]

// 资源包详情页下的分类
export const mockResourceDetailType = [
  {
    name: 'course',
    label: '课程'
  },
  {
    name: 'task',
    label: '作业'
  },
  {
    name: 'test',
    label: '测验'
  },
  {
    name: 'material',
    label: '资料'
  }
]

//资源包详情下该教师的其他教学包
export const mockResourceTeacherPackages = [
  {
    name: 'Python数据可视化处理',
    excerpt: 123
  },
  {
    name: '常用验证码操作大全',
    excerpt: 54323
  },
  {
    name: '快速入门Hadoop3.0大数据处理',
    excerpt: 353
  },
  {
    name: 'Nodejs全栈入门',
    excerpt: 53214
  },
  {
    name: 'Springboot + ElasticSearch 构建博客检索系统',
    excerpt: 4214
  }
]

//资源包详情下相关教学包
export const mockResourcerelatePackages = [
  {
    name: 'Vue.js从入门到放弃',
    school: '河北交通职业技术学院',
    views: 123,
    author: '阿尔萨斯'
  },
  {
    name: 'MySQL数据库直通车：从入门到面试',
    school: '艾泽拉斯职业技术学院',
    views: 4223,
    author: '诺兰'
  },
  {
    name: '快速入门Hadoop3.0大数据处理',
    school: '铁炉堡诺莫瑞根',
    views: 353,
    author: '地狱咆哮'
  },
  {
    name: 'Nodejs全栈入门',
    school: '奥格瑞玛铁石农场',
    views: 53214,
    author: '萨尔'
  },
  {
    name: 'Android工程师升职加薪之路',
    school: '加基森',
    excerpt: 424114,
    author: '伊利丹'
  }
]
export const mockResourceTestList = [
  { id: 1, name: '编程必备基础 大话HTTP协议', limitedTime: '90min' },
  {
    id: 2,
    name: 'HTTP，如水如空气。漫画＋图解，学习成体系。',
    limitedTime: '120min30s'
  },
  { id: 3, name: 'Java项目面试实操 提升大厂面试成功率', limitedTime: '91min' },
  {
    id: 4,
    name: '全面系统python3入门+进阶 小白也能听懂 (万人甄选口碑好课)',
    limitedTime: '120min31s'
  },
  {
    id: 5,
    name: '全流程开发 TP6.0实战高并发电商服务系统',
    limitedTime: '92min'
  },
  {
    id: 6,
    name: '结合编程学数学 专为程序员设计的线性代数',
    limitedTime: '110min31s'
  }
]

export const mockResourceTaskList = [
  {
    name: '编程必备基础 大话HTTP协议',
    type: '1'
  },
  {
    name: '《宝可梦：剑盾》两款DLC公布！6月/秋季推出',
    type: '2'
  },
  {
    name: 'Java项目面试实操 提升大厂面试成功率',
    type: '3'
  },
  {
    name: '全面系统python3入门+进阶 小白也能听懂 (万人甄选口碑好课)',
    type: '1'
  },
  {
    name: '《LOL》测试服玩家对猴子重做不满 设计师：够强了',
    type: '2'
  },
  {
    name: '《宝可梦剑盾》铠岛DLC内容介绍 武道家神兽霸气登场',
    type: '3'
  }
]
