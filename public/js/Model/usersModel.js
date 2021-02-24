import Model from '../Core/Mvc/Model.js'

export default class usersModel extends Model {
    constructor() {
        super()

        //회원목록조회
        this._originalUserUrl = '/user'
        // 회원 목록조회 필수 요청 데이터
        this._oriReqUserData = {
            page: '',
            limit: ''
        }

         //관리자목록조회
         this._originalAdminUrl = '/admin/list'
         // 회원 목록조회 필수 요청 데이터
         this._oriReqAdminData = {
             page: '',
             limit: ''
         }

         //관리자상세조회
         this._adminDetailUrl = '/admin'

         //관리자 비밀번호 초기화
         this._resetPwdUrl ='/admin/password'

         //강퇴 회원복구
         this._restoreUrl ='/user/restore'

         //삭제된 회원 목록조회
         this._removeUserUrl ='/user/deleted'

         //삭제된 회원 상세 조회
         this._removeUserDetailUrl = '/user/deleted'

    }
    //회원가입 필수 요청
    signupData = {
        profile_id: '',    
        password : '',
        profile_nickname: '',
        name:'',
        grade:'',
    }
  
    //이메일 로그인
    emailLoginData = {
     
        signin_token: '',
        password: '',
        profile_id: ''
    }

    //내정보수정
    modData = {
        profile_nickname: '',
    }

    //비밀번호변경
    modPwData = {
        current_password : '',
        new_password : '',
    }

    // 회원 가입 진행
    signup = async (data) => {
        console.log('signup start')
        try {
            const res = await this.postRequest('/admin/join', data)
            if (!res) throw '회원가입 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //내 정보 요청
    myInfo = async () => {
        try {
            const res = await this.getRequest('/admin')
            if (!res) throw '내정보 요청 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //회원 로그인 요청
    loginUser = async (data) => {
        try {
            const res = await this.postRequest('/admin/login', data)
            if (!res) throw 'loginUser is empty result'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //회원 로그아웃 요청
    logoutUser = async () => {
        try {
            const res = await this.postRequest('/admin/logout')
            if (!res) throw 'logout fail!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //회원 삭제
    deleteUser = async (Param) => {
        return await this.deleteRequest('/admin', Param).then((res) => {
            return { resStatus: this.resStatus, resData: res }
        })
    }
   
    //내 정보 수정(닉네임수정)
    modUser = async (data) => {
        console.log('mypage edit start')
        console.log('수정해요~~데이터는?',data)
        try {
            const res = await this.putRequest('/admin', data)
            if (!res) throw '마이페이지 수정 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //비밀번호 변경하기
    modPwUser = async (data) =>{
        console.log('password edit start')
        console.log('수정해요~~데이터는?',data)
        try {
            const res = await this.putRequest('/admin/password', data)
            if (!res) throw '비밀번호 변경  실패'
            if (!res) throw 'modPwUser :both_passwords_are_the_same!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    //회원~~~
    //회원 목록 불러오기
    getUsers = async (data) => {
        try {
            const res = await this.getRequest(this._originalUserUrl, data)
            if (!res) throw '회원 목록 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }

      //회원 강퇴
    deleteUser = async Param  => {
        try {
            const res = await this.deleteRequest('/user', Param)
            if (!res) throw '회원 삭제 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }


     //관리자~~~
    //관리자 목록 불러오기
    getAdmin = async (data) => {
        try {
            const res = await this.getRequest(this._originalAdminUrl, data)
            if (!res) throw '관리자 목록 요청 실패!'
            return res
        } catch (e) {
            console.error(e)
        }
    }


 //게시물 상세보기
 getAdminDetail = async (index) => {
    const setUrl = `/${index}`
    // console.log(setUrl)
    try {
        const res = await this.getRequest(`${this._adminDetailUrl}${setUrl}`)
        if (!res) throw '관리자 상세보기 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

      //관리자 강퇴
      deleteAdmin = async Param  => {
        try {
            const res = await this.deleteRequest('/admin', Param)
            if (!res) throw '관리자 강퇴 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }


 //관리자 등급수정
 editGradeAdmin = async (data) => {
    console.log('mypage edit start')
    console.log('수정해요~~데이터는?',data)
    try {
        const res = await this.putRequest('/admin/grade', data)
        if (!res) throw '관리자등급 변경 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}

//관리자 복구
recoverAdmin = async (index) => {
    const setUrl = `/${index}`
    console.log(setUrl)
    try {
        const res = await this.putRequest(`${this._adminDetailUrl}${setUrl}`)
        if (!res) throw '관리자 상세보기 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}


//관리자 비밀번호 초기화
resetPwd = async (index) => {
    const setUrl = `/${index}`
    console.log(setUrl)
    try {
        const res = await this.putRequest(`${this._resetPwdUrl}${setUrl}`)
        if (!res) throw '관리자 비밀번호 초기화 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

//회원상세
getUserDetail = async (index) => {
    const setUrl = `/${index}`
    // console.log(setUrl)
    try {
        const res = await this.getRequest(`${this._originalUserUrl}${setUrl}`)
        if (!res) throw '회원 상세보기 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

//제휴업체 설정
addAffiliated = async (index) => {
    const setUrl = `/${index}`
    console.log(setUrl)
    try {
        const res = await this.putRequest(`${this._originalUserUrl}${setUrl}`)
        if (!res) throw '제휴업체  요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

//관리자복구
recover = async (index) => {
    const setUrl =  `/${index}`
    // console.log("url",setUrl)
    try {
        const res = await this.putRequest(`${this._adminDetailUrl}${setUrl}`)
        // console.log("복구",res)
        if (!res) throw '댓글 복구 실패'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

//회원복구
recover = async (index) => {
    const setUrl =  `/${index}`
    // console.log("url",setUrl)
    try {
        const res = await this.putRequest(`${this._restoreUrl}${setUrl}`)
        console.log("복구",res)
        if (!res) throw ' 복구 실패'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

//회원삭제
delete = async body  => {
    
    try {
        const res = await this.deleteBodyRequest('/user',body)
        if (!res) throw ' 강퇴 실패'
        return res
    } catch (e) {
        console.error(e)
    }
}

//삭제된 회원 목록 조회
getReomveUsers = async (data) => {
    try {
        const res = await this.getRequest(this._removeUserUrl, data)
        if (!res) throw '회원 목록 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
    }
}

//삭제된 회원 상세 조회
getReomveUserDetail = async (index) => {
    const setUrl = `/${index}`
    // console.log(setUrl)
    try {
        const res = await this.getRequest(`${this._removeUserDetailUrl}${setUrl}`)
        if (!res) throw '회원 상세보기 요청 실패!'
        return res
    } catch (e) {
        console.error(e)
        return null
    }
}

}