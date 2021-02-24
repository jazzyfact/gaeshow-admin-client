import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class languageItem extends View{

    constructor() {
        super()
        this._view = new View()
        this._utils = new utils()
    }
    
    getLanguageItem = (data) => {
  
        const tableContent = this._view.getElement('#languageTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)


        //번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`a`, `table__row-data-index`)
        indexSpan.innerHTML = data.comment_id
        indexSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`

        //language 이름
        const ideSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const ideSpan = this._view.createElement(`a`, `table__row-data-post-type`)
        ideSpan.innerHTML = data.category_name
        ideSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`
                   
         //장점
        const goodSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const goodSpan = this._view.createElement(`a`, `table__row-data-ide`)
        goodSpan.innerHTML = data.advantage_content
        goodSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`

        //단점
        const badSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const badSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        badSpan.innerHTML = data.disadvantage_content
        badSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`

        //평점
        const averageSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const averageSpan = this._view.createElement(`a`, `table__row-data-post-content`)
        averageSpan.innerHTML = data.average_score
        averageSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`

        //작성자
        const profileNicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const profileNicknameSpan = this._view.createElement(`a`, `table__row-data-nickname`)
        profileNicknameSpan.innerHTML = data.profile_nickname
        profileNicknameSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`

         //등록일
        const createdAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const createdAtSpan = this._view.createElement(`a`, `table__row-data-created`)
        createdAtSpan.innerHTML = data.created_at
        createdAtSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`

         //삭제한사람
         const deleterSpanWrap = this._view.createElement(`div`, `table__row-data`)
         const deleterSpan = this._view.createElement(`a`, `table__row-data-created`)
         deleterSpan.innerHTML = data.deleter  
         deleterSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`    
 
                  
        //삭제일
        const deletedAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const deletedAtSpan = this._view.createElement(`a`, `table__row-data-deleted`)
        deletedAtSpan.innerHTML = data.deleted_at
        deletedAtSpan.href = `/ide__recommend.html?n=${data.post_id}&i=${data.comment_id}`

        //개쇼이동
        const detailBtnWrap = this._view.createElement(`div`, `table__row-data`)
        const detailBtn = this._view.createElement(`a`, `table__row-btn-detail`)
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
         detailBtn.href = `http://gaeshow.co.kr/remview.html?n=${data.category_id}&i=l`
         detailBtn.target =`target="_blank`
    
        //서버에서 받아온 데이터 넣어주기
        indexSpanWrap.appendChild(indexSpan)
        ideSpanWrap.appendChild(ideSpan)
        goodSpanWrap.appendChild(goodSpan)
        badSpanWrap.appendChild(badSpan)
        averageSpanWrap.appendChild(averageSpan)
        profileNicknameSpanWrap.appendChild(profileNicknameSpan)
        createdAtSpanWrap.appendChild(createdAtSpan)
        deleterSpanWrap.appendChild(deleterSpan)
        deletedAtSpanWrap.appendChild(deletedAtSpan)
        detailBtnWrap.appendChild(detailBtn)
        deleteBtnWrap.appendChild(deleteBtn)
        deleteBtnWrap.appendChild(recoverBtn)
      

                    
        //표 안에 넣어주기
        row.appendChild(indexSpanWrap)
        row.appendChild(ideSpanWrap)
        row.appendChild(goodSpanWrap)
        row.appendChild(badSpanWrap)
        row.appendChild(averageSpanWrap)
        row.appendChild(profileNicknameSpanWrap)
        row.appendChild(createdAtSpanWrap)
        row.appendChild(deleterSpanWrap)
        row.appendChild(deletedAtSpanWrap)
        row.appendChild(detailBtnWrap)
        row.appendChild(deleteBtnWrap)
        row.appendChild(deleteBtnWrap)
        tableContent.appendChild(row)


        if (data.deleted_at === null) {
            deletedAtSpan.textContent = '-'
            
        } else {
            deletedAtSpan.textContent = data.deleted_at
            deleteBtn.hidden = true
            detailBtn.hidden = true
        }

        //삭제한 사람이 관리자라면 버튼이 보이고
        //작성자라면 보여라
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