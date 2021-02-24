import View from "../Core/Mvc/View.js"
import Singleton from "../Core/Singleton/Singleton.js"
import utils from "../Core/Singleton/utils.js"
import adModel from "../Model/adModel.js"


export default class adEditController{
    constructor(myInfo, myGrade){

    this._singleton = new Singleton()
    this._utils = new utils()
    this._view = new View()
    this._adModel =new adModel()
    
    this._myInfo = myInfo
    this._myGrade = myGrade
    // console.log("내정보",myInfo.grade)
    // console.log("관리자등급 확인",myGrade.grade)

    this._adId = utils().getParameterByName('n')
    // console.log('광고 인덱스',this._adId)


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
  this._locationSelector = this._view.getElement('#locationSelector')
  //광고시작
  this._adStartAt = this._view.getElement('#adStartAt')
  //광고종료
  this._adEndAt = this._view.getElement('#adEndAt')
//   this._createAt = this._view.getElement('#createAt')
//   this._updatedAt = this._view.getElement('#updatedAt') 
//이미지
this._thumbView = this._view.getElement('#selectedImg')

  //게시글등록
  this._addPostBtn = this._view.getElement('#addPost')
  this._addPostBtn.onclick = () => this.addPost()







    this.lifeCycle()
    }


    lifeCycle = async () =>{
        await this.grade()
        //제휴업체 조회
        // await this.getAdUserData()
        // //상세데이터가져오기
        // await this.setAdDetailData()
        //   //이미지 선택
       await this.setWorkspaceImg()

    //    await this.getAdUserData().then((e) => this.setAdDetailData(e))  
         this.setAdDetailData()  
       
       //광고위치조회
        //  await   this.getLocationData()
    //   this.getLocationData().then((locationData) => this.setAdDetailData(locationData))
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


    // getAdUserData = async () => {
    //     const resData = await this._adModel.getAffiliate()
    //        console.log(resData)
    //     // 받은 데이터로 셀렉트 값 넣어주기
    //     resData.map((item) => {
    //         const tempItem = document.createElement('option')
    //         tempItem.innerHTML = item.profile_nickname
    //         tempItem.value = item.id
    //         console.log(item.profile_nickname)
    //         console.log(item.id)
    //         // console.log(tempItem)
    //         this._affiliateSelector.appendChild(tempItem)
    //     })

    //     // console.log(resData)
    //     //리턴값을 해줘야 나중에 제휴업체에 기존데이터를 넣을 수 있음
    //     return resData
    // }


    // getLocationData = async () =>{
    //     const resData = await this._adModel.getLocation()
    //     console.log("광고위치",resData)
    //  // 받은 데이터로 셀렉트 값 넣어주기
    //  resData.map((item) => {
    //      const tempItem = document.createElement('option')
    //      tempItem.innerHTML = item.location
    //      tempItem.value = item.id
    //      console.log(item.location)
    //      console.log(item.id)
    //     //  console.log(tempItem)
    //      this._location.appendChild(tempItem)
    //  })
    //   console.log(resData)

    
    //     //리턴값을 해줘야 나중에 광고위치에 기존데이터를 넣을 수 있음
    //     return resData
      
    // }
    




    //가져온 데이터 셋팅
    setAdDetailData = async () => {
       
        // console.log("affData ", affData)
        // console.log("data ", data)
       
        const resData = await this._adModel.getAdDetail(this._adId)
        // const resData = await this._noticeModel.getNoticeDetail(this._postId,this._postId)
        // console.log("가져온데이터",resData)
       
        // 작성자 관련 정보
        // 작성한 유저 닉네임, 이미지 url, 직종, 경력, 근무지역
        const { profile_nickname, user_id, url ,updated_at,location,created_at,started_at,ended_at} = resData
       

        this._view.getElement('#affiliateSelector').value = profile_nickname

         //광고시작일
         this._view.getElement('#adStartAt').value= started_at
         //광고종료일
         this._view.getElement('#adEndAt').value = ended_at
        
         //광고등록일
        //  this._view.getElement('#createAt').value= created_at
         //광고위치
         this._view.getElement('#locationSelector').value= location
        //  console.log("가져온데이터 location",location)
       
        if(updated_at === null){
        //마지막수정일
        // this._view.getElement('#updatedAt').value = updated_at
        // this._view.getElement('#deleteSpan').classList.add(`hidden`)


        }

        const imgWrap = this._view.getElement('#selecImgWrap')
        const imgView = this._view.getElement('#selectImgView')
        const profileLabel = this._view.getElement(`#selectLabel`)
        // 이미지 뷰 등록
        imgWrap.classList.remove('hidden')
        imgView.src = url
        profileLabel.classList.add('hidden')
       
    
       
                const affData = await this._adModel.getAffiliate()
                //    console.log(affData)
                // 받은 데이터로 셀렉트 값 넣어주기
                affData.map((item) => {
                    const tempItem = document.createElement('option')
                    tempItem.innerHTML = item.profile_nickname
                    tempItem.value = item.id
                    // console.log(item.profile_nickname)
                    // console.log(item.id)
                    // console.log(tempItem)
                    this._affiliateSelector.appendChild(tempItem)
                })
        
    
        //제휴업체 넣기
        //제휴업체 파싱한 프로필 닉넴 === 서버에서 받아온 제휴업체 닉넴이랑 같으면
        //리스트에 추가해라 ..
        if (profile_nickname) {
            // console.log("업체",affData)
            const affName = affData.find((e) => {
                if (e.profile_nickname ==profile_nickname) return true
            })
            const arr = this._affiliateSelector.childNodes
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].innerHTML == profile_nickname) arr[i].setAttribute('selected', true)
                // console.log("affName.profile_nickname",affName.profile_nickname)
            }
        }
       

        //광고위치
        const locationResData = await this._adModel.getLocation()
        // console.log("광고위치",resData)
     // 받은 데이터로 셀렉트 값 넣어주기
        locationResData.map((item) => {
         const tempItem = document.createElement('option')
         tempItem.innerHTML = item.location
         tempItem.value = item.id
        //  console.log(item.location)
        //  console.log(item.id)
        //  console.log(tempItem)
         this._locationSelector.appendChild(tempItem)
        })
        // console.log(locationResData)

    
        //리턴값을 해줘야 나중에 광고위치에 기존데이터를 넣을 수 있음
        // return locationResData
      
        //광고위치 넣기
        if (location) {
            // console.log("업체",locationResData)
            const locationName = locationResData.find((e) => {
                if (e.location ==location) return true
            })
            const arr = this._locationSelector.childNodes
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].innerHTML == locationName.location) arr[i].setAttribute('selected', true)
            }
        }
    
       

    }


    //사진다시선택
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
            console.log(resData[0])
            console.log("파일패수",this._imgUrl)
    
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

        
        console.log("affiliate_id는",this._affiliateSelector.value,)
        console.log("location는",this._locationSelector.value,)
        console.log("ad_start_at는",this._adStartAt.value,)
        console.log("ad_end_at는",this._adEndAt.value,)
        console.log("url는",this._imgUrl,)

    //예외처리
    if (!this._affiliateSelector.value) {
        utils().snackbar('제휴업체를 선택해주세요')
        return
    }
    if (!this._locationSelector.value) {
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
        ad_id : this._adId ,
        affiliate_id: parseInt(this._affiliateSelector.value),
        location : parseInt(this._locationSelector.value),
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
    resData = await this._adModel.editPost(reqData)
     console.log("resData",resData)
 
    if (!resData) {
        utils().snackbar('광고 등록에 실패 했습니다. 다시 시도해주세요.')
        return
    }
    
    window.location.href = `/ad__view.html?n=${this._adId}`
     
}

}