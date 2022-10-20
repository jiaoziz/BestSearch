import React, { useState, useEffect } from "react";
import { Logo } from "./component";
import getData from "../api/axios";
import store from "../store";
import { Skeleton } from 'antd';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import moment from 'moment'
import './css/search.css'

// 搜索页
const Search = () => {
    // 获取redux中的数据
    const state = store.getState()

    //  接口返回的数据
    const [data, setData] = useState([])

    // 数据时候加载中
    const [isLoading, setIsLoading] = useState(true)

    echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

    // console.log('data', data, 'load', isLoading)

    useEffect(() => {
        getData(state?.value).then((res) => {
            // console.log(res.data.data)
            setData(res?.data.data.product_trends)
            setIsLoading(false)
        }).catch((rej) => {
            // console.log(rej)
            setData([])
            setIsLoading(false)
        })
    }, [])

    // 图表配置
    const echartsConfig = (item, index, x, y) => {
        const myChart = echarts.init(item);
        const color = index % 2 === 0 ? 'rgb(138,192,171)' : 'rgb(138,180,216)';
        const option = {
            xAxis: {
                type: 'category',
                show: false,
                data: x
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [
                {
                    data: y,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        color
                    },
                    symbol: 'none',
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color },
                                { offset: 1, color }
                            ],
                            global: true
                        }
                    }
                }
            ]
        };

        option && myChart.setOption(option);
    }

    // 单个Echarts图表
    const EchartsItem = (props) => {
        const { index, item } = props
        // 图标横轴
        const echartsX = [];
        // 图标纵轴
        const echartsY = [];
        const itemArr = item.search_msv;
        itemArr.forEach((ele) => {
            echartsX.push(ele.data)
            echartsY.push(ele.sv)
        });
        useEffect(() => {
            const item = document.getElementsByClassName(`echartsItem${index}`)
            // console.log(item)
            echartsConfig(item[0], index, echartsX, echartsY);
        }, [])
        return <div className={`echartsItem${index}`} style={{  width:'100%',height: '50%' }}></div>
    }

    const arr=['','','','']

    return <div>
        <Logo changeData={(data) => setData(data)} changeLoading={(loading) => setIsLoading(loading)}></Logo>
        {
            isLoading ? (
                <div className="skeleton">
                    <div className="headText">Related product trends</div>
                    {
                     arr.map((item, index) => {
                        return <div key={index} style={{width:'150px',marginRight:'30px'}}>
                            <Skeleton key={item} active paragraph={{ rows: 2 }}></Skeleton>
                            <Skeleton.Node active>
                                <div></div>
                            </Skeleton.Node>

                        </div>
                        
                     })
                    }
                </div>
            ) : (
                <div className="echartsBox">
                    <div className="headText">Related product trends</div>
                    <div className="echartsItems">
                        {
                            data?.map((item, index) => {
                                const startDate = moment.unix(item.created_at).format('MMM YYYY')
                                const endDate = moment.unix(item.updated_at).format('MMM YYYY')
                                return <div key={index} className="echartsItem" >
                                    <div className="itemName">{item.name}</div>
                                    <div className="itemGrowth">Growth: {item.growth}%</div>
                                    <EchartsItem index={index} item={item} />
                                    <div className="itemDate">{startDate} - {endDate}</div>
                                </div>
                            })
                        }
                    </div>
                </div>
            )
        }
    </div>
}

export default Search;