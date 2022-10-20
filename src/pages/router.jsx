import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom"
import Home from "./Home"
import Search from "./Search"


// 路由组件
const Router=()=>{
    return <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/search/:value' element={<Search></Search>}></Route>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path="*" element={<Home></Home>}></Route>
        </Routes>
    </BrowserRouter>
}

export default Router