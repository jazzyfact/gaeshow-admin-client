import Model from '../Core/Mvc/Model.js'

export default class questionCommentModel extends Model{
    constructor(service_id) {
        super()
        this._originalUrl = `/inquire/comment`

        this._originalStatusUrl = `/inquire/status`
        
        // this._originalAddUrl = `/inquire/comment/${service_id}`

        // console.log("service_id",service_id)
    }

 
    //문의하기 상세조회
    getComments = async (service_id) => {
        const setUrl =  `/${service_id}`
        // console.log("url",setUrl)
        try {
            const res = await this.getRequest(`${this._originalUrl}${setUrl}`)
            if (!res) throw '문의하기 댓글  요청 실패'
            return res
        } catch (e) {
            console.error(e)
            return null
        }
    }

    //답변 등록
    addComment = async (service_id,content) => {
    
        const data = {
            service_id : service_id,
            content: content
        }

        console.log("답변모델",data)
       
        try {
            const res = await this.postRequest(`${this._originalUrl}`, data)
            if (!res) throw '댓글 추가 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //답변수정
    editComment = async (comment_id,content) => {
    
        const data = {
            comment_id : comment_id,
            content: content
        }

        console.log("답변 수정한 모델",data)
       
        try {
            const res = await this.putRequest(`${this._originalUrl}`, data)
            if (!res) throw '답변  수정 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //처리상태변경
    editStatus = async (service_id) => {
        const setUrl =  `/${service_id}`
        console.log("url",setUrl)
        try {
            const res = await this.putRequest(`${this._originalStatusUrl}${setUrl}`)
            console.log("처리상태변경 res",res)
            if (!res) throw '처리상태변경 실패'
            return res
        } catch (e) {
            console.error(e)
            return null
        }
    }

}
