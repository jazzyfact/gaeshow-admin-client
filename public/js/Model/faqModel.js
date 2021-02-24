import Model from '../Core/Mvc/Model.js'

export default class faqModel  extends Model{
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

     //자주하는질문 목록 가져오기
     getFaq = async (data) => {
        try {
            const res = await this.getRequest(this._originalUrl, data)
            if (!res) throw '자주하는질문 목록 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //자주하는질문 글쓰기
    postFaq = async (title, content,category_type) => {
        let reqData = {
          
            title: title,
            content: content,
            category_type: category_type
            
        }

        try {
            const res = await this.postRequest('/notice', reqData)
            if (!res) return null
            return res
        } catch (e) {
            console.log(e)
            return null
        }
    }

    //자주하는질문 상세조회
    getFaqDetail = async (index) => {
        const setUrl =  `/${index}`
        // console.log("url",setUrl)
        try {
            const res = await this.getRequest(`${this._originalUrl}${setUrl}`)
            if (!res) throw '자주하는질문 상세보기 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
            return null
        }
    }

    //수정
    editPost = async (data, index) => {
        console.log("noticeModel idx",index)
      
        try {
            const res = await this.putRequest(`${this._originalUrl}/${index}`, data)
            if (!res) throw '자주하는질문 수정 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }


    //삭제
    deletePost = async (index) => {
        try {
            const res = await this.deleteRequest(`${this._originalUrl}/${index}`)
            if (!res) throw '자주하는질문 삭제 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }
}