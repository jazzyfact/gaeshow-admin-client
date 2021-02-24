import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class adminsItem extends View{

    constructor(){
        super()
        this._view = new View()
        this._utils = new utils()
    }   
    
    //관리자
 //받아온 회원 정보들을 테이블에 넣어줌
 getAdmin = (data) => {
   

            const tableContent = this._view.getElement('#adminTableSection')
            const row = document.createElement('a')
            row.classList.add(`table__row-data`)
       
       
              //번호
            const indexSpanWrap = this.createElement(`div`, `table__row-data`)
            const indexSpan = this.createElement(`a`, `table__row-data-index`)
            indexSpanWrap.appendChild(indexSpan)
            indexSpan.href = `/admin__view.html?n=${data.id}`
            //아이디
            const idSpanWrap = this.createElement(`div`, `table__row-data`, `table__row-data-emaillogin`)
            const idSpan = this.createElement(`a`, `table__row-data-emaillogin`)
            idSpanWrap.appendChild(idSpan)
            idSpan.href = `/admin__view.html?n=${data.id}`
             //이름
             const nameSpanWrap = this.createElement(`div`, `table__row-data`)
             const nameSpan = this.createElement(`a`, `table__row-data-name`)
             nameSpanWrap.appendChild(nameSpan)
             idSpan.href = `/admin__view.html?n=${data.id}`

            //닉네임
            const nicknameSpanWrap = this.createElement(`div`, `table__row-data`)
            const nicknameSpan = this.createElement(`a`, `table__row-data-nickname`)
            nicknameSpanWrap.appendChild(nicknameSpan)
            nicknameSpan.href = `/admin__view.html?n=${data.id}`
            
            //등급
            const gradeSpanWrap = this.createElement(`div`, `table__row-data`)
            const gradeSpan = this.createElement(`a`, `table__row-data-grade`)
            gradeSpanWrap.appendChild(gradeSpan)
            gradeSpan.href = `/admin__view.html?n=${data.id}`

            //추가한관리자
            const createAdminSpanWrap = this.createElement(`div`, `table__row-data`)
            const createAdminSpan = this.createElement(`a`, `table__row-data-admin`)
            createAdminSpanWrap.appendChild(createAdminSpan)
            createAdminSpan.href = `/admin__view.html?n=${data.id}`

            //가입일
            const createdAtSpanWrap = this.createElement(`div`, `table__row-data`)
            const createdAtSpan = this.createElement(`a`, `table__row-data-created`)
            createdAtSpanWrap.appendChild(createdAtSpan)
            createdAtSpan.href = `/admin__view.html?n=${data.id}`

            //탈퇴일
            const deletedAtSpanWrap = this.createElement(`div`, `table__row-data`)
            const deletedAtSpan = this.createElement(`a`, `table__row-data-deleted`)
            deletedAtSpanWrap.appendChild(deletedAtSpan)
            deletedAtSpan.href = `/admin__view.html?n=${data.id}`
            //
          
            //강퇴
            const deleteBtnWrap = this.createElement(`div`, `table__row-data` )
            const deleteBtn = this.createElement(`span`, `table__row-btn-delete`)
            // const restoreBtn = this.createElement(`span`, `table__row-btn-restore`)
            deleteBtn.textContent = '강퇴'
            // restoreBtn.textContent = '복구'
            deleteBtnWrap.appendChild(deleteBtn)
          
              //복구
            const recoverBtn = this.createElement(`span`, `table__row-btn-recover`)
            recoverBtn.innerHTML = '복구'
            deleteBtnWrap.appendChild(recoverBtn)


            // const deleteBtnWrap = this.createElement(`div`, `table__row-data` )
            // const deleteBtn = this.createElement(`span`, `table__row-btn-delete`)
          
            // deleteBtn.textContent = '강퇴'
           
            // deleteBtnWrap.appendChild(deleteBtn)
           

            // const restoreBtnWrap = this.createElement(`div`, `table__row-data` )
            // const restoreBtn = this.createElement(`span`, `table__row-btn-restore`)
            // restoreBtn.textContent = '복구'
            // restoreBtnWrap.appendChild(restoreBtn)

            //합치기
            row.appendChild(indexSpanWrap)
            row.appendChild(idSpanWrap)
            row.appendChild(nameSpanWrap)
            row.appendChild(nicknameSpanWrap)
            row.appendChild(gradeSpanWrap)
            row.appendChild(createAdminSpanWrap)
            row.appendChild(createdAtSpanWrap)
            row.appendChild(deletedAtSpanWrap)
            row.appendChild(deleteBtnWrap)
            row.appendChild(deleteBtnWrap)
            tableContent.appendChild(row)

            //받아온 데이터 넣어줌
           indexSpan.textContent = data.id
            idSpan.textContent = data.profile_id
            nicknameSpan.textContent = data.profile_nickname
            if (data.is_withdrawal === true) nicknameSpan.style.color = 'RED'
            nameSpan.textContent = data.name
            gradeSpan.textContent = data.grade
            createAdminSpan.textContent = data.create_admin
            createdAtSpan.textContent = data.created_at
            deletedAtSpan.textContent = data.deleted_at
           
           
            //탈퇴일이 null이라면
            if (data.deleted_at === null) {
                deletedAtSpan.textContent = '-'
                recoverBtn.hidden = true
               
            } else {
                //만약 관리자가 강퇴당했다면 복구버튼이 활성화되야하고
                //등급 변경 버튼은 없어야 한다
                // console.log('들어옴')
                deletedAtSpan.textContent = data.deleted_at
                deleteBtn.hidden = true //
                // restoreBtn.hidden = false
                // changeGradeBtn.hidden = true
                }

                return [deleteBtn,recoverBtn]
            }
 
    


       //관리자 강퇴
       deleteAdmin = async (resStatus, i) => {
        if (resStatus === 204) {
            utils().snackbar('회원이 강퇴되었습니다')
            const btn = this.getElement(`.amdins__table .table__content .table__row:nth-child(${i}) .table__row-btn-delete`)
            btn.hidden = true
        } else  utils().snackbar('회원이 강퇴되지 않았습니다')
    }
    //////////////회원 끝///////////////       

          
         //관리자 복구
       restoreAdmin = async (resStatus, i) => {
        if (resStatus === 204) {
            utils().snackbar('관리자가 복구되었습니다')
            const btn = this.getElement(`.amdins__table .table__content .table__row:nth-child(${i}) .table__row-btn-restore`)
            btn.hidden = true
        } else  utils().snackbar('관리자가 복구되지 않았습니다')
    }
//////////////관리자 끝///////////////

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

    //url에 있는 파라미터 값을 가져옴
    getParameterByName = (name) =>{
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}