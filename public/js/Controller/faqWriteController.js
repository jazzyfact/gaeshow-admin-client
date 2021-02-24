import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'
import faqModel from '../Model/faqModel.js'

export default class faqWriteController {
    constructor(myInfo, myGrade){
       
        this._faqModel = new faqModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        //카테고리타입
        this._fnq = 'fnq'

        this._myGrade = myGrade
        // console.log("관리자등급 확인",myGrade.grade)
       
        this.lifeCycle()
    }

    lifeCycle = async () => {
        await this.grade()
        // console.log('faq글쓰기')
        //퀼 에디터 가져오기
        await this.setQuillEditor()
        //자주하는질문 글쓰기 등록버튼
        this._faqCompleteBtn = this._view.getElement('#faqCompleteBtn')
        this._faqCompleteBtn.onclick = () => this.fnqCompleteBtn()
        
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
    fnqCompleteBtn = async () =>{
        //제목, 내용 입력 값 가져오기
        const title = this._view.getElement('#title').value
        const content = this._view.getElement('.ql-editor').innerHTML
        this._categoty_id =    this._fnq

        console.log('title',  title)
        console.log('content',  content)
        console.log('_categoty_id',  this._fnq)

        if (!title) {
            this._utils.snackbar('공지사항 제목을 입력해주세요')
            return
        }
        if (!this._utils.removeHTMLTag(content)) {
            this._utils.snackbar('공지사항 내용을 작성해주세요')
            return
        }

        //입력한 데이터 넣기
        const resData = await this._faqModel.postFaq(title, content, this._fnq)
        console.log('resData',resData)

        if (!resData) {
            this._utils.snackbar('자주하는질문 등록을 실패 하였습니다.<br />잠시 뒤 다시 시도 해 주세요.')
            return
        }
        if (!resData.post_id) {
            this._utils.snackbar('자주하는질문 등록을 실패 하였습니다.<br />잠시 뒤 다시 시도 해 주세요.')
            return
        }
        //글 작성 후 자주하는질문 목록 페이지 이동
        window.location.href = `/faq.html?n=${resData.post_id}`
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

}