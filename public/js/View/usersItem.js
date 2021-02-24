import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class usersItem extends View {
    constructor() {
        super()
        this.utils = new utils()
        this._view = new View() 
    }

    //받아온 회원 정보들을 테이블에 넣어줌
    getUser = (data)=> {
                const tableContent = this._view.getElement('#userTableSection')
                const row = document.createElement('a')
                row.classList.add(`table__row-data`)

                //번호
                const indexSpanWrap = this.createElement(`div`, `table__row-data`)
                const indexSpan = this.createElement(`a`, `table__row-data-index`)
                indexSpanWrap.appendChild(indexSpan)
                indexSpan.href = `/user__view.html?n=${data.id}`

                //로그인타입
                const loginTypeSpanWrap = this.createElement(`div`, `table__row-data`)
                const loginTypeSapn = this.createElement(`a`, `table__row-data-type`)
                loginTypeSpanWrap.appendChild(loginTypeSapn)
                loginTypeSapn.href =  `/user__view.html?n=${data.id}`

                //이메일아이디
                const emailIdSpanWrap = this.createElement(`div`, `table__row-data`, `table__row-data-emaillogin`)
                const emailIdSpan = this.createElement(`a`, `table__row-data-emaillogin`)
                emailIdSpanWrap.appendChild(emailIdSpan)
                emailIdSpan.href = `/user__view.html?n=${data.id}`
             
                //닉네임
                const nicknameSpanWrap = this.createElement(`div`, `table__row-data`)
                const nicknameSpan = this.createElement(`a`, `table__row-data-nickname`)
                nicknameSpanWrap.appendChild(nicknameSpan)
                nicknameSpan.href = `/user__view.html?n=${data.id}`

                //성별
                const genderSpanWrap = this.createElement(`div`, `table__row-data`)
                const genderSpan = this.createElement(`a`, `table__row-data-gender`)
                genderSpanWrap.appendChild(genderSpan)
                genderSpan.href = `/user__view.html?n=${data.id}`

                //직종
                const jobSpanWrap = this.createElement(`div`, `table__row-data`)
                const jobSpan = this.createElement(`a`, `table__row-data-job`)
                jobSpanWrap.appendChild(jobSpan)
                jobSpan.href = `/user__view.html?n=${data.id}`

                //광고수신
                const pushStatusSpanWrap = this.createElement(`div`, `table__row-data`)
                const pushStatusSpan = this.createElement(`a`, `table__row-data-job-type`)
                pushStatusSpanWrap.appendChild(pushStatusSpan)
                pushStatusSpan.href = `/user__view.html?n=${data.id}`

                //가입일
                const createdAtSpanWrap = this.createElement(`div`, `table__row-data`)
                const createdAtSpan = this.createElement(`a`, `table__row-data-created`)
                createdAtSpanWrap.appendChild(createdAtSpan)
                createdAtSpan.href = `/user__view.html?n=${data.id}`
  
                //탈퇴일
                const deletedAtSpanWrap = this.createElement(`div`, `table__row-data`)
                const deletedAtSpan = this.createElement(`a`, `table__row-data-deleted`)
                deletedAtSpanWrap.appendChild(deletedAtSpan)
                deletedAtSpan.href = `/user__view.html?n=${data.id}`

                //마지막접속일
                const lastLoginAtSpanWrap = this.createElement(`div`, `table__row-data`)
                const lastLoginAtSpan = this.createElement(`a`, `table__row-data-deleted`)
                lastLoginAtSpanWrap.appendChild(lastLoginAtSpan)
                lastLoginAtSpan.href = `/user__view.html?n=${data.id}`

              
              
                //회원상태(강퇴/탈퇴)
                const leavedBtnSpanWrap = this.createElement(`div`, `table__row-data` )
                const leavedBtnSpan = this.createElement(`a`, `table__row-btn-last`)
                leavedBtnSpan.innerHTML = '탈퇴'
                leavedBtnSpanWrap.appendChild(leavedBtnSpan)
                leavedBtnSpan.href = `/user__view.html?n=${data.id}`
              

                //강퇴
                const deleteBtnSpanWrap = this.createElement(`div`, `table__row-data` )
                const deleteBtnSpan = this.createElement(`span`, `table__row-btn-delete`)
                deleteBtnSpan.textContent = '강퇴'
                deleteBtnSpanWrap.appendChild(deleteBtnSpan)
                //복구
                // const recoverBtnWrap = this.createElement(`div`, `table__row-data` )
                const recoverBtnSpan = this.createElement(`span`, `table__row-btn-recover`)
                recoverBtnSpan.innerHTML = '복구'
                deleteBtnSpanWrap.appendChild(recoverBtnSpan)

                //합치기
                row.appendChild(indexSpanWrap)
                row.appendChild(loginTypeSpanWrap)
                row.appendChild(emailIdSpanWrap)
                row.appendChild(nicknameSpanWrap)
                row.appendChild(genderSpanWrap)
                row.appendChild(jobSpanWrap)
                row.appendChild(pushStatusSpanWrap)
                row.appendChild(createdAtSpanWrap)
                row.appendChild(deletedAtSpanWrap)
                row.appendChild(lastLoginAtSpanWrap)
                row.appendChild(leavedBtnSpanWrap)
                row.appendChild(deleteBtnSpanWrap)
              
             
                tableContent.appendChild(row)

                //받아온 데이터 넣어줌
                indexSpan.textContent = data.id
                loginTypeSapn.textContent = data.registered_type
                emailIdSpan.textContent = data.profile_email
                nicknameSpan.textContent = data.profile_nickname
                if (data.is_withdrawal === true) nicknameSpan.style.color = 'RED'
                genderSpan.textContent = data.profile_gender
                jobSpan.textContent = data.job_type
                pushStatusSpan.textContent = data.push_status
               
                createdAtSpan.textContent = data.created_at
                leavedBtnSpan.textContent = data.is_kick
                lastLoginAtSpan.textContent = data.last_connect_at

                //탈퇴일이 null이라면
                //복구버튼은 숨기고 강퇴버튼은 보임
                if (data.deleted_at === null) {
                    deletedAtSpan.textContent = '-'
                    recoverBtnSpan.hidden =true
                } else {
                    //회원이 강퇴 당했다면 강퇴버튼은 숨기고 복구버튼은 보임
                    deletedAtSpan.textContent = data.deleted_at
                    deleteBtnSpan.hidden =true
                }
               //유저가 직접 탈퇴했다면(탈퇴) 복구버튼 숨김
                switch(data.is_kick){
                    case '강퇴':
                        leavedBtnSpan.hidden = true
                    break
                    case '탈퇴':
                        deleteBtnSpan.hidden = true
                        recoverBtnSpan.hidden =true
                    break
                    
                }



                return [deleteBtnSpan, recoverBtnSpan]
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


    //삭제된 회원 정보 아이템
     //받아온 회원 정보들을 테이블에 넣어줌
     getRemoveUser = (data)=> {
        const tableContent = this._view.getElement('#removeUserTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)

        //번호
        const indexSpanWrap = this.createElement(`div`, `table__row-data`)
        const indexSpan = this.createElement(`a`, `table__row-data-index`)
        indexSpanWrap.appendChild(indexSpan)
        indexSpan.href =  `/remove__user__view.html?n=${data.user_id}`

        //서비스db 회원 번호
        const serviceDbIndexSpanWrap = this.createElement(`div`, `table__row-data`)
        const serviceDbIndexSpan = this.createElement(`a`, `table__row-data-service`)
        serviceDbIndexSpanWrap.appendChild(serviceDbIndexSpan)
        serviceDbIndexSpan.href =  `/remove__user__view.html?n=${data.user_id}`

        //로그인타입
        const loginTypeSpanWrap = this.createElement(`div`, `table__row-data`)
        const loginTypeSapn = this.createElement(`a`, `table__row-data-service`)
        loginTypeSpanWrap.appendChild(loginTypeSapn)
        loginTypeSapn.href =  `/remove__user__view.html?n=${data.user_id}`

        //이메일아이디
        const emailIdSpanWrap = this.createElement(`div`, `table__row-data`, `table__row-data-emaillogin`)
        const emailIdSpan = this.createElement(`a`, `table__row-data-emaillogin`)
        emailIdSpanWrap.appendChild(emailIdSpan)
        emailIdSpan.href =  `/remove__user__view.html?n=${data.user_id}`
     
        //닉네임
        const nicknameSpanWrap = this.createElement(`div`, `table__row-data`)
        const nicknameSpan = this.createElement(`a`, `table__row-data-nickname`)
        nicknameSpanWrap.appendChild(nicknameSpan)
        nicknameSpan.href =  `/remove__user__view.html?n=${data.user_id}`

        //성별
        const genderSpanWrap = this.createElement(`div`, `table__row-data`)
        const genderSpan = this.createElement(`a`, `table__row-data-gender`)
        genderSpanWrap.appendChild(genderSpan)
        genderSpan.href =  `/remove__user__view.html?n=${data.user_id}`

        //직종
        const jobSpanWrap = this.createElement(`div`, `table__row-data`)
        const jobSpan = this.createElement(`a`, `table__row-data-job`)
        jobSpanWrap.appendChild(jobSpan)
        jobSpan.href =  `/remove__user__view.html?n=${data.user_id}`

         //제휴업체
         const affiliatedSpanWrap = this.createElement(`div`, `table__row-data`)
         const affiliatedSpan = this.createElement(`a`, `table__row-data-job-type`)
         affiliatedSpanWrap.appendChild(affiliatedSpan)
         affiliatedSpan.href =  `/remove__user__view.html?n=${data.user_id}`

        //광고수신
        const pushStatusSpanWrap = this.createElement(`div`, `table__row-data`)
        const pushStatusSpan = this.createElement(`a`, `table__row-data-job-type`)
        pushStatusSpanWrap.appendChild(pushStatusSpan)
        pushStatusSpan.href =  `/remove__user__view.html?n=${data.user_id}`

        //마지막접속일
        const lastLoginAtSpanWrap = this.createElement(`div`, `table__row-data`)
        const lastLoginAtSpan = this.createElement(`a`, `table__row-data-last`)
        lastLoginAtSpanWrap.appendChild(lastLoginAtSpan)
        lastLoginAtSpan.href =  `/remove__user__view.html?n=${data.user_id}`

        //가입일
        const createdAtSpanWrap = this.createElement(`div`, `table__row-data`)
        const createdAtSpan = this.createElement(`a`, `table__row-data-created`)
        createdAtSpanWrap.appendChild(createdAtSpan)
        createdAtSpan.href =  `/remove__user__view.html?n=${data.user_id}`

        //탈퇴일
        const deletedAtSpanWrap = this.createElement(`div`, `table__row-data`)
        const deletedAtSpan = this.createElement(`a`, `table__row-data-deleted`)
        deletedAtSpanWrap.appendChild(deletedAtSpan)
        deletedAtSpan.href =  `/remove__user__view.html?n=${data.user_id}`
      
        //강퇴여부
        const isKickSpanWrap = this.createElement(`div`, `table__row-data`)
        const isKickSpan = this.createElement(`a`, `table__row-data-deleted`)
        isKickSpanWrap.appendChild(isKickSpan)
        isKickSpan.href =  `/remove__user__view.html?n=${data.user_id}`
        //회원상태(강퇴/탈퇴)
        // const leavedBtnWrap = this.createElement(`div`, `table__row-data` )
        // const leavedBtn = this.createElement(`span`, `table__row-btn-leave`)
        // leavedBtn.innerHTML = '탈퇴'
        // deleteBtnWrap.appendChild(leavedBtn)
        // //강퇴
        // const deleteBtnWrap = this.createElement(`div`, `table__row-data` )
        // const deleteBtn = this.createElement(`span`, `table__row-btn-delete`)
        // deleteBtn.textContent = '강퇴'
        // deleteBtnWrap.appendChild(deleteBtn)
      
        //합치기
        row.appendChild(indexSpanWrap)
        row.appendChild(serviceDbIndexSpanWrap)
        row.appendChild(loginTypeSpanWrap)
        row.appendChild(emailIdSpanWrap)
        row.appendChild(nicknameSpanWrap)
        row.appendChild(genderSpanWrap)
        row.appendChild(jobSpanWrap)
        row.appendChild(affiliatedSpanWrap)
        row.appendChild(pushStatusSpanWrap)
        row.appendChild(createdAtSpanWrap)
        row.appendChild(deletedAtSpanWrap)
        row.appendChild(lastLoginAtSpanWrap)
        row.appendChild(isKickSpanWrap)
        // row.appendChild(deleteBtnWrap)
        tableContent.appendChild(row)

        //받아온 데이터 넣어줌
        indexSpan.textContent = data.id
        serviceDbIndexSpan.textContent = data.user_id
        loginTypeSapn.textContent = data.registered_type
        emailIdSpan.textContent = data.profile_email
        nicknameSpan.textContent = data.profile_nickname
        // if (data.is_withdrawal === true) nicknameSpan.style.color = 'RED'
        genderSpan.textContent = data.profile_gender
        jobSpan.textContent = data.job_type
        affiliatedSpan.textContent = data.affiliated
        pushStatusSpan.textContent = data.push_status
        lastLoginAtSpan.textContent = data.last_connect_at
        createdAtSpan.textContent = data.created_at
        isKickSpan.textContent = data.is_kick

        //탈퇴일이 null이라면
        //복구버튼은 숨기고 강퇴버튼은 보임
        if (data.deleted_at === null) {
            deletedAtSpan.textContent = '-'
      
        } else {
            //회원이 강퇴 당했다면 강퇴버튼은 숨기고 복구버튼은 보임
            deletedAtSpan.textContent = data.deleted_at
            // deleteBtn.hidden =true
        }
       


        


        // return [deleteBtn]
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



    getParameterByName = (name) =>{
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

        }
    









