import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import usersModel from '../Model/usersModel.js'
import Singleton from '../Core/Singleton/Singleton.js'
import postItem from '../View/postItem.js'
import dialog from '../View/dialog.js'
import usersItem from '../View/usersItem.js'


export default class removeUserViewController{
    constructor(type,myGrade){
        this._usersModel = new usersModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()
        this._postItem = new postItem()

        this._usersItem = new usersItem()
        this._myGrade = myGrade
        this._dialog = new dialog()

          // 페이지 기본 데이터
          this._userIndex
          this._nowPage = utils().getParameterByName('p') ? utils().getParameterByName('p') : 1
          this._limit = 10

          this._userId = utils().getParameterByName('n')
        //   console.log('회원 인덱스',this._userId)



          this._id = this._view.getElement(`#id`)
          this._name = this._view.getElement(`#name`)

          this._birthday = this._view.getElement(`#birthday`)
          this._job = this._view.getElement('#jobType')
          this._jobFiled = this._view.getElement('#jobField')
          this._gender = this._view.getElement('#gender')
          
          

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
        const resData =  await this._usersModel.getReomveUserDetail(this._userId)
        //    console.log("가져온 광고 데이터", this._usersModel.getReomveUserDetail(this._userId))
           return resData
       }
       
       setData = async (data) =>{
        // console.log('data1',data)


        const {user_id,registered_type,profile_image_url,profile_nickname,profile_birthday, profile_email, job_type, job_field,profile_gender,deleted_log} =data
        //로그인타입, 아이디, 닉네임, 프로필 이미지, 생일,성별
        this._view.getElement('#registeredType').innerHTML =  registered_type
        this._view.getElement('#id').innerHTML =  profile_email
        this._view.getElement('#name').innerHTML = profile_nickname
        this._view.getElement('#profileImg').src = profile_image_url
        this._view.getElement('#birthday').innerHTML = profile_birthday
        this._view.getElement('#gender').innerHTML = profile_gender
        //직종,업무분야
        this._view.getElement('#jobType').innerHTML = job_type//직종
        this._view.getElement('#jobField').innerHTML =job_field//분야

        const{experience_years,working_area, working_area_detail, basic_salary , longevity} = data
         //경력,근무지역, 구, 연봉, 근속년수
        this._experienceYears = this._view.getElement('#experienceYears').innerHTML = experience_years
        this._workingArea=  this._view.getElement('#workingArea').innerHTML = working_area
        this._workingAreaDetail =this._view.getElement('#workingAreaDetail').innerHTML = working_area_detail
        this._basicSalary = this._view.getElement('#basicSalary').innerHTML = basic_salary
        this._longevity = this._view.getElement('#longevity').innerHTML = longevity


        this._userId = user_id

        // console.log('profile_image_url',profile_image_url)




        const {push_status,github_url, portfolio_url, is_information_open, ides, languages} = data
        //사용하는 언어,ide 툴
        // this._languages = this._view.getElement('#languages')
        // this._ides = this._view.getElement('#ides')

        //포트폴리오, 깃허브 주소
        this._git = this._view.getElement('#git').innerHTML = github_url
        this._portfolioUrl = this._view.getElement('#portfolioUrl').innerHTML = portfolio_url

        //개인정보, 광고 수신동의
        this._pushStatus = this._view.getElement('#pushStatus').innerHTML = push_status
        this._info = this._view.getElement('#info').innerHTML = is_information_open

        //가입일, 탈퇴일, 강퇴시킨 관리자
        const {created_at,deleted_at, deleted_admin,affiliated} = data
          
        this._affiliated = this._view.getElement('#affiliated').innerHTML =affiliated
        this._createdAt = this._view.getElement('#createdAt').innerHTML = created_at
        this._deletedAt = this._view.getElement('#deletedAt').innerHTML = deleted_at


        

        //삭제한 관리자가 없을때 숨기고
        if(deleted_admin === undefined){

            this._deletedAdmin = this._view.getElement('#deletedAdmin').classList.add('hidden')
        }else{
            this._deletedAdmin = this._view.getElement('#deletedAdmin').innerHTML = deleted_admin
        }
       
        const idesView = this._view.getElement('#languages')
        const lanView = this._view.getElement('#ides')
         //ide 태그 데이터 넣어주기
         ides.map((item) => {
          
            const temp = document.createElement('p')
            temp.classList.add('mypage__edit--subbox--item')
            temp.innerHTML = item.name
            idesView.appendChild(temp)
            
        })
        //언어 태그
        languages.map((item) => {
        
            const temp = document.createElement('p')
            temp.classList.add('mypage__edit--subbox--item')
            temp.innerHTML = item.name
            lanView.appendChild(temp)
            
        })




        //삭제로그
         //삭제한 기록이 있으면 보여주고 아니면 숨김
         if(deleted_log.length === 0){
            this._view.getElement('#deletedLogTitle').classList.add('hidden')
            this._view.getElement('#deletedLog').classList.add('hidden')
         }
         else{
            deleted_log.map((item) => {
            // console.log("item",item)
            const temp =    this._usersItem.getDeletedLogItem(item)

          

              //상세보기
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

        //제휴
       affiliatedAddBtn = async () =>{
        let reqData = {
            user_id : this._userId
        }
        // console.log("reqData",reqData)
    
    
        let resData
        // resData = await this._usersModel.addAffiliated(this._userId)
        // console.log("resData",resData)
    
    
        
      

        const dialog = window.confirm(`제휴업체로 등록 하시겠습니까?!!`)
        if(dialog){
            // console.log('클릭')
            resData = await this._usersModel.addAffiliated(this._userId)
                // console.log('회원강퇴 res', userId)
            utils().snackbar('제휴업체로 등록 되었습니다')
            window.location.href = `/user__view.html?n=${this._userId}`

            if (!resData) {
                utils().snackbar('제휴업체 등록 실패 했습니다. 다시 시도해주세요.')
                return
            }
        }
        else {
            utils().snackbar('취소 하였습니다')
            window.location.href = `/user__view.html?n=${this._userId}`
        }

       }


}