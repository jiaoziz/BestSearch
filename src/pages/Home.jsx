import React from "react";
import './css/home.css'
import {SearchInput, Logo} from "./component"

// 主页
const Home=()=>{
    return <div>
        <Logo></Logo>
        <div className="text">Search Trends</div>
        <SearchInput></SearchInput>
    </div>
}

export default Home;