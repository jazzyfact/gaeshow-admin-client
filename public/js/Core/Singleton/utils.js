export default function utils() {
    return {
        //사용자가 접속한 브라우저가 익스플로러일 경우 스낵바 메세지를 띄워준다
        checkIe(navigator) {
            const agent = navigator.userAgent.toLowerCase()
            if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || agent.indexOf('msie') != -1) {
                // ie일 경우
                this.snackbar('ie는 최적화가 되어있지 않습니다. 크롬으로 들어와주세요.')
            }
        },

        snackbar(msg, type = 'error') {
            const snackbar = document.querySelector('#snackbar')
            snackbar.classList.remove('hidden')
            const icon = snackbar.querySelector('#snackbarIcon')
            const text = snackbar.querySelector('#snackbarText')

            text.innerHTML = msg
            if (type == 'error') {
                icon.src = '../res/img/icon_bell.svg'
                icon.classList.add('errorIcon')
                text.classList.add('errorText')
            }

            setTimeout(function () {
                snackbar.classList.add('hidden')
            }, 3000)
        },
        emailChecker(email) {
            var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            return email != '' && email != 'undefined' && regex.test(email)
        },

        passWordChecker(pw) {
            const regex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/
            return pw != '' && pw != 'undefined' && regex.test(pw)
        },
        nicknameChecker(nick) {
            const regex = /^.{2,10}$/
            return nick != '' && nick != 'undefined' && regex.test(nick)
        }, // 파라미터 얻기
        getParameterByName(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                results = regex.exec(location.search)
            return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
        },
        removeHTMLTag(string) {
            return string.replace(/<[^>]*>?/gm, '')
        },
        setPreSEO(title) {
            const head = document.getElementsByTagName('head')[0]

            // 필요한 태그들 생성

            // 파비콘
            let favicon = document.createElement('link')
            favicon.rel = 'shortcut icon'
            favicon.href = '/res/img/favicon-32x32.png'
            favicon.type = 'image/x-icon'

             // 기본
             let d_title, m_title, canocial

             d_title = document.createElement('title')
             d_title.innerHTML = title
 
             m_title = document.createElement('meta')
             m_title.name = 'title'
             m_title.content = title
 
             canocial = document.createElement('link')
             canocial.rel = 'canonical'
             canocial.href = location.href

            head.appendChild(favicon)

            head.appendChild(d_title)
            head.appendChild(m_title)
            head.appendChild(canocial)
    }   
   


}
}