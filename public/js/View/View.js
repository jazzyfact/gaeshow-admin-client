export default class View {
    constructor() {}

    createElement = (tag, firstClassName, secondClassName) => {
        //매개변수가 하나일때는 tag만 만들고 두개,세개이면 클래스 이름까지 만들어줌
        const element = document.createElement(tag)
        if (firstClassName) element.classList.add(firstClassName)
        if (secondClassName) element.classList.add(secondClassName)

        return element
    }

    getElement = (selector, parentElement = document) => {
        const element = parentElement.querySelector(selector)
        return element
    }

    getElements = (selector, parentElement = document) => {
        const element = parentElement.querySelectorAll(selector)
        return element
    }
}
