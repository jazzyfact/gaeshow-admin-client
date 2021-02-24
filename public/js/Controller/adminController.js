
import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import usersModel from '../Model/usersModel.js'
import Singleton from '../Core/Singleton/Singleton.js'
import adminsItem from '../View/adminsItem.js'


//검색필터
const NAME = 'name' 
const NICKNAME ='nickname' 
const PROFILEID ='profileId'



//기본 URL주소
const ORIGINAL = '/remove__user.html'

export default class adminController{
    constructor(myInfo,myGrade){
    this._usersModel = new usersModel()
    this._singleton = new Singleton()
    this._utils = new utils()
    this._view = new View()

    this._adminsItem = new adminsItem()
    // 페이지 구분
    // this._type = type
    // 페이지 기본 데이터
    this._userIndex
    this._nowPage = utils().getParameterByName('p') ? utils().getParameterByName('p') : 1
    this._limit = 10
    // 서버 리턴 데이터
    this._resData


    
    this._myGrade = myGrade
    // console.log("내정보",myInfo.grade)
    // console.log("관리자등급 확인",myGrade)

    this._pageFilterIndex = utils().getParameterByName('filter') ? utils().getParameterByName('filter') : 'all'
       

    this.selectedIndex
    // 검색
    this._searchWord = utils().getParameterByName('s') ? utils().getParameterByName('s') : null
    this._searchSelector = utils().getParameterByName('t') ? utils().getParameterByName('t') : null
   
     //일반 필터
    this._filterSelect = this._view.getElement('#filterSelect')
    // this._filterSelect.onchange = () => this.loadData()
     //검색
    this._searchSelector = this._view.getElement('#searchTypeSelect')
    this._searchInput = this._view.getElement('#searchText')
    this._searchBtn = this._view.getElement('#searchBtn')   
    this._searchBtn.onclick = () => this.getSearch()

   
    //엔터로 검색
    this._searchInput.onkeypress = (e) => this.getEnterSearch(e)   

    this.lifeCycle()

    }


