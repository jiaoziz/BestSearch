1. 项目启动: npm run start

2. 使用技术：react(hooks) + react-router + redux

3. 页面使用组件：
· 首页：使用公共组件Logo、SearchInput
· 搜索页：使用公共组件Logo，自定义组件EchartsItem，用于数据展示

4. 开发过程：
· 搭建框架，配置路由
· 首页通过输入搜索内容，将输入值传入redux（一开始是想通过跳转之后使用useLotion在url中获取输入的值，但是考虑到空格需要使用 + 替换，存在误判即 + 可能是用户输入的而非代码自动转换）
· 将输入的值使用正则将空格替换为 + 
· 使用useNavigate实现路由跳转
· 搜索页面通过redux中存储的value(用户输入的搜索值)回显在顶部的搜索框中
· 引入axios，配置http请求，使用post方式携带参数,调试接口获取数据
· 自定义EchartsItem组件，通过调用echartsConfig()方法，使每一个生成的echarts图表绑定到EchartsItem组件上
· 调用getData()方法获取接口数据，对接口返回数据进行处理，提取出data,sv
· 在Search组件中通过map方法生成图表，传入index使每一个echarts图标绑定的元素唯一
· 设置isLoading参数控制页面加载显示组件（在骨架屏组件Skeleton中，接口未完成之前不能获取到product_trends的长度，默认渲染4个）
· 屏幕自适应，使用媒体查询，控制在不同屏幕宽度下元素的宽高

5. 使用第三方库:antd + echarts + moment + axios 