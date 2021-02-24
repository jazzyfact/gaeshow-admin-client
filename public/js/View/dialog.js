export default class dialog {
    constructor() {
        
    }

    createReportView = (data) => {
        // console.log('확인11',data)
        const background = document.createElement('div')
        background.classList.add('report')

        const wrap = document.createElement('div')
        wrap.classList.add('report__wrap')

        const title = document.createElement('h3')
        title.classList.add('report__title')
        title.innerHTML = '삭제이유(상세보기)'

        const subTitle = document.createElement('p')
        subTitle.classList.add('report__subTitle')
        
        const reasonDetail = document.createElement('p')
        reasonDetail.classList.add('report__detail')
        reasonDetail.innerHTML = data.reason

        const btnWrap = document.createElement('div')
        btnWrap.classList.add('report__btnWrap')
        const cancle = document.createElement('button')
        cancle.innerHTML = '확인'
    

        btnWrap.appendChild(cancle)
     

        background.appendChild(wrap)

        wrap.appendChild(title)
        wrap.appendChild(subTitle)
       wrap.appendChild(reasonDetail)
        wrap.appendChild(btnWrap)

        return [background,  reasonDetail, cancle]
}
}