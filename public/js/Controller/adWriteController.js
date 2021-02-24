import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'
import adModel from '../Model/adModel.js'
// import adGaeShowModel from '../Model/adGaeShowModel.js'






export default class adWriteController{
    constructor(type,myGrade){
     
        this._myGrade = myGrade
        // console.log("관리자등급",myGrade.grade)

        this._adModel = new adModel()
        this._singleton = new Singleton()
        this._utils = new utils()
        this._view = new View()

        //광고이미지등록모델
        // this._adGaeShowModel = new adGaeShowModel()


        //플랫피커 달력+시간추가
        flatpickr(this._view.getElement('#adStartAt'), { 
            enableTime:true,
            dateFormat: "Y-m-d H:i:ss",
            "minDate": new Date().fp_incr(1) //현재날짜기준 지나간 날짜 선택 못함
        })
        this._adStartAt = this._view.getElement('#adStartAt')

        flatpickr(this._view.getElement('#adEndAt'), { 
            enableTime:true,
            dateFormat: "Y-m-d H:i:ss",
            "minDate": new Date().fp_incr(1) //현재날짜기준 지나간 날짜 선택 못함
        })
        this._adEndAt = this._view.getElement('#adEndAt')
      

        
        
        

        //제휴업체
        this._affiliateSelector = this._view.getElement('#affiliateSelector')
        //위치
        this._location = this._view.getElement('#location')
        // this._adStartAt = this._view.getElement('#adStartAt')
        // this._adEndAt = this._view.getElement('#adEndAt')
        //게시글등록
        this._addPostBtn = this._view.getElement('#addPost')
        this._addPostBtn.onclick = () => this.addPost()
        //이미지
      

        this.lifeCycle()
    }

