import Model from '../Core/Mvc/Model.js'

export default class storeModel extends Model {
    constructor() {
        super()
    }

    addBrand = async (reqData) => {
        try {
            const res = await this.postRequest('/product/brand', reqData)
            console.log(res)
            if (!res) throw '브랜드 등록 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    getBramd = async (reqData) => {
        try {
            const res = await this.getRequest('/product/brand', reqData)
            console.log(res)
            if (!res) throw '브랜드 등록 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    storeImageUpload = async (formData) => {
        try {
            const res = await this.postRequestImageFormData('/files/images', formData)
            if (!res) throw '프로필 이미지 업로드 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }

    addProduct = async (reqData) => {
        try {
            const res = await this.postRequest('/product', reqData)
            if (!res) throw '상품 등록 실패'
            return res
        } catch (e) {
            console.error(e)
        }
    }
}
