import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import usersModel from '../Model/usersModel.js'
import Singleton from '../Core/Singleton/Singleton.js'
import checkUserModel from '../Model/checkUserModel.js'

export default class passwordControllers{
    constructor(){

        this._view = new View()
        this._usersModel = new usersModel()
        this._singleton = new Singleton()
        this._checkUserModel = new checkUserModel()
        this.utils = new utils()

        this.bindEvent()
        console.log(window.location.origin)
    }

    bindEvent = () => {
        //비밀번호 변경 버튼
        const modPwBtn = this._view.getElement('#modPwBtn')
        modPwBtn.onclick = () => this.modPwUser()
      
    }


//예외처리메서드
// checker = () => {
//     // 필수 입력
   
//     const currentPwValue = this._view.getElement(`#currentPassword`).value
//     const newPwValue = this._view.getElement(`#newPassword`).value
//     const repeatPassword2Value = this._view.getElement(`#repeatPassword`).value

//     // 선택 입력

//     // 파라미터 체크
//     // 이메일
   
//     // 패스워드 체크
//     if (!currentPwValue) {
//         utils().snackbar(`비밀번호를 입력해주세요`)
//         return false
//     }
//     if (!newPwValue) {
//         utils().snackbar(`비밀번호를 입력해주세요`)
//         return false
//     }
//     if (!utils().passWordChecker(newPwValue)) {
//         utils().snackbar(`비밀번호는 영문,숫자와 기호를 포함한 8~20자로 사용해주세요`)
//         return false
//     }
//     if (!repeatPassword2Value) {
//         utils().snackbar(`비밀번호를 확인해주세요`)
//         return false
//     }
//     if (newPwValue != repeatPassword2Value) {
//         utils().snackbar(`동일한 비밀번호를 입력해주세요`)
//         return false
//     }
    
//     this._current_password = currentPwValue
//     this._new_password = newPwValue
  
   
//     return true
// }




modPwUser = async () =>{

    // this.checker()


    const inputCurrentPw = this._view.getElement(`#currentPassword`).value
    const inputNewPw= this._view.getElement(`#newPassword`).value
    const repeatPassword2Value = this._view.getElement(`#repeatPassword`).value


      // 패스워드 체크
    if (!inputCurrentPw) {
        utils().snackbar(`비밀번호를 입력해주세요`)
        return false
    }
    if (!inputNewPw) {
        utils().snackbar(`비밀번호를 입력해주세요`)
        return false
    }
    if (!utils().passWordChecker(inputNewPw)) {
        utils().snackbar(`비밀번호는 영문,숫자와 기호를 포함한 8~20자로 사용해주세요`)
        return false
    }
    if (!repeatPassword2Value) {
        utils().snackbar(`비밀번호를 확인해주세요`)
        return false
    }
    if (inputNewPw != repeatPassword2Value) {
        utils().snackbar(`동일한 비밀번호를 입력해주세요`)
        return false
    }
    // if (inputCurrentPw != inputNewPw) {
    //     utils().snackbar(`기존 비밀번호와 변경할 비밀번호가 같습니다`)
    //     return false
    // }


    const reqData = this._usersModel.modPwData
    console.log('reqData 비밀번호 변경 진행',reqData)

    reqData.current_password = inputCurrentPw
    reqData.new_password = inputNewPw
    console.log(reqData)

    const resData = await this._usersModel.modPwUser(reqData)
    console.log("필수입력사항 다넣음, reqData",reqData)
    console.log("필수입력사항 다넣음, reqData",reqData.code)
    

     // 회원가입 실패
     if (!resData) {
        console.log("resData",reqData)
        utils().snackbar('비밀번호 변경에 실패 했습니다.<br />다시 한번 확인해주세요.')
        return
    }

     // 회원가입 성공
        // 로그인 페이지로 이동
        utils().snackbar('비밀번호 변경 성공')
        this._singleton.movePage('/mypage.html')
        console.log(resData)
}







//     modPwUser = async () =>{
//         // 입력값 가져오기
//         const inputCurrentPw = this._view.getElement('#current__password').value
//         const inputNewPw = this._view.getElement('#new__password').value
//         const inputRepeatPw = this._view.getElement('#repeat__password').value


//         //비밀번호 변경 시작
//         const reqData = this._usersModel.modPwData
//         console.log('reqData 회원가입진행 ',reqData)


//         // 필수 입력 사항
//         reqData.current_password = inputCurrentPw
//         reqData.new_password = inputNewPw
       
//         console.log(reqData)
//         const resData = await this._usersModel.modPwUser(reqData)
//         console.log("필수입력사항 다넣음, reqData",reqData)
//         // 예외 처리


//         // if (reqData !== 'both_passwords_are_the_same') {
//         //     utils().snackbar('다시 한번 확인해주세요.')
//         //     return
//         // }
//         if (reqData === 'invalid_current_password') {
//             utils().snackbar('기존 비밀번호를 입력해주세요.')
//             return
//         }
//        // 회원가입 실패
//  // 회원가입 실패
//     if (!resData) {
//     console.log("resData",reqData)
//     utils().snackbar('회원가입에 실패 했습니다.<br />관리자에게 문의해주세요.')
//     return
// }
    
//          // 패스워드 체크
//          if (!inputCurrentPw) {
//              console.log(!inputCurrentPw)
//             utils().snackbar(`비밀번호를 입력해주세요`)
//             return false
//         }
//         if (!inputNewPw) {
//             console.log(!inputNewPw)
//             utils().snackbar(`비밀번호를 입력해주세요`)
//             return false
//         }
//         if (!inputRepeatPw) {
//             console.log(!inputRepeatPw)
//             utils().snackbar(`비밀번호를 입력해주세요`)
//             return false
//         }
//         if (!utils().passWordChecker(inputCurrentPw)) {
//             utils().snackbar(`비밀번호는 영문,숫자와 기호를 포함한 8~20자로 사용해주세요`)
//             return false
//         }
//         if (!utils().passWordChecker(inputNewPw)) {
//             utils().snackbar(`비밀번호는 영문,숫자와 기호를 포함한 8~20자로 사용해주세요`)
//             return false
//         }
//         if (!inputRepeatPw) {
//             utils().snackbar(`비밀번호를 확인해주세요`)
//             return false
//         }
//         if (inputNewPw != inputRepeatPw) {
//             utils().snackbar(`동일한 비밀번호를 입력해주세요`)
//             return false
//         }

//          // 비밀번호 변경 시작
//         // 필수 정보
//         // current_password, new_password
//         this._usersModel.modPwData.current_password = inputCurrentPw
//         this._usersModel.modPwData.new_password = inputNewPw
        

//         // await this.startLogin(this._usersModel.emailLoginData)

//     }
}