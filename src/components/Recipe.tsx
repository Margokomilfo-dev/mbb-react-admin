import React from 'react'
import { RecipeType } from '../api/api'
import styled from 'styled-components'

type PropsType = {
    recipe: RecipeType
}

export const Recipe = (props: PropsType) => {
    return (
        <Wrapper>
            <span>{props.recipe.name}</span>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 190px; //150
    margin: 20px 10px 30px;
`
