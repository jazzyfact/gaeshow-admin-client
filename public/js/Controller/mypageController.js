import View from '../Core/Mvc/View.js'
import usersModel from '../Model/usersModel.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'

export default class mypageController{
    constructor(myInfo,adminIndex,myGrade){
         // myinfo값이 들어오면 내 페이지, 아니면 다른 유저 페이지
         this._isMyPage = myInfo ? true : false
         // 유저 정보, 서버에서 유저 정보가 구현되면 여기에서 데이터를 넣어 주어야 한다.
         this._Info = adminIndex ? adminIndex : null
 
        // this._myInfo = myInfo

         this._view = new View()
         this._utils = new utils()
         this._usersModel = new usersModel()
         this._singleton = new Singleton()

         this._myGrade = myGrade
      
        //  console.log("관리자등급 확인",myGrade)

  

         this.lifeCycle()
    }


    lifeCycle = async () => {
        await this.grade()
        // console.log('mypage 들어옴')
        this.getAdminInfo().then((e) => this.setInfo(e))
        // this.setInfo(this._Info)
        this.setButton(this._isMyPage)
        // console.log('mypage 들어옴',   this.setInfo(this._Info))
       
    }

    //권한설정
//등급 1,2,3 가능
grade = async () => {
    // console.log('등급',this._myGrade.grade)

    switch(this._myGrade){
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
         this._productTitle = this._view.getElement('#productTitle').classList.add('hidden')//상품관리타이틀
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

    getAdminInfo = async () => {
        const adminInfo = await this._usersModel.myInfo(this._Info)
        return adminInfo
    }



    setInfo = async (data) => {
        // console.log('mypage data', data)
        const {
            //로그인한 관리자 아이디, 관리자 이름, 닉네임
            profile_id,
            name,
            profile_nickname,
            grade
        } = data

        switch(grade){
            case  1:
                this._view.getElement('#grade').innerHTML = '총괄책임자'
            break
            case 2:
                this._view.getElement('#grade').innerHTML = '상품매니저'
            break
            case 3:
                this._view.getElement('#grade').innerHTML = '게시물매니저'
            break
            case 4:
                this._view.getElement('#grade').innerHTML = '상담사'
            break

        }

        this._view.getElement('#id').innerHTML = profile_id
        this._view.getElement('#name').innerHTML = name
        // this._view.getElement('#grade').innerHTML = grade
        this._view.getElement('#nickname').innerHTML = profile_nickname
}

    setButton = (isMyPage) => {
         if (isMyPage) {
        //마이페이지, 프로필 수정, 비밀번호 변경 버튼
        const modifyBtn = this._view.getElement('#modifyBtn')
        const modifyPwBtn = this._view.getElement('#modifyPwBtn') 

        modifyBtn.onclick = () => this.goEditPage()
        modifyPwBtn.onclick = () => this.goChangePwPage()
    }
}

goEditPage = () => {
    window.location.href = '/mypage__edit.html'
}

goChangePwPage = () =>{
    window.location.href = '/password__edit.html'
}



} 