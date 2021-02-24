import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class questionItem extends View{

    constructor() {
        super()
        this._view = new View()
        this._utils = new utils()
    }
    
    getQuestionItem = (data) => {
  
        const tableContent = this._view.getElement('#questionTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)


        //번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`a`, `table__row-data-index`)
        indexSpan.innerHTML = data.id
        indexSpan.href = `/question__view.html?n=${data.id}`

        //문의 타입
        const typeSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const typeSpan = this._view.createElement(`a`, `table__row-data-post-type`)
        typeSpan.innerHTML = data.type
        typeSpan.href = `/question__view.html?n=${data.id}`
                   
         //제목
        const titleSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const titleSpan = this._view.createElement(`a`, `table__row-data-sub`)
        titleSpan.innerHTML = data.title
        titleSpan.href = `/question__view.html?n=${data.id}`

        //내용
        const contentSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const contentSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        contentSpan.innerHTML = data.content.replace(/(<([^>]+)>)/gi, '')
        contentSpan.href = `/question__view.html?n=${data.id}`
                   
        //문의한 사람
        const profileNicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const profileNicknameSpan = this._view.createElement(`a`, `table__row-data-nickname`)
        profileNicknameSpan.innerHTML = data.profile_nickname
        profileNicknameSpan.href = `/question__view.html?n=${data.id}`

         //등록일
        const createdAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const createdAtSpan = this._view.createElement(`a`, `table__row-data-created`)
        createdAtSpan.innerHTML = data.created_at
        createdAtSpan.href = `/question__view.html?n=${data.id}`
                  
        //삭제일
        const deletedAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const deletedAtSpan = this._view.createElement(`a`, `table__row-data-deleted`)
        deletedAtSpan.innerHTML = data.deleted_at
        deletedAtSpan.href = `/question__view.html?n=${data.id}`

         //문의상태
         const statusSpanWrap = this._view.createElement(`div`, `table__row-data`)
         const statusSpan = this._view.createElement(`a`, `table__row-data-post-id`)
         statusSpan.innerHTML = data.process_status     
         statusSpan.href = `/question__view.html?n=${data.id}`

        //처리한 관리자
        const adminSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const adminSpan = this._view.createElement(`a`, `table__row-data-post-id`)
        adminSpan.innerHTML = data.process_admin_nickname
        adminSpan.href = `/question__view.html?n=${data.id}`         


        // const detailBtnWrap = this._view.createElement(`div`, `table__row-data`)
        // const detailBtn = this._view.createElement(`a`, `table__row-btn-detail`)
        // detailBtn.textContent = '상세보기'
        // //상세보기 링크
        // detailBtn.href = `/question__view.html?n=${data.id}`
        // console.log('링크',row.href)
    
        //서버에서 받아온 데이터 넣어주기
        indexSpanWrap.appendChild(indexSpan)
        typeSpanWrap.appendChild(typeSpan)
        titleSpanWrap.appendChild(titleSpan)
        contentSpanWrap.appendChild(contentSpan)
        profileNicknameSpanWrap.appendChild(profileNicknameSpan)
        createdAtSpanWrap.appendChild(createdAtSpan)
        deletedAtSpanWrap.appendChild(deletedAtSpan)
        statusSpanWrap.appendChild(statusSpan)
        adminSpanWrap.appendChild(adminSpan)
        // detailBtnWrap.appendChild(detailBtn)

                    
        //표 안에 넣어주기
        row.appendChild(indexSpanWrap)
        row.appendChild(typeSpanWrap)
        row.appendChild(titleSpanWrap)
        row.appendChild(contentSpanWrap)
        row.appendChild(profileNicknameSpanWrap)
        row.appendChild(createdAtSpanWrap)
        row.appendChild(deletedAtSpanWrap)
        row.appendChild(statusSpanWrap)
        row.appendChild(adminSpanWrap)
        // row.appendChild(detailBtnWrap)
        tableContent.appendChild(row)
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