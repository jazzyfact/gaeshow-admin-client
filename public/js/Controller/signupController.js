import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import usersModel from '../Model/usersModel.js'
import checkUserModel from '../Model/checkUserModel.js'
import Singleton from '../Core/Singleton/Singleton.js'

export default class signupController {
    constructor(type,myGrade) {
        this._view = new View()
        this._usersModel = new usersModel()
        this._checkUserModel = new checkUserModel()
        this._singleton = new Singleton()
       
        //회원가입데이터(필수)
        //아이디,비밀번호,비밀번호확인,이름,닉네임,등급
        this._profile_id
        this._passwrod
        this._repeat_password
        this._name
        this._profile_nickname = false
        this._grade
    
        this._checkNickname = false
        this.eventBind()



        this._myGrade = myGrade
        // console.log("내정보",myInfo.grade)
        // console.log("관리자등급 확인",myGrade)

        this.lifeCycle()
    }
    eventBind = () => {
       
        //아이디 중복체크
        const idCheckBtn = this._view.getElement('#idCheckBtn')
        idCheckBtn.onclick = () => this.idCheckBtn()
       
        //닉네임 중복 체크 버튼
         const nickCheckBtn = this._view.getElement('#nickCheckBtn')
            nickCheckBtn.onclick = () => this.nickCheckBtn() 

        //관리자등급선택
        this._grade = this._view.getElement('#gradeSeletor')
       
        //회원가입버튼 singupBtn
        const singupBtn = this._view.getElement('#singupBtn')
        singupBtn.onclick = () => this.signUpStart()   
    }
    lifeCycle = async () => {
        await this.grade()
       
    }


//권한설정
//등급 1,2,3 가능
grade = async () => {
    // console.log('등급',this._myGrade.grade)

    switch(this._myGrade.grade){
        case 2:
     //회원관리
     this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
     this._user=  this._view.getElement('#user').classList.add('hidden')
     this._admin=  this._view.getElement('#admin').classList.add('hidden') 
      this._removeUser=  this._view.getElement('#reomveUser').classList.add('hidden') 
     //광고관리
     this._adTitle=  this._view.getElement('#adTitle').classList.add('hidden')
     this._ad=  this._view.getElement('#ad').classList.add('hidden') 
     break
     case 3:
         //회원관리
     this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
     this._user=  this._view.getElement('#user').classList.add('hidden')
     this._admin=  this._view.getElement('#admin').classList.add('hidden')
     this._removeUser=  this._view.getElement('#reomveUser').classList.add('hidden')
     //광고관리
     this._adTitle=  this._view.getElement('#adTitle').classList.add('hidden')
     this._ad=  this._view.getElement('#ad').classList.add('hidden')    
     //고객센터
     this._notice=  this._view.getElement('#notice').classList.add('hidden')
     this._faq=  this._view.getElement('#faq').classList.add('hidden')
     //상품관리
     this._store=  this._view.getElement('#store').classList.add('hidden')//상품등록
     this._product=  this._view.getElement('#product').classList.add('hidden')//상품상담
     break
     case 4:
     //회원관리
     this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
     this._user=  this._view.getElement('#user').classList.add('hidden')
     this._admin=  this._view.getElement('#admin').classList.add('hidden')
      this._removeUser=  this._view.getElement('#reomveUser').classList.add('hidden')
     //커뮤니티관리
     this._admin=  this._view.getElement('#communityTitle').classList.add('hidden')
     this._post=  this._view.getElement('#post').classList.add('hidden')
     this._comment=  this._view.getElement('#comment').classList.add('hidden')
     this._ide=  this._view.getElement('#ide').classList.add('hidden')
     this._lan=  this._view.getElement('#lan').classList.add('hidden')
     //광고관리
     this._adTitle=  this._view.getElement('#adTitle').classList.add('hidden')
     this._ad=  this._view.getElement('#ad').classList.add('hidden')
     //고객센터
     this._serviceCenterTitle=  this._view.getElement('#serviceCenterTitle').classList.add('hidden')
     this._notice=  this._view.getElement('#notice').classList.add('hidden')
     this._faq=  this._view.getElement('#faq').classList.add('hidden')
     this._question=  this._view.getElement('#question').classList.add('hidden')
     this._report=  this._view.getElement('#report').classList.add('hidden')
      //상품관리
     this._store=  this._view.getElement('#store').classList.add('hidden')        
        break
    }
}



    //아이디 중복 체크
    idCheckBtn = async () => {
        console.log('아이디 중복 체크')
         // 회원가입 아이디 체크 유저 데이터 생성
         const inputId = this._view.getElement('#id').value
         this._checkUserModel.reqData.profile_id = inputId //inputId
        //  console.log('this._profile_id',inputId)
          // 예외 처리
        if (!inputId) {
        console.log(!inputId)
        utils().snackbar('아이디를 입력 해 주세요')
        return
    }

         // 회원 가입 가능한 상태인지 체크
         const checkUser = await this._checkUserModel.checkUser()
         this._usersModel.signupData.signin_token = checkUser.signin_token
        //  console.log("signintoken???",checkUser.signin_token)

        

         if (checkUser.message == 'you_can_login') { 
            // console.log("아이디체크? ", checkUser.message)
            utils().snackbar('이미 사용중인 아이디입니다.')
            // return
        }

        if (checkUser.message == 'you_can_join'){
          
           utils().snackbar('사용 가능한 아이디입니다.')
        //    console.log("아이디체크 중복? ", checkUser.message)
        }


 
    }

