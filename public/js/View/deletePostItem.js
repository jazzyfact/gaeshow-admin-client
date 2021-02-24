export default class deletePostItem {
    constructor() {
        this._data = [
            { name: '선택해주세요', value: '0' },
            { name: '구입처 요청', value: "구입처 요청" },
            { name: '스포/낚시', value: '스포/낚시' },
            { name: '매물글', value: '매물글' },
            { name: '과도한 친목', value: '과도한 친목' },
            { name: '홍보', value: '홍보' },
            { name: '비매너', value: '비매너' },
            { name: '음란성', value: '음란성' },
            { name: '정치/사회 관련', value: '정치/사회 관련' },
            { name: '허위 사실', value: '허위 사실' },
            { name: '도배성 글', value: '도배성 글' },
            { name: '투자/투기', value: '투자/투기' },
            { name: '거짓 유저 정보', value: '거짓 유저 정보' },
            { name: '기타', value: '기타' }
        ]
    }

    createReportView = () => {
        const background = document.createElement('div')
        background.classList.add('report')

        const wrap = document.createElement('div')
        wrap.classList.add('report__wrap')

        const title = document.createElement('h3')
        title.classList.add('report__title')
        title.innerHTML = '삭제하기'

        const subTitle = document.createElement('p')
        subTitle.classList.add('report__subTitle')
        subTitle.innerHTML = '삭제 사유'

        const selector = document.createElement('select')
        selector.classList.add('report__select')

        this._data.map((e) => {
            const option = document.createElement('option')
            option.value = e.value
            option.innerHTML = e.name

            selector.appendChild(option)
        })

        const textArea = document.createElement('textarea')
        textArea.placeholder = '삭제상세이유입니다(선택사항)'

        const btnWrap = document.createElement('div')
        btnWrap.classList.add('report__btnWrap')
        const cancle = document.createElement('button')
        cancle.innerHTML = '취소'
        const btn = document.createElement('button')
        btn.innerHTML = '삭제'

        btnWrap.appendChild(cancle)
        btnWrap.appendChild(btn)

        background.appendChild(wrap)

        wrap.appendChild(title)
        wrap.appendChild(subTitle)
        wrap.appendChild(selector)
        wrap.appendChild(textArea)
        wrap.appendChild(btnWrap)

        return [background, selector, textArea, btn, cancle]
    }
}