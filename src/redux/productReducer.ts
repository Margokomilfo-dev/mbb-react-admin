import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, ModelType, ProductType } from '../api/api'

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (type: number, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getProducts(type)
            return { products: res }
        } catch (e) {
            return rejectWithValue('getProducts - error')
        }
    }
)

export const getProductsByName = createAsyncThunk(
    'product/getProductsByName',
    async ({ name }: { name: string }, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getProductsByName(name)

            return { products: res }
        } catch (e) {
            return rejectWithValue('getProductsByName - error')
        }
    }
)
export const getProductById = createAsyncThunk(
    'product/getProductById',
    async (
        param: { productId: string; count: number },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const res = await api.getProductById(param.productId)
            return { product: { ...res, count: param.count } }
        } catch (e) {
            return rejectWithValue('getProductById - error')
        }
    }
)
export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (model: ModelType, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.createProduct(model)
            dispatch(getProducts(0))
            return
        } catch (e) {
            return rejectWithValue('createProduct - error')
        }
    }
)

const slice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: null,
    } as ProductReducerType,
    reducers: {
        setMessage(state, action: PayloadAction<{ text: string }>) {
            // state.message = action.payload.text
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload.products
        })
        builder.addCase(getProductsByName.fulfilled, (state, action) => {
            state.products = action.payload.products
        })
    },
})

export const { setMessage } = slice.actions
export const productReducer = slice.reducer

export type ProductReducerType = {
    products: Array<ProductType>
    product: null | ProductType
}
