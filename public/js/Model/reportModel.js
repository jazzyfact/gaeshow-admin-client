import Model from '../Core/Mvc/Model.js'

export default class reportModel extends Model{
    constructor() {
        super()

        this._originalUrl = '/inquire'
        this._url = '/inquire/'
        // 필수 요청 데이터
        // 이거 건드리지 말것. 리턴 받은 원본을 사본으로 가공할것
        this._oriReqData = {
            page: '',
            limit: '',
            service_category: ''
        }
    }
 //신고하기 목록 가져오기
 getReportData = async (data) => {
    try {
        const res = await this.getRequest(this._url, data)
        // console.log("res",res)
        if (!res) throw '신고하기 목록 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
    }
}

//신고하기 답변 추가
postReportData = async (title, content,category_type) => {
    let reqData = {
      
        title: title,
        content: content,
        category_type: category_type
        
    }

    try {
        const res = await this.postRequest('/inquire/comment', reqData)
        if (!res) return null
        return res
    } catch (e) {
        console.log(e)
        return null
    }
}

//신고하기 상세조회
getReportDetail = async (service_id) => {
    const setUrl =  `/${service_id}`
    // console.log("url",setUrl)
    try {
        const res = await this.getRequest(`${this._originalUrl}${setUrl}`)
        if (!res) throw '신고하기 상세보기 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}


editPost = async (data, index) => {
    console.log("noticeModel idx",index)
  
    try {
        const res = await this.putRequest(`${this._originalUrl}/${index}`, data)
        if (!res) throw '신고하기 수정 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}



}