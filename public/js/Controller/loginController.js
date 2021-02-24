import Singleton from '../Core/Singleton/Singleton.js'
import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import checkUserModel from '../Model/checkUserModel.js'
import usersModel from '../Model/usersModel.js'

export default class loginController {
    // 생성자
    constructor() {
        this._singleton = new Singleton()
        this._View = new View()
        this._checkUserModel = new checkUserModel()
        this._usersModel = new usersModel()

        this.bindEvent()
        console.log(window.location.origin)
       
    }
    
    bindEvent = () => {
        //로그인 버튼
        const loginBtn = this._View.getElement('#loginBtn')
        loginBtn.onclick = () => this.loginUser()
      
    }
    // 로그인 시도
    loginUser = async () => {
        // 입력값 가져오기
        const inputId = this._View.getElement('#id').value
        const inputPassword = this._View.getElement('#password').value
        
        // 예외 처리
        if (!inputId) {
            console.log(!inputId)
            utils().snackbar('아이디를 입력 해 주세요')
            return
        }
    
        if (!inputPassword) {
            utils().snackbar('패스워드를 입력 해 주세요')
            return
        }

        const checkData = await this.checkUserId(inputId)
        if (!checkData) utils().snackbar('잠시 뒤 다시 요청해주세요.')
        if (checkData.message !== 'you_can_login') {
            utils().snackbar('이메일 / 패스워드를 확인해주세요.')
            return
        }
        // 로그인 시작
        // 필수 정보
        // profile_id, password, signin_token
        this._usersModel.emailLoginData.profile_id = inputId
        this._usersModel.emailLoginData.password = inputPassword
        this._usersModel.emailLoginData.signin_token = checkData.signin_token

        await this.startLogin(this._usersModel.emailLoginData)
    }
  

    
    //로그인
    checkUserId = async (id) => {

        this._checkUserModel.reqData.profile_id = id

        const checkData = await this._checkUserModel.checkUser()
        console.log(checkData)
        return checkData
    }
   

    startLogin = async (reqData) => {
        console.log('startLogin', reqData)
        try {
            const resData = await this._usersModel.loginUser(reqData)
            console.log(reqData, resData)
            if (!resData.access_token) {
                utils().snackbar('이메일 / 패스워드를 확인해주세요.')
                return
            }
            if (!resData.user) {
                utils().snackbar('이메일 / 패스워드를 확인해주세요.')
                return
            }
            if (!resData) {
                console.log('asd')
                utils().snackbar('이메일 / 패스워드를 확인해주세요.')
                return
            }
            // signToken, eamil , access_token 쿠키 저장.
            this._singleton.setCookie('accessToken', resData.access_token, 1)
            // this._singleton.setCookie('email',inputEmail, 1)
            this._singleton.movePage('/')
        } catch (e) {
            utils().snackbar('이메일 / 패스워드를 확인해주세요.')
        }
    }
}