    lifeCycle = async () => {
      await this.grade()
       
        //제휴업체 조회
        await this.getAdUserData()
        //이미지 선택
       await this.setWorkspaceImg()
       //광고위치조회
       await this.getLocationData()
       

        //공지사항 글쓰기 등록버튼
        // this._noticeCompleteBtn = this._view.getElement('#noticeCompleteBtn')
        // this._noticeCompleteBtn.onclick = () => this.noticeCompleteBtn()
   
        
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
 








getAdUserData = async () => {
    const resData = await this._adModel.getAffiliate()
    //    console.log(resData)
    // 받은 데이터로 셀렉트 값 넣어주기
    resData.map((item) => {
        const tempItem = document.createElement('option')
        tempItem.innerHTML = item.profile_nickname
        tempItem.value = item.id
        // console.log(item.profile_nickname)
        // console.log(item.id)
        // console.log(tempItem)
        this._affiliateSelector.appendChild(tempItem)
    })
    // console.log(resData)
}

getLocationData = async () =>{
    const resData = await this._adModel.getLocation()
    // console.log("광고위치",resData)
 // 받은 데이터로 셀렉트 값 넣어주기
 resData.map((item) => {
     const tempItem = document.createElement('option')
     tempItem.innerHTML = item.location
     tempItem.value = item.id
    //  console.log(item.profile_nickname)
    //  console.log(item.id)
    //  console.log(tempItem)
     this._location.appendChild(tempItem)
 })
}







//이미지미리보기
// previewImage = async (targetObj, View_area) =>{
//     var preview = this._view.getElement('#View_area') //div id
//     var ua = window.navigator.userAgent;
    

//     var files = targetObj.files;
//     for ( var i = 0; i < files.length; i++) {
//         var file = files[i];
//         var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
//         if (!file.type.match(imageType))
//             continue;
//         var prevImg = this._view.getElement('#View_area'); //이전에 미리보기가 있다면 삭제
//         if (prevImg) {
//             preview.removeChild(prevImg);
//         }
//         var img = document.createElement("img"); 
//         img.id = "prev_" + View_area;
//         img.classList.add("obj");
//         img.file = file;
//         img.style.width = '100px'; 
//         img.style.height = '100px';
//         preview.appendChild(img);
//         if (window.FileReader) { // FireFox, Chrome, Opera 확인.
//             var reader = new FileReader();
//             reader.onloadend = (function(aImg) {
//                 return function(e) {
//                     aImg.src = e.target.result;
//                 };
//             })(img);
//             reader.readAsDataURL(file);
//         }
//     }


	
// }

setWorkspaceImg = async () => {
    const imgWrap = this._view.getElement('#selecImgWrap')
    const imgDeleteBtn = this._view.getElement('#selectDeleteBtn')
    const profileLabel = this._view.getElement(`#selectLabel`)
    imgDeleteBtn.onclick = () => imageFileDelete()
    const imgView = this._view.getElement('#selectImgView')
    imgView.onclick = (e) => this.getImgClickLocation(e)
    const imageInput = this._view.getElement('#selectImg')

    imageInput.onchange = () => imageFileUpload(imageInput)
    // 워크스페이스 이미지 세팅
    const imageFileUpload = async (element) => {
        const imgFiles = element.files
        // 예외처리
        if (!imgFiles || imgFiles.lenth === 0) {
            utils().snackbar(`이미지 파일을 선택해주세요.`)
            return
        }

        // 파일 정보 파싱
        const { name, lastModified, size, type } = imgFiles[0]
        const imgUrl = URL.createObjectURL(imgFiles[0])
        // 이미지 업로드 진행
        // console.log(imgFiles[0])
        const resData = await this._adModel.uploadImage(imgFiles[0], name)
        // const resData = await this._usersModel.profileImgUpload(imgFiles[0], name)
        // 리스폰 데이터 성공
        const { attach_id, file_path } = resData[0]
        this._imgId = attach_id
        this._imgUrl = file_path
        // console.log(resData[0])
        // console.log("파일패수",this._imgUrl)

        // 클라 화면에 이미지 배치
        imgWrap.classList.remove('hidden')
        imgView.src = imgUrl

        profileLabel.classList.add('hidden')
    }
    //  이미지 삭제
    const imageFileDelete = async () => {
        this._imgId = null
        this._imgUrl = null

        imgWrap.classList.add('hidden')

        const profileLabel = this._view.getElement(`#selectLabel`)
        profileLabel.classList.remove('hidden')

    
      
    }
}






    // 포스트 등록
    addPost = async () => {

        
            // console.log("affiliate_id는",this._affiliateSelector.value,)
            // console.log("location는",this._location.value,)
            // console.log("started_at ",this._adStartAt.value,)
            // console.log("ended_at",this._adEndAt.value,)
            // console.log("url는",this._imgUrl,)

        //예외처리
        if (!this._affiliateSelector.value) {
            utils().snackbar('제휴업체를 선택해주세요')
            return
        }
        if (!this._location.value) {
            utils().snackbar('광고위치를 선택해주세요')
            return
        }
        if (!this._adStartAt.value) {
            utils().snackbar('광고시작일을 선택해주세요')
            return
        }
        if (!this._adEndAt.value) {
            utils().snackbar('광고종료일을 선택해주세요')
            return
        }
        
        
        // 데이터 수집
        let reqData = {
            affiliate_id: parseInt(this._affiliateSelector.value),
            location : parseInt(this._location.value),
            started_at : this._adStartAt.value,
            ended_at : this._adEndAt.value,
          
            
        }
        let resData
        //이미지경로
        reqData.url = this._imgUrl

        
        if (!this._imgUrl) {
            utils().snackbar('광고이미지를 선택해주세요')
            return
        }

  

        //광고추가
        resData = await this._adModel.addPost(reqData)
        // console.log("reqData",reqData)
        // console.log("ad_id",reqData.post_id)
     
        if (!resData) {
            utils().snackbar('이미 등록되어있는 위치와 시간입니다. <br />다른 날짜 및 시작일을 선택해주세요')
            return
        }
       
        window.location.href = `/ad__view.html?n=${resData.insert_id}`
         
    }



   
}