import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'
import noticeModel from '../Model/noticeModel.js'
import noticeItem from '../View/noticeItem.js'

export default class noticeViewController{
    constructor(myInfo, myGrade) {
        this._noticeModel = new noticeModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        this._noticeItem = new noticeItem()

        // 페이지 기본 데이터
        this._postId = utils().getParameterByName('n')
        // console.log("인덱스번호",this._postId)
        this._notice = 'notice'

        this._myInfo = myInfo
        this._myGrade = myGrade
        // console.log("내정보",myInfo.grade)
        // console.log("관리자등급 확인",myGrade.grade)
      

        this.lifeCycle()
    }

    lifeCycle = async () => {
        await this.grade()
        //서버에서 상세보기 내용을 가져오고 난 후에 setData 실행
        await this.getNoticeData().then((e) => this.setNoticeData(e))
    }
//권한설정
//등급 1,2,3 가능
grade = async () => {

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

    //상세보기 내용 가져오기
    getNoticeData = async () => {
    
        const resData = await this._noticeModel.getNoticeDetail(this._postId)

        return resData
    }
    //가져온 데이터 넣어주기
    setNoticeData = async (data) => {
            // console.log('data',data)
        
        if (!data) return 
        // 관리자 등급이(총괄매니저(등급1) or 상품매니저(등급2)이라면  수정/삭제버튼이 보인다)
        // 상위 관리자라면 게시글 추가,수정,삭제 할 수 있음

        //이미 삭제한 게시물이라면 상세보기 할 때 수정/삭제 버튼을 보여주지 않는다
    if (this._myGrade.grade == 1 && data.deleted_at ===null) {
            //등급1: 총괄매니저
            // console.log("관리자등급입니다",this._myGrade.grade === 1 )
            const editBtn = this._view.getElement('#edit')
            editBtn.innerHTML = `수정하기`
            editBtn.onclick = () => this.modBtnClick(this._postId)

            const deleteBtn = this._view.getElement('#delete')
            deleteBtn.innerHTML = `삭제하기`
            deleteBtn.onclick = () => this.deleteBtnClick(this._postId)

        }
        //등급2 : 상품매니저
        else if(this._myGrade.grade ===2 && data.deleted_at ===null){
            const editBtn = this._view.getElement('#edit')
            editBtn.innerHTML = `수정하기`
            editBtn.onclick = () => this.modBtnClick(this._postId)

            const deleteBtn = this._view.getElement('#delete')
            deleteBtn.innerHTML = `삭제하기`
            deleteBtn.onclick = () => this.deleteBtnClick(this._postId)
        }
        else{
            //그 외 등급은 수정 삭제는 할 수 없다
            //게시물 매니저(3), 상담사(4) 
            const editBtn = this._view.getElement('#edit')
            editBtn.hidden

            const deleteBtn = this._view.getElement('#delete')
            deleteBtn.hidden
        }

        this._view.getElement('#title').innerHTML = data.title
        this._view.getElement('#createdAt').innerHTML =data.created_at
        this._view.getElement('#profileNickname').innerHTML = data.profile_nickname
        this._view.getElement('#content').innerHTML = data.content

    }

    //수정 페이지 이동
    modBtnClick = async (index) => {
        window.location.href = `/notice__edit.html?n=${index}`
    }

    //삭제
    deleteBtnClick = async (index) => {
        const dialog = window.confirm(`정말로 삭제하시겠습니까?`)
        if (dialog) {
            const resData = await this._noticeModel.deletePost(index)
            if (resData.stats == 'ok') {
                 window.location.href = `/notice.html`
            } else {
                utils().snackbar('게시물 삭제를 실패 하였습니다. 잠시 뒤 다시 시도해 주세요')
            }
        }
    } 
    
}