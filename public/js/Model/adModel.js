import Model from '../Core/Mvc/Model.js'

export default class adModel  extends Model{
    constructor() {
        super()

        this._originalUrl = '/ad'
        // 필수 요청 데이터
        // 이거 건드리지 말것. 리턴 받은 원본을 사본으로 가공할것
        this._oriReqData = {
            page: '',
            limit: ''
        
        }

        this._originalIdeUrl = ''
        //댓글 상세목록
        this._oriReqCommentDetailData ={
            page: '',
            limit: '',
            type: '',
            category_id : '',
            comment_id : '',
        }

        this._adUrl ='/ad/affiliate'

        this._adStop = '/ad/stop'
       
    }

     //ad 목록 가져오기
    
    getAd = async (data) => {
        try {
            const res = await this.getRequest(this._originalUrl, data)
            // console.log(res)
            if (!res) throw 'ide 목록 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //디카피


    //ad 글쓰기
    postAd = async (title, content,category_type) => {
        let reqData = {
          
            title: title,
            content: content,
            category_type: category_type
            
        }

        try {
            const res = await this.postRequest('/ad', reqData)
            if (!res) return null
            return res
        } catch (e) {
            console.log(e)
            return null
        }
    }

    //ad 상세조회
 getAdDetail = async (index) => {
    const setUrl =  `/${index}`
    // console.log("url",setUrl)
    try {
        const res = await this.getRequest(`${this._originalUrl}${setUrl}`)
        if (!res) throw 'ad 상세보기 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

//광고 정지
stopAd= async (ad_id) => {
    const setUrl =  `/${ad_id}`
    // console.log("url",setUrl)
    try {
        const res = await this.putRequest(`${this._adStop}${setUrl}`)
        // console.log("광고중지 res",res)
        if (!res) throw '광고중지변경 실패'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}



uploadImage = async (fileData, name) => {
    const formData = new FormData()
    formData.append('files', fileData, name)
    formData.append('type', 'ad')
    //콘솔
    // console.log("files",fileData, name)
    // console.log("type", 'ad')
    // console.log("formData", formData)
    try {
        const res = await this.postRequestImageFormData('/files/images', formData)
        if (!res) throw '이미지 업로드 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}


getAffiliate = async () => {
    // this._reqData.type = this._typeJob
    try {
        const res = await this.getRequest('/ad/affiliate')
        // console.log("제휴",res)
        if (!res) throw '제휴 업체 아이디 목록 조회 조회 실패!'
        return res
    } catch (e) {
        console.error(e)
    }
}

    

addPost = async (data) => {
    try {
        const res = await this.postRequest(this._originalUrl, data)
        // console.log("광고등록",data)
        if (!res) throw '광고 업로드 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}
//광고 수정
editPost = async (data) => {
    try {
        const res = await this.putRequest(this._originalUrl, data)
        if (!res) throw '광고 업로드 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}

//광고위치목록조회

getLocation = async () => {
    // this._reqData.type = this._typeJob
    try {
        const res = await this.getRequest('/ad/location')
        // console.log("제휴",res)
        if (!res) throw '광고 위치 목록 조회 조회 실패!'
        return res
    } catch (e) {
        console.error(e)
    }
}

}