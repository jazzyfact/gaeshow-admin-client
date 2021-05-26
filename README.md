# 개쇼(GAESHOW) 관리자페이지
개쇼 서비스를 보다 효율적으로 관리하기 위해서 만든 관리자페이지 입니다.


## 개발기간
2020/09 ~ 2021/02

## 담당업무
프론트엔드 담당 1명, 기여도 100%

## 링크
영상 : https://youtu.be/VWmlm0Hd1RE

## 기능
1. 관리자 및 개쇼 서비스 회원 관리
2. 회원,커뮤니티,광고,고객센터 관리

## 상세내용

## 사용기술

## 프로젝트 회고
### ❓다중필터 및 페이징 숫자 버튼 클릭시 여러개의 값(기존에 선택했던 값)이 유지가 안되는 문제

- **문제**
    - 기존 필터 선택 후 다른 필터 선택시 또는 필터 선택 후 테이블 페이징 숫자 1,2,3 등 클릭시 기존 값이 유지가 안되는 문제
- **문제해결**
    - 필터를 선택 할 때 filterChangeEvent라는 async 함수를 만들어 선택한 필터 값을 window.location.href 통해 값이 url에 보여지게 했습니다.  url창에  category_id={값} &filter={값} 이런식으로 보여지게 되면  getParameterByName() 메서드를 통해 url값을 변수로 가져왔습니다.  받아온 변수를 이용해 기능을 구현했습니다.
- **느낀점 및 배운점**
    - **개발자에게 필요한 상세 기술을 더 꼼꼼하게 습득해야하는 필요성 체감했습니다.**

### ❓관리자 서버가 아닌 서비스 서버에 이미지를 전송해서 리스폰 되는 URL 값을 받아야 하는 문제

- **문제**
    - 광고등록시 관리자 서버가 아닌 서비스 서버에 이미지를 전송 한 후 리스폰 되는 값을 받아야 하는 문제
- **문제해결**
    - Singleton.js 에 서비스 URL 주소를 담은 객체를 선언 한 후 Model.js 에 postRequestImageFormData() async 함수를 만들었습니다. 그리고 광고등록시 사용하는 adModel.js에서 Model.js를 import 한 후 해당 메서드를 사용했습니다.
- **느낀점 및 배운점**
    - Singleton과 MVC 패턴을 잘 이용한다면 간결하게 코드를 짤 수 있다는걸 배웠습니다.

### ❓삭제 할 때 params이 아닌 body로 변경해서 서버에 요청하는 문제

- **문제**
    - 기존에 삭제 할 때에는 params으로 값을 보냈었는데 특정 페이지에서 삭제하는 것은 body로 서버에 요청해야 했습니다.
- **문제해결**
    - Model.js에 deleteBodyRequest async 함수를 만들고 안에 매개변수로는 요청하는 페이지와 body를 넣었습니다.  그리고 이 함수를 사용하는 postModel.js에서 해당 Model.js를 import하고 delete = async body ⇒ {} 라는 함수를 만든 후 사용했습니다.
- **느낀점 및 배운점**
    - 기존에 알고 있었던 내용이라도 다시 한번 꼼꼼하게 살펴봐야 한다는 것을 느꼈고, 개념만 아는 것이 중요한게 아니라 그걸 실제로 적용해서 사용할 줄 알아야 한다고 배웠습니다.

### ❓개발도중 자주 변경되는 기획으로 인한 서버개발자와의 의사소통문제

- **문제**
    - 기획없이 시작된 개발로 인해 개발시 서버개발자와 의사소통문제가 생김
- **문제해결**
    - 서버개발자 분과 먼저 관리자페이지에 필요하다고 생각되는 기능들을 A-Z까지 리스트업을 했습니다. 리스트업 한 기능 중 불필요하다고 생각되는 부분을 서로 얘기 한 후 하나씩 지워갔습니다. 만약, 서로 기능 구현에 대해 의사 전달이 안된다고 느낄 때에는 A4용지에 그림을 그려 이러한 식으로 기능을 구현하겠다라고 설명을 하고 조율을 했습니다. 또한 협의한 내용을 바탕으로 노션에 페이지를 만들어 기록했습니다.
    - 예기치 못하게 기능이 추가 되더라도 앞에서 했던 방법대로 하니 별 문제 없이 진행됐습니다.
