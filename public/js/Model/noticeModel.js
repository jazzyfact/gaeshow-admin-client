import Model from '../Core/Mvc/Model.js'

export default class noticeModel  extends Model{
    constructor() {
        super()

        this._originalUrl = '/notice'
        // 필수 요청 데이터
        // 이거 건드리지 말것. 리턴 받은 원본을 사본으로 가공할것
        this._oriReqData = {
            page: '',
            limit: '',
            category_type: ''
        }
    }

     //공지사항 목록 가져오기
     getNotice = async (data) => {
        try {
            const res = await this.getRequest(this._originalUrl, data)
            if (!res) throw '공지사항 목록 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //공지사항 글쓰기
    postNotice = async (title, content,category_type) => {
        let reqData = {
          
            title: title,
            content: content,
            category_type: category_type
            
        }

        try {
            const res = await this.postRequest('/notice', reqData)
            // console.log('공지사항',res)
            if (!res) return null
            return res
        } catch (e) {
            console.log(e)
            return null
        }
    }

    //공지사항 상세조회
    getNoticeDetail = async (index) => {
        const setUrl =  `/${index}`
        // console.log("url",setUrl)
        try {
            const res = await this.getRequest(`${this._originalUrl}${setUrl}`)
            if (!res) throw '공지사항 상세보기 요청 실패!'
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
            if (!res) throw '공지사항 수정 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    deletePost = async (index) => {
        try {
            const res = await this.deleteRequest(`${this._originalUrl}/${index}`)
            if (!res) throw '공지사항 삭제 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }
    

}