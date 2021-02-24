import utils from '../Core/Singleton/utils.js'

export default class pagination {
    constructor(allCount, nowIndex, limit, type, blockCount = 10) {
        this._type = type
        this._allCount = allCount
        this._nowIndex = nowIndex
        this._limit = limit
        this._blockCount = blockCount
        this._utils = new utils()

        this._totalPage = Math.ceil(this._allCount / this._limit) +1
        // this._totalPage = parseInt(this._allCount / this._limit) + 1
       

        // this._totalPage = 20
        if (this._totalPage > this._blockCount * this._totalPage) {
            this._totalPage++
        }
        this._startPage = parseInt((this._nowIndex - 1) / this._blockCount) * this._blockCount + 1
        this._endPage = this._startPage + this._blockCount
        // this._endPage = this._pageGroup * this.blockCount
        
        if (this._endPage > this._totalPage) this._endPage = this._totalPage

        // console.log("allcount", this._allCount)
        // console.log("totalPage",  this._totalPage)
        // console.log("endPage", this._endPage)
        // console.log("_startPage", this._startPage)


        // console.log(this._allCount, this._nowIndex, this._totalPage, this._startPage, this._endPage)
    }

    //공지사항페이징
    getNoticePaging(data) {
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/notice.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`

            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        // console.log(this._startPage, this._endPage)
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')

           
            if(type == '') tempA.href= `/notice.html?p=${i}`
            if(type != ''  && searchText != '') tempA.href= `/notice.html?p=${i}&t=${type}&s=${searchText}`
             //필터가 undefined 이면
        //   if(data == "dafault"){
        //     tempA.href =`/notice.html?p=${i}`
        //     // tempA.href =`/index.html`
        //   }
        //   else{
        //     tempA.href =`/notice.html?p=${i}&filter=${data}`
        //   }
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `notice.html?p=${this._startPage + this._blockCount}`

            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }

    //언어페이징
    getLanguagePaging(filter) {
        // console.log("직힘",data)
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/language.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`
            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        // console.log(this._startPage, this._endPage)
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
           if(filter != '') tempA.href= `/language.html?p=${i}&filter=${filter}`
            if(filter == '') tempA.href= `/language.html?p=${i}`
            if(filter != '' && type != '' && searchText != '') tempA.href= `/language.html?p=${i}&filter=${filter}&t=${type}&s=${searchText}`
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `language.html?p=${this._startPage + this._blockCount}`
            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }

    //자주하는질문
    getFaqPaging(data) {
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/faq.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`
            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')
        // console.log(this._startPage, this._endPage)
        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
            // if(data == "dafault"){
            //     tempA.href =`/faq.html?p=${i}`
            //     // tempA.href =`/index.html`
            //   }
            //   else{
            //     tempA.href =`/faq.html?p=${i}&filter=${data}`
            //   }
            if(type == '') tempA.href= `/faq.html?p=${i}`
            if(type != ''  && searchText != '') tempA.href= `/faq.html?p=${i}&t=${type}&s=${searchText}`
             //필터가 undefined 이면
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `faq.html?p=${this._startPage + this._blockCount}`
            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }
    //문의하기
    getQuestionPaging(service_type, filter) {
        // console.log("받은필터",service_type, filter)
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/question.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`
            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')
        // console.log(this._startPage, this._endPage)
        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
            // if(service_type != '' && filter != '') tempA.href= `/question.html?p=${i}&service_type=${service_type}&filter=${filter}`
            // if(service_type == '' && filter == '') tempA.href= `/question.html?p=${i}`
            if(service_type == ''  && filter == '') tempA.href= `/question.html?p=${i}`
            if(service_type != ''  &&  filter != '') tempA.href= `/question.html?p=${i}&service_type=${service_type}&filter=${filter}&t=${type}&s=${searchText}`
            // if(data == "dafault"){
            //     tempA.href =`/question.html?p=${i}`
            //     // tempA.href =`/index.html`
            //   }
            //   else{
            //     tempA.href =`/question.html?p=${i}&filter=${data}`
            //   }
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `question.html?p=${this._startPage + this._blockCount}`
            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }

    //신고하기
    getReportPaging(service_type, report_reason, filter) {
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/report.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`
            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        // console.log(this._startPage, this._endPage)
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        for (let i = this._startPage; i < this._endPage ; i++) {
             console.log("i",i)
           
            const tempA = document.createElement('a')
           
            if(service_type == '' && report_reason == '' && filter == '') tempA.href= `/report.html?p=${i}`
            if(service_type != ''  && report_reason != '' && filter != '') tempA.href= `/report.html?p=${i}&service_type=${service_type}&report_reason=${report_reason}&filter=${filter}&t=${type}&s=${searchText}`
            
            
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `report.html?p=${this._startPage + this._blockCount}`
            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }
    //게시판
    getPostPaging(category_id,filter) {
        // console.log("직힘",category_id,filter)
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/post.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`
            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')

        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        // console.log(this._startPage, this._endPage)
        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
            if(category_id != '' && filter != '') tempA.href= `/post.html?p=${i}&category_id=${category_id}&filter=${filter}`
            if(category_id == '' && filter == '') tempA.href= `/post.html?p=${i}`
            if(category_id != '' && filter != '' && type != '' && searchText != '') tempA.href= `/post.html?p=${i}&category_id=${category_id}&filter=${filter}&t=${type}&s=${searchText}`


            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `post.html?p=${this._startPage + this._blockCount}`
            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }
     //게시판
     getAdPaging(filter) {
        // console.log("직힘",data)
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/ad.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`
            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        // console.log(this._startPage, this._endPage)
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
            if(filter != '') tempA.href= `/ad.html?p=${i}&filter=${filter}`
            if(filter == '') tempA.href= `/ad.html?p=${i}`
            if(filter != '' && type != '' && searchText != '') tempA.href= `/ad.html?p=${i}&filter=${filter}&t=${type}&s=${searchText}`
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `ad.html?p=${this._startPage + this._blockCount}`
            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }
     //댓글페이징
     getCommentPaging(category_id,filter) {
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/comments.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`

            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        // console.log(this._startPage, this._endPage)
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
            if(category_id != '' && filter != '') tempA.href= `/comments.html?p=${i}&category_id=${category_id}&filter=${filter}`
            if(category_id == '' && filter == '') tempA.href= `/comments.html?p=${i}`
            if(category_id != '' && filter != '' && type != '' && searchText != '') tempA.href= `/comments.html?p=${i}&category_id=${category_id}&filter=${filter}&t=${type}&s=${searchText}`

            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `comments.html?p=${this._startPage + this._blockCount}`

            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }

