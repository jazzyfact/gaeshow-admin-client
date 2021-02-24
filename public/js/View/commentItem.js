import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'


export default class commentItem extends View {
    constructor() {
        super()
        this._utils = new utils()
        this._view = new View()
    }

   
    getPostItem = (data) => {
  
        const tableContent = this._view.getElement('#commentTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)

        
        //댓글 번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`a`, `table__row-data-index`)
        indexSpan.innerHTML = data.comment_id
        //게시물 번호
        const postSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const postSpan = this._view.createElement(`a`, `table__row-data-post-type`)
        postSpan.innerHTML = data.post_id
         //댓글내용
        const commentSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const titleSpan = this._view.createElement(`a`, `table__row-data-post`)
        titleSpan.innerHTML = data.content
        //작성자
        const profileNicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const profileNicknameSpan = this._view.createElement(`a`, `table__row-data-nickname`)
        profileNicknameSpan.innerHTML = data.profile_nickname
        //좋아요
        const likedSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const likedSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        likedSpan.innerHTML = data.liked
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
        const detailBtnWrap = this._view.createElement(`div`, `table__row-data`)
        const detailBtn = this._view.createElement(`a`,`table__row-btn-detail`)
        detailBtn.textContent = '이동'

         //강퇴
         const deleteBtnWrap = this.createElement(`div`, `table__row-data` )
         const deleteBtn = this.createElement(`span`, `table__row-btn-delete`)
         deleteBtn.innerHTML = '삭제'
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


        //게시물이 삭제된상태라면
        //개쇼이동버튼이 보이면 안된다
        if(data.post_deleted_at != null){
            detailBtn.hidden = true
        }




        // console.log('링크',row.href)
    
        //서버에서 받아온 데이터 넣어주기
        indexSpanWrap.appendChild(indexSpan)
        postSpanWrap.appendChild(postSpan)
        commentSpanWrap.appendChild(titleSpan)
        profileNicknameSpanWrap.appendChild(profileNicknameSpan)
        likedSpanWrap.appendChild(likedSpan)
        bookmarkSpanWrap.appendChild(bookmarkSpan)
        createdAtSpanWrap.appendChild(createdAtSpan)
        deleterSpanWrap.appendChild(deleterSpan)
        deletedAtSpanWrap.appendChild(deletedAtSpan)
        detailBtnWrap.appendChild(detailBtn)
        deleteBtnWrap.appendChild(deleteBtn)
        deleteBtnWrap.appendChild(recoverBtn)
                    
        //표 안에 넣어주기
        row.appendChild(indexSpanWrap)
        row.appendChild(postSpanWrap)
        row.appendChild(commentSpanWrap)
        row.appendChild(profileNicknameSpanWrap)
        row.appendChild(likedSpanWrap)
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
                // postSpan.textContent ="회사 욕 하기"
                titleSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                indexSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                profileNicknameSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                likedSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                postSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                bookmarkSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                createdAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deleterSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deletedAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                detailBtn.href = `http://gaeshow.co.kr/badmouseview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 8:
                // postSpan.textContent = "자기 작업물 자랑"
                titleSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                indexSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                profileNicknameSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                likedSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                postSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                bookmarkSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                createdAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deleterSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deletedAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                detailBtn.href = `http://gaeshow.co.kr/portfolioview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 2:
                // postSpan.textContent = "업무 얘기 공유"
                titleSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                indexSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                profileNicknameSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                likedSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                postSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                bookmarkSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                createdAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deleterSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deletedAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                detailBtn.href = `http://gaeshow.co.kr/boardview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 5:
                // postSpan.textContent ="워크스페이스공유"
                // titleSpan.href = `/workspace__view.html?n=${data.post_id}`
                titleSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                indexSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                profileNicknameSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                likedSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                postSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                bookmarkSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                createdAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deleterSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deletedAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                detailBtn.href = `http://gaeshow.co.kr/workspace.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 4:
                // postSpan.textContent = "프리랜서 팁 공유"
                titleSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                indexSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                profileNicknameSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                likedSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                postSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                bookmarkSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                createdAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deleterSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
                deletedAtSpan.href = `/comment__view.html?n=${data.comment_id}&c=${data.category_id}`
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

        return [deleteBtn,recoverBtn]

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