import React, { useState } from 'react'
import { Products } from './components/Products'
import 'antd/dist/antd.css'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Recipes } from './components/Recipes'

function App() {
    const { SubMenu } = Menu
    const [current, setCurrent] = useState<string>('products')

    const handleClick = (e: any) => {
        // @ts-ignore
        setCurrent({ current: e.key })
    }
    return (
        <div style={{ backgroundColor: '#f7f5f5' }}>
            <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
            >
                <Menu.Item key="products" icon={<MailOutlined />}>
                    <NavLink to={'products'}>Products</NavLink>
                </Menu.Item>
                <Menu.Item key="sport" icon={<AppstoreOutlined />}>
                    <NavLink to={'sport'}>Sport</NavLink>
                </Menu.Item>
                <Menu.Item key="recipe" icon={<AppstoreOutlined />}>
                    <NavLink to={'recipe'}>Recipe</NavLink>
                </Menu.Item>
            </Menu>
            <Routes>
                <Route path="/products" element={<Products />} />
                <Route path="/recipe" element={<Recipes />} />
                <Route path="/sport" element={<Recipes />} />
            </Routes>
        </div>
    )
}

export default App
