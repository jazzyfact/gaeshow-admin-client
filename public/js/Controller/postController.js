
import categoryModel from '../Model/categoryModel.js'
import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import postModel from '../Model/postModel.js'
import Singleton from '../Core/Singleton/Singleton.js'
import postItem from '../View/postItem.js'
import usersModel from '../Model/usersModel.js'
import deletePostItem from '../View/deletePostItem.js'


//검색필터
const CONTENT = 'content'
const NICKNAME = 'nickname'
const TITLE ='title'

//기본 URL주소
const ORIGINAL = '/post.html'

export default class postController{

    constructor(type,myGrade){
        // console.log("타입",type)
        this._categoryModel = new categoryModel()
        this._postModel = new postModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        this._postItem = new postItem()
        this._usersModel = new usersModel()


        this._deletePostItem = new deletePostItem()
        // 페이지 구분
        // this._type = type

     
        this._myGrade = myGrade
      
        // console.log("관리자등급 확인",myGrade)

        // 페이지 기본 데이터
        this._postIndex
        this._nowPage = utils().getParameterByName('p') ? utils().getParameterByName('p') : 1
        this._limit = 10
        // 서버 리턴 데이터
        this._resData

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
        // this._searchBtn.onclick = () => this.getData()
        this._searchBtn.onclick = () => this.getSearch()

        //카테고리뷰
        this._categoryView = this._view.getElement('#categoryView')

        // this._delete = this._postItem.getElements('.posts__table .table__row-btn-delete')
        // this._delete.onclick = () => this.deleteBtn()

        //엔터로 검색
        this._searchInput.onkeypress = (e) => this.getEnterSearch(e)
        
         // lifeCycle
         this.lifeCycle()
        
        //  this._deleteBtn.onclick = () => this.deletePost()
    }


