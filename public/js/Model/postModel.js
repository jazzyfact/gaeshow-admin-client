import Model from '../Core/Mvc/Model.js'

export default class postsModel extends Model {
    constructor() {
        super()

        this._originalUrl = '/posts'
        // 필수 요청 데이터
        // 이거 건드리지 말것. 리턴 받은 원본을 사본으로 가공할것
        this._oriReqData = {
            page: '',
            limit: ''
        }
    }

    //게시물 가져오기
    getPosts = async (data) => {
        try {
            const res = await this.getRequest(this._originalUrl, data)
            if (!res) throw '포스트 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //게시물 상세보기
    getPostDetail = async (index, isLogin = false) => {
        const setUrl = `/${index}`
        // console.log(setUrl)
        try {
            const res = await this.getRequest(`${this._originalUrl}${setUrl}`)
            if (!res) throw '포스트 상세보기 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
            return null
        }
    }



//복구
recover = async (index) => {
    const setUrl =  `/${index}`
    console.log("url",setUrl)
    try {
        const res = await this.putRequest(`${this._originalUrl}${setUrl}`)
        console.log("복구",res)
        if (!res) throw ' 복구 실패'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

//삭제
delete = async body  => {
    
    try {
        const res = await this.deleteBodyRequest('/posts',body)
        if (!res) throw ' 삭제 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}
}