- **느낀점 및 배운점**
    - **기획은 장/단기적으로 변화할 수 있지만 개발자로서 변화에 빠르게 적응하고 지급 대응 가능한 능력을 키워야 합니다.**
    - **협업 할 때** **커뮤니케이션의 중요함 을 깨닳았습니다.**
    - **동료개발자와 협의한 내용은 기록을 해야합니다.**
    - 프론트엔드 개발자와 백엔드 개발자는 실과 바늘같은 존재입니다. 개발을 하다가 조금이라도 걸리는 부분이 있다면 바로 얘기하고 소통해야한다고 느꼈습니다. 혼자서 생각하고 판단해 봤자 프로젝트의 기간만 더 늘어지게 된다는 걸 깨닳았습니다. 쉽게 갈 길을 멀리 돌아간다고 느꼈습니다


## 규칙

-   organization 레포지토리를 포크하고 개발한 다음 PR하는 방식으로 개발할 것

-   commit전에 eslint 적용하고 commit할 것 (auto로 eslint를 적용할 수 있음)

### Git-Commit Message 규칙

[ADD] : 파일, 변수, 클래스, 함수 등 기능 추가했을 때  
[FIX] : 디버깅이나 에러 수정했을 때  
[MD] : modify 줄임, 배경색상이나 텍스트 등 변경사항 있을때  
[RM] : remove 줄임, 기능 삭제했을 때  
[RF] : refacto 줄임, 리팩토링 했을 때 (변수/함수 이름 바꾸거나, 코드 스타일 변경)

### 실행시키는 방법

####1. sass 명령어로 css 변환

**sass 명령어**

맨 처음 명령어

node-sass --output-style expanded public/css/scss/styles.scss --output public/css

css 변경후 두 번째부터 명령어

node-sass --watch public/css/scss --output public/css

**vscode sass 실시간 변환기**

1. live sass compoiler 플러그인 설치.
2. 설정에서 css 폴더로 변환 폴더 잡아주기
3. 저장시 자동으로 css 파일로 변경됨.

#### 2. node 실행

##### 2-1 module 설치

`npm i`

2-2 실행

##### Compiles and hot-reloads for development

`npm run start`

##### Compiles and minifies for production

`npm run build` (pm2 설치한 상태여야 함)

#### 3. 프로젝트 구조

```
/public                            : 웹 클라이언트와 관련된 코드가 있는 폴더
   /css                            : scss 폴더와 컴파일 후의 css 파일이 있는 폴더
       /scss                       : scss 파일들을 저장하는 폴더
   /images                         : 추천 이미지들이 위치
   /js                             : js 폴더
       /Controller                 : 모델과 뷰를 연결해주는 컨트롤러 폴더
           usersControllers.js    : users.models.js에서 가져온 데이터를 users.view.js로 전달하는 파일,
                                     혹은 users.view.js의 이벤트를 model로 전달해주는 파일
       /Core                       : 프로젝트에 핵심이 되는 코드가 있는 폴더
            /Mvc                   : mvc패턴으로 정의할 부모클래스 파일들이 있는 폴더
                Model.js           : 서버 통신과 관련된 함수들을 정의해놓은 싱글톤 파일
                View.js            : html 요소를 생성하거나 가져오는 함수가 기록된 파일
            /Singleton             : 중복되는 변수, 함수들을 모아놓은 폴더
                Singleton.js       : 로직과 관련된 싱글톤 파일
                utils.js           : ui와 관련된 싱글톤 파일
       /Model                      : 서버 통신과 관련된 폴더
           usersModels.js         : 유저와 관련된 데이터를 로드할 때 사용하는 파일
       /View                       : 보여지는 것과 관련된 파일
           usersView.js           :
       on.load.js                  : ../index.html 파일에서 유일하게 로드하는 파일
   index.html                      : 메인 html 파일
   login.html                      : 로그인 html 파일
.babelrc                           : babel 설정 파일
.eslintignore                      : eslint를 적용하지 않을 파일들을 적어놓는 파일
.eslintrc                          : eslint 설정 파일
.gitignore                         : git으로 관리하지않을 파일들을 적어놓는 파일
app.js                             : app 진입점
config.js                          : webstrom에서 babel alias를 인식하기 위한 파일
package.json                       : express 설정 파일
package-lock.json                  : express 설정 파일 (정확한 의존성 기록을 위해 사용)
README.md                          : 프로젝트와 관련된 내용을 적어놓는 파일
```

##### 3-1 SCSS 파일 설명 (SCSS 폴더내 파일들)

```
/_mixin.scss                        :   반응형 관련 파일
/_variables.scss                    :   속성값에 들어갈 변수 정의 파일
/default.scss                       :   페이지 주요 큰틀에 관련된 레이아웃 설정 scss 파일
/reest.scss                         :   브라우저별 다른 엘러먼트 속성값 초기화 시켜 주는 파일
/ui.scss                            :   세부적인 아이템, 공통적으로 사용하는 아이템 들의 정의되어 있는 스타일 파일
/index.scss                         :   index.html 의 스타일 파일
```
