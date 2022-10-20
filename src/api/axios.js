import axios from 'axios'

const baseUrl='http://3.141.23.218:5000/interview';

const http= axios.create({
    method:'POST'
})

// 获取数据
const getData=(value)=>{
    // console.log('value',value)
    const data=JSON.stringify(
        {
            login_token:"INTERVIEW_SIMPLY2021",
            search_phrase:`${value}`
        }
    )
    return http({
        url:`${baseUrl}/keyword_search`,
        data
    })
 }

 export default getData