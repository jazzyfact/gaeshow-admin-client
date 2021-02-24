import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class noticeItem extends View{

    constructor() {
        super()
        this._view = new View()
        this._utils = new utils()
    }
    
    getNoticeItem = (data) => {
  
        const tableContent = this._view.getElement('#noticeTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)

                  
        //링크
        
        // console.log('링크',row.href)
                

        //번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`a`, `table__row-data-index`)
        indexSpan.innerHTML = data.id
        indexSpan.href = `/notice__view.html?n=${data.id}`
                   
         //제목
        const titleSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const titleSpan = this._view.createElement(`a`, `table__row-data-post-id`)
        titleSpan.innerHTML = data.title
        titleSpan.href = `/notice__view.html?n=${data.id}`
                   
        //작성한 관리자
        const profileNicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const profileNicknameSpan = this._view.createElement(`a`, `table__row-data-nickname`)
        profileNicknameSpan.innerHTML = data.profile_nickname
        profileNicknameSpan.href = `/notice__view.html?n=${data.id}`
                   
         //등록일
        const createdAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const createdAtSpan = this._view.createElement(`a`, `table__row-data-created`)
        createdAtSpan.innerHTML = data.created_at
        createdAtSpan.href = `/notice__view.html?n=${data.id}`
                  
        //삭제일
        const deletedAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const deletedAtSpan = this._view.createElement(`a`, `table__row-data-deleted`)
        deletedAtSpan.innerHTML = data.deleted_at
        deletedAtSpan.href = `/notice__view.html?n=${data.id}`
                   
        //수정버튼
        // const editBtnWrap = this._view.createElement(`div`, `table__row-data`)
        // const editBtn = this._view.createElement(`span`, `table__row-btn-edit`)
        // editBtn.textContent = '수정'
                   
        //삭제버튼
        const deleteBtnWrap = this._view.createElement(`div`, `table__row-data`)
        const deleteBtn = this._view.createElement(`span`, `table__row-btn-delete`)
        deleteBtn.textContent = '삭제'
                    

        const detailBtnWrap = this._view.createElement(`div`, `table__row-data`)
        const detailBtn = this._view.createElement(`a`, `table__row-btn-detail`)
        detailBtn.textContent = '이동'
        //상세보기 링크
        detailBtn.href = `http://gaeshow.co.kr/notice.html`
        detailBtn.target =`target="_blank`

    
        //서버에서 받아온 데이터 넣어주기
        indexSpanWrap.appendChild(indexSpan)
        titleSpanWrap.appendChild(titleSpan)
        profileNicknameSpanWrap.appendChild(profileNicknameSpan)
        createdAtSpanWrap.appendChild(createdAtSpan)
        deletedAtSpanWrap.appendChild(deletedAtSpan)
        // editBtnWrap.appendChild(editBtn)
       
        detailBtnWrap.appendChild(detailBtn)
        deleteBtnWrap.appendChild(deleteBtn)

                    
        //표 안에 넣어주기
        row.appendChild(indexSpanWrap)
        row.appendChild(titleSpanWrap)
        row.appendChild(profileNicknameSpanWrap)
        row.appendChild(createdAtSpanWrap)
        row.appendChild(deletedAtSpanWrap)
        // row.appendChild(editBtnWrap)
        
        row.appendChild(detailBtnWrap)
        row.appendChild(deleteBtnWrap)
        tableContent.appendChild(row)


        //삭제일이 null이라면
        if (data.deleted_at === null) {
            deletedAtSpan.textContent = '-'
            } else {
            //삭제, 수정버튼 숨김
            deletedAtSpan.textContent = data.deleted_at
            deleteBtn.hidden = true
            detailBtn.hidden = true
            // editBtn.hidden =true
            }

        
            return [deleteBtn]
    }

       //url파라미터값 가져오기
       getParameterByName = (name) =>{
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
}