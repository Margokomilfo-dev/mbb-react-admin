import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, ProductType, RecipeType } from '../api/api'

export const createRecipe = createAsyncThunk(
    'recipe/createRecipe',
    async (model: RecipeType, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.createRecipe(model)
            return res
            // dispatch(setRecipesProducts)
        } catch (e) {
            return rejectWithValue('getProductsByType - error')
        }
    }
)
export const getRecipesByType = createAsyncThunk(
    'recipe/getRecipesByType',
    async (type: number, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getRecipesByMealType(type)
            return res
            // dispatch(setRecipesProducts)
        } catch (e) {
            return rejectWithValue('getRecipeByType - error')
        }
    }
)

const slice = createSlice({
    name: 'recipe',
    initialState: {
        recipes: [],
        recipe: null,
    } as RecipeReducerType,
    reducers: {
        setProduct_(state, action: PayloadAction<{ product: ProductType }>) {
            // state.recipesProducts.unshift(action.payload.product)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createRecipe.fulfilled, (state, action) => {
            state.recipe = action.payload
        })
        builder.addCase(getRecipesByType.fulfilled, (state, action) => {
            state.recipes = action.payload
        })
    },
})

export const { setProduct_ } = slice.actions
export const recipeReducer = slice.reducer

export type RecipeReducerType = {
    recipes: Array<RecipeType>
    recipe: null | RecipeType
}

export type IngredientType = {
    name: string
    count: number
}
