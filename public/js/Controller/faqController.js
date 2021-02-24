import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'
import faqModel from '../Model/faqModel.js'
import faqItem from '../View/faqItem.js'


//검색필터
const CONTENT = 'content'
const NICKNAME = 'nickname'

//기본 URL주소
const ORIGINAL = '/faq.html'

export default class faqController{

    constructor(myGrade,type) {

        this._faqModel = new faqModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        this._faqItem = new faqItem()

          // 페이지 기본 데이터
          this._noticeIndex
          this._nowPage = utils().getParameterByName('p') ? utils().getParameterByName('p') : 1
          this._limit = 10
          this._fnq = 'fnq'

          this._type = type
        //   console.log('타입',type.grade)
          
          this._myGrade = myGrade
          // console.log("내정보",myInfo.grade)
        //   console.log("관리자등급 확인",myGrade)

          // 서버 리턴 데이터
          this._resData

         //검색
         this._searchBtn = this._view.getElement('#search')
         this._searchSelector = this._view.getElement('#searchType')
         this._searchInput = this._view.getElement('#searchText')
         //검색실행
         this._searchBtn.onclick = () => this.getSearch()

        //엔터로 검색
        this._searchInput.onkeypress = (e) => this.getEnterSearch(e)

        //  const logoutBtn = this._view.getElement('#logoutBtn')
        //  logoutBtn.onclick = () => this.logoutUser()


          this.lifeCycle()
    }

