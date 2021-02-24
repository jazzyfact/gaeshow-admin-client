import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'
import faqModel from '../Model/faqModel.js'
import faqItem from '../View/faqItem.js'

export default class faqEditController{
    constructor(myInfo,myGrade) {
        this._faqModel = new faqModel()
        this._signleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        this._faqItem = new faqItem()

         // 페이지 기본 데이터
         this._postId = utils().getParameterByName('n')
        //  console.log("인덱스번호",this._postId)
         this._faq = 'fnq'
 
         this._myInfo = myInfo
         this._myGrade = myGrade

         const faqCompleteBtn = this._view.getElement('#faqCompleteBtn')
         faqCompleteBtn.onclick = () =>  this.faqCompleteBtn()
        

         this.lifeCycle()
    }


    lifeCycle = async () => {
        await this.grade()
        //퀼 에디터 가져오기
        await this.setQuillEditor()
       //서버에서 상세보기 내용을 가져오고 난 후에 setData 실행
       await this.getFaq().then((e) => this.setFaqData(e)) 

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
   getFaq = async () => {
   
       const resData = await this._faqModel.getFaqDetail(this._postId)
       return resData
   }

   //가져온 데이터 넣어주기
   setFaqData = async (data) => {
      
    //    console.log("가져온데이터 넣기", data)
       const resData = await this._faqModel.getFaqDetail(this._postId,this._postId)
       // console.log(resData)
      
       this._view.getElement('#title').value = resData.title
       this._view.getElement('.ql-editor').innerHTML = resData.content
    //    console.log('콘텐트',resData.content)
   }


   setQuillEditor = async () => {
       //퀠에디터 도구모음
       var toolbarOptions = [
           ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
           ['blockquote', 'code-block'],
         
           [{ 'header': 1 }, { 'header': 2 }],               // custom button values
           [{ 'list': 'ordered'}, { 'list': 'bullet' }],
           [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
           [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
           [{ 'direction': 'rtl' }],                         // text direction
         
           [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
         
           [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
           [{ 'font': [] }],
           [{ 'align': [] }],
         
           ['clean']                                         // remove formatting button
         ];
   
       // 퀼 생성
       this._quill = new Quill('#editor', {
           modules: {
               toolbar: toolbarOptions
           },
           theme: 'snow',
           placeholder: '내용을 입력해주세요',
           height: '30rem'
       })
   }

   //수정 완료 버튼
   faqCompleteBtn = async () =>{
       console.log("수정완료버튼클릭")
       //제목, 내용 입력 값 가져오기
       const title = this._view.getElement('#title').value
       const content = this._view.getElement('.ql-editor').innerHTML
       this._postId//포스트id

       // console.log('수정한 title',title)
       // console.log('수정한 content',content)
       // console.log('수정한 값resData', this._postId)
       // console.log('카테고리',this._notice)

       if (!title) {
           this._utils.snackbar('제목을 입력해주세요')
           return
       }
       if (!this._utils.removeHTMLTag(content)) {
           this._utils.snackbar('내용을 작성해주세요')
           return
       }

       //입력한 데이터 넣기
       const resData = {title,content}
       await this._faqModel.editPost(resData,this._postId)
       // console.log('수정한 값resData',resData,this._postId)

       if (resData == null) {
           this._utils.snackbar('자주하는질문 수정을 실패 하였습니다.<br />잠시 뒤 다시 시도 해 주세요.')
           return
       }
       
       //글 작성 후 공지사항 목록 페이지 이동
       window.location.href = `/faq.html?n=${resData.post_id}`
   }

}