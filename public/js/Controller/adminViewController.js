
import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import usersModel from '../Model/usersModel.js'
import Singleton from '../Core/Singleton/Singleton.js'



export default class adminViewController{
  constructor(myInfo,myGrade){
    this._usersModel = new usersModel()
    this._singleton = new Singleton()
    this._utils = new utils()
    this._view = new View()

    this._myGrade = myGrade
    // console.log("내정보",myInfo.grade)
    // console.log("관리자등급 확인",myGrade)



    this._profile_id  = this._view.getElement('#id')
    this._name = this._view.getElement('#name')
    this._profile_nickname   = this._view.getElement('#nickname')
    this._grade   = this._view.getElement('#grade')
    this._create_admin   = this._view.getElement('#createAdmin')
    this._created_at  = this._view.getElement('#createdAt')
    this._deleted_at = this._view.getElement('#deletedAt')

    //등급
    this._gradeSelector = this._view.getElement('#gradeSelector')
    //등급 변경
    this._modifyGradeBtn   = this._view.getElement('#modifyGradeBtn')
    this._modifyGradeBtn.onclick = () => this.editGradeBtn()
    //복구버튼
    this._recover = this._view.getElement('#recover')
    this._recover.onclick = () => this.recoverAdminBtn()
    //비밀번호 초기화
    this._resetPasswrod = this._view.getElement('#resetPasswrod')
    this._resetPasswrod.onclick = () => this.resetPasswordBtn()

    this._gradeSelector = this._view.getElement('#gradeSelector')


    this._userId = utils().getParameterByName('n')
    // console.log('관리자 인덱스',this._userId)

    this.lifeCycle()
  }
   


  lifeCycle = async () => {
    await this.grade()
    // await this.setData()//관리자 목록 가져오기
    await this.getData().then((e) => this.setData(e))
   
  
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

getData = async () =>{
 const resData =  await this._usersModel.getAdminDetail(this._userId)
    // console.log("가져온 광고 데이터", this._usersModel.getAdminDetail(this._userId))
    return resData
}



setData = async (data) => {
     
    // console.log('data1',data)

    const { profile_id, name ,profile_nickname, grade, create_admin, created_at, deleted_at, user_id } = data


    this._view.getElement('#id').innerHTML =  profile_id
    this._view.getElement('#name').innerHTML =  name
    this._view.getElement('#nickname').innerHTML =  profile_nickname
    this._view.getElement('#grade').innerHTML =  grade
    this._view.getElement('#createAdmin').innerHTML =  create_admin
    this._view.getElement('#createdAt').innerHTML =  created_at
    this._view.getElement('#deletedAt').innerHTML =  deleted_at
    
    this._userId = user_id

    //관리자 등급 넣기
    if (grade) {
        // console.log("등급",grade)
       
        const arr = this._gradeSelector.childNodes
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].innerHTML ==  grade) arr[i].setAttribute('selected', true)
            // console.log("등급",arr[i].innerHTML)
        }
       
    }


    //관리자가 삭제되지 않았다면 복구버튼 숨기기
    if(deleted_at === null){
        this._recover = this._view.getElement('#recover').classList.add('hidden')
        this._recoverTitle = this._view.getElement('#recoverTitle').classList.add('hidden')
        this._line = this._view.getElement('#line').classList.add('hidden')
    }
    else{
        this._recover = this._view.getElement('#recover')
        // this._recoverTitle =  this._view.getElement('#recoverTitle')
    }
}

//관리자 등급 변경
editGradeBtn = async() =>{
    this._view.getElement('#gradeSelector').value

    let reqData = {
        user_id : this._userId = utils().getParameterByName('n'),
        grade : this._gradeSelector.value
    }
    // console.log("reqData",reqData)

    let resData
    resData = await this._usersModel.editGradeAdmin(reqData)

    if (!resData) {
        utils().snackbar('관리자 등급을 변경 실패 했습니다. 다시 시도해주세요.')
        return
    }
    utils().snackbar('관리자 등급을 변경하였습니다')
    window.location.href = `/admin__view.html?n=${this._userId}`
}

//관리자 복구
recoverAdminBtn = async() =>{
   
    // let reqData = {
    //     user_id : this._userId
    // }
    // console.log("reqData",reqData)


    let resData
    resData = await this._usersModel.recoverAdmin(this._userId)
    // console.log("resData",resData)


    if (!resData) {
        utils().snackbar('관리자 복구 실패 했습니다. 다시 시도해주세요.')
        return
    }
    utils().snackbar('관리자를 복구하였습니다')
    window.location.href = `/admin__view.html?n=${this._userId}`
}


//비밀번호초기화
resetPasswordBtn = async () =>{

    let resData
    resData = await this._usersModel.resetPwd(this._userId)
    // console.log("resData",resData)
    // console.log("비밀번호",resData.message)


    if (!resData) {
        utils().snackbar('비밀번호 초기화 실패 했습니다. 다시 시도해주세요.')
        return
    }
    utils().snackbar('비밀번호 초기화 성공 하였습니다')
    window.confirm("새로운 비밀번호는 "+ resData.message + " 입니다")
    window.location.href = `/admin__view.html?n=${this._userId}`
}



}