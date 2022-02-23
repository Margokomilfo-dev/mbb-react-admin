import { appSettings } from '../settings/app-settings'
import axios from 'axios'

export let instance = axios.create({
    baseURL: appSettings.api.REACT_APP_API_BASE_URL,
})

export const api = {
    async getProducts(type: number = 0) {
        const res = await instance.get<Array<ProductType>>(
            `/product/type/${type}`
        )
        return res.data
    },
    async getProductsByName(name: string) {
        const res = await instance.post<Array<ProductType>>(`/product/byName`, {
            name,
        })
        return res.data
    },
    async getProductById(id: string) {
        const res = await instance.get<ProductType>(`/product/${id}`)
        return res.data
    },
    async createProduct(model: ModelType) {
        const res = await instance.post<Array<ProductType>>(`/product`, model)
        return res.data
    },
    async createRecipe(model: RecipeType) {
        const res = await instance.post<RecipeType>(`/recipe`, model)
        return res.data
    },

    async getRecipesByMealType(type: number = 0) {
        const res = await instance.get<Array<RecipeType>>(`/recipe/${type}`)
        return res.data
    },
}

export type ProductType = {
    _id: string
    image: string
    carbs: number
    fats: number
    proteins: number
    calories: number
    name: string
    createdAt: string
    updatedAt: string
}
export type RecipeType = {
    calories: number
    carbs: number
    description: string
    fats: number
    image: string
    ingredients: Array<ProductType>
    isFavorite: boolean
    menu: number
    name: string
    proteins: number
    type: number
    oven: boolean
    _id: string
}

export type ModelType = {
    name: string
    category: number
    calories: number
    carbs: number
    fats: number
    proteins: number
    image: string
}