    lifeCycle = async () => {
        await this.grade()
        // await this.loadData()
        // .then((e) => this.setPagination(e)) 
        //카테고리
        
        await this.getCategory()
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

        // for (let i = 0; i < this._categorySelector.options.length; i++) {
        //     if (this._categorySelector.options[i].innerHTML ==  tempItem.innerHTML) {
        //         this._categorySelector.options[i].selected = true
        //         console.log("카테셀렉트옵션",  this._categorySelector.options[i].value )   
        //     }
        // }
    })
}




 
//게시물 목록 가져오기
    getData = async () => {
       
        const reqData = {}
        // 필수 데이터 넣기
        // reqData.category_id = this._postIndex
        reqData.page = this._nowPage
        reqData.limit = this._limit


        
         //카테고리 아이디가 all이라면 카테고리 필터값을 보내지말고
        //나머지 카테고리는 필터값을 보내라
        // if(this._categorySelector.value === 'defaultPost'){
        //     // console.log("전체", this._filterSelect.value )
        // }
        // else{
        //     reqData.category_id = this._categorySelector.value
        // }
    
        // if(this._postItem.getParameterByName('category_id') != ''){
        //     reqData.category_id = this._postItem.getParameterByName('category_id')
        //     console.log("파라미터네임 필터값", reqData.category_id) 
          
        //     // switch(reqData.category_id){
        //     //     case 1:
        //     //         this._categoryView.innerHTML = '전체보기'
        //     //         console.log("파라미터네임 필터값",this._categoryView.innerHTML) 
        //     //         break
        //     //     case 2:
        //     //         this._categoryView.innerHTML = '업무 얘기 공유'
        //     //         break
        //     //     case 8:
        //     //         this._categoryView.innerHTML = '자기작업물자랑'
        //     //         break
    
        //     // }
        //     if(reqData.category_id == 1){
        //         this._categoryView.innerHTML = '전체보기'
        //     }
        //     if(reqData.category_id == 2){
        //         this._categoryView.innerHTML = '업무얘기공유'
        //     }
        //     if(reqData.category_id == 3){
        //         this._categoryView.innerHTML = '회사욕하기'
        //     }
        //     if(reqData.category_id == 4){
        //         this._categoryView.innerHTML = '프리랜서팁공유'
        //     }
        //     if(reqData.category_id == 5){
        //         this._categoryView.innerHTML = '워크스페이스공유'
        //     }
        //     if(reqData.category_id == 8){
        //         this._categoryView.innerHTML = '자기작업물자랑'
        //     }


        //     if( this._categorySelector.value != 'defaultPost') reqData.category_id = this._categorySelector.value
          
        //     //url에 필터값이 남아있으면 다른 필터로 바꿔도  url이 계속 남아있어서 제대로 검색이안됌
        //     //href 로 기존 필터값 지워주고 새로운 필터 주소 넣기
        //     //if( this._filterSelect.value == 'all')    location.href= `/index.html` 이거쓰면 셀렉트 값이 초기값으로 변함
        //     if( this._categorySelector.value != 'defaultPost')  location.href= `/board.html?category_id=${this._categorySelector.value}`
        //          console.log("필터값",  this._categorySelector.value)   

        //          //필터랑 select option 값이 같으면 selected
        // // for (let i = 0; i < this._categorySelector.options.length; i++) {
        // //     if (this._categorySelector.options[i].value == reqData.category_id) {
        // //         this._categorySelector.options[i].selected = true
        // //         console.log("카테셀렉트옵션",  this._categorySelector.options[i].value )   
        // //     }
        // // }
        // }
        // else{
        //     //url에 필터값이 없으면
        //    if( this._categorySelector.value == 'defaultPost') {
        //     // location.href =`/index.html`
        //    }
        //    else{
        //        reqData.category_id = this._categorySelector.value
        //        if(this._categorySelector.value != 'defaultPost') location.href  =`/board.html?category_id=${this._categorySelector.value}`
        //     }
           
        // }

            

        const category_id = this._postItem.getParameterByName('category_id')
        const filter = this._postItem.getParameterByName('filter')
        const searchType = this._postItem.getParameterByName('search_type')
        const searchWord = this._postItem.getParameterByName('search_word')

        //문의필터 선택되게
        if (category_id && category_id != 'default') reqData.category_id = category_id
        for (let i = 0; i < this._categorySelector.options.length; i++) {
            if (this._categorySelector.options[i].value == category_id) {
                this._categorySelector.options[i].selected = true
                console.log("셀렉트옵션", reqData.category_id )   
                console.log("셀렉트옵션 this._categorySelector.options[i].value", this._categorySelector.options[i].value )   
            }
        }

        //일반필터 선택되게
        if (filter && filter != 'default') reqData.filter = filter
        for (let i = 0; i < this._filterSelect.options.length; i++) {
            if (this._filterSelect.options[i].value == filter) {
                this._filterSelect.options[i].selected = true
                console.log("셀렉트옵션",  reqData.filter )   
            }
        }
        //

        // if(this._searchSelector.value == 'blank'){
        //     // console.log("필터값222", this._searchType.value)
        // }
        // else{
        //     reqData.search_type = this._searchSelector.value
        //     reqData.search_word = this._searchInput.value
          
        // }

      
        
     
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
                case 't':
                    reqData.search_type = 'title'
                    break
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

        //  if(category_id != '' && filter != ''){
        //     window.location.href = `${ORIGINAL}?category_id=${category_id}&filter=${filter}`
        //  }
       
        


        const resData = await this._postModel.getPosts(reqData)
        // console.log("받아온데이터",resData)
        this._resData = resData

        this.setPostItem(this._categorySelector.value,this._filterSelect.value)
    }









    setPostItem = async (category,filter) => {
        // console.log("받아온데이터 setPostItem filter",filter)
        // console.log("받아온데이터 setPostItem category",category)

      
    //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
          const cell = this._view.getElement('#postTableSection')
          while (cell.hasChildNodes()) {
          cell.removeChild(cell.firstChild)
      }

      if(this._resData.post_count === 0 ){
        const item = this._postItem.createEmptyListItem()
        cell.appendChild(item)

         //검색데이터 없을 때 페이징 없애기
         const pageWrapper = this._view.getElement('#pagingData')
         while (pageWrapper.hasChildNodes()) {
             pageWrapper.removeChild(pageWrapper.firstChild)
         }
    }   
    else{
         //서버에서 받은 배열 넣기
         this._resData.posts.map((item) => {
            //  console.log("item",item)
        const temp = this._postItem.getPostItem(item)
            
        
        //삭제버튼 
        //삭제버튼 누르면 해당게시물 index 삭제시킴
        temp[0].onclick = () => this.deleteBtn(item.post_id)
        // console.log('temp',temp[0])
        //복구버튼 
        temp[1].onclick = () => this.recoverBtn(item.post_id)
         })

        this.setPagination(category,filter)
    }



       
     }


    //강퇴버튼 실행
    //강퇴버튼 실행
    deleteBtn = async (postId) =>{
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
                post_id : parseInt(postId),
                reason : modal[2].value ? modal[2].value : '삭제 상세 이유 미작성',
                deleted_type : modal[1].value
            }
    
            console.log("타입확인",typeof(parseInt(postId)))
    
            const resData = await this._postModel.delete(reqData)
            console.log("삭제reqData", reqData)
    
            if (resData) {
                utils().snackbar('삭제 되었습니다')
                document.body.removeChild(modal[0])
                window.location.href = `/post.html?p=${this._nowPage}`
            } else {
                utils().snackbar('삭제 실패')
                window.location.href = `/post.html?p=${this._nowPage}`
                return
            }
    
        }
    
       
     }
    
    
     //복구 실행
     recoverBtn = async (postId) =>{
    
        const dialog = window.confirm(`게시글을 복구 하시겠습니까?!!`)
        if(dialog){
            // console.log('클릭')
                await this._postModel.recover(postId)
                console.log(' 복구', postId)
            utils().snackbar('게시글이 복구되었습니다')
            window.location.href = `/post.html?p=${this._nowPage}`
        }
        else {
            utils().snackbar('취소 하였습니다')
            window.location.href = `/post.html?p=${this._nowPage}`
        }
       
     }
    


 //검색시작
 getEnterSearch = async (e) => {
    let type = this._searchSelector.value
    const text = this._searchInput.value

    const category_id = this._postItem.getParameterByName('category_id')
    const filter = this._postItem.getParameterByName('filter')
    const search_type = this._postItem.getParameterByName('t')

    


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
       case TITLE:
           type = 't'
           break
       case CONTENT:
           type = 'c'
           break
       case NICKNAME:
           type = 'n'
           break
   }

     
   //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
   const cell = this._view.getElement('#postTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.post_count === 0 ){
       const item = this._postItem.createEmptyListItem()
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
       window.location.href = `/post.html`
    }
    else{
     window.location.href = `/post.html`
    }
}
else{
 if(category_id != '' && filter != ''){
     window.location.href = `/post.html?category_id=${category_id}&filter=${filter}&t=${type}&s=${text}`
 }
 else{
     window.location.href = `/post.html?t=${type}&s=${text}`
 }
}
}
}

