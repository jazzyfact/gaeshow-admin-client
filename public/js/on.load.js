import Singleton from './Core/Singleton/Singleton.js'
import header from './View/header.js'
import usersModel from './Model/usersModel.js'
import utils from './Core/Singleton/utils.js'

const headerRepo = new header()
const _singleton = new Singleton()
const _usersModel = new usersModel()

// 글로벌하게 쓰이는 나의 정보
let myInfo
// 글로벌하게 쓰이는 나의 관리자 등급
let myGrade

const lifeCycle = async () => {
    // console.log('hi admin developer')

    const pathname = window.location.pathname
    // 네비게이션에 하단 추가 네베게이션이 들어가는 html리스트

    const subMatch = [
        //추후에 왼쪽네비게이션 html 작성해야함(동적생성)
    ]

    // 로그인 비로그인 체크
    // 로그인은 acesstoken이 있는지 없는지로 체크함.
    const acessToken = _singleton.getCookie('accessToken')
    let isLogin = false

    if (acessToken) {
        // 로그인 되면 accessToken을 사용해서 유저 정보를 얻음.
        const resData = await _usersModel.myInfo()
        if (resData) myInfo = resData
        else _singleton.deleteCookie('accessToken')
        // console.log(resData)
        if (resData.user_id) isLogin = true

        //관리자 등급 정보를 얻음
        if (resData) myGrade = resData.grade
        // console.log('내등급', myGrade)
       
    }
    // 헤더 컨트롤, 서브 뷰가 필요하면 true, 필요 없으면 false로 한다.
    // 삼항연산자(조건? 진실, 거짓)
    if (pathname) {
        headerRepo.createNav(subMatch.includes(pathname) ? true : false, myInfo)
        headerRepo.createBanner()
    }

    switch (pathname) {
        case '/':
            utils().setPreSEO('GAESHOW')
            //기본 index페이지
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 4) location.href = './product.html' //상담사
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 2) location.href = './post.html' //상품매니저
            const indexController = await import('./Controller/usersController.js')
            new indexController.default(isLogin, myGrade, myInfo)
            break
        case '/signup.html':
            utils().setPreSEO('관리자 회원가입 - GAESHOW')
            //회원가입
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 2) location.href = './post.html' //상품매니저
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const signupController = await import('./Controller/signupController.js')
            new signupController.default(isLogin, myInfo, myGrade)
            break
        case '/login.html':
            utils().setPreSEO('로그인 - GAESHOW')
            //로그인
            if (isLogin) {
                window.location.href = '/'
                return
            }
            const loginContoller = await import('./Controller/loginController.js')
            new loginContoller.default()
            break
        case '/index.html':
            //유저목록페이지
              utils().setPreSEO('회원 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 2) location.href = './post.html' //상품매니저
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const usersController = await import('./Controller/usersController.js')
            new usersController.default(isLogin,myInfo, myGrade)
            break
        case '/admin__list.html':
              utils().setPreSEO('관리자 목록 - GAESHOW')
            //관리자페이지
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 2) location.href = './post.html' //상품매니저
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const adminController = await import('./Controller/adminController.js')
            new adminController.default(isLogin, myInfo, myGrade)
            break

        case `/mypage.html`:
              utils().setPreSEO('마이페이지 - GAESHOW')
            //마이페이지
            // 요청하는 유저 인덱스를 찾아서 내 페이지인지 구분
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            const idx = utils().getParameterByName('n')
            const mypageController = await import(`./Controller/mypageController.js`)
            if (!idx || idx === myInfo.user_id) {
                // 없는 경우 내 페이지로 이동
                history.pushState(null, `/mypage.html`, null)
                new mypageController.default(isLogin, myInfo, myGrade)
            } else {
                new mypageController.default(null, idx)
            }
            break
        case '/mypage__edit.html':
            //마이페이지 수정 페이지
            utils().setPreSEO('마이페이지 수정 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            const mypageEditController = await import(`./Controller/mypageEditController.js`)
            new mypageEditController.default(isLogin, myInfo, myGrade)
            break
        case '/password__edit.html':
            //비밀번호변경페이지
            utils().setPreSEO('비밀번호 변경 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            const passwordController = await import('./Controller/passwordController.js')
            new passwordController.default(isLogin, myInfo, myGrade)
            break
        case '/post.html':
            //게시판목록페이지
            utils().setPreSEO('게시글 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 4) location.href = './product.html' //상담사
            const postController = await import('./Controller/postController.js')
            new postController.default(isLogin, myInfo, myGrade)
            break
        case '/notice.html':
            //공지사항목록페이지
            utils().setPreSEO('공지사항 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const noticeController = await import('./Controller/noticeController.js')
            new noticeController.default(isLogin, myInfo, myGrade)
            break
        case '/notice__write.html':
            //공지사항 글쓰기 페이지
              utils().setPreSEO('공지사항 등록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const noticeWriteController = await import('./Controller/noticeWriteController.js')
            new noticeWriteController.default(isLogin, myInfo, myGrade)
            break
        case '/notice__view.html':
            //공지사항 상세보기 페이지
            utils().setPreSEO('공지사항 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const noticeViewController = await import('./Controller/noticeViewController.js')
            new noticeViewController.default(isLogin, myInfo, myGrade)
            break
        case '/notice__edit.html':
            //공지사항 수정 페이지
            utils().setPreSEO('공지사항 수정 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const noticeEditController = await import('./Controller/noticeEditController.js')
            new noticeEditController.default(isLogin, myInfo, myGrade)
            break
        case '/faq.html':
            //자주하는질문 목록 페이지
              utils().setPreSEO('자주하는질문 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const faqController = await import('./Controller/faqController.js')
            new faqController.default(isLogin, myInfo, myGrade)
            break
        case '/faq__write.html':
            //자주하는질문 글쓰기 페이지
              utils().setPreSEO('자주하는질문 등록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const faqWriteController = await import('./Controller/faqWriteController.js')
            new faqWriteController.default(isLogin, myInfo, myGrade)
            break
        case `/faq__view.html`:
            //자주하는질문 상세보기 페이지
            utils().setPreSEO('자주하는질문 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const faqView = await import(`./Controller/faqViewController.js`)
            new faqView.default(isLogin, myInfo, myGrade)
            break
        case '/faq__edit.html':
            //자주하는질문 수정 페이지
              utils().setPreSEO('자주하는질문 수정 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const faqEditController = await import('./Controller/faqEditController.js')
            new faqEditController.default(isLogin, myInfo, myGrade)
            break
        case '/question.html':
            //문의하기 목록 페이지
              utils().setPreSEO('문의하기 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //등급제한
             if (myGrade == 4) location.href = './product.html' //상담사
            const questionController = await import('./Controller/questionController.js')
            new questionController.default(isLogin, myInfo, myGrade)
            break
        case '/question__view.html':
            //문의하기 상세보기 페이지
            utils().setPreSEO('문의하기 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //등급제한
             if (myGrade == 4) location.href = './product.html' //상담사
            const questionViewController = await import('./Controller/questionViewController.js')
            new questionViewController.default(isLogin, myInfo, myGrade)
            break
        case `/report.html`:
            //신고하기 목록페이지
              utils().setPreSEO('신고하기 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //등급제한
            if (myGrade == 4) location.href = './product.html' //상담사
            const report = await import(`./Controller/reportController.js`)
            new report.default(isLogin, myInfo, myGrade)
            break
        case `/report__view.html`:
            //신고하기 상세보기 페이지
              utils().setPreSEO('신고하기 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //등급제한
            if (myGrade == 4) location.href = './product.html' //상담사
            const reportView = await import(`./Controller/reportViewController.js`)
            new reportView.default(isLogin, myInfo, myGrade)
            break
        case `/ide.html`:
            //ide 목록 조회페이지
              utils().setPreSEO('IDE추천댓글 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //권한설정
             if (myGrade == 4) location.href = './product.html' //상담사
            const ide = await import(`./Controller/ideController.js`)
            new ide.default(isLogin, myInfo, myGrade)
            break
        case `/language.html`:
            //언어 추천 목록 조회 페이지
              utils().setPreSEO('언어추천댓글 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //권한설정
             if (myGrade == 4) location.href = './product.html' //상담사
            const language = await import(`./Controller/languageController.js`)
            new language.default(isLogin, myInfo, myGrade)
            break
        case `/board__view.html`:
            //게시물 상세보기  조회 페이지
            utils().setPreSEO('게시글 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //권한설정
             if (myGrade == 4) location.href = './product.html' //상담사
            const postView = await import(`./Controller/postViewController.js`)
            new postView.default(isLogin, myInfo, myGrade)
            break
        case `/workspace__view.html`:
            //워크스페이스 상세보기  조회 페이지
            utils().setPreSEO('워크스페이스 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //권한설정
             if (myGrade == 4) location.href = './product.html' //상담사
            const workspaceView = await import(`./Controller/postViewController.js`)
            new workspaceView.default(isLogin, myInfo, myGrade)
            break
        case `/ide__recommend.html`:
            //언어  상세보기  조회 페이지
            utils().setPreSEO('언어 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //권한설정
            if (myGrade == 4) location.href = './product.html' //상담사
            const ideView = await import(`./Controller/ideViewController.js`)
            new ideView.default(isLogin, myInfo, myGrade)
            break
        case `/ad.html`:
            //광고  조회 페이지
              utils().setPreSEO('광고 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 2) location.href = './post.html' //상품매니저
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const ad = await import(`./Controller/adController.js`)
            new ad.default(isLogin, myInfo, myGrade)
            break
        case `/ad__write.html`:
            //광고 추가  페이지
            utils().setPreSEO('광고 등록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //권한설정
             if (myGrade == 2) location.href = './post.html' //상품매니저
             if (myGrade == 3) location.href = './post.html' //게시물매니저
             if (myGrade == 4) location.href = './product.html' //상담사
            const adWrite = await import(`./Controller/adWriteController.js`)
            new adWrite.default(isLogin, myInfo, myGrade)
            break
        case `/comments.html`:
            //댓글 목록 페이지
              utils().setPreSEO('댓글 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
             //권한설정
             if (myGrade == 4) location.href = './product.html' //상담사
            const comments = await import(`./Controller/commentController.js`)
            new comments.default(isLogin, myInfo, myGrade)
            break
        case `/comment__view.html`:
            //댓글 상세  페이지
            utils().setPreSEO('댓글 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 4) location.href = './product.html' //상담사
            const commentView = await import(`./Controller/commentViewController.js`)
            new commentView.default(isLogin, myInfo, myGrade)
            break
        case `/ad__view.html`:
            //광고 상세  페이지
            utils().setPreSEO('광고 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 2) location.href = './post.html' //상품매니저
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const adView = await import(`./Controller/adViewController.js`)
            new adView.default(isLogin, myInfo, myGrade)
            break
        case `/ad__edit.html`:
            //광고 수정  페이지
            utils().setPreSEO('광고 수정 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 2) location.href = './post.html' //상품매니저
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const adEdit = await import(`./Controller/adEditController.js`)
            new adEdit.default(isLogin, myInfo, myGrade)
            break
        case `/admin__view.html`:
            //관리자 상세  페이지
            utils().setPreSEO('관리자 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 2) location.href = './post.html' //상품매니저
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const adminView = await import(`./Controller/adminViewController.js`)
            new adminView.default(isLogin, myInfo, myGrade)
            break
        case `/user__view.html`:
            //회원 상세  페이지
            utils().setPreSEO('회원 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            //권한설정
            if (myGrade == 2) location.href = './post.html' //상품매니저
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 4) location.href = './product.html' //상담사
            const userView = await import(`./Controller/userViewController.js`)
            new userView.default(isLogin, myInfo, myGrade)
            break
        case `/store.html`:
            // 스토어 등록 페이지
            utils().setPreSEO('상품등록 - GAESHOW')
            const controller = await import(`./Controller/storeController.js`)
            new controller.default(isLogin, myInfo, myGrade)
            break
        case '/remove__user.html':
            //기본 index페이지
            utils().setPreSEO('삭제된 회원 목록 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 4) location.href = './product.html' //상담사
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 2) location.href = './post.html' //상품매니저
            const removeUserController = await import('./Controller/removeUserController.js')
            new removeUserController.default(isLogin, myGrade, myInfo)
            break 
        case '/remove__user__view.html':
            utils().setPreSEO('삭제된 회원 상세 - GAESHOW')
            if (!(await _singleton.getCookie('accessToken'))) location.href = './login.html'
            if (myGrade == 4) location.href = './product.html' //상담사
            if (myGrade == 3) location.href = './post.html' //게시물매니저
            if (myGrade == 2) location.href = './post.html' //상품매니저
            const removeUserView = await import('./Controller/removeUserViewController.js')
            new removeUserView.default(isLogin, myGrade, myInfo)
            break
        case `/product.html`:
            // 상품상담 페이지
            utils().setPreSEO('상품목록 - GAESHOW')
            const consult = await import(`./Controller/productController.js`)
            new consult.default(isLogin, myInfo, myGrade)
            break


    }
}

lifeCycle()
