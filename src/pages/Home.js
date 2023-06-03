import React from 'react'
import Content from '../components/content'
import { Sidebar } from '../components/Sidebar'

export const Home = () => {
    return (
        <div className="main-layout">
            <Sidebar/>

           <Content/>
        </div>
    )
}
