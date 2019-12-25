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
    link: 'resource',
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
    options: []
  },
  {
    id: 'cate2',
    activeId: 1,
    title: '学习方向',
    options: []
  },
  {
    id: 'cate3',
    activeId: 1,
    title: '课程类别',
    options: []
  }
]

export const mockCateFixedList = [
  {
    id: 'cate4',
    activeId: 0,
    title: '学习资料',
    types: 'isPrice',
    options: [
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