getSearch = async () => {
    let type = this._searchSelector.value
    const text = this._searchInput.value

    const category_id = this._postItem.getParameterByName('category_id')
    const filter = this._postItem.getParameterByName('filter')
    const search_type = this._postItem.getParameterByName('t')



       
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
       case TITLE:
           type = 't'
           break
       case CONTENT:
           type = 'c'
           break
       case NICKNAME:
           type = 'n'
           break
   }

     
   //엘리먼트에 있는 요소들을 제거 한 후 데이터 넣기
   const cell = this._view.getElement('#postTableSection')
   while (cell.hasChildNodes()) {
   cell.removeChild(cell.firstChild)
}
   if(this._resData.post_count === 0 ){
       const item = this._postItem.createEmptyListItem()
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
       window.location.href = `/post.html`
    }
    else{
     window.location.href = `/post.html`
    }
}
else{
 if(category_id != '' && filter != ''){
     window.location.href = `/post.html?category_id=${category_id}&filter=${filter}&t=${type}&s=${text}`
 }
 else{
     window.location.href = `/post.html?t=${type}&s=${text}`
 }
}

}


     //페이징
     setPagination = async (category_id,filter) => {
        // console.log("직힘",category_id,filter )
        const pageWrapper = this._view.getElement('#pagingData')
 
        while (pageWrapper.hasChildNodes()) {
            pageWrapper.removeChild(pageWrapper.firstChild)
    }
        if (this._resData.post_count <= this._limit) return

        const paginationView = await import('../View/pagination.js')
        let paginationRepo = new paginationView.default(this._resData.post_count, this._nowPage, this._limit, this._type)
        const paginationItem = paginationRepo.getPostPaging(category_id,filter)

        pageWrapper.appendChild(paginationItem)
       
    }

 //일반필터선택
 filterChangeEvent = async () => {
    this._pageFilterIndex = this._view.getElement('#filterSelect').value
    this._pageTypeFilterIndex = this._view.getElement('#categorySelector').value
   
    //문의타입필터랑 전체필터가 있다면 밑에 url주소 넘김
    if(this._pageFilterIndex != '' && this._pageTypeFilterIndex != '')  window.location.href = `/post.html?category_id=${this._pageTypeFilterIndex}&filter=${this._pageFilterIndex}`
}

 }
    



















//   //게시물 삭제
//   deletePost = async () => {
        
//     const btns = this._postItem.getElements('.posts__table .table__row-btn-delete')
//     btns.forEach((btn, i) => {
//         console.log('클릭')
//         //강퇴 버튼 클릭
//         btn.addEventListener('click', async e => {
            
//             const dialog = window.confirm(`정말로 삭제하시겠습니까?`)

//             if(dialog){
//                 console.log('클릭')
//                 const postId = Number(this._postItem.getElement(`.posts__table .table__content .table__row:nth-child(${i + 1}) .table__row-data`).textContent)
//                 const res = await this._postModel.deletePost(postId)
//                 if (res.resStatus) await this._postItem.deletePost(res.resStatus, i + 1)
//                 utils().snackbar('게시물이 삭제되었습니다')
//             }
//             else {
//                 utils().snackbar('취소하였습니다')
//             }
//         })
//     })



// }
    

   



//페이지가져오기
// setPagination = async () => {
//     if (this._resData.post_count <= this._limit) return
//     const paginationView = await import('../View/pagination.js')
//     let paginationRepo = new paginationView.default(this._resData.post_count, this._nowPage, this._limit)
//     const paginationItem = paginationRepo.getItem()

//     const pageWrapper = this._view.getElement('.body__item--paging')
//     pageWrapper.appendChild(paginationItem)
// }






