import Model from '../Core/Mvc/Model.js'

export default class languageModel  extends Model{
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
    }

     //Language 목록 가져오기
     getLanguage = async (data) => {
        try {
            const res = await this.getRequest(this._originalUrl, data)
            // console.log(res)
            if (!res) throw 'Language 목록 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

   
    //Language 상세조회
    getLanguageDetail = async (index) => {
        const setUrl =  `/${index}`
        console.log("url",setUrl)
        try {
            const res = await this.getRequest(`${this._originalUrl}${setUrl}`)
            if (!res) throw 'Language 상세보기 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
            return null
        }
    }


//언어    삭제
 delete = async body  => {
    
    try {
        const res = await this.deleteBodyRequest('/comments/recommends',body)
        if (!res) throw '언어 삭제 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}
//언어    삭제
// delete = async (comment_id, deleted_type,reason)  => {
//     const data = {
//         comment_id: comment_id,
//         deleted_type: deleted_type,
//         reason : reason
//     }
//     try {
//         const res = await this.deleteBodyRequest('/comments/recommends',data)
//         console.log('res',res)
//         if (!res) throw '언어 삭제 실패'
//         return res
//     } catch (e) {
//         console.error(e)
//     }
// }


//복구
// recover = async Param  => {
//     try {
//         const res = await this.putRequest('/comments', Param)
//         console.log("복구",res)
//         if (!res) throw '댓글 복구 실패'
//         return res
//     } catch (e) {
//         console.error(e)
//     }

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

}