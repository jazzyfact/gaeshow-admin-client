import Singleton from '../Core/Singleton/Singleton.js'
import View from '../Core/Mvc/View.js'
import usersModel from '../Model/usersModel.js'
import utils from '../Core/Singleton/utils.js'
export default class header {
    constructor() {

        this._singleton = new Singleton()
        this._view = new View()
        this._usersModel = new usersModel()
        this._utils = new utils()
        // this.bindEvent()
    }

    createBanner = () => {
      
        //지금 제대로 스낵바가 표시되고 있지 않음(오류), 추후 해결하기
        //utils.js:15 Uncaught (in promise) TypeError: Cannot read property 'classList' of null
    // at Object.snackbar (utils.js:15)
    // at loginController.loginUser (loginController.js:35)
    // at HTMLButtonElement.loginBtn.onclick (loginController.js:23)

     
        // 스낵바 아이템 생성
        const snackbar = document.createElement('section')
        const icon = document.createElement('img')
        const text = document.createElement('p')

        snackbar.classList.add('header__item--snackbar')
        snackbar.classList.add('hidden')
        
        snackbar.id = 'snackbar'
        icon.id = 'snackbarIcon'
        text.id = 'snackbarText'
       

        snackbar.appendChild(icon)
        snackbar.appendChild(text)
        // 삽입
        const header = document.querySelector('#headerBanner')
        header.appendChild(snackbar)
       
    }

  // isRequireSubView : 서브뷰가 필요한지 판단하는 bool
    // myInfo : on.load.js에서 로그인 검사를 진행한 뒤 로그인이 되어 있으면 로그인 정보를 받아오는데, 그 리턴받은 데이터 null이 아닌경우 로그인이다
    createNav = (isRequireSubView, myInfo,data) => {
        let main, sub
        main = document.createElement('section')
        main.className = `nav__main`
        sub = document.createElement('section')
        sub.className = `nav__sub`

        let icon ,user
        // 아이콘
        icon = document.createElement('div')
        icon.className = 'nav__item--icon'
        // 아이콘 내부
        let h1, p, title
        h1 = document.createElement('h1')
        p = document.createElement('img')
        p.src = `../res/img/ic_launcher.png`
        p.alt = `개쇼 로고 이미지`
        // p.style.borderRadius = '50%'
        p.onclick = () => (window.location.href = '/')

        title = document.createElement('div')
        title.className = 'nav__item--title'
        title.innerHTML = 'GAESHOW 관리자'
        title.onclick = () => (window.location.href = '/')
        //border-radius: 7px;
// -moz-border-radius: 7px;
// -khtml-border-radius: 7px;
// -webkit-border-radius: 7px;

        icon.appendChild(h1)
        icon.appendChild(p)
        icon.appendChild(title)

        // let titleH1, titleP1
        // title = document.createElement('div')
        // title.className = 'nav__item--title'

        // titleH1 = document.createElement('h1')
        // titleH1.innerHTML = '개쇼 관리자'
        // // titleP1 = document.createElement('img')

       

       

        // title.appendChild(titleH1)
        // title.appendChild(titleP1)

      

        //유저
        user = document.createElement('section')
        user.className = 'nav__item--users'
        if (!myInfo) {
            // 로그아웃 상태인 경우
            //유저 아이템
            let login
            login = document.createElement('a')
            login.href = '/login.html'
            login.innerHTML = '로그인'
           
            // 결합
            user.appendChild(login)
          
        } else {
            //로그인 상태인경우
            const { profile_nickname, profile_image_url } = myInfo
            // console.log("myinfo",myInfo,data)
            let figure, img, figcaption, logout
            figure = document.createElement('a')
            figure.classList.add('nav__item--users--fig')
            figure.href = '/mypage.html'

            // img = document.createElement('img')
            // img.classList.add('nav__item--users--img')
            // // img.src = profile_image_url
            // img.src = profile_image_url
            // img.alt = `프로필 이미지`

            figcaption = document.createElement('figcaption')
            figcaption.classList.add('nav__item--users--figcap')
            figcaption.innerHTML = profile_nickname
            figcaption.style.fontWeight = 'bold'

            // figure.appendChild(img)
            figure.appendChild(figcaption)

            logout = document.createElement('a')
            logout.classList.add('nav__item--users--logout')
            logout.innerHTML = `로그아웃`
            logout.style.fontSize = '1rem'
            logout.style.marginRight = '3rem'
            logout.onclick = () => this.logoutUser()

            
            



            
            user.appendChild(figure)
            user.appendChild(logout)
        }
       
        // 모두 합치가.
        const wrapper = document.querySelector('#headerNav')
        // console.log(wrapper)
        main.appendChild(icon)
      
        main.appendChild(user)
        wrapper.appendChild(main)
       
    }

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
            // if(utils().getParameterByName('index')){
            //     window.location.href = `/index.html`
            // }
            // else if(utils().getParameterByName('remove__user')){
            //     window.location.href = `/remove__user.html`
            // }
           
        }
    }

    }

