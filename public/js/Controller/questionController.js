import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'
import questionModel from '../Model/questionModel.js'
import questionItem from '../View/questionItem.js'
import usersModel from '../Model/usersModel.js'



//검색필터
const CONTENT = 'content'
const NICKNAME = 'nickname'


//기본 URL주소
const ORIGINAL = '/question.html'




export default class questionController{

    constructor(type,myGrade) {
        // console.log("타입")
        this._questionModel = new questionModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        this._questionItem = new questionItem()
        this._usersModel = new usersModel()

     

        // 페이지 기본 데이터
        this._questionIndex
        this._nowPage = utils().getParameterByName('p') ? utils().getParameterByName('p') : 1
        this._limit = 10
        this._inquire = 'inquire'

        // 서버 리턴 데이터
        this._resData

      
        this._myGrade = myGrade
      
        // console.log("관리자등급 확인",myGrade.grade)

        this._pageFilterIndex = utils().getParameterByName('filter') ? utils().getParameterByName('filter') : 'all'
        this._pageTypeFilterIndex = utils().getParameterByName('service_type') ? utils().getParameterByName('service_type') : 'all'

        this.selectedIndex
        // 검색
        this._searchWord = utils().getParameterByName('s') ? utils().getParameterByName('s') : null
        this._searchSelector = utils().getParameterByName('t') ? utils().getParameterByName('t') : null

        //문의타입
        this._serviceSelector = this._view.getElement('#serviceType')
        // this._serviceType.onchange = () => this.loadData()

        //일반 필터
        this._filterSelect = this._view.getElement('#filterSelect')
        // this._filterSelect.onchange = () => this.loadData()
        //검색
        this._searchSelector = this._view.getElement('#searchType')
        this._searchInput = this._view.getElement('#searchText')
        this._searchBtn = this._view.getElement('#searchBtn')
        this._searchBtn.onclick = () => this.getSearch()

        // const logoutBtn = this._view.getElement('#logoutBtn')
        // logoutBtn.onclick = () => this.logoutUser()
       
        //엔터키누르면 검색시작
        //this._searchInput.onkeypress = () => this.getData()
        this._searchInput.onkeypress = (e) => this.getEnterSearch(e)

        

        this.lifeCycle()
    }

