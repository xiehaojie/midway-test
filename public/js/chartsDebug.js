const defaultConfig = {
   // 饼图
   pie1: {
    series: [
             {
             "type": "pie",
             "data": [
                 { "value": 1.8, "name": "低端经济水平" },
                 { "value": 3.08, "name": "中低端经济水平" },
                 { "value": 10.25, "name": "中端经济水平" },
                 { "value": 77.25, "name": "中高端经济水平" },
                 { "value": 7.61, "name": "高端经济水平" }
             ]
             }
         ]
   },
   pie2: {
    series: [
             {
             "type": "pie",
             "data": [
                 { "value": 1.8, "name": "低端经济水平" },
                 { "value": 3.08, "name": "中低端经济水平" },
                 { "value": 10.25, "name": "中端经济水平" },
                 { "value": 77.25, "name": "中高端经济水平" },
                 { "value": 7.61, "name": "高端经济水平" }
             ]
             }
         ]
   },
   //柱状图
  // bar1: {
  //   xAxis: {
  //     data: ['尼泊尔', '印度', '马来西亚', '美国', '新加坡', '泰国', '澳大利亚', '英国', '法国', '俄罗斯']
  //   },
  //   yAxis: {
  //     name: '单位（人）'
  //   },
  //   series: [
  //     {
  //       type: 'bar',
  //       name: "国家或地区",
  //       data: [1780, 1395, 1307, 830, 538, 286, 281, 255, 227, 214],
  //     }
  //   ]
  // },
  // 多柱状图
  bar1: {
      xAxis: {
        data: ["<18","18-30","30-40","40-50",">50"]
      },
      yAxis: {
        name: "单位（%）"
      },
      series: [
        {
          type: "bar",
          name: "男性",
          data: [12, 33, 12,23,54]
        },
        {
          type: "bar",
          name: "女性",
          data: [12, 34, 55,23,54]
        }
      ]
  },
  //柱状图
  bar2: {
    yAxis: {
      data: ['尼泊尔', '印度', '马来西亚', '美国', '新加坡', '泰国', '澳大利亚', '英国', '法国', '俄罗斯']
    },
    xAxis: {
      name: '单位（人）'
    },
    series: [
      {
        type: 'bar',
        name: "国家或地区",
        data: [1780, 1395, 1307, 830, 538, 286, 281, 255, 227, 214],
      }
    ]
  },
  // 折线图
  line: {
    xAxis: {
      type: 'category',
      data: ["20240308","20240309","20240310","20240311","20240312","20240313"]
    },
    yAxis: {
      type: 'value',
      name: "单位（万人）",
    },
    series: [
      {
        type: 'line',
        name: "人数",
        data: [95.66,102.96,107.48,96.15,95.72,96.04]
      }
    ]
  },
  // 桑基图
  sankey:{
      "series": {
        "type": "sankey",
        "data": [
          {
            "name": "东门商圈"
          },
          {
            "name": "六榕街光塔街"
          },
          {
            "name": "广州北京路文化旅游区"
          },
          {
            "name": "牌坊街"
          },
          {
            "name": "深圳欢乐谷"
          }
        ],
        "links": [
          {
            "source": "东门商圈",
            "target": "古城",
            "value": 5
          },
          {
            "source": "东门商圈",
            "target": "广州北京路文化旅游区",
            "value": 3
          },
          {
            "source": "六榕街光塔街",
            "target": "牌坊街",
            "value": 8
          },
          {
            "source": "东门商圈",
            "target": "牌坊街",
            "value": 3
          },
          {
            "source": "牌坊街",
            "target": "古城",
            "value": 1
          },
          {
            "source": "牌坊街",
            "target": "深圳欢乐谷",
            "value": 2
          }
        ]
      }
  },
  treemap:{
    "title": {
      "text": "APP名称",
    },
    "series": 
      {
        "name": "APP名称",
        "type": "treemap",
        "data": [
          {
            "value": 180,
            "name": "酒店服务",
            "children": [
              {
                "value": 1,
                "name": "蚂蚁短租"
              },
              {
                "value": 2,
                "name": "途家"
              },
              {
                "value": 3,
                "name": "小猪短租"
              }
            ]
          },
          {
            "value": 180,
            "name": "用车软件",
            "children": [
              {
                "value": 76,
                "name": "滴滴出行"
              },
              {
                "value": 92,
                "name": "神州租车"
              },
              {
                "value": 52,
                "name": "美团打车"
              }
            ]
          },
          {
            "value": 180,
            "name": "旅游出行",
            "children": [
              {
                "value": 76,
                "name": "携程旅行"
              },
              {
                "value": 92,
                "name": "铁路12306"
              },
              {
                "value": 52,
                "name": "同程旅游"
              }
            ]
          },
          {
            "value": 180,
            "name": "消费类",
            "children": [
              {
                "value": 76,
                "name": "微信"
              },
              {
                "value": 92,
                "name": "支付宝"
              },
              {
                "value": 50,
                "name": "美团"
              }
            ]
          },
          {
            "value": 300,
            "name": "地图导航类",
            "children": [
              {
                "value": 76,
                "name": "高德地图"
              },
              {
                "value": 92,
                "name": "腾讯地图"
              },
              {
                "value": 50,
                "name": "百度地图"
              }
            ]
          }
        ]
      }
    
  },
  map: {
    "series": [
      {
        "type": "map",
        "data": [
          {
            "name": "北京市",
            "value": 36
          },
          {
            "name": "江西省",
            "value": 30
          },
          {
            "name": "浙江省",
            "value": 28
          },
          {
            "name": "广东省",
            "value": 24
          },
          {
            "name": "四川省",
            "value": 17
          },
          {
            "name": "江苏省",
            "value": 15
          },
          {
            "name": "上海市",
            "value": 14
          },
          {
            "name": "南海诸岛",
            "value": 14
          },
          {
            "name": "海南省",
            "value": 14
          },
          {
            "name": "香港",
            "value": 10
          },
          {
            "name": "河北省",
            "value": 9
          },
          {
            "name": "辽宁省",
            "value": 9
          },
          {
            "name": "山东省",
            "value": 9
          },
          {
            "name": "贵州省",
            "value": 9
          },
          {
            "name": "福建省",
            "value": 8
          },
          {
            "name": "陕西省",
            "value": 7
          },
          {
            "name": "山西省",
            "value": 6
          },
          {
            "name": "黑龙江省",
            "value": 6
          },
          {
            "name": "内蒙古",
            "value": 4
          },
          {
            "name": "河南省",
            "value": 4
          },
          {
            "name": "湖北省",
            "value": 4
          },
          {
            "name": "吉林省",
            "value": 3
          },
          {
            "name": "云南省",
            "value": 3
          },
          {
            "name": "安徽省",
            "value": 2
          },
          {
            "name": "广西",
            "value": 2
          },
          {
            "name": "湖南省",
            "value": 2
          },
          {
            "name": "新疆",
            "value": 2
          },
          {
            "name": "天津市",
            "value": 1
          },
          {
            "name": "重庆市",
            "value": 1
          },
          {
            "name": "西藏",
            "value": 1
          },
          {
            "name": "甘肃省",
            "value": 1
          },
          {
            "name": "青海省",
            "value": 0
          },
          {
            "name": "宁夏",
            "value": 0
        }
        ]
      }
    ]
  },
  wordcloud: {
    "list": [
      [
        "各位观众",
        45
      ],
      [
        "词云",
        21
      ],
      [
        "来啦!!!",
        13
      ]
    ],
    "gridSize": 6,
    "weightFactor": 1,
    "maxFontSize": 60,
    "minFontSize": 14,
    "fontWeight": "normal",
    "fontFamily": "Times, serif",
    "color": "random-light",
    "backgroundColor": "#333",
    "rotateRatio": 1
  }
 
}


