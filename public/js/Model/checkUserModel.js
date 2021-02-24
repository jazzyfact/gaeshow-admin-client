import Model from '../Core/Mvc/Model.js'
export default class checkUserModel extends Model {
    constructor() {
        super()
    }

    reqData = {
        profile_id: ''
    }

    reqNickData = {
        profile_nickname: ''
    }

    //가입여부체크
    //회원가입 및 로그인 할 때 가입여부 체크해야 함
    checkUser = async () => {
        console.log(this.reqData)
        try {
            const res = await this.postRequest('/admin/check', this.reqData)
            if (!res) throw 'checkUser : reasponse is empty!'
            if (!res.message) throw 'checkUser : message is empty'
            return res
        } catch (e) {
            console.log(e)
            return null
        }
    }

    //닉네임 중복 체크
    checkNickName = async () => {
        console.log("체크모델",this.reqNickData)
        try{
            const res = await this.postRequest('/admin/profile-nickname', this.reqNickData)
            if (!res) throw '닉네임 중복체크 실패'
            return res
        }catch(e){
            console.log(e)
            return null
        }
    }
}
