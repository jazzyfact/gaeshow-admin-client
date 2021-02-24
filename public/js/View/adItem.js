import utils from '../Core/Singleton/utils.js'
import View from '../Core/Mvc/View.js'

export default class adItem extends View{

    constructor() {
        super()
        this._view = new View()
        this._utils = new utils()
    }
    
    getAdItem = (data) => {
  
        const tableContent = this._view.getElement('#adTableSection')
        const row = document.createElement('a')
        row.classList.add(`table__row-data`)


        //번호
        const indexSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const indexSpan = this._view.createElement(`a`, `table__row-data-index`)
        indexSpan.innerHTML = data.id
        indexSpan.href = `/ad__view.html?n=${data.id}`
        //회원 번호
        const userIdSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const userIdSpan = this._view.createElement(`a`, `table__row-data-post-type`)
        userIdSpan.innerHTML = data.user_id
        userIdSpan.href = `/ad__view.html?n=${data.id}`
         //제휴 업체
        const nicknameSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const nicknameSpan = this._view.createElement(`a`, `table__row-data-title`)
        nicknameSpan.innerHTML = data.profile_nickname
        nicknameSpan.href = `/ad__view.html?n=${data.id}`
        //광고위치
        const locationSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const locationSpan = this._view.createElement(`a`, `table__row-data-deleted`)
        locationSpan.innerHTML = data.location
        locationSpan.href = `/ad__view.html?n=${data.id}`
        //광고이미지
        const imageUrlSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const imageUrlSpan = this._view.createElement(`a`, `table__row-data-url`)
        imageUrlSpan.innerHTML = data.image_url
        imageUrlSpan.href = `/ad__view.html?n=${data.id}`
        //광고상태
        const statusSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const statusSpan = this._view.createElement(`a`, `table__row-data-index`)
        statusSpan.innerHTML = data.ad_status
        statusSpan.href = `/ad__view.html?n=${data.id}`
        //광고시작일
        const adStartAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const adStartAtSpan = this._view.createElement(`a`, `table__row-data-start`)
        adStartAtSpan.innerHTML = data.started_at
        adStartAtSpan.href = `/ad__view.html?n=${data.id}`
         //광고종료일
         const adEndAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
         const adEndAtSpan = this._view.createElement(`a`, `table__row-data-deleted`)
         adEndAtSpan.innerHTML = data.ended_at
         adEndAtSpan.href = `/ad__view.html?n=${data.id}`
        //광고등록일
        const createdAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const createdAtSpan = this._view.createElement(`a`, `table__row-data-created`)
        createdAtSpan.innerHTML = data.created_at
        createdAtSpan.href = `/ad__view.html?n=${data.id}`
        //광고정지일
        const stoppedAtSpanWrap = this._view.createElement(`div`, `table__row-data`)
        const stoppedAtSpan = this._view.createElement(`a`, `table__row-data-created`)
        stoppedAtSpan.innerHTML = data.stopped_at
        stoppedAtSpan.href = `/ad__view.html?n=${data.id}`
        //강퇴
        const stopBtnSpanWrap = this.createElement(`div`, `table__row-data` )
        const stopBtnSpan = this.createElement(`span`, `table__row-btn-detail`)
        stopBtnSpan.textContent = '정지'
        stopBtnSpanWrap.appendChild(stopBtnSpan)
    

        // const detailBtnWrap = this._view.createElement(`div`, `table__row-data`)
        // const detailBtn = this._view.createElement(`a`, `table__row-btn-detail`)
        // detailBtn.textContent = '이동'
        // //상세보기 링크
        // detailBtn.href = `http://gaeshow.co.kr/remview.html?n=${data.category_id}&i=i`
        // detailBtn.target =`target="_blank`
    
        //서버에서 받아온 데이터 넣어주기
        indexSpanWrap.appendChild(indexSpan)
        userIdSpanWrap.appendChild(userIdSpan)
        nicknameSpanWrap.appendChild(nicknameSpan)
        locationSpanWrap.appendChild(locationSpan)
        imageUrlSpanWrap.appendChild(imageUrlSpan)
        statusSpanWrap.appendChild(statusSpan)
        adStartAtSpanWrap.appendChild(adStartAtSpan)
        adEndAtSpanWrap.appendChild(adEndAtSpan)
        createdAtSpanWrap.appendChild(createdAtSpan)
        stoppedAtSpanWrap.appendChild(stoppedAtSpan)
        stopBtnSpanWrap.appendChild(stopBtnSpan)
     


                    
        //표 안에 넣어주기
        row.appendChild(indexSpanWrap)
        row.appendChild(userIdSpanWrap)
        row.appendChild(nicknameSpanWrap)
        row.appendChild(locationSpanWrap)
        row.appendChild(imageUrlSpanWrap)
        row.appendChild(statusSpanWrap)
        row.appendChild(adStartAtSpanWrap)
        row.appendChild(adEndAtSpanWrap)
        row.appendChild(createdAtSpanWrap)
        row.appendChild(stoppedAtSpanWrap)
        row.appendChild(stopBtnSpanWrap)
        tableContent.appendChild(row)

        switch(data.ad_status){
            case "scheduled":
                statusSpan.innerHTML = "광고예정"
                break
            case "posting":
                statusSpan.innerHTML = "광고진행중"
                break
            case "end":
                statusSpan.innerHTML = "종료"
                stopBtnSpan.hidden = true
                break
            case "stopped":
                statusSpan.innerHTML = "광고정지"
                break
        }

        if (data.stopped_at === null) {
            stoppedAtSpan.textContent = '-'
        } else {
            stoppedAtSpan.textContent = data.stopped_at
            stopBtnSpan.hidden = true
            
        }

       
   //이렇게 리턴해주면 컨트롤러에서 쓸 수 있음!!!!
   return [stopBtnSpan] 
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