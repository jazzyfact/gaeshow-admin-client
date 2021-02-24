import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class postItem extends View{

    constructor() {
        super()
        this._view = new View()
        this._utils = new utils()
    }
    
    getPostItem = (data,type) => {
  
        const tableContent = this._view.getElement('#postTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)


       
        //번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`span`, `table__row-data-index`)
        indexSpan.innerHTML = data.post_id
        //카테고리
        // const categorySpanWrap = this._view.createElement(`div`, `table__row-data`)
        // const categorySpan = this._view.createElement(`span`, `table__row-data-post-type`)
        // categorySpan.innerHTML = data.category_id
                   
         //제목
        const titleSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const titleSpan = this._view.createElement(`a`, `table__row-data-post`)
        titleSpan.innerHTML = data.title
     

        //작성자
        const profileNicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const profileNicknameSpan = this._view.createElement(`a`, `table__row-data-nickname`)
        profileNicknameSpan.innerHTML = data.profile_nickname
        //댓글수
        const commentSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const commentSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        commentSpan.innerHTML = data.comment_count
        //좋아요
        const likedSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const likedSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        likedSpan.innerHTML = data.liked
        //조회수
        const viewSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const viewSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        viewSpan.innerHTML = data.view_count
        //공유횟수
        const shareSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const shareSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        shareSpan.innerHTML = data.share_count
        //북마크
        const bookmarkSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const bookmarkSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        bookmarkSpan.innerHTML = data.bookmark_count
        
         //등록일
        const createdAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const createdAtSpan = this._view.createElement(`a`, `table__row-data-created`)
        createdAtSpan.innerHTML = data.created_at
                  
        //삭제한사람
        const deleterSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const deleterSpan = this._view.createElement(`a`, `table__row-data-created`)
        deleterSpan.innerHTML = data.deleter      

        //삭재일
        const deletedAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const deletedAtSpan = this._view.createElement(`a`, `table__row-data-deleted`)
        deletedAtSpan.innerHTML = data.deleted_at
         
         //강퇴
         const deleteBtnWrap = this.createElement(`div`, `table__row-data` )
         const deleteBtn = this.createElement(`span`, `table__row-btn-delete`)
         deleteBtn.innerHTML = '삭제'
    

        const detailBtnWrap = this._view.createElement(`div`, `table__row-data`)
        const detailBtn = this._view.createElement(`a`,`table__row-btn-detail`)
        detailBtn.textContent = '이동'

         //복구
         // const recoverBtnWrap = this.createElement(`div`, `table__row-data` )
         const recoverBtn = this.createElement(`span`, `table__row-btn-recover`)
         recoverBtn.innerHTML = '복구'
        //상세보기 링크
        // detailBtn.href = `/board__view.html?n=${data.category_id}`
        

        // if (type == 'portfolio') detailBtn.href = `/portfolioview.html?n=${data.post_id}`
        // if (type == 'board') detailBtn.href = `/board.html?n=${data.post_id}`
        // if (type == 'badmouse') detailBtn.href = `/badmouseview.html?n=${data.post_id}`
        // if (type == 'tip') detailBtn.href = `/tipsview.html?n=${data.post_id}`






        // console.log('링크',row.href)
    
        //서버에서 받아온 데이터 넣어주기
        indexSpanWrap.appendChild(indexSpan)
        // categorySpanWrap.appendChild(categorySpan)
        titleSpanWrap.appendChild(titleSpan)
        profileNicknameSpanWrap.appendChild(profileNicknameSpan)
        commentSpanWrap.appendChild(commentSpan)
        likedSpanWrap.appendChild(likedSpan)
        viewSpanWrap.appendChild(viewSpan)
        shareSpanWrap.appendChild(shareSpan)
        bookmarkSpanWrap.appendChild(bookmarkSpan)
        createdAtSpanWrap.appendChild(createdAtSpan)
        deleterSpanWrap.appendChild(deleterSpan)
        deletedAtSpanWrap.appendChild(deletedAtSpan)
        detailBtnWrap.appendChild(detailBtn)
        deleteBtnWrap.appendChild(deleteBtn)
        deleteBtnWrap.appendChild(recoverBtn)
                    
        //표 안에 넣어주기
        row.appendChild(indexSpanWrap)
        // row.appendChild(categorySpanWrap)
        row.appendChild(titleSpanWrap)
        row.appendChild(profileNicknameSpanWrap)
        row.appendChild(commentSpanWrap)
        row.appendChild(likedSpanWrap)
        row.appendChild(viewSpanWrap)
        row.appendChild(shareSpanWrap)
        row.appendChild(bookmarkSpanWrap)
        row.appendChild(createdAtSpanWrap)
        row.appendChild(deleterSpanWrap)
        row.appendChild(deletedAtSpanWrap)
        row.appendChild(detailBtnWrap)
        row.appendChild(deleteBtnWrap)
        row.appendChild(deleteBtnWrap)
        tableContent.appendChild(row)


        //상세보기 링크
        //관리자페이지에서 상세보기 화면으로 넘어가는 경우
        //관리자페이지에서 새탭으로 서비스 페이지로 넘아가는 경우(개발자쇼핑몰)
        switch(data.category_id){
            case 3:
                // categorySpan.textContent ="회사 욕 하기"
                titleSpan.href = `/board__view.html?n=${data.post_id}`
                profileNicknameSpan.href = `/board__view.html?n=${data.post_id}`
                commentSpan.href = `/board__view.html?n=${data.post_id}`
                likedSpan.href = `/board__view.html?n=${data.post_id}`
                viewSpan.href = `/board__view.html?n=${data.post_id}`
                shareSpan.href = `/board__view.html?n=${data.post_id}`
                bookmarkSpan.href = `/board__view.html?n=${data.post_id}`
                createdAtSpan.href = `/board__view.html?n=${data.post_id}`
                deleterSpan.href = `/board__view.html?n=${data.post_id}`
                deletedAtSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/badmouseview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 8:
                // categorySpan.textContent = "자기 작업물 자랑"
                titleSpan.href = `/board__view.html?n=${data.post_id}`
                profileNicknameSpan.href = `/board__view.html?n=${data.post_id}`
                commentSpan.href = `/board__view.html?n=${data.post_id}`
                likedSpan.href = `/board__view.html?n=${data.post_id}`
                viewSpan.href = `/board__view.html?n=${data.post_id}`
                shareSpan.href = `/board__view.html?n=${data.post_id}`
                bookmarkSpan.href = `/board__view.html?n=${data.post_id}`
                createdAtSpan.href = `/board__view.html?n=${data.post_id}`
                deleterSpan.href = `/board__view.html?n=${data.post_id}`
                deletedAtSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/portfolioview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 2:
                // categorySpan.textContent = "업무 얘기 공유"
                titleSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/boardview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 5:
                // categorySpan.textContent ="워크스페이스공유"
                titleSpan.href = `/workspace__view.html?n=${data.post_id}`
                profileNicknameSpan.href = `/workspace__view.html?n=${data.post_id}`
                commentSpan.href = `/workspace__view.html?n=${data.post_id}`
                likedSpan.href = `/workspace__view.html?n=${data.post_id}`
                viewSpan.href = `/workspace__view.html?n=${data.post_id}`
                shareSpan.href = `/workspace__view.html?n=${data.post_id}`
                bookmarkSpan.href = `/workspace__view.html?n=${data.post_id}`
                createdAtSpan.href = `/workspace__view.html?n=${data.post_id}`
                deleterSpan.href = `/workspace__view.html?n=${data.post_id}`
                deletedAtSpan.href = `/workspace__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/workspace.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 4:
                // categorySpan.textContent = "프리랜서 팁 공유"
                titleSpan.href = `/board__view.html?n=${data.post_id}`
                profileNicknameSpan.href = `/board__view.html?n=${data.post_id}`
                commentSpan.href = `/board__view.html?n=${data.post_id}`
                likedSpan.href = `/board__view.html?n=${data.post_id}`
                viewSpan.href = `/board__view.html?n=${data.post_id}`
                shareSpan.href = `/board__view.html?n=${data.post_id}`
                bookmarkSpan.href = `/board__view.html?n=${data.post_id}`
                createdAtSpan.href = `/board__view.html?n=${data.post_id}`
                deleterSpan.href = `/board__view.html?n=${data.post_id}`
                deletedAtSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/tipsview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
        }


        if (data.deleted_at === null) {
            deletedAtSpan.textContent = '-'
        } else {
            deletedAtSpan.textContent = data.deleted_at
            deleteBtn.hidden = true
            detailBtn.hidden = true
        }

        if(data.deleter !== '관리자'){
            recoverBtn.hidden = true
        }
        //이렇게 리턴해주면 컨트롤러에서 쓸 수 있음!!!!
        return [deleteBtn,recoverBtn]
    }


    //게시물 상세보기 화면에 넣어줄 데이터
    getPostViewItem = (data) => {

        const Wrapper = document.createElement('a')
        Wrapper.classList.add('body__item')

        // 게시물 번호
        const postId = document.createElement('div')
        postId.classList.add('body__item--idx')
        postId.innerHTML = data.post_id
        //게시물 상세보기 틀
        const desWrapper = document.createElement('div')
        desWrapper.classList.add('body__item--main')
        //게시물 제목
        const postTitle = document.createElement('h4')
        postTitle.classList.add('body__item--main--title')
        postTitle.innerHTML = data.title
        //게시물 내용
        const postContent = document.createElement('p')
        postContent.classList.add('body__item--main--des')
        postContent.innerHTML = data.content
        //조회수
        const postViewCount = document.createElement('p')
        postViewCount.classList.add('body__item--main--ext')
        postViewCount.innerHTML = data.view_count
        //공유횟수
        const postShareCount = document.createElement('p')
        postShareCount.classList.add('body__item--main--ext')
        postShareCount.innerHTML = data.share_count
        //좋아요수
        const postLikedCount = document.createElement('p')
        postLikedCount.classList.add('body__item--main--ext')
        postLikedCount.innerHTML = data.liked
         //북마크수
         const postBookmarkCount = document.createElement('p')
         postBookmarkCount.classList.add('body__item--main--ext')
         postBookmarkCount.innerHTML = data.bookmark_count
        //작성일
        const postCreateAt = document.createElement('p')
        postCreateAt.classList.add('body__item--main--ext')
        postCreateAt.innerHTML = data.created_at
        //삭제일
        const postDeleteAt = document.createElement('p')
        postDeleteAt.classList.add('body__item--main--ext')
        postDeleteAt.innerHTML = data.created_at


        //태그 껍데기
        let  buttonWrapepr
     
        buttonWrapepr = document.createElement('div')
        buttonWrapepr.classList.add('box--button')

        data.tags.map((item) => {
            let temp, tagColor
            if (data.category_id == 2) tagColor = 'red--bg' //업무
            if (data.category_id == 3) tagColor = 'yellow--bg'//회사욕
            if (data.category_id == 4) tagColor = 'orange--bg'//프리
            temp = this.createTagItem(item, tagColor)

            buttonWrapepr.appendChild(temp)
        })
       
        //합치기
        desWrapper.appendChild(postTitle)
        desWrapper.appendChild(postContent)
        desWrapper.appendChild(postViewCount)
        desWrapper.appendChild(postShareCount)
        desWrapper.appendChild(postLikedCount)
        desWrapper.appendChild(postCreateAt)
        desWrapper.appendChild(postDeleteAt)
       
        //게시글 작성자 정보
        let writerUser, userFigure, profileImageUrl, profileNickname, writerUserP
        writerUser = document.createElement('div')
        writerUser.classList.add('body__item--writer')

        userFigure = document.createElement('figure')

        profileImageUrl = document.createElement('img')
        profileImageUrl.src = data.profile_image_url
        profileImageUrl.alt = `${data.profile_nickname}의 프로필 사진`

        profileNickname = document.createElement('figcaption')
        profileNickname.innerHTML = data.profile_nickname

        userFigure.appendChild(profileImageUrl)
        userFigure.appendChild(profileNickname)

        writerUserP = document.createElement('p')
        // 아이템 파싱
        // 없는 것은 어레이에 넣지 않고 진행
        const userInfoArray = []
        if (data.job_type) userInfoArray.push(`${data.job_type}`)//직종
        if (data.experience_years) userInfoArray.push(`${data.experience_years}년차`)//연차
        if (data.working_area) userInfoArray.push(`${data.working_area}근무`)//근무지역
        //작성자 관련 정보 사이에 / 추가
        if (userInfoArray.length > 0) writerUserP.innerHTML = `(${userInfoArray.join(' / ')})`
        else writerUserP.innerHTML = ''

        writerUser.appendChild(userFigure)
        writerUser.appendChild(writerUserP)

        const date = document.createElement('div')
        date.classList.add('body__item--date')
        //작성일
        const createAt = document.createElement('p')
        createAt.innerHTML = data.created_at
        //삭제일
        const deleteAt = document.createElement('p')
        deleteAt.innerHTML = data.deleted_at

        //합치기
        date.appendChild(createAt)
        date.appendChild(deleteAt)

        Wrapper.appendChild(postId)
        Wrapper.appendChild(desWrapper)
        Wrapper.appendChild(writerUser)
        Wrapper.appendChild(date)
        return Wrapper
    }

    //플랫폼,언어,ide, 그 외 태그 색깔 다르게 
    createTagItem = (tagData,tagColor) => {
        const temp = document.createElement('p')
        switch (tagData.type) {
            case 'platform':
                temp.classList.add('purple--bg')
                break
            case 'language':
                temp.classList.add('blue--bg')
                break
            case 'ide':
                temp.classList.add('green--bg')
                break
            default:
                if (tagColor == 'gray--border') {
                    temp.classList.add('gray--border')
                    temp.classList.add('gray')
                } 
                else {
                    temp.classList.add(tagColor)
                }
                break
        }
        temp.innerHTML = tagData.name
      
       

        return temp
    }




    //사진위에 + 좌표 설정하기
    createProductTitleInfo = (data) => {
        
        //상품이름, x,y 이미지 좌표 값
        const { name, x, y } = data

        const wrap = document.createElement('span')
        const label = document.createElement('label')
        const title = document.createElement('h4')

        wrap.classList.add('img__plus')
        label.classList.add('img__plus--icon')
        title.classList.add('img__plus--title')
        title.classList.add('hidden')

        label.innerHTML = `+`
        title.innerHTML = name

        wrap.appendChild(label)
        wrap.appendChild(title)

        //x,y좌표 위치 저장
        wrap.style.left = `${x}%`//왼쪽 좌표
        wrap.style.top = `${y}%`// 위쪽 자표
        //마우스 포인터가 와야지만 실행
        wrap.onmouseenter = () => {
            title.classList.remove('hidden')
        }
        //마우스 포인터가 밖으로 나갔을 때
        wrap.onmouseleave = () => {
            title.classList.add('hidden')
        }

        return [wrap, title]
    }


      //삭제로그
      getDeletedLogItem = (data) => {
        // console.log('확인',data)
        const tableContent = this._view.getElement('#deletedLogSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)

        
        //로그번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`span`, `table__row-data-index`)
        indexSpan.innerHTML = data.log_id
        // console.log('확인 로그',data.log_id)
        //삭제타입
        const deletedTypeSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const deletedTypeSpan = this._view.createElement(`span`, `table__row-data-post-type`)
        deletedTypeSpan.innerHTML = data.deleted_type
         //삭제이유
        const reasonSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const reasonSpan = this._view.createElement(`a`, `table__row-data-post`)
        reasonSpan.innerHTML = data.reason
        //삭제한관리자
        const adminNicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const adminNicknameSpan = this._view.createElement(`span`, `table__row-data-post-type`)
        adminNicknameSpan.innerHTML = data.admin_nickname
        //삭제한날짜
        const createdAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const createdAtSpan = this._view.createElement(`span`, `table__row-data-post-content`)
        createdAtSpan.innerHTML = data.created_at

         //서버에서 받아온 데이터 넣어주기
         indexSpanWrap.appendChild(indexSpan)
         deletedTypeSpanWrap.appendChild(deletedTypeSpan)
         reasonSpanWrap.appendChild(reasonSpan)
         adminNicknameSpanWrap.appendChild(adminNicknameSpan)
         createdAtSpanWrap.appendChild(createdAtSpan)
        
                     
         //표 안에 넣어주기
         row.appendChild(indexSpanWrap)
         row.appendChild(deletedTypeSpanWrap)
         row.appendChild(reasonSpanWrap)
         row.appendChild(adminNicknameSpanWrap)
         row.appendChild(createdAtSpanWrap)
         tableContent.appendChild(row)
        
         return[reasonSpan]
    }


    //조회 결과 데이터가 없을 때
    createEmptyListItem = () => {

        const text = utils().getParameterByName('s')

        let wrap = document.createElement('div')

        let h3 = document.createElement('h3')
        h3.innerHTML = `'${text}' 검색결과가 없습니다.`
        h3.style.fontSize = '1.5rem'
        h3.style.color = '#000000'
        h3.style.textAlign ='center'
        h3.style.marginTop ='3rem'
        h3.style.fontWeight ='bold'
        wrap.appendChild(h3)

        return wrap
    }

       //url파라미터값 가져오기
       getParameterByName = (name) =>{
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}
