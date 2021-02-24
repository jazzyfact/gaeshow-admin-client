import categoryModel from '../Model/categoryModel.js'
import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'
import commentModel from '../Model/commentModel.js'
import commentItem from '../View/commentItem.js'
import usersModel from '../Model/usersModel.js'
import deletePostItem from '../View/deletePostItem.js'




//검색필터
const CONTENT = 'content'
const NICKNAME = 'nickname'


//기본 URL주소
const ORIGINAL = '/comments.html'

export default class commentController {
    constructor(type,myGrade) {
        
        this._categoryModel = new categoryModel()
        this._commentModel = new commentModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        this._commentItem = new commentItem()
        this._usersModel = new usersModel()
        this._deletePostItem = new deletePostItem()

        this._type = type
        // console.log('타입',type.grade)
        // 페이지 기본 데이터
        this._commentIndex
        this._nowPage = utils().getParameterByName('p') ? utils().getParameterByName('p') : 1
        this._limit = 10
        // 서버 리턴 데이터
        this._resData

        // this._myInfo = myInfo
        this._myGrade = myGrade
        // console.log("내정보",myInfo.grade)
        // console.log("관리자등급 확인",myGrade)


        this._pageFilterIndex = utils().getParameterByName('filter') ? utils().getParameterByName('filter') : 'all'
        this._pageTypeFilterIndex = utils().getParameterByName('category_id') ? utils().getParameterByName('category_id') : '1'

        this.selectedIndex
        // 검색
        this._searchWord = utils().getParameterByName('s') ? utils().getParameterByName('s') : null
        this._searchSelector = utils().getParameterByName('t') ? utils().getParameterByName('t') : null


        //카테고리 필터
        this._categorySelector = this._view.getElement('#categorySelector')
        // this._categorySelector.onchange = () => this.loadData()
        //일반 필터
        this._filterSelect = this._view.getElement('#filterSelect')
        // this._filterSelect.onchange = () => this.loadData()
        //검색
        this._searchSelector = this._view.getElement('#searchType')
        this._searchInput = this._view.getElement('#searchText')
        this._searchBtn = this._view.getElement('#searchBtn')
        this._searchBtn.onclick = () => this.getSearch()

        //엔터로 검색
        this._searchInput.onkeypress = (e) => this.getEnterSearch(e)

        this.lifeCycle()
    }


