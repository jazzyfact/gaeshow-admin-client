import Singleton from '../Singleton/Singleton.js'

export default class Model {
    constructor() {
        this.serverUrl = 'http://localhost:49149/'
        this.resStatus = null
        this.singleton = new Singleton()
    }

    // 서버와 통신하는 메소드 : GET, POST, PUT, DELETE의 메소드에 따라 request 가능
    // 만약 data가 비어있다면 header에는 빈 객체를 전송 -> GET 메소드에 사용
    sendHttpRequest = async (method, url, data) => {
        const authorization = await this.singleton.getCookie('access')
        console.log('일로들어옴?')
        const response = await fetch(url, {
            method: method,
            headers: data ? { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:7778', authorization: authorization } : { authorization: authorization },
            body: JSON.stringify(data),
            redirect: 'follow',
            referrer: 'client',
            mode: 'cors', // no-cors, cors, *same-origin
            credentials: 'include',
            cache: 'no-cache'
        }).catch((error) => console.error(`senHttpRequest : ${error}`)) // 에러 생겼을 때 에러 로그 출력
        // 서버에서 반환한 resStatus 저장
        this.resStatus = response.status
        // 서버에서 반화하는 데이터가 없으면 바로 return
        // if (response.statusText == 'No Content') return console.log('Model : 서버에서 반환하는 데이터가 없음')
        // 서버에서 fetch한 데이터가 있다면 데이터를 json으로 변환하여 반환
        if (this.resStatus !== 204) return response.json()
    }


    // GET request : 요청하는 페이지와 요청 정보를 파라미터로 받는다 -> 명확하게 분리하여 혼동되지 않도록
    getRequest = async (path, params = '') => {
        let query = Object.keys(params)
            .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&')

        return await this.sendHttpRequest('GET', this.serverUrl + path + '?' + query)
    }

    postRequest = async (path, data) => {
        return await this.sendHttpRequest('POST', this.serverUrl + path, data)
    }

    putRequest = async (data) => {
        return await this.sendHttpRequest('PUT', this.serverUrl, data)
    }

    deleteRequest = async (path, params = '') => {
        return await this.sendHttpRequest('DELETE', this.serverUrl + path + '/' + params)
    }

}
