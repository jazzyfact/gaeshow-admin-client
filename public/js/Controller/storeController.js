import View from '../Core/Mvc/View.js'
import storeModel from '../Model/storeModel.js'
import usersItem from '../View/usersItem.js'
import Singleton from '../Core/Singleton/Singleton.js'
import usersModel from '../Model/usersModel.js'

export default class storeController {
    constructor(type, myGrade) {
        this._view = new View()
        this._usersModel = new usersModel()
        this._storeModel = new storeModel()

        this._brandNameButton = this._view.getElement('#brandAddBtn')

        this._brandNameButton.onclick = () => this.addBrand()
        this._view.getElement('#productAddBtn').onclick = () => this.addProduct()
        this._view.getElement('#imgInput').onchange = () => this.imageFileUpload(this._view.getElement('#imgInput'))

        this._imgArr = []
        this._imgSeq = 1
        this.lifeCycle()

        this._myGrade  = myGrade
        console.log("관리자등급 확인",myGrade.grade)
        this._singleton = new Singleton()
        this._usersItem = new usersItem()

        const logoutBtn = this._view.getElement('#logoutBtn')
        logoutBtn.onclick = () => this.logoutUser()
    }

    lifeCycle = async () => {
        this.getBrand()
        await this.grade()
    }

       //로그아웃
 logoutUser = async () => {
    // console.log('logout버튼클릭')


    const dialog = window.confirm(`로그아웃 하시겠습니까?`)
    if(dialog){
        await this._usersModel.logoutUser()
        this._singleton.deleteCookie('accessToken')
        window.location.reload()
        window.location.href = './login.html'
    }
    else {
        // utils().snackbar('로그아웃을 취소 하였습니다')
        window.location.href = `/store.html?p=${this._nowPage}`
    }
}
    //권한설정
//등급 1,2,3 가능
grade = async () => {
    // console.log('등급',this._myGrade.grade)

    switch(this._myGrade){
       
        case 2:
         //상품매니저
        //회원관리
        this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
        this._user=  this._view.getElement('#user').classList.add('hidden')
        this._admin=  this._view.getElement('#admin').classList.add('hidden')  
        //광고관리
        this._adTitle=  this._view.getElement('#adTitle').classList.add('hidden')
        this._ad=  this._view.getElement('#ad').classList.add('hidden') 
        break
        
        case 3:
        //게시물매니저
        //회원관리
        this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
        this._user=  this._view.getElement('#user').classList.add('hidden')
        this._admin=  this._view.getElement('#admin').classList.add('hidden')
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
         //상담사
        //회원관리
        this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
        this._user=  this._view.getElement('#user').classList.add('hidden')
        this._admin=  this._view.getElement('#admin').classList.add('hidden')
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
        this._notice=  this._view.getElement('#notice').classList.add('hidden')
        this._faq=  this._view.getElement('#faq').classList.add('hidden')
         //상품관리
         this._store=  this._view.getElement('#store').classList.add('hidden')
        break
    }
}


    getBrand = async () => {
        const reqData = {}
        reqData.page = 1
        reqData.limit = 100

        const result = await this._storeModel.getBramd(reqData)
        this._view.getElement('#brandList').innerHTML = JSON.stringify(result.brands)
    }
    addBrand = async () => {
        const reqData = {}
        reqData.name = this._view.getElement('#brandName').value
        reqData.syllable = this._view.getElement('#brandSyllable').value

        const result = await this._storeModel.addBrand(reqData)
        this._view.getElement('#brandNameResult').value = JSON.stringify(result)
    }

    imageFileUpload = async (element) => {
        const imgFiles = element.files
        // 예외처리
        if (!imgFiles || imgFiles.lenth === 0) {
            utils().snackbar(`이미지 파일을 선택해주세요.`)
            return
        }

        // 파일 정보 파싱
        const { name, lastModified, size, type } = imgFiles[0]

        const formData = new FormData()
        formData.append('files', imgFiles[0], name)
        formData.append('type', 'product')
        formData.append('image_type', 'top_view')
        // 이미지 업로드 진행
        // console.log(imgFiles[0])
        const resData = await this._storeModel.storeImageUpload(formData)
        // 리스폰 데이터 성공
        const { attach_id, file_path } = resData[0]

        // console.log(resData)

        this._view.getElement('#imageInputResult').value = this._view.getElement('#imageInputResult').value + '\n\n' + JSON.stringify(resData)

        // 이미지 자동 등록
        resData.map((e) => {
            const { image_type, attach_id, file_path } = e
            this._imgArr.push({
                image_type: image_type,
                file_path: file_path,
                attach_id: attach_id,
                sequence: this._imgSeq
            })
        })
        this._imgSeq++

        this._view.getElement('#imgList').innerHTML = JSON.stringify(this._imgArr)
    }

    addProduct = async () => {
        // 데이터 만들기
        const reqData = {}
        reqData.category_id = this._view.getElement('#productCategory').value
        reqData.type = this._view.getElement('#productType').value
        reqData.name = this._view.getElement('#productName').value
        reqData.brand_id = this._view.getElement('#productBrand').value
        reqData.price = this._view.getElement('#productPrice').value

        reqData.images = this._imgArr

        console.log(reqData)

        const resData = await this._storeModel.addProduct(reqData)
        console.log(resData)
    }
}
