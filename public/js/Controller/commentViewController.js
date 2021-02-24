import View from "../Core/Mvc/View.js"
import Singleton from "../Core/Singleton/Singleton.js"
import utils from "../Core/Singleton/utils.js"
import categoryModel from "../Model/categoryModel.js"
import commentModel from "../Model/commentModel.js"
import usersModel from "../Model/usersModel.js"
import commentItem from '../View/commentItem.js'
import dialog from '../View/dialog.js'

export default class commentViewController {
    constructor(type,myGrade){
        // console.log('ide 상세')
        
        this._usersModel = new usersModel()

        this._myGrade = myGrade
        // console.log("내정보",myInfo.grade)
        // console.log("관리자등급 확인",myGrade)
        this._dialog = new dialog()

          //필수데이터
        this._nowPage = utils().getParameterByName('p') ? utils().getParameterByName('p') : 1
        this._limit = 10
        this._type = 'ide'
        this._commentId = utils().getParameterByName('n')
        // console.log('댓글 인덱스',this._commentId)
        this._categoryId = utils().getParameterByName('c')
        // console.log('카테고리 인덱스',this._categoryId)
       

        this._categoryModel = new categoryModel()
        this._commentModel = new commentModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()
        this._commentItem = new commentItem()

      


      
        this.lifeCycle()

}

lifeCycle = async () => {
    // console.log('상세') 
    // await this.getIdeViewData()
    await this.grade()
    //카테고리
    await this.getCategory()//카테고리
    //게시물 상세정보 가져오기 
    await this.getIdeViewData().then((e) => this.setIdeViewData(e))
 
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
    //카테고리 가져오기
    getCategory = async () => {
        const resData = await this._categoryModel.getCategory()
        // console.log(resData)
        
        let filterd
        if (this._categoryId == 8) {
            filterd = resData.filter((it) => it.id === 8)
        }
        if (this._categoryId == 2) {
            filterd = resData.filter((it) => it.id === 2)
        }
        if (this._categoryId == 3) {
            filterd = resData.filter((it) => it.id === 3)
        }
        if (this._categoryId == 4) {
            filterd = resData.filter((it) => it.id === 4)
        }
        if (this._categoryId == 5) {
            filterd = resData.filter((it) => it.id === 5)
        }

        this._postIndex = filterd[0].id
        this._view.getElement('#categoryType').innerHTML = filterd[0].name
        
     
    }


getIdeViewData = async () => {
    // console.log("가져온 상세보기 댓글", this._commentModel.getCommentDetail(this._commentId))
    return  await this._commentModel.getCommentDetail(this._commentId)
}





    setIdeViewData =  async (data) =>{
        // console.log('data1',data)

        const {content,  category_name, created_at, deleted_at ,average_score, advantage_content, disadvantage_content, deleted_log } = data

       //타입
    //    this._view.getElement('#categoryType').innerHTML= category_type
    //    //ide이름
    //    this._view.getElement('#categoryName').innerHTML= category_name

        //작성일
        this._view.getElement('#createdAt').innerHTML= created_at
        //삭제일
        if(deleted_at === null){
            this._view.getElement('#deleteTitle').classList.add(`hidden`)
        }else{
            this._view.getElement('#deletedAt').innerHTML= deleted_at
        }
 
        this._view.getElement('#content').innerHTML = content

        // 작성자 관련 정보
        // 작성한 유저 닉네임, 이미지 url, 직종, 경력, 근무지역
        const { profile_nickname, profile_image_url, job_type, experience_years, working_area } = data

         //닉네임
         this._view.getElement('#nickname').innerHTML = profile_nickname
         // 작성자 정보 받아 올 때 없는 데이터 처리
         let userInfoArray = []
         if (job_type) userInfoArray.push(job_type)
         if (experience_years) userInfoArray.push(experience_years)
         if (working_area) userInfoArray.push(working_area)
 
         //작성자 관련 정보들을 하나의 배열로 연결 시키고 
         //데이터 사이 사이에 / 슬러시 추가
         //정보가 없으면 숨기기
         if (userInfoArray.length > 0) {
             let slash = userInfoArray.join(' / ')
            this._view.getElement('#writerUserInfo').innerHTML = `( ${slash} )`
         } else {
             this._view.getElement('#writerUserInfo').classList.add(`hidden`)
         }
         //
         this._view.getElement('#profileImageUrl').src = profile_image_url
        //  console.log("프로필사진", profile_image_url)

         //삭제로그
         //삭제한 기록이 있으면 보여주고 아니면 숨김
         if(deleted_log.length === 0){
            this._view.getElement('#deletedLogTitle').classList.add('hidden')
            this._view.getElement('#deletedLog').classList.add('hidden')
         }
         else{
            deleted_log.map((item) => {
            // console.log("item",item)
            const temp =    this._commentItem.getDeletedLogItem(item)

          

              //삭제버튼 누르면 해당index 삭제시킴
            temp[0].onclick = () => this.detailBtn(item)

                })
         }
 
}
//삭제이유상세보기
detailBtn = async (item) =>{
    //  console.log("item",item)
    const modal = this._dialog.createReportView(item)
    document.body.appendChild(modal[0])

   
     // 확인버튼
     modal[2].onclick = () => {
        document.body.removeChild(modal[0])
    }
    

   
 }
    
 
}