   //닉네임 중복 체크 클릭
   nickCheckBtn = async () => {
    // console.log('닉네임 중복 체크 시작')

    // const err = this._View.getElement('#nickCheckBtn')
    // 입력값 가져오기
    const inputNick = this._view.getElement('#nickname').value
    this._checkUserModel.reqNickData.profile_nickname = inputNick
    // console.log("닉네임",inputNick)
    
    // 예외 처리
    if (!inputNick) {
        // console.log("닉네임 안씀",!inputNick)
        utils().snackbar('닉네임을 입력 해 주세요')
        return
    }
    
     // 회원 가입 가능한 상태인지 체크
     const checkNick = await this._checkUserModel.checkNickName()
     //이미 사용한 닉네임이 있을 떄
    //  if (!checkNick) utils().snackbar('이미 사용중인 닉네임입니다.')

    //  console.log("checkNick",checkNick)
     if (!checkNick) {
        utils().snackbar('닉네임이 중복되었습니다.')
        // return
    }
    
     //닉네임 사용 할 수 있을 때
     if (checkNick.message === 'you_can_use_nickname') { 
        //  console.log("닉네임 중복 체크? ", checkNick.message)
         utils().snackbar('사용가능한 닉네임입니다.')
        
     }


   
   }

    // 회원 가입 진행하는 메서드
    signUpStart = async () => {
        // console.log('회원가입페이지 들어옴')
        // this.checker()



         // 필수 입력
        //  const idValue = this._view.getElement(`#id`).value
        //  const passwordValue = this._view.getElement(`#passwrod`).value
          //회원가입 입력한 값
          const inputId = this._view.getElement('#id').value
          const inputPassword = this._view.getElement('#password').value
          const inputNamd = this._view.getElement('#name').value
          const inputNick = this._view.getElement('#nickname').value
         const repeatPassword2Value = this._view.getElement(`#repeatPassword`).value
        //  const nameValue = this._view.getElement(`#name`).value
        //  const nickNameValue = this._view.getElement(`#nickname`).value
         // 선택 입력

        


 
         // 파라미터 체크
         // 이메일
         if (!inputId) {
             utils().snackbar(`아이디를 입력해주세요`)
             return true
         }
       
         // 패스워드 체크
         if (!inputPassword) {
             utils().snackbar(`비밀번호를 입력해주세요`)
             return false
         }
         if (!utils().passWordChecker(inputPassword)) {
             utils().snackbar(`비밀번호는 영문,숫자와 기호를 포함한 8~20자로 사용해주세요`)
             return false
         }
         if (!repeatPassword2Value) {
             utils().snackbar(`비밀번호를 확인해주세요`)
             return false
         }
         if (inputPassword != repeatPassword2Value) {
             utils().snackbar(`동일한 비밀번호를 입력해주세요`)
             return false
         }
         if (!inputNamd) {
             utils().snackbar(`이름을 입력해주세요`)
             return false
         }
         if (!inputNick) {
             utils().snackbar(`닉네임을 입력해주세요`)
             return false
         }
         if (!utils().nicknameChecker(inputNick)) {
             utils().snackbar(`닉네임은 2~10자로 사용해주세요`)
             return false
         }
         
         this.nickCheckBtn()
     
      
        // console.log(reqData)
       

        // 회원 가입 진행.
        

        const reqData = this._usersModel.signupData
        console.log('reqData 회원가입진행 ',reqData)
        
        // 필수 입력 사항
        reqData.profile_id = inputId
        reqData.password = inputPassword
        reqData.name =inputNamd
        reqData.profile_nickname = inputNick
        reqData.grade = this._grade.value //등급 값
        console.log(reqData)
        console.log(reqData.grade,"등급")
        const resData = await this._usersModel.signup(reqData)
        console.log("필수입력사항 다넣음, reqData",reqData)
        

        // 회원가입 실패
        if (!resData || !resData.user_id) {
            // console.log("resData",reqData)
            // console.log("resData.user_id",resData.user_id)
            utils().snackbar('회원가입에 실패 했습니다.<br />관리자에게 문의해주세요.')
            return
        }

        // 회원가입 성공
        // 로그인 페이지로 이동
        utils().snackbar('회원가입 성공')
        this._singleton.movePage('./admin__list.html')
        // console.log(resData)
    }

    //예외처리메서드
    checker = () => {
        // 필수 입력
        const idValue = this._view.getElement(`#id`).value
        const passwordValue = this._view.getElement(`#passwrod`).value
        const repeatPassword2Value = this._view.getElement(`#repeatPassword`).value
        const nameValue = this._view.getElement(`#name`).value
        const nickNameValue = this._view.getElement(`#nickname`).value
        // 선택 입력

        // 파라미터 체크
        // 이메일
        if (!idValue) {
            utils().snackbar(`아이디를 입력해주세요`)
            return false
        }
      
        // 패스워드 체크
        if (!passwordValue) {
            utils().snackbar(`비밀번호를 입력해주세요`)
            return false
        }
        if (!utils().passWordChecker(passwordValue)) {
            utils().snackbar(`비밀번호는 영문,숫자와 기호를 포함한 8~20자로 사용해주세요`)
            return false
        }
        if (!repeatPassword2Value) {
            utils().snackbar(`비밀번호를 확인해주세요`)
            return false
        }
        if (passwordValue != repeatPassword2Value) {
            utils().snackbar(`동일한 비밀번호를 입력해주세요`)
            return false
        }
        if (!nameValue) {
            utils().snackbar(`이름을 입력해주세요`)
            return false
        }
        if (!nickNameValue) {
            utils().snackbar(`닉네임을 입력해주세요`)
            return false
        }
        if (!utils().nicknameChecker(nickNameValue)) {
            utils().snackbar(`닉네임은 2~10자로 사용해주세요`)
            return false
        }
        this._profile_id = idValue
        this._password = passwordValue
        this._name = nameValue
        this._profile_nickname = nickNameValue
       
        return true
    }
}
