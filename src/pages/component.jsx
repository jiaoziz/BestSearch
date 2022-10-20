import React, { useState } from "react";
import { Input, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router";
import getData from "../api/axios";
import { message } from "antd";
import './css/component.css'
import store from "../store";


// 搜索框组件
const SearchInput = (props) => {
    const { isSearch, defaultValue, changeData, changeLoading } = props;

    const navigate = useNavigate();
    const [value, setValue] = useState(isSearch ? defaultValue : '')

    // 点击搜索
    const link = () => {
        console.log(value)
        if (value === '') {
            message.warning('请输入搜索内容！');
            return;
        };
        if (isSearch) {
            changeLoading(true)
            getData(value).then((res) => {
                changeData(res?.data.data.product_trends)
                changeLoading(false)
            }).catch((rej) => {
                changeData([])
                changeLoading(false)
            })
        } else {
            let str = value;
            str = value.replace(/\s/g, '+')
            navigate(`/search/${str}`)
        };
    }

    // 获取输入的值
    const getChangeValue = (value) => {
        setValue(value)
        const action = {
            type: 'VALUE',
            payload: `${value}`
        }
        store.dispatch(action)
    }

    return <div className="flex">
        <div className="input">
            <Input placeholder="Search for new products in 961K stores" defaultValue={isSearch ? defaultValue : ''} onChange={(e) => getChangeValue(e.target.value)} onPressEnter={link}></Input>
        </div>
        <Button icon={<SearchOutlined />} onClick={link}></Button>
    </div>
}

// logo
const Logo = (props) => {
    const { changeData, changeLoading } = props;
    const navigate = useNavigate()
    const pathname = useLocation().pathname
    const isSearch = pathname.includes('/search')
    const state = store.getState()

    return <div className="logo">
        <div onClick={() => navigate('/')} className="logoText">
            {
                isSearch
                    ? <div><span className="logofontWeigth">Best</span>Search</div> :<div><span className="logofontWeigth">Simply</span>Trends</div> 
            }
        </div>
        {
            isSearch ? <SearchInput changeData={changeData} changeLoading={changeLoading} isSearch defaultValue={state?.value}></SearchInput> : null
        }
    </div>
}

export { SearchInput, Logo };   