     //관리자페이징
     getAdminPaging(filter) {
        //    console.log("받아온",data)
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/admin__list.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`

            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        // console.log(this._startPage, this._endPage)
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
           if(filter != '') tempA.href= `/admin__list.html?p=${i}&filter=${filter}`
            if(filter == '') tempA.href= `/admin__list.html?p=${i}`
            if(filter != '' && type != '' && searchText != '') tempA.href= `/admin__list.html?p=${i}&filter=${filter}&t=${type}&s=${searchText}`
          
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `admin__list.html?p=${this._startPage + this._blockCount}`

            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }

    //회원목록페이징
    getUserPaging = (filter) => {
        // console.log("페이징123123123",data)
     


        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/index.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`

            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        // console.log(this._startPage, this._endPage)
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
         
        //필터가 undefined 이면
          if(filter != '') tempA.href= `/index.html?p=${i}&filter=${filter}`
            if(filter == '') tempA.href= `/index.html?p=${i}`
            if(filter != '' && type != '' && searchText != '') tempA.href= `/index.html?p=${i}&filter=${filter}&t=${type}&s=${searchText}`
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `index.html?p=${this._startPage + this._blockCount}`

            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }

    //ide추천댓글목록
    getIdePaging = (filter) => {
        console.log("페이징123123123",filter)
     
        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/ide.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`

            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')

        // const filter = utils().getParameterByName('filter')
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        // console.log(this._startPage, this._endPage)
        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')


            if(filter != '') tempA.href= `/ide.html?p=${i}&filter=${filter}`
            if(filter == '') tempA.href= `/ide.html?p=${i}`
            if(filter != '' && type != '' && searchText != '') tempA.href= `/ide.html?p=${i}&filter=${filter}&t=${type}&s=${searchText}`
        // //필터가 undefined 이면
        //   if(data == "default"){
        //     tempA.href =`/ide.html?p=${i}`
        //     // tempA.href =`/index.html`
        //   }
        //   else{
        //     tempA.href =`/ide.html?p=${i}&filter=${data}`
        //   }
        //   tempA.href =`/index.html?p=${i}&filter=${data}`

            // tempA.href =`/index.html?p=${i}`
           
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `ide.html?p=${this._startPage + this._blockCount}`

            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }
   

    //삭제된회원목록페이징
    getRemoveUserPaging = (filter) => {
        // console.log("페이징123123123",data)
     


        let wrapper, ul

        wrapper = document.createElement('div')
        wrapper.classList.add('body__item--paging')

        ul = document.createElement('ul')

        // 좌측 이동
        if (this._nowIndex > this._blockCount) {
            let left, leftA, leftImg
            leftA = document.createElement('a')
            leftA.href = `/remove__user.html?p=${this._startPage - this._blockCount > 0 ? this._startPage - this._blockCount : 1}`

            left = document.createElement('li')
            leftImg = document.createElement('img')
            leftImg.src = '../res/img/icon_left.svg'

            left.appendChild(leftImg)
            leftA.appendChild(left)
            ul.appendChild(leftA)
        }

        // 중앙 아이템
        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('body__item--paging--wrapper')
        // console.log(this._startPage, this._endPage)
        const type = utils().getParameterByName('t')
        const searchText = utils().getParameterByName('s')

        for (let i = this._startPage; i < this._endPage; i++) {
            const tempA = document.createElement('a')
         
        if(filter != '') tempA.href= `/remove__user.html?p=${i}&filter=${filter}`
            if(filter == '') tempA.href= `/remove__user.html?p=${i}`
            if(filter != '' && type != '' && searchText != '') tempA.href= `/remove__user.html?p=${i}&filter=${filter}&t=${type}&s=${searchText}`
      
        //   tempA.href =`/index.html?p=${i}&filter=${data}`

            // tempA.href =`/index.html?p=${i}`
           
            const temp = document.createElement('li')
            if (i == this._nowIndex) {
                temp.classList.add('underbar')
            }
            temp.innerHTML = i
            tempA.appendChild(temp)
            itemWrapper.appendChild(tempA)
        }
        ul.appendChild(itemWrapper)

        // 우측 이동
        if (this._endPage < this._totalPage) {
            let right, rightA, rightImg

            rightA = document.createElement('a')
            rightA.href = `remove__user.html?p=${this._startPage + this._blockCount}`

            right = document.createElement('li')
            rightImg = document.createElement('img')
            rightImg.src = '../res/img/icon_right.svg'

            right.appendChild(rightImg)
            rightA.appendChild(right)

            ul.appendChild(rightA)
        }

        return ul
    }
}