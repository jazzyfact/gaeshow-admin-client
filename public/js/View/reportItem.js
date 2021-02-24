import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class reportItem extends View{

    constructor() {
        super()
        this._view = new View()
        this._utils = new utils()
    }
    
    getReportnItem = (data) => {
        // console.log("getReportnItem",data)
      
        const tableContent = this._view.getElement('#reportTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)


        //번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`a`, `table__row-data-index`)
        indexSpan.innerHTML = data.id
        indexSpan.href = `/report__view.html?n=${data.id}`
        //신고 타입
        const typeSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const typeSpan = this._view.createElement(`a`, `table__row-data-post-type`)
        typeSpan.innerHTML = data.type
        typeSpan.href = `/report__view.html?n=${data.id}`
        //신고 이유
        const reasonSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const reasonSpan = this._view.createElement(`a`, `table__row-data-post-type`)
        reasonSpan.innerHTML = data.reason
        reasonSpan.href = `/report__view.html?n=${data.id}`
        //신고한 게시물
        const uniqueIdSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const uniqueIdSpan = this._view.createElement(`a`, `table__row-data-unique`)
        uniqueIdSpan.innerHTML = data.post_id     
        uniqueIdSpan.href = `/report__view.html?n=${data.id}` 

        //내용
        const contentSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const contentSpan = this._view.createElement(`a`, `table__row-data-con`)
        contentSpan.innerHTML = data.content.replace(/(<([^>]+)>)/gi, '')
        contentSpan.href = `/report__view.html?n=${data.id}`
                   
        //문의한 사람
        const profileNicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const profileNicknameSpan = this._view.createElement(`a`, `table__row-data-write`)
        profileNicknameSpan.innerHTML = data.profile_nickname
        profileNicknameSpan.href = `/report__view.html?n=${data.id}`
         //등록일
        const createdAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const createdAtSpan = this._view.createElement(`a`, `table__row-data-created`)
        createdAtSpan.innerHTML = data.created_at
        createdAtSpan.href = `/report__view.html?n=${data.id}`
                  
        //삭제일
        // const deletedAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        // const deletedAtSpan = this._view.createElement(`span`, `table__row-data-deleted`)
        // deletedAtSpan.innerHTML = data.deleted_at
         //신고상태
         const statusSpanWrap = this._view.createElement(`div`, `table__row-data`)
         const statusSpan = this._view.createElement(`a`, `table__row-data-post-id`)
         statusSpan.innerHTML = data.process_status   
         statusSpan.href = `/report__view.html?n=${data.id}`               
        //처리한 관리자
        const adminSpanWrap = this._view.createElement(`a`, `table__row-data`)
        const adminSpan = this._view.createElement(`a`, `table__row-data-post-id`)
        adminSpan.innerHTML = data.process_admin_nickname
        adminSpan.href = `/report__view.html?n=${data.id}`         


        const detailBtnWrap = this._view.createElement(`div`, `table__row-data`)
        const detailBtn = this._view.createElement(`a`, `table__row-btn-detail`)
        detailBtn.textContent = '이동'
        //상세보기 링크
       
        // console.log('링크',row.href)
    
        //서버에서 받아온 데이터 넣어주기
        indexSpanWrap.appendChild(indexSpan)
        typeSpanWrap.appendChild(typeSpan)
        reasonSpanWrap.appendChild(reasonSpan)
        uniqueIdSpanWrap.appendChild(uniqueIdSpan)
        contentSpanWrap.appendChild(contentSpan)
        profileNicknameSpanWrap.appendChild(profileNicknameSpan)
        createdAtSpanWrap.appendChild(createdAtSpan)
        statusSpanWrap.appendChild(statusSpan)
        adminSpanWrap.appendChild(adminSpan)
        detailBtnWrap.appendChild(detailBtn)

                    
        //표 안에 넣어주기
        row.appendChild(indexSpanWrap)
        row.appendChild(typeSpanWrap)
        row.appendChild(reasonSpanWrap)
        row.appendChild(uniqueIdSpanWrap)
        row.appendChild(contentSpanWrap)
        row.appendChild(profileNicknameSpanWrap)
        row.appendChild(createdAtSpanWrap)
        row.appendChild(statusSpanWrap)
        row.appendChild(adminSpanWrap)
        row.appendChild(detailBtnWrap)
        tableContent.appendChild(row)



        if(data.post_deleted_at != null){
            detailBtn.hidden = true
        }

        if(data.type == 'post'){
            typeSpan.innerHTML = '커뮤니티의 게시글'
        }
        else  if(data.type == 'comment_of_post'){
            typeSpan.innerHTML = '커뮤니티의 댓글'
        }
        else  if(data.type == 'product'){
            typeSpan.innerHTML = '상품'
        }
        else  if(data.type == 'comment_of_product'){
            typeSpan.innerHTML = '상품의 댓글'
        }
        else  if(data.type == 'qna_of_product'){
            typeSpan.innerHTML = '상품 Q&A의 댓글'
        }

        


        //상세보기 링크
        //관리자페이지에서 상세보기 화면으로 넘어가는 경우
        //관리자페이지에서 새탭으로 서비스 페이지로 넘아가는 경우(개발자쇼핑몰)
        switch(data.post_category_id){
            case 3:
                // categorySpan.textContent ="회사 욕 하기"
                // titleSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/badmouseview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 8:
                // categorySpan.textContent = "자기 작업물 자랑"
                // titleSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/portfolioview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 2:
                // categorySpan.textContent = "업무 얘기 공유"
                // titleSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/boardview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 5:
                // categorySpan.textContent ="워크스페이스공유"
                // detailBtn.href = `/workspace__view.html?n=${data.post_id}`
                // titleSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/workspace.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
            case 4:
                // categorySpan.textContent = "프리랜서 팁 공유"
                // titleSpan.href = `/board__view.html?n=${data.post_id}`
                detailBtn.href = `http://gaeshow.co.kr/tipsview.html?n=${data.post_id}`
                detailBtn.target =`target="_blank`
                break
        }

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