    lifeCycle = async () => {
        await this.grade()
        await this.getData()

        
       //필터선택
    this._view.getElement('#filterSelect').onchange = () => this.filterChangeEvent()
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


   
    
     //관리자 목록 가져오기
     getData = async () => {
      
        const reqData = {}
        // console.log("받아온 관리자",reqData)
        // 필수 데이터 넣기
        reqData.page = this._nowPage
        reqData.limit = this._limit
        

        const filter = this._adminsItem.getParameterByName('filter')
        const searchType = this._adminsItem.getParameterByName('search_type')
        const searchWord = this._adminsItem.getParameterByName('search_word')
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
        }

                          //검색
                          const type = utils().getParameterByName('t')
                          if (type) {
                              switch (type) {
                                case 'n':
                                    reqData.search_type = 'name'
                                    break
                                  case 'p':
                                    reqData.search_type = 'profileId'
                                    break
                                  case 'ni':
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

        
         //받아온유저정보
         const resData = await this._usersModel.getAdmin(reqData)
        //  console.log("받아온 관리자",resData)
 
         //받아온 회원 정보를 넣어줌
         this._resData = resData
        //  await this._adminsItem.loadAdmin(resData)
        this.setReportItem(this._filterSelect.value, this._searchSelector.value, this._searchInput.value)
        // this.deleteBtn()
    }

    setReportItem = async (data) => {

        //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
        const cell = this._view.getElement('#adminTableSection')
        while (cell.hasChildNodes()) {
        cell.removeChild(cell.firstChild)
    }



    if(this._resData.user_count === 0 ){
        const item = this._adminsItem.createEmptyListItem()
        cell.appendChild(item)

         //검색데이터 없을 때 페이징 없애기
         const pageWrapper = this._view.getElement('#pagingData')
         while (pageWrapper.hasChildNodes()) {
             pageWrapper.removeChild(pageWrapper.firstChild)
         }
    }   
    else{
         //서버에서 받은 배열 넣기
         this._resData.users.map((item) => {
            // console.log("item",item)
            const temp =   this._adminsItem.getAdmin(item)
    
            //총괄책임자만 강퇴를 할 수 있음
            //강퇴버튼 
            //강퇴버튼 누르면 해당유저index 삭제시킴
            temp[0].onclick = () => this.deleteBtn(item.id)
            // console.log('temp',temp[0])
            //복구버튼 
            temp[1].onclick = () => this.recoverBtn(item.id)
             })

        this.setPagination(data)
    }

    }

    //강퇴버튼 실행
    deleteBtn = async (userId) =>{

        const dialog = window.confirm(`정말로 삭제하시겠습니까?!!`)
        if(dialog){
            // console.log('클릭')
                await this._usersModel.deleteAdmin(userId)
                // console.log('회원강퇴 res', userId)
            utils().snackbar('관리자가 삭제되었습니다')
            window.location.href = `/admin__list.html?p=${this._nowPage}`
        }
        else {
            utils().snackbar('관리자 삭제를 취소 하였습니다')
            window.location.href = `/admin__list.html?p=${this._nowPage}`
        }
       
     }

//복구 실행
recoverBtn = async (userId) =>{

    const dialog = window.confirm(`관리자를 복구 하시겠습니까?!!`)
    if(dialog){
        // console.log('클릭')
            await this._usersModel.recoverAdmin(userId)
     
        utils().snackbar('복구되었습니다')
        window.location.href = `/admin__list.html?p=${this._nowPage}`
    }
    else {
        utils().snackbar('취소 하였습니다')
        window.location.href = `/admin__list.html?p=${this._nowPage}`
    }
   
 }





//페이징
setPagination = async (data) => {


    const pageWrapper = this._view.getElement('#pagingData')
    // const paging = this._view.getElement('#pagingData')
    while (pageWrapper.hasChildNodes()) {
        pageWrapper.removeChild(pageWrapper.firstChild)
}

    if (this._resData.user_count <= this._limit) return
    const paginationView = await import('../View/pagination.js')
    let paginationRepo = new paginationView.default(this._resData.user_count, this._nowPage, this._limit)
    const paginationItem = paginationRepo.getAdminPaging(data)

    // const pageWrapper = this._view.getElement('.body__item--paging')
    pageWrapper.appendChild(paginationItem)
}

filterChangeEvent = async () => {
    this._pageFilterIndex = this._view.getElement('#filterSelect').value
    window.location.href = `/admin__list.html?filter=${this._pageFilterIndex}`
}



//검색시작
getEnterSearch = async (e) => {
    let type = this._searchSelector.value
    const text = this._searchInput.value


    const filter = utils().getParameterByName('filter')
    const search_type = utils().getParameterByName('t')



    if(e.key == 'Enter'){
       
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
    case NAME:
        type = 'n'
        break
    case PROFILEID:
        type = 'p'
        break
   case NICKNAME:
       type = 'ni'
       break
   }

     
   //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
   const cell = this._view.getElement('#adminTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.user_count === 0 ){
       const item = this._adminsItem.createEmptyListItem()
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
       window.location.href = `/admin__list.html`
    }
    else{
     window.location.href = `/admin__list.html`
    }
}
else{
 if(filter != ''){
     window.location.href = `/admin__list.html?filter=${filter}&t=${type}&s=${text}`
 }
 else{
     window.location.href = `/admin__list.html?t=${type}&s=${text}`
 }
}
    }
}



getSearch = async () => {
    let type = this._searchSelector.value
    const text = this._searchInput.value


    const filter = utils().getParameterByName('filter')
    const search_type = utils().getParameterByName('t')



       
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
    case NAME:
        type = 'n'
        break
    case PROFILEID:
        type = 'p'
        break
   case NICKNAME:
       type = 'ni'
       break
   }
     
   //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
   const cell = this._view.getElement('#adminTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.user_count === 0 ){
       const item = this._adminsItem.createEmptyListItem()
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
       window.location.href = `/admin__list.html`
    }
    else{
     window.location.href = `/admin__list.html`
    }
}
else{
 if(filter != ''){
     window.location.href = `/admin__list.html?filter=${filter}&t=${type}&s=${text}`
 }
 else{
     window.location.href = `/admin__list.html?t=${type}&s=${text}`
 }
}

}
}


  



