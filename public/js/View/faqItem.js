import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class fnqItem extends View{

    constructor() {
        super()
        this._view = new View()
        this._utils = new utils()
    }
    
    getFaqItem = (data) => {
  
        const tableContent = this._view.getElement('#faqTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)


        //번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`span`, `table__row-data-index`)
        indexSpan.innerHTML = data.id
                   
         //제목
        const titleSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const titleSpan = this._view.createElement(`a`, `table__row-data-post-id`)
        titleSpan.innerHTML = data.title
        titleSpan.href = `/faq__view.html?n=${data.id}`
                   
        //작성한 관리자
        const profileNicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const profileNicknameSpan = this._view.createElement(`span`, `table__row-data-nickname`)
        profileNicknameSpan.innerHTML = data.profile_nickname
                   
         //등록일
        const createdAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const createdAtSpan = this._view.createElement(`span`, `table__row-data-created`)
        createdAtSpan.innerHTML = data.created_at
                  
        //삭제일
        const deletedAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const deletedAtSpan = this._view.createElement(`span`, `table__row-data-deleted`)
                    deletedAtSpan.innerHTML = data.deleted_at
                           
        //삭제버튼
        const deleteBtnWrap = this._view.createElement(`div`, `table__row-data`)
        const deleteBtn = this._view.createElement(`span`, `table__row-btn-delete`)
        deleteBtn.textContent = '삭제'

        const detailBtnWrap = this._view.createElement(`div`, `table__row-data`)
        const detailBtn = this._view.createElement(`a`, `table__row-btn-detail`)
        detailBtn.textContent = '이동'
        detailBtn.href = `http://gaeshow.co.kr/faq.html`
        detailBtn.target =`target="_blank`
        //상세보기 링크
      
        // console.log('링크',row.href)
    
        //서버에서 받아온 데이터 넣어주기
        indexSpanWrap.appendChild(indexSpan)
        titleSpanWrap.appendChild(titleSpan)
        profileNicknameSpanWrap.appendChild(profileNicknameSpan)
        createdAtSpanWrap.appendChild(createdAtSpan)
        deletedAtSpanWrap.appendChild(deletedAtSpan)
    
        detailBtnWrap.appendChild(detailBtn)
        deleteBtnWrap.appendChild(deleteBtn)
                    
        //표 안에 넣어주기
        row.appendChild(indexSpanWrap)
        row.appendChild(titleSpanWrap)
        row.appendChild(profileNicknameSpanWrap)
        row.appendChild(createdAtSpanWrap)
        row.appendChild(deletedAtSpanWrap)
     
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