    lifeCycle = async () => {
        await this.grade()
        await this.getData().then((e) => this.setPagination(e))
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




     //자주하는질문 목록 가져오기
     getData = async ()=>{
        const reqData = this._faqModel._oriReqData
       
        // 필수 데이터 넣기
        reqData.page = this._nowPage
        reqData.limit = this._limit
        reqData.category_type = this._fnq
        // console.log( "카테고리타입",reqData.category_type)


      //검색
      const type = utils().getParameterByName('t')
      if (type) {
          switch (type) {
              case 'c':
                  reqData.search_type = 'content'
                  break
              case 'n':
                  reqData.search_type = 'nickname'
                  break
          }
          this._searchSelector.value = reqData.search_type
      }

      const searchText = utils().getParameterByName('s')
      // 검색어
      if (searchText) {
          if (type === 't') {
              reqData.search_word = `["${searchText}"]`
          } else {
              reqData.search_word = searchText
          }
          this._searchInput.value = searchText
      }


          //받아온 자주하는질문 정보
          const resData = await this._faqModel.getFaq(reqData)
        //   console.log("받아온 자주하는질문 목록",resData)
  
          //받아온 자주하는질문 정보를 넣어줌
          this._resData = resData
          this.setFaqItem()
        
         
    }

    setFaqItem = async () => {

                //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
      const cell = this._view.getElement('#faqTableSection')
      while (cell.hasChildNodes()) {
      cell.removeChild(cell.firstChild)
  } 

  if(this._resData.notice_count === 0 ){
    const item = this._faqItem.createEmptyListItem()
    cell.appendChild(item)

    //검색데이터 없을 때 페이징 없애기
    const pageWrapper = this._view.getElement('#pagingData')
    while (pageWrapper.hasChildNodes()) {
        pageWrapper.removeChild(pageWrapper.firstChild)
    }
    }  
    else{
       //서버에서 받은 배열 넣기
       this._resData.notices.map((item) => {
        // console.log("item",item)
        const temp =      this._faqItem.getFaqItem(item)
          //삭제버튼 누르면 해당index 삭제시킴
        temp[0].onclick = () => this.deleteBtn(item.id)
    // console.log('temp',temp[0])
       
    })
    }
   
    }
 //강퇴버튼 실행
 deleteBtn = async (id) =>{

    const dialog = window.confirm(`정말로 삭제하시겠습니까?!!`)
    if(dialog){
        // console.log('클릭')
            await this._faqModel.deletePost(id)
            // console.log('회원강퇴 res', userId)
        utils().snackbar('자주하는질문이 삭제되었습니다')
        window.location.href = `/faq.html?p=${this._nowPage}`
    }
    else {
        utils().snackbar('자주하는질문이 삭제를 취소 하였습니다')
        window.location.href = `/faq.html?p=${this._nowPage}`
    }
   
 }


     //페이징
     setPagination = async () => {
        if (this._resData.notice_count <= this._limit) return
        const paginationView = await import('../View/pagination.js')
        let paginationRepo = new paginationView.default(this._resData.notice_count, this._nowPage, this._limit)
        const paginationItem = paginationRepo.getFaqPaging()

        const pageWrapper = this._view.getElement('.body__item--paging')
        pageWrapper.appendChild(paginationItem)
    }

       //검색시작
getEnterSearch = async (e) => {
    let type = this._searchSelector.value
    const text = this._searchInput.value



    const search_type = utils().getParameterByName('t')



    if(e.key == 'Enter'){
       
    //일반필터 선택되게
   
   
    

    for (let i = 0; i < this._searchSelector.options.length; i++) {
       if (this._searchSelector.options[i].value == search_type) {
           this._searchSelector.options[i].selected = true
        //    console.log("셀렉트옵션 search_type",  search_type )   
       }
   }

   

   switch (type) {
    case CONTENT:
        type = 'c'
        break
   case NICKNAME:
       type = 'n'
       break
   }
     


     
   //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
   const cell = this._view.getElement('#faqTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.notice_count === 0 ){
       const item = this._faqItem.createEmptyListItem()
       cell.appendChild(item)

        //검색데이터 없을 때 페이징 없애기
        const pageWrapper = this._view.getElement('#pagingData')
        while (pageWrapper.hasChildNodes()) {
            pageWrapper.removeChild(pageWrapper.firstChild)
        }
   }   


   //url주소창에 검색어 표시
   // window.location.href = `${ORIGINAL}?t=${type}&s=${text}`

   if (this._searchSelector.value =='blank' || this._searchInput.value == '') {
    const dialog = window.confirm(`검색필터와 검색어를 확인해주세요`)
    if(dialog){
     
      //수정후 페이지 이동
       window.location.href = `/faq.html`
    }
    else{
     window.location.href = `/faq.html`
    }
}
else{
 if(type != ''){
     window.location.href = `/faq.html?t=${type}&s=${text}`
 }
 else{
     window.location.href = `/faq.html?t=${type}&s=${text}`
 }
}
    }
}



getSearch = async () => {
    let type = this._searchSelector.value
    const text = this._searchInput.value


    const search_type = utils().getParameterByName('t')



       

    for (let i = 0; i < this._searchSelector.options.length; i++) {
       if (this._searchSelector.options[i].value == search_type) {
           this._searchSelector.options[i].selected = true
        //    console.log("셀렉트옵션 search_type",  search_type )   
       }
   }

   

   switch (type) {
    case CONTENT:
        type = 'c'
        break
   case NICKNAME:
       type = 'n'
       break
   }
     
   
   //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
   const cell = this._view.getElement('#faqTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.notice_count === 0 ){
       const item = this._faqItem.createEmptyListItem()
       cell.appendChild(item)

        //검색데이터 없을 때 페이징 없애기
        const pageWrapper = this._view.getElement('#pagingData')
        while (pageWrapper.hasChildNodes()) {
            pageWrapper.removeChild(pageWrapper.firstChild)
        }
   }   


   //url주소창에 검색어 표시
   // window.location.href = `${ORIGINAL}?t=${type}&s=${text}`

   if (this._searchSelector.value =='blank' || this._searchInput.value == '') {
    const dialog = window.confirm(`검색필터와 검색어를 확인해주세요`)
    if(dialog){
     
      //수정후 페이지 이동
       window.location.href = `/faq.html`
    }
    else{
     window.location.href = `/faq.html`
    }
}
else{
 if(type != ''){
     window.location.href = `/faq.html?t=${type}&s=${text}`
 }
 else{
     window.location.href = `/faq.html?t=${type}&s=${text}`
 }
}
    }
}