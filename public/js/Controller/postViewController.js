import categoryModel from '../Model/categoryModel.js'
import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import postModel from '../Model/postModel.js'
import Singleton from '../Core/Singleton/Singleton.js'
import postItem from '../View/postItem.js'
import dialog from '../View/dialog.js'

export default class postViewController{
    constructor(type,myGrade){

        this._postId = utils().getParameterByName('n')
        // console.log(this._postId)
     

        this._categoryModel = new categoryModel()
        this._postModel = new postModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        this._postItem = new postItem()

        this._myGrade = myGrade
        // console.log("내정보",myInfo.grade)
        // console.log("관리자등급 확인",myGrade)
        this._dialog = new dialog()

       


        this._categoryId =  this._view.getElement('#categoryTitle')

        this._createSpan = this._view.getElement('#createSpan')//작성된 날짜 타이틀
        this._createAt = this._view.getElement('#createAt')//작성된 날짜

        this._deleteSpan = this._view.getElement('#deleteSpan')//삭제된 날짜 타이틀
        this._deleteAt = this._view.getElement('#deletedAt')//삭제된 날짜
       
     

        this.lifeCycle()

    }
    
    lifeCycle = async () => {
        await this.grade()
        //게시물 상세정보 가져오기 
        await this.getPostViewData().then((e) => this.setPostData(e))
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



    getPostViewData = async () => {
        // console.log("가져온 상세보기 글", this._postModel.getPostDetail(this._postId))
        return await this._postModel.getPostDetail(this._postId)
    }

    setPostData = (data) => {
        if (!data) return
       
        // 제목, 날짜, 조회수, 공유횟수 입력 , 좋아요, 북마크 개수
        const {category_id, post_id, title, created_at, deleted_at , view_count, share_count, liked, bookmark_count,  thumbnail,deleted_log } = data
        this._postId = post_id

        this._view.getElement('#title').innerHTML = title
        this._view.getElement('#viewCount').innerHTML = view_count
        this._view.getElement('#sharedCount').innerHTML = share_count
        this._view.getElement('#liked').innerHTML = liked
        this._view.getElement('#bookmarkCount').innerHTML = bookmark_count


        //카테고리 타이틀
        switch(category_id){
                case 3:
                    this._categoryId.innerHTML ="회사욕하기"
                    break
                case 8:
                    this._categoryId.innerHTML ="자기작업물자랑"
                    break
                case 2:
                    this._categoryId.innerHTML ="업무얘기공유"
                    break
                case 5:
                    this._categoryId.innerHTML ="워크스페이스공유"
                    // console.log("워크스페이스 카테고리", this._categoryId )
                    break
                case 4:
                    this._categoryId.innerHTML ="프리랜서팁공유"
                    break
            }


        //작성일
        this._createSpan.innerHTML = "작성일"
        this._createAt.innerHTML  = created_at

       
        //삭제일이 없다면 보여주지 않기
        if(deleted_at !== null){
           
            this._deleteAt.innerHTML  = deleted_at
            this._deleteSpan.innerHTML = "삭제일"
            this._deleteAt.hidden = false
            this._deleteSpan.hidden = false
            // console.log("삭제일",this._deleteAt.innerHTML  = deleted_at)
        }
        else{
            // this._deleteAt.innerHTML  = deleted_at
            this._deleteAt.hidden = true
            this._deleteSpan.hidden = true

        }


        // 워크스페이스 에서만 작동하는 썸네일 등록
        if (category_id == 5) {
            const thumbView = this._view.getElement('#selectedImg')
            thumbView.src = thumbnail
            thumbView.alt = `개쇼 워크스페이스 이미지`
        }

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
        // 포스트 내용
        const { content } = data
        // 퀼 적용
        // 퀼 생성
        this._quill = new Quill('#content', {
            modules: {
                toolbar: false
            },
            theme: 'snow',
            height: '30rem',
            readOnly: true
        })
        //게시물 내용
        const contentView = this._view.getElement('.ql-editor')
        contentView.innerHTML = content
        // 태그
        const { tags } = data
        const tagsWrapper = this._view.getElement('#tagsWrapper')
        const imgView = this._view.getElement('#imgView')
        
        let tagColor 
        //2 : 업무 3: 회사욕 4: 프리랜서 5 : 워크 8 :자기작업
        if (category_id == 2) tagColor = `red--bg`
        if (category_id == 3) tagColor = `yellow--bg`
        if (category_id == 4) tagColor = `orange--bg`
        if (category_id == 5) tagColor = `gray--border`

        //태그 데이터 넣어주기
        tags.map((item) => {
            const temp = this._postItem.createTagItem(item, tagColor)
            tagsWrapper.appendChild(temp)
            //  워크스페이스 태그 작업
            if (category_id == 5) {
                const worksapceAddInfo = this._postItem.createProductTitleInfo(item)
                imgView.appendChild(worksapceAddInfo[0])
                //마우스 포인터가 와야지만 실행
                temp.onmouseenter = () => {
                    worksapceAddInfo[1].classList.remove('hidden')
                }
                //마우스 포인터가 밖으로 나갔을 때
                temp.onmouseleave = () => {
                    worksapceAddInfo[1].classList.add('hidden')
                }
            }
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
            const temp =    this._postItem.getDeletedLogItem(item)

          

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