    lifeCycle = async () => {
      
        // // await this.loadData()
        // await this.checkGrade()
        // // await this.setPagination()//페이징
        await this.grade()
        await this.getCategory()//카테고리
        await this.getData()
      

       
       //카테고리필터선택
       this._view.getElement('#categorySelector').onchange = () => this.filterChangeEvent()

       //일반필터선택
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








    //카테고리 가져오기
    getCategory = async () => {
        const resData = await this._categoryModel.getCategory()
        // console.log(resData)
        resData.map((item) => {
            const tempItem = document.createElement('option')
            tempItem.innerHTML = item.name
            tempItem.value = item.id
            // console.log(item.name)
            // console.log(item.id)
            // console.log(tempItem)
            this._categorySelector.appendChild(tempItem)
        })
    }

  

    
    
    getData = async () => {

        const reqData = {}
        // 필수 데이터 넣기
     
        reqData.page = this._nowPage
        reqData.limit = this._limit

        const page = this._commentItem.getParameterByName('p')
        const category_id = this._commentItem.getParameterByName('category_id')
        const filter = this._commentItem.getParameterByName('filter')
        const searchType = this._commentItem.getParameterByName('search_type')
        const searchWord = this._commentItem.getParameterByName('search_word')

        //문의필터 선택되게
        if (category_id && category_id != 'default') reqData.category_id = category_id
        for (let i = 0; i < this._categorySelector.options.length; i++) {
            if (this._categorySelector.options[i].value == category_id) {
                this._categorySelector.options[i].selected = true
              
            }
        }

        //일반필터 선택되게
        if (filter && filter != 'default') reqData.filter = filter
        for (let i = 0; i < this._filterSelect.options.length; i++) {
            if (this._filterSelect.options[i].value == filter) {
                this._filterSelect.options[i].selected = true
               
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
       
            // location.href= `/remove__user.html?search_type=${this._searchType.value}&search_word=${this._searchText.value}`
            // if(page != '') location.href= `/comments.html?category_id=${category_id}&filter=${filter}&search_type=${this._searchType.value}&search_word=${this._searchText.value}`
            //페이지p=2 있을 떄 검색하면
            //여기 검색필터 누를 때도 onchange로바꾸고 href url 띄워주기로 바꾸기
        }

   
        // console.log("서치",searchWord)
        // console.log("filter",filter)
        // console.log("보낸유저!!!!!!!!!!!!!!",reqData)
        // console.log("선택한필터",this._filterSelect.value)
        //  console.log("typefilter",category_id)
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
 
       


        const resData = await this._commentModel.getComment(reqData)
        console.log(resData)
        this._resData = resData
        

        this.setCommentData(this._categorySelector.value,this._filterSelect.value)

        // await this._commentItem.getPostItem(resData)
    }


    setCommentData = async (category,filter) =>{
 
        
          //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
          const cell = this._view.getElement('#commentTableSection')
          while (cell.hasChildNodes()) {
          cell.removeChild(cell.firstChild)
      }

        //받은 데이터가 없을 때 페이징 지우기
        if(this._resData.comment_count === 0){
            
           
            const item = this._commentItem.createEmptyListItem()
            cell.appendChild(item)

            //검색데이터 없을 때 페이징 없애기
         const pageWrapper = this._view.getElement('#pagingData')
         while (pageWrapper.hasChildNodes()) {
             pageWrapper.removeChild(pageWrapper.firstChild)
         }

        }
        else{
            //서버에서 받은 배열 넣기
        this._resData.comments.map((item) => {
            // console.log("item",item)
            const temp =   this._commentItem.getPostItem(item) 
    
             //삭제버튼 누르면 해당index 삭제시킴
            temp[0].onclick = () => this.deleteBtn(item.comment_id)
        //  console.log('temp',temp[0])
         //복구버튼 
            temp[1].onclick = () => this.recoverBtn(item.comment_id)
            })

            this.setPagination(category,filter)
        }
    
       
      


           
    }

    //강퇴버튼 실행
    //강퇴버튼 실행
 deleteBtn = async (commentId) =>{
    const modal = this._deletePostItem.createReportView()
    document.body.appendChild(modal[0])

     // 취소 클릭
     modal[4].onclick = () => {
        document.body.removeChild(modal[0])
    }
    // 신고 보내기 클릭
    modal[3].onclick = async () => {
        if (modal[1].value == 0) {
            utils().snackbar('삭제 타입을 선택해주세요')
            return
        }

        const reqData ={
            comment_id : parseInt(commentId),
            reason : modal[2].value ? modal[2].value : '삭제 상세 이유 미작성',
            deleted_type : modal[1].value
        }

        // console.log("타입확인",typeof(parseInt(commentId)))

        const resData = await this._commentModel.delete(reqData)
        // console.log("삭제reqData", reqData)

        if (resData) {
            utils().snackbar('삭제 되었습니다')
            document.body.removeChild(modal[0])
            window.location.href = `/comments.html?p=${this._nowPage}`
        } else {
            utils().snackbar('삭제 실패')
            window.location.href = `/comments.html?p=${this._nowPage}`
            return
        }

    }

   
 }


 //복구 실행
 recoverBtn = async (commentId) =>{

    const dialog = window.confirm(`댓글을 복구 하시겠습니까?!!`)
    if(dialog){
        // console.log('클릭')
            await this._commentModel.recover(commentId)
            // console.log('댓글 복구', commentId)
        utils().snackbar('댓글이 복구되었습니다')
        window.location.href = `/comments.html?p=${this._nowPage}`
    }
    else {
        utils().snackbar('취소 하였습니다')
        window.location.href = `/comments.html?p=${this._nowPage}`
    }
   
 }


    


   

     setPagination = async (category_id,filter) => {
        // console.log("직힘",category_id,filter )
        const pageWrapper = this._view.getElement('#pagingData')

        while (pageWrapper.hasChildNodes()) {
            pageWrapper.removeChild(pageWrapper.firstChild)
    }

        if (this._resData.comment_count <= this._limit) return

        const paginationView = await import('../View/pagination.js')
        let paginationRepo = new paginationView.default(this._resData.comment_count, this._nowPage, this._limit, this._type)
        const paginationItem = paginationRepo.getCommentPaging(category_id,filter)

    
        pageWrapper.appendChild(paginationItem)
    }

  //일반필터선택
 filterChangeEvent = async () => {
    this._pageFilterIndex = this._view.getElement('#filterSelect').value
    this._pageTypeFilterIndex = this._view.getElement('#categorySelector').value
   
    //문의타입필터랑 전체필터가 있다면 밑에 url주소 넘김
    if(this._pageFilterIndex != '' && this._pageTypeFilterIndex != '')  window.location.href = `/comments.html?category_id=${this._pageTypeFilterIndex}&filter=${this._pageFilterIndex}`
}



 //검색시작
 getEnterSearch = async (e) => {
    let type = this._searchSelector.value
    const text = this._searchInput.value

    const category_id = utils().getParameterByName('category_id')
    const filter = utils().getParameterByName('filter')
    const search_type = utils().getParameterByName('t')

    


    if(e.key == 'Enter'){
       
       //문의필터 선택되게
    
     for (let i = 0; i < this._categorySelector.options.length; i++) {
        if (this._categorySelector.options[i].value == category_id) {
            this._categorySelector.options[i].selected = true
            // console.log("셀렉트옵션", category_id )   
            // console.log("셀렉트옵션 this._categorySelector.options[i].value", this._categorySelector.options[i].value )   
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
   const cell = this._view.getElement('#commentTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.comment_count === 0 ){
       const item = this._commentItem.createEmptyListItem()
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
       window.location.href = `/comments.html`
    }
    else{
     window.location.href = `/comments.html`
    }
}
else{
 if(category_id != '' && filter != ''){
     window.location.href = `/comments.html?category_id=${category_id}&filter=${filter}&t=${type}&s=${text}`
 }
 else{
     window.location.href = `/comments.html?t=${type}&s=${text}`
 }
}
}
}


getSearch = async () => {
    let type = this._searchSelector.value
    const text = this._searchInput.value

    const category_id = utils().getParameterByName('category_id')
    const filter = utils().getParameterByName('filter')
    const search_type = utils().getParameterByName('t')



       
       //문의필터 선택되게
    
     for (let i = 0; i < this._categorySelector.options.length; i++) {
        if (this._categorySelector.options[i].value == category_id) {
            this._categorySelector.options[i].selected = true
            // console.log("셀렉트옵션", category_id )   
            // console.log("셀렉트옵션 this._categorySelector.options[i].value", this._categorySelector.options[i].value )   
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
   const cell = this._view.getElement('#commentTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.comment_count === 0 ){
       const item = this._commentItem.createEmptyListItem()
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
       window.location.href = `/comments.html`
    }
    else{
     window.location.href = `/comments.html`
    }
}
else{
 if(category_id != '' && filter != ''){
     window.location.href = `/comments.html?category_id=${category_id}&filter=${filter}&t=${type}&s=${text}`
 }
 else{
     window.location.href = `/comments.html?t=${type}&s=${text}`
 }
}

}
}