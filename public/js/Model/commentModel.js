import Model from '../Core/Mvc/Model.js'

export default class commentModel extends Model {
    constructor() {
        super()

          //댓글목록조회
          this._originalCommentUrl = '/comments/list'
          // 댓글 목록조회 필수 요청 데이터
          this._oriReqCommentData = {
              page: '',
              limit: ''
          }


          this._CommentDetailUrl = '/comments'
        
    }
 
    

    
    //댓글 가져오기
    getComment = async (data) => {
        try {
            const res = await this.getRequest(this._originalCommentUrl, data)
            if (!res) throw '댓글 목록 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }



     //댓글 상세조회
     getCommentDetail = async (index) => {
        const setUrl =  `/${index}`
        // console.log("url",setUrl)
        try {
            const res = await this.getRequest(`${this._CommentDetailUrl}${setUrl}`)
            if (!res) throw '댓글 상세보기 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
            return null
        }
    }

      //댓글 삭제
      delete = async Param  => {
        try {
            const res = await this.deleteRequest('/comments', Param)
            if (!res) throw '댓글 삭제 실패'
            return res
        } catch (e) {
            console.error(e)
        }
}

//복구
recover = async (index) => {
    const setUrl =  `/${index}`
    console.log("url",setUrl)
    try {
        const res = await this.putRequest(`${this._CommentDetailUrl}${setUrl}`)
        console.log("복구",res)
        if (!res) throw '댓글 복구 실패'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

//삭제
delete = async body  => {
    
    try {
        const res = await this.deleteBodyRequest('/comments',body)
        if (!res) throw '언어 삭제 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}
}
