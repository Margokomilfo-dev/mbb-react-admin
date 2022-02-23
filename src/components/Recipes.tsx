import React, { useState } from 'react'
import styled from 'styled-components'
import { ProductReducerType } from '../redux/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Modal, Select, Space } from 'antd'
import {
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import { MealsCategory, MenuCategory, ProductCategory } from '../settings/types'
import TextArea from 'antd/es/input/TextArea'
import { AllStateType } from '../redux/store'
import { createRecipe, RecipeReducerType } from '../redux/recipeReducer'
import { Recipe } from './Recipe'

type PropsType = {
    // product: ProductType
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}
const { Option } = Select
const validateMessages = {
    required: '${label} is required!',
}

export const Recipes = (props: PropsType) => {
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { recipes } = useSelector<AllStateType, RecipeReducerType>(
        (state) => state.recipes
    )
    const { products } = useSelector<AllStateType, ProductReducerType>(
        (state) => state.products
    )

    const dispatch = useDispatch()

    const onFinish = (values: any) => {
        dispatch(
            createRecipe({
                ...values.recipe,
                ingredients: values.ingredients,
            })
        )
        setIsModalVisible(false)
        form.resetFields()
    }

    const handleChange = (val) => {
        console.log(val)
    }
    function confirm() {
        Modal.confirm({
            title: 'Добавление продукта',
            icon: <ExclamationCircleOutlined />,
            content: (
                <Form
                    form={form}
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['recipe', 'name']}
                        label="Name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['recipe', 'image']}
                        label="Image"
                        rules={[{ type: 'string', required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['recipe', 'description']}
                        label="Description"
                        rules={[{ required: true }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item name={['recipe', 'menu']} label="Вид меню">
                        <Select
                            showSearch
                            style={{ width: 220 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children
                                    // @ts-ignore
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {MenuCategory.map((p) => (
                                <Option value={p.id} key={p.id}>
                                    {p.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['recipe', 'type']}
                        label="Тип приема пищи"
                    >
                        <Select
                            showSearch
                            style={{ width: 220 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children
                                    // @ts-ignore
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {MealsCategory.map((p) => (
                                <Option value={p.id} key={p.id}>
                                    {p.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={['recipe', 'oven']} label="С духовкой?">
                        <Select
                            showSearch
                            style={{ width: 220 }}
                            placeholder="Select a choice"
                            optionFilterProp="children"
                        >
                            <Option value="false">false</Option>
                            <Option value="true">true</Option>
                        </Select>
                    </Form.Item>
                    <Form.List name="ingredients">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(
                                                prevValues,
                                                curValues
                                            ) =>
                                                prevValues.area !==
                                                    curValues.area ||
                                                prevValues.sights !==
                                                    curValues.sights
                                            }
                                        >
                                            {() => (
                                                <Form.Item
                                                    {...field}
                                                    label="name"
                                                    name={[field.name, 'id']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Missing product',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        showSearch
                                                        style={{ width: 130 }}
                                                        placeholder="Select a person"
                                                        optionFilterProp="children"
                                                        filterOption={(
                                                            input,
                                                            option
                                                        ) =>
                                                            option.children
                                                                // @ts-ignore
                                                                .toLowerCase()
                                                                .indexOf(
                                                                    input.toLowerCase()
                                                                ) >= 0
                                                        }
                                                    >
                                                        {products.map(
                                                            (item) => (
                                                                <Option
                                                                    key={
                                                                        item._id
                                                                    }
                                                                    value={
                                                                        item._id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>
                                                </Form.Item>
                                            )}
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="count"
                                            name={[field.name, 'count']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing weight',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <MinusCircleOutlined
                                            onClick={() => remove(field.name)}
                                        />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add sights
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>{' '}
                </Form>
            ),
            okText: 'ok',
            cancelText: 'cancel',
        })
    }
    return (
        <Wrapper>
            <Select
                style={{ width: 300 }}
                onChange={handleChange}
                defaultValue={ProductCategory[0].name}
            >
                {MealsCategory.map((p) => (
                    <Option value={p.id} key={p.id}>
                        {p.name}
                    </Option>
                ))}
            </Select>
            <Button onClick={confirm}> Add recipe</Button>
            {recipes.map((r) => (
                <Recipe key={r._id} recipe={r} />
            ))}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 190px; //150
    margin: 20px 10px 30px;
`