    lifeCycle = async () => {
        await this.grade()
        await this.getData()
        //문의필터선택
        this._view.getElement('#serviceType').onchange = () => this.filterChangeEvent()

        //일반필터선택
        this._view.getElement('#filterSelect').onchange = () => this.filterChangeEvent()

    //    await  this.enterkey()
    
        
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



     //문의하기 목록 가져오기
     getData = async ()=>{
        const reqData = {}
       
        // 필수 데이터 넣기
        reqData.page = this._nowPage
        reqData.limit = this._limit
        reqData.service_category =  this._inquire
        // console.log( "카테고리타입",reqData.service_category)

        


        const service_type = this._questionItem.getParameterByName('service_type')
        const filter = this._questionItem.getParameterByName('filter')
        const searchType = this._questionItem.getParameterByName('search_type')
        const searchWord = this._questionItem.getParameterByName('search_word')

        //문의필터 선택되게
        if (service_type && service_type != 'default') reqData.service_type = service_type
        for (let i = 0; i < this._filterSelect.options.length; i++) {
            if (this._serviceSelector.options[i].value == service_type) {
                this._serviceSelector.options[i].selected = true
                // console.log("셀렉트옵션",  reqData.service_type )   
            }
        }

        //일반필터 선택되게
        if (filter && filter != 'default') reqData.filter = filter
        for (let i = 0; i < this._filterSelect.options.length; i++) {
            if (this._filterSelect.options[i].value == filter) {
                this._filterSelect.options[i].selected = true
                // console.log("셀렉트옵션",  reqData.filter )   
            }
        }
        //

        if(this._searchSelector.value == 'blank'){
            // console.log("필터값222", this._searchType.value)
        }
        else{
            reqData.search_type = this._searchSelector.value
            reqData.search_word = this._searchInput.value
            // if( this._filterSelect.value != 'default') location.href= `/remove__user.html?search_type=${this._searchType.value}&search_type=${ this._searchText.value}`
            // location.href= `/remove__user.html?filter=${filter}search_type=${this._searchType.value}&search_type=${ this._searchText.value}`
            // console.log("입력한서치", this._searchInput.value)
            // console.log("서치타입",this._searchSelector.value)
            // location.href= `/remove__user.html?search_type=${this._searchType.value}&search_word=${this._searchText.value}`
        }

        // console.log("서치",searchWord)
        // console.log("filter",filter)
        // console.log("보낸유저!!!!!!!!!!!!!!",reqData)
        // console.log("선택한필터",this._filterSelect.value)
        //  console.log("typefilter",service_type)
        //  console.log("filter",filter)

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

        //받아온 공지사항 정보
        const resData = await this._questionModel.getQuestion(reqData)
        // console.log("받아온 문의 목록",resData)
        // console.log("보낸 문의 목록",reqData)
  
        //받아온 공지사항 정보를 넣어줌
        this._resData = resData

        //문의타입 필터, 일반 필터 값을 넣어줌
        this.setQuestion(service_type, filter)
    }


   

    setQuestion = async (typefilter, filter) => {
        // console.log("받아온데이터 setQuestion data",data)
        // console.log("받아온데이터 setQuestion typefilter",typefilter)
        // console.log("받아온데이터 setQuestion filter",filter)
        
          //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
          const cell = this._view.getElement('#questionTableSection')
          while (cell.hasChildNodes()) {
          cell.removeChild(cell.firstChild)
      }
      
      if(this._resData.inquire_count === 0 ){
        const item = this._questionItem.createEmptyListItem()
        cell.appendChild(item)

        //검색데이터 없을 때 페이징 없애기
        const pageWrapper = this._view.getElement('#pagingData')
        while (pageWrapper.hasChildNodes()) {
            pageWrapper.removeChild(pageWrapper.firstChild)
        }
    } 
    else{
        //서버에서 받은 배열 넣기
        this._resData.inquires.map((item) => {
        // console.log("item",item)
        this._questionItem.getQuestionItem(item)
        //버튼 누르면 해당index 삭제시킴
   
        // console.log('temp',temp[0])
        })
        this.setPagination(typefilter, filter)
    }
       
    }

    
   




    //페이징
    setPagination = async (typefilter, filter) => {
        // console.log("직힘",typefilter, filter)
        const pageWrapper = this._view.getElement('#pagingData')
 
        while (pageWrapper.hasChildNodes()) {
            pageWrapper.removeChild(pageWrapper.firstChild)
    }
        if (this._resData.inquire_count <= this._limit) return

        const paginationView = await import('../View/pagination.js')
        let paginationRepo = new paginationView.default(this._resData.inquire_count, this._nowPage, this._limit)
        const paginationItem = paginationRepo.getQuestionPaging(typefilter, filter)

     
        pageWrapper.appendChild(paginationItem)
    }

   

    //일반필터선택
    filterChangeEvent = async () => {
        this._pageFilterIndex = this._view.getElement('#filterSelect').value
        this._pageTypeFilterIndex = this._view.getElement('#serviceType').value
       
        //문의타입필터랑 전체필터가 있다면 밑에 url주소 넘김
        if(this._pageFilterIndex != '' && this._pageTypeFilterIndex != '')  window.location.href = `/question.html?service_type=${this._pageTypeFilterIndex}&filter=${this._pageFilterIndex}`
    }

    getSearch = async () => {
        let type = this._searchSelector.value
    const text = this._searchInput.value

    const service_type = utils().getParameterByName('service_type')
    const filter = utils().getParameterByName('filter')
    const search_type = utils().getParameterByName('t')



       
       //문의필터 선택되게
    
     for (let i = 0; i < this._serviceSelector.options.length; i++) {
        if (this._serviceSelector.options[i].value == service_type) {
            this._serviceSelector.options[i].selected = true
            // console.log("셀렉트옵션", service_type )   
            // console.log("셀렉트옵션 this._serviceSelector.options[i].value", this._categorySelector.options[i].value )   
        }
    }

    //일반필터 선택되게
   
    for (let i = 0; i < this._filterSelect.options.length; i++) {
        if (this._filterSelect.options[i].value == filter) {
            this._filterSelect.options[i].selected = true
            // console.log("셀렉트옵션",  filter )   
        }
    }

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
   const cell = this._view.getElement('#questionTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.inquire_count === 0 ){
       const item = this._questionItem.createEmptyListItem()
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
       window.location.href = `/question.html`
    }
    else{
     window.location.href = `/question.html`
    }
}
else{
 if(service_type != '' && filter != ''){
     window.location.href = `/question.html?service_type=${service_type}&filter=${filter}&t=${type}&s=${text}`
 }
 else{
     window.location.href = `/question.html?t=${type}&s=${text}`
 }
}

} 
    

















    //검색시작
 getEnterSearch = async (e) => {
    let type = this._searchSelector.value
    const text = this._searchInput.value

    const service_type = utils().getParameterByName('service_type')
    const filter = utils().getParameterByName('filter')
    const search_type = utils().getParameterByName('t')

    


    if(e.key == 'Enter'){
       
       //문의필터 선택되게
    
     for (let i = 0; i < this._serviceSelector.options.length; i++) {
        if (this._serviceSelector.options[i].value == service_type) {
            this._serviceSelector.options[i].selected = true
        //     console.log("셀렉트옵션", service_type )   
        //     console.log("셀렉트옵션 this._serviceSelector.options[i].value", this._categorySelector.options[i].value )   
        // }
    }

    //일반필터 선택되게
   
    for (let i = 0; i < this._filterSelect.options.length; i++) {
        if (this._filterSelect.options[i].value == filter) {
            this._filterSelect.options[i].selected = true
            // console.log("셀렉트옵션",  filter )   
        }
    }

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
   const cell = this._view.getElement('#questionTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.inquire_count === 0 ){
       const item = this._questionItem.createEmptyListItem()
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
       window.location.href = `/question.html`
    }
    else{
     window.location.href = `/question.html`
    }
}
else{
 if(service_type != '' && filter != ''){
     window.location.href = `/question.html?service_type=${service_type}&filter=${filter}&t=${type}&s=${text}`
 }
 else{
     window.location.href = `/question.html?t=${type}&s=${text}`
 }
}
}
}






}

}