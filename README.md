# 개쇼(GAESHOW) 관리자페이지
개쇼 서비스를 보다 효율적으로 관리하기 위해서 만든 관리자페이지 입니다.


## 개발기간
2020/09 ~ 2021/02

## 담당업무
프론트엔드 담당 1명, 기여도 100%

## 링크(동영상)

커뮤니티관리

[![Video Label](http://img.youtube.com/vi/JmIiLeRNh8M/0.jpg)](https://www.youtube.com/JmIiLeRNh8M)

광고목록

[![Video Label](http://img.youtube.com/vi/xmFh1zoppg4/0.jpg)](https://www.youtube.com/xmFh1zoppg4)

고객센터
공지사항,자주하는 질문

[![Video Label](http://img.youtube.com/vi/O25PkLYeNAM/0.jpg)](https://www.youtube.com/O25PkLYeNAM)

## 기능
- **로그인, 로그아웃, 내정보관리**
- **관리자 등급 별로 열람가능한 페이지 설정**
- **회원관리**
    1. **회원관리, 삭제된 회원 관리, 관리자 관리**
        1. 테이블 목록 조회, 필터조회, 테이블 검색 조회
        2. 강퇴 및 복구
        3. 상세보기, 제휴회원 변경
        4. 관리자 회원가입, 등급 변경, 비밀번호 초기화
        5. 테이블 페이징
        6. 삭제 기록 보여주기
- **커뮤니티관리**
    1. 게시글  관리, 댓글  관리, IDE추천 댓글  관리, 언어추천 댓글 관리
        1. 게시판 별 테이블 목록 조회
        2. 필터 조회, 다중 필터 조회, 테이블 검색 조회
        3. 게시물 삭제 및 복구
        4. GAESHOW 서비스 이동
        5. 게시물 상세보기
- **광고관리**
    1. 광고 목록 조회, 검색 조회, 필터 조회
    2. 광고 등록, 수정, 삭제
- **고객센터 관리**
    1. **공지사항 관리, 자주하는 질문 관리**
        1. 공지사항 등록, 수정, 삭제, 상세보기, 검색, 서비스 페이지 이동
        2. 자주하는질문 등록, 수정, 삭제, 상세보기, 검색, 서비스 페이지 이동
    2. **문의하기**
        1. 테이블 목록 조회, 필터 조회, 다중 필터 조회, 검색 기능
        2. 문의 상세페이지
        3. 관리자 문의 답변 등록, 수정
        4. 문의 처리 상태 변경(확인전/처리중/처리완료)
    3. **신고하기**
        1. 테이블 목록 조회 , 신고 종류 필터 조회, 신고 이유 조회, 필터 조회, 검색 기능
        2. 신고한 글 GAESHOW 서비스 이동
        3. 신고한글 상세보기
        4. 관리자 신고 답변 등록, 수정
        5. 신고 처리 상태 변경(확인전/처리중/처리완료)

## 상세내용
![개쇼관리자](https://user-images.githubusercontent.com/51365114/144569817-ac12e9cf-bb89-49d2-af8d-6534bc8892f0.png)


## 사용기술
**언어** : JavaScript ES6, SCSS, CSS, HTML
**통신** : REST API 
**구조** : MVC 패턴, Singleton 패턴
**IDE** : VS Code
**라이브러리** : Quill editor

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