const { createApp } = Vue
axios.defaults.withCredentials = true
createApp({
  data() {
    return {
      width: 800,
      height: 400,
      chartConfig: JSON.stringify(defaultConfig['pie1']),
      version: 5,
      imageBase64: '',
      tempType: 'pie1',
      showLable: 1
    }
  },

  watch: {
    tempType(val) {
      this.chartConfig = JSON.stringify(defaultConfig[val])
    },
  },
  methods: {
    formatJSON() {
      this.chartConfig = fmt2json(this.chartConfig)
    },
    generateImg() {
      const self = this;
      axios({
        method: 'post',
        url: '/echarts',
        data: {
          chartConfig: JSON.parse(this.chartConfig),
          height: this.height,
          width: this.width,
          version: this.version,
          tempType: this.tempType,
          showLable: this.showLable
        }
      }).then(res => {
        this.imageBase64 = res.data
      });
      // let resultSet = new Set()
      // for(let i = 0 ; i < 20; i++){
      //   const chartConfig = {
      //       series: [
      //         {
      //         "type": "pie",
      //         "data": [
      //             { "value": 1.8, "name": `${i}-中低端经济水平` },
      //             { "value": 3.08, "name": "中低端经济水平" },
      //             { "value": 10.25, "name": "中端经济水平" },
      //             { "value": 77.25, "name": "中高端经济水平" },
      //             { "value": 7.61, "name": "高端经济水平" }
      //         ]
      //         }
      //     ]
      //   }
      //   axios({
      //     method: 'post',
      //     url: '/echarts',
      //     data: {
      //       chartConfig,
      //       height: this.height,
      //       width: this.width,
      //       version: this.version,
      //       tempType: this.tempType,
      //       showLable: this.showLable
      //     }
      //   }).then(res => {
      //     // this.imageBase64 = res.data
      //     resultSet.add(res.data)
      //     console.log(`最终生成的结果 》》》${resultSet.size}`);

      //   });
      // }
      
      
    },
  }
}).mount('#app')