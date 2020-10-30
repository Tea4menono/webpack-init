
import echarts from 'echarts'

export default  {
    option1:function(x,y){
        
        let nodes = [];
        let allLines = [
            {coords: [ [490,1000],[490, 666]],link:"中国电信=>防火墙"},
            {coords: [ [490,666],[490, 1000]],link:"防火墙=>中国电信"},
            
            {coords: [ [490,333],[490, 666]],link:"南苑校区=>防火墙"},
            {coords: [ [490,666],[490, 333]],link:"防火墙=>南苑校区"},


            {coords: [ [490,333],[950, 180]],link:"南苑校区=>新南苑校区"},
            {coords: [ [950,180],[490, 333]],link:"新南苑校区=>南苑校区"},


            {coords: [ [490,333],[50, 180]],link:"南苑校区=>徐汇校区"},
            {coords: [ [50,180],[490, 333]],link:"徐汇校区=>南苑校区"},


            {coords: [ [490,333],[490, 0]],link:"南苑校区=>北苑校区"},
            {coords: [ [490,0],[490, 333]],link:"北苑校区=>南苑校区"},

        ];
        let lines=[];
        let links = [];


        for (let [index,item] of y.entries())
        {
            if(item=="0")
            {
                links.push({
                    source: x[index].split("=>")[0],
                    target:  x[index].split("=>")[1],
                    symbol: ['none', 'arrow'],
                    label: {
                        show: true,
                        formatter: '×',
                        fontSize: 20,
                    },
                    lineStyle: {
                        color: 'red',
                        curveness: 0.2,
                    }      
                });
            }
            else {
                lines.push(allLines[index]);
            }
            
        }
        
        

    
        return {

            xAxis: {
                min: 0,
                max: 1000,
                show: false,
                type: 'value'
            },
            yAxis: {
                min: 0,
                max: 1000,
                show: false,
                type: 'value'
            },
            series: [{
                    type: 'graph',
                    coordinateSystem: 'cartesian2d',
                    label: {
                        show: true,
                        position: 'bottom',
                        fontSize: 14
                    },
        
                    // layout:'circular',
                    symbol: 'circle',
                    symbolSize: 50,
                    symbolPosition: 'start',
                    nodes: nodes,
                    links: links
                },
                {
                    type: 'lines',
                    coordinateSystem: 'cartesian2d',
                    lineStyle: {
                        color: '#66ccff',
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    },
                    effect: {
                        symbol: 'arrow',
                        show: true,
                        symbolSize: 10,
                        trailLength: 0.1
                    },
                    data: lines
                }
            ]
        }  

    },
    barLineOption:function(x,y){

        let temp=[];
        for(let item of x){
       
            let b = new Date(Date.parse(item.replace(/-/g,"/")));
            let date=b.getDay();
            switch (date) {
                case 0:
                    date="周日"
                    break;
                case 1:
                    date="周一"
                    break; 
                case 2:
                    date="周二"
                    break; 
                case 3:
                    date="周三"
                    break; 
                case 4:
                    date="周四"    
                    break;
                case 5:
                    date="周五"    
                    break;    
                case 6:
                    date="周六"                   
                default:
                    break;
            }
            temp.push(date);
     
        }    

        return {
            grid:{
                top:"15%",
                bottom:"20%",
                left:"20%",
                right:"20%"
            },
            tooltip:{},
            xAxis: {
                type: 'category',
                axisLabel:{
                    fontSize:12,
                    color:"white",
                },
                axisLine:{
                    lineStyle:{
                        color:"white",
                    }
                },
                data:temp
            },
            yAxis: {
                type: 'value',
                name:"次",
                nameGap:5,
                axisLabel:{
                    color:"white",
                },
                axisLine:{
                    lineStyle:{
                        color:"white",
                    }
                },
                splitLine:{
                    show:false
                }
            },
            series: [{
                data: y,
                type: 'bar',
                barWidth:"8",
                label: {
                    show: true,
                    position: 'top',
                    color: '#1798ff',
                    fontSize: 12
                },
                itemStyle:{
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'white'
                    }, {
                        offset: 1,
                        color: "rgb(40,135,248)"
                    }]),
                }
            }]
        }
    },

    pieOption:function(x,y,radius=["40%","50%"]){
        let data=[];

        for(let [index, current] of x.entries() ){
            data.push({
                name:current,
                value:y[index]
            })
        }

        return  {
            color:["#b250ff","#4f9aff","#4bf3ff","#FA9B32","#DAFF77","#32DED9","#00CBFF"],
            legend: {
                data:x,
                textStyle:{
                    color:"white"
                }
            },
            tooltip:{},
            series: [
                {
                    type: 'pie',
                    radius: radius,
                    label:{
                        formatter:"{b}\n{c}次\n{d}%" ,
                        fontSize:14 
                    },
                    data: data
                }
            ]
        }
    },

    topOption:function(x,y,name){
        let colorArray = [{
            top: '#ffa800', //黄
            bottom: 'rgba(248,195,248,.3)'
        }, {
            top: '#1ace4a', //绿
            bottom: 'rgba(100,255,249, 0.3)'
        },
        {
            top: '#4bf3ff', //蓝
            bottom: 'rgba(135,183,255,.3)'
        }, {
            top: '#4f9aff', //深蓝
            bottom: 'rgba(11,42,84,.3)'
        },
        {
            top: '#b250ff', //粉
            bottom: 'rgba(100,255,249,.3)'
        }
    ];
    
    return  {

        grid:{
            left:"5%",
            right:"10%",
            top:"10%",
            bottom:"0%"
        },    
        tooltip: {
            show: true,
            formatter: '{b} : {c}'+name,
            trigger:"axis",
        },
        xAxis: {
            type: 'value',
            show: false,
        },
        yAxis: {
            type: 'category',
            axisTick: {
                show: false,
                alignWithLabel: false,
                length: 5,
            },
            show:false,
            inverse: 'true',
            axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff',
                    }
                },
            data: x
        },
        series: [
        {
            type: 'bar',
            label: {
                    normal: {
                        show: true,
                        position:[10, -15],
                        formatter: function(x){
                            let interval=x.name.length>=20?"... ":" ";    
                            return x.name.substr(0,20)+interval+x.value+name
                        },
                        textStyle:{
                            color:"white",
                            fontSize:16
                        }
                    }
                },
            
            data: y,
            barWidth: '10px',
            barCategoryGap: '50%',
    
            itemStyle: {
                normal: {
                    show: true,
                    color: function(params) {
                        let num = colorArray.length;
                        return {
                            type: 'linear',
                            colorStops: [{
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }, {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }, {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }, {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }, {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }]
                        }
                    },
                    barBorderRadius: 20,
                    borderWidth: 0,
                    borderColor: '#333',
                }
            }
        },

    ]
    };
    
    },
    topOption2:function(x,y){
        let colorArray = [{
            top: '#ffa800', //黄
            bottom: 'rgba(248,195,248,.3)'
        }, {
            top: '#1ace4a', //绿
            bottom: 'rgba(100,255,249, 0.3)'
        },
        {
            top: '#4bf3ff', //蓝
            bottom: 'rgba(135,183,255,.3)'
        }, {
            top: '#4f9aff', //深蓝
            bottom: 'rgba(11,42,84,.3)'
        },
        {
            top: '#b250ff', //粉
            bottom: 'rgba(100,255,249,.3)'
        }
    ];
    


    return  {

        grid:{
            left:"10%",
            right:"10%",
            top:"10%",
            bottom:"20%"
        },    
        tooltip: {
            show: true,
            formatter: '{b} : {c}',
            trigger:"axis",
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        xAxis: {
            type: 'category',
            show:false,
            // inverse: 'true',
            axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff',
                    }
                },
            data: x
        },
        series: [{
            type: 'bar',
            label: {
                    normal: {
                        show: true,
                        position:"bottom",
                        formatter: function(x){
                            return x.name
                        },
                        textStyle:{
                            color:"white"
                        }
                    }
                },
            
            data: y,
            barWidth: '10px',
            barCategoryGap: '50%',
    
            itemStyle: {
                normal: {
                    show: true,
                    color: function(params) {
                        let num = colorArray.length;
                        return {
                            type: 'linear',
                            colorStops: [{
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }, {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }, {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }, {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }, {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }]
                        }
                    },
                    barBorderRadius: 20,
                    borderWidth: 0,
                    borderColor: '#333',
                }
            }
        }]
    };
    
    },
    doubleFunnelOption:function(x1,y1,x2,y2){

        let data1=[];
        let data2=[];
        
        for(let [index, current] of x1.entries() ){
            data1.push({
                name:current,
                value:y1[index]
            })
        }

        for(let [index, current] of x2.entries() ){
            data2.push({
                name:current,
                value:y2[index]
            })
        }



        return  {

            title: [
            {
                text: '攻击源',
                textStyle:{
                    color:"white",
                    fontSize:14
                },
                left:"25%",
                top:"3%",
            },
            {
                text: '被攻击源',
                textStyle:{
                    color:"white",
                    fontSize:14
                },
                left:"55%",
                top:"3%",
            },            
            ],
            color:["#b250ff",'rgb(40,135,248)',"#1798ff","#4f9aff","#4bf3ff"],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}次'
            },
            series: [
                {
                    name: '攻击源',
                    type: 'funnel',
                    width: '25%',
                    height: '65%',
                    left: '25%',
                    top: '15%',
                    funnelAlign: 'right',
                    label:{
                        show:true,
                        position:"left",
                        formatter:function(x){
                            return x.name.split(".")[3].split("_")[0]+" "+x.value+"次" 
                        },
                    },
                    emphasis: {
                        label: {
                            show: false,
                        }
                    },  
                    data:data1
                },
                {
                    name: '被攻击源',
                    type: 'funnel',
                    width: '25%',
                    height: '65%',
                    left: '50%',
                    top: '15%',
                    funnelAlign: 'left',
                    label:{
                        show:true,
                        position:"right",
                        formatter:function(x){
                            return x.name.split(".")[3].split("_")[0]+" "+x.value+"次" 
                        },
                    },
                    emphasis: {
                        label: {
                            show: false,
                        }
                    },    
                    data: data2
                }
            ]
        };
        
    },
    funnelOption:function(x,y){

        let data=[];

        for(let [index, current] of x.entries() ){
            data.push({
                name:current,
                value:y[index]
            })
        }

        return  {
            tooltip: {
                trigger: 'item',
                formatter: "{b} <br/>{c}次"
            },
            color:["#b250ff",'rgb(40,135,248)',"#1798ff","#4f9aff","#4bf3ff"],
            series: [
                {
                    name:'漏斗图',
                    type:'funnel',
                    left: '10%',
                    top:"10%",
                    bottom:"10%",
                    left:"30%",
                    right:"10%",
                    width: '70%',

                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'left',
                        formatter:"{b}:{c}次\n{d}%"
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    // emphasis: {
                    //     label: {
                    //         fontSize: 20
                    //     }
                    // },
                    data: data
                }
            ]
        };
        
    },
    threePiesOption:function(x1,y1,x2,y2,x3,y3){

        let data1=[];
        let data2=[];
        let data3=[];

        let status=["离线","在线"]
        

        for(let [index, current] of status.entries() ){
            data1.push({
                name:current,
                value:y1[index]
            });
            data2.push({
                name:current,
                value:y2[index]
            });
            data3.push({
                name:current,
                value:y3[index]
            });

        }



        return  {

            title: [{
                textStyle:{
                    color:"white",
                    fontSize:14,
                },
                text:"新南苑无线状态",
                left:"39%",
                top:"3%",
            },
            {
                textStyle:{
                    color:"white",
                    fontSize:14,
                },
                text:"北苑无线状态",
                left:"14%",
                top:"53%",
            },
            {
                textStyle:{
                    color:"white",
                    fontSize:14,
                },
                text:"南苑无线状态",
                left:"64%",
                top:"53%",
            }],

            color:["rgb(249,90,47)","rgb(1,196,218)"],
            series: [
                {
                    type: 'pie',
                    radius: "20%",
                    label:{
                        formatter:"{b}\n{c}台\n{d}%"    
                    },
                    center:["25%","75%"],
                    data: data1
                },
                {
                    type: 'pie',
                    radius: "20%",
                    label:{
                        formatter:"{b}\n{c}台\n{d}%"    
                    },
                    center:["75%","75%"],
                    data: data2
                },
                {
                    type: 'pie',
                    radius: "20%",
                    label:{
                        formatter:"{b}\n{c}台\n{d}%"   
                    },
                    center:["50%","25%"],
                    data: data3
                },
            ]
        } 
    },
    lineOption:function(x,y,color="rgb(90,95,187)"){

        let data=[];
        for(let temp of x){
            data.push(temp.split("-")[1]+"."+temp.split("-")[2]) 
        }

        return  {

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            color:color,
            grid:{
                top:"25%",
                bottom:"20%",
                left:"20%",
                right:"15%"
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: data,
                    axisLabel:{
                        color:"white",
                        fontSize:12
                    },
                    axisLine:{
                        lineStyle:{
                            color:"white",
                        }
                    },

                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name:"次",
                    axisLabel:{
                        color:"white",
                    },
                    axisLine:{
                        lineStyle:{
                            color:"white",
                        }
                    },
                    splitLine:{
                        show:false
                    }
                }
            ],
            series: [
                {
                    name: '数量',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color:"rgb(1,196,218)",
                            fontSize:12
                        }
                    },
                    areaStyle: {},
                    data: y
                }
            ]
        };
        
    },
    lineOption2:function(x,y1,y2){

        let yy1=[];
        let yy2=[];
        for(let item of y1)
        {
            yy1.push(parseInt(item/1024/1024));
        }
        for(let item of y2)
        {
            yy2.push(parseInt(item/1024/1024));
        }

        return  {
            tooltip: {
                trigger: 'axis',
            },
            grid:{
                bottom:"15%"
            },
            legend:{
                data:["上传流量","下载流量"],
                textStyle:{
                    color:"white"
                }
            },
            xAxis: [{
                name:"时",
                type: 'category',
                data: x,
                axisLabel:{
                    color:"white",
                },
                axisLine:{
                    lineStyle:{
                        color:"white",
                    }
                },
            }],
            yAxis: [{
                name:"TB",
                type: 'value',
                splitNumber: 4,
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#DDD'
                    }
                },
                axisLabel:{
                    color:"white",
                },
                axisLine:{
                    lineStyle:{
                        color:"white",
                    }
                },

                splitArea: {
                    show: false
                },
                splitLine:{
                    show:false
                }
            }],
            series: [
            {
                name:"上传流量",
                type: 'line',
                data: yy1,
                color: "#F58080",
                lineStyle: {
                    normal: {
                        width: 3,
                        color: {
                            type: 'linear',
    
                            colorStops: [{
                                offset: 0,
                                color: '#FFCAD4' // 0% 处的颜色
                            }, {
                                offset: 0.4,
                                color: '#F58080' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: '#F58080' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(245,128,128, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 7
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    color: '#F58080',
                    fontSize: 12
                },    
                itemStyle: {
                    normal: {
                        color: '#F58080',
                        // borderWidth: 5,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#F58080"
                    }
                },
                smooth: true
            },
            {
                name:"下载流量",
                type: 'line',
                data: yy2,
                label: {
                    show: true,
                    position: 'top',
                    color: '#AAF487',
                    fontSize: 12
                },    
                lineStyle: {
                    normal: {
                        width: 3,
                        color: {
                            type: 'linear',
    
                            colorStops: [{
                                    offset: 0,
                                    color: '#AAF487' // 0% 处的颜色
                                },
                                {
                                    offset: 0.4,
                                    color: '#47D8BE' // 100% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#47D8BE' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(71,216,190, 0.5)',
                        shadowBlur: 5,
                        shadowOffsetY: 7
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#AAF487',
                        // borderWidth: 10,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#AAF487"
                    }
                },
                smooth: true
            }]
        };
    }
}