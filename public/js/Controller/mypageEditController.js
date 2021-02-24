import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import usersModel from '../Model/usersModel.js'
import Singleton from '../Core/Singleton/Singleton.js'

export default class mypageEditController {
    constructor() {
       
        this._view = new View()
        this._usersModel = new usersModel()
        this._singleton = new Singleton()
        this.utils = new utils()

        this.bindEvent()
    }


    bindEvent = () => {
       
        //수정 완료 버튼
        const modBtn = this._view.getElement('#modBtn')
        modBtn.onclick = () => this.modStart()   
    }

    setData = (data) => {
        this._nickInput.value = data.profile_nickname
    }

  

   


    modStart = async () => {
        const inputNick = this._view.getElement('#nickname').value
        console.log('nickname 들어옴',inputNick)
        // 회원 가입 진행.
      
        const reqData = this._usersModel.modData
        console.log('reqData 마이페이지 수정진행 ',reqData)
        // 필수 입력 사항

        reqData.profile_nickname = inputNick
        const resData = await this._usersModel.modUser(reqData)


        
        // 회원가입 실패
        if (!resData) {
            console.log("resData",reqData)
            utils().snackbar('마이페이지 수정 실패')
            return
        }
          // 회원가입 성공
        // 로그인 페이지로 이동
        utils().snackbar('마이페이지 수정 성공')
        this._singleton.movePage('/mypage.html')
        console.log(resData)
    }
}
