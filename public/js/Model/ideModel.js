import Model from '../Core/Mvc/Model.js'

export default class ideModel  extends Model{
    constructor() {
        super()

        this._originalUrl = '/comments/recommendsList'
        this._recoverUrl ='/comments/recommends'
        // 필수 요청 데이터
        // 이거 건드리지 말것. 리턴 받은 원본을 사본으로 가공할것
        this._oriReqData = {
            page: '',
            limit: '',
            type: ''
        }

        this._originalIdeUrl = '/comments/recommends'
        //댓글 상세목록
        this._oriReqCommentDetailData ={
            page: '',
            limit: '',
            type: '',
            category_id : '',
            comment_id : '',
        }
       
    }

     //ide 목록 가져오기
     getIde = async (data) => {
        try {
            const res = await this.getRequest(this._originalUrl, data)
            // console.log(res)
            if (!res) throw 'ide 목록 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //ide 글쓰기
    postIde = async (title, content,category_type) => {
        let reqData = {
          
            title: title,
            content: content,
            category_type: category_type
            
        }

        try {
            const res = await this.postRequest('/ide', reqData)
            if (!res) return null
            return res
        } catch (e) {
            console.log(e)
            return null
        }
    }

    //ide 상세조회
 getIdeDetail = async (index) => {
    const setUrl =  `/${index}`
    // console.log("url",setUrl)
    try {
        const res = await this.getRequest(`${this._originalIdeUrl}${setUrl}`)
        if (!res) throw 'ide 상세보기 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

 //IDE 삭제
 delete = async Param  => {
    try {
        const res = await this.deleteRequest('/comments/recommends', Param)
        if (!res) throw 'IDE 삭제 실패'
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
        const res = await this.putRequest(`${this._recoverUrl}${setUrl}`)
        console.log("복구",res)
        if (!res) throw '댓글 복구 실패'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

// 삭제
 delete = async body  => {
    
    try {
        const res = await this.deleteBodyRequest('/comments/recommends',body)
        if (!res) throw ' 삭제 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}

}