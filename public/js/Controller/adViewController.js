import View from "../Core/Mvc/View.js"
import Singleton from "../Core/Singleton/Singleton.js"
import utils from "../Core/Singleton/utils.js"
import adModel from "../Model/adModel.js"

export default class adViewController {
    constructor(myInfo, myGrade){


    this._singleton = new Singleton()
    this._utils = new utils()
    this._view = new View()
    this._adModel =new adModel()
    


    this._nowPage = utils().getParameterByName('p') ? utils().getParameterByName('p') : 1
    this._limit = 10


    this._adId = utils().getParameterByName('n')
    // console.log('광고 인덱스',this._adId)


    this._myInfo = myInfo
    this._myGrade = myGrade
    // console.log("내정보",myInfo.grade)
    // console.log("관리자등급 확인",myGrade.grade)


    this.lifeCycle()
    }



    lifeCycle = async () => {
        await this.grade()
        // console.log('상세') 
        await this.getAdViewData().then((e) => this.setAdViewData(e))
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



    getAdViewData = async () => {
        // console.log("가져온 광고 데이터", this._adModel.getAdDetail(this._adId))
        return await this._adModel.getAdDetail(this._adId)
    }



    setAdViewData =  async (data) =>{
        // console.log('data1',data)

        
        // 작성자 관련 정보
        // 작성한 유저 닉네임, 이미지 url, 직종, 경력, 근무지역
        const { profile_nickname, user_id, url ,updated_at,location,created_at,started_at,ended_at, ad_status,stopped_at} = data

         //광고시작일
         this._view.getElement('#adStartAt').innerHTML= started_at
         //광고종료일
         this._view.getElement('#adEndAt').innerHTML = ended_at
        
         //광고등록일
         this._view.getElement('#createAt').innerHTML= created_at
        
         //광고위치
         this._view.getElement('#location').innerHTML= location
       
        //광고정지라면 
        if(stopped_at == null){
            this._view.getElement('#stopSpan').classList.add(`hidden`)
            this._view.getElement('#stop').classList.add(`hidden`)
        }
        else{
        //광고정지
        this._view.getElement('#stoppedAt').innerHTML= stopped_at  
        }


        if(updated_at === null){
        //마지막수정일
        this._view.getElement('#deleteSpan').classList.add(`hidden`)
        }
        else{
        this._view.getElement('#updatedAt').innerHTML = updated_at
        }

         //닉네임
         this._view.getElement('#userId').innerHTML = user_id
         this._view.getElement('#nickname').innerHTML = profile_nickname
         
        //사진
        const thumbView = this._view.getElement('#selectedImg')
        thumbView.src = url




        //광고 정지
        //광고 정지는 총괄매니저만 권한있음 등급:1
        //광고정지상태도 받아야함..
        if (this._myGrade.grade == 1 && ad_status !== "stopped") {
            //등급1: 총괄매니저
            // console.log("관리자등급입니다",this._myGrade.grade === 1 )
            const editBtn = this._view.getElement('#edit')
            editBtn.innerHTML = `수정하기`
            editBtn.onclick = () => this.modBtnClick(this._adId)

            const stopBtn = this._view.getElement('#stop')
            stopBtn.innerHTML = `광고정지`
            stopBtn.onclick = () => this.stopBtnClick(this._adId)

        }
        
        else{
            //그 외 등급은 수정 삭제는 할 수 없다
            //게시물 매니저(3), 상담사(4) 
            const editBtn = this._view.getElement('#edit')
            editBtn.hidden

            const deleteBtn = this._view.getElement('#stop')
            deleteBtn.hidden
        }


    }



  
     //수정 페이지 이동
     modBtnClick = async (index) => {
        window.location.href = `/ad__edit.html?n=${index}`
    }



  //처리상태 변경
  stopBtnClick = async () =>{
    await this._adModel.stopAd(this._adId = utils().getParameterByName('n'))
    //   console.log('광고상태변경',this._adId = utils().getParameterByName('n'))
    utils().snackbar('광고가 정지되었습니다')
    //수정후 페이지 이동
     window.location.href = `/ad__view.html?n=${this._adId = utils().getParameterByName('n')}`
}

}