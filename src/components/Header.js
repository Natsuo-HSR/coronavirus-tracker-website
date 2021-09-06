import React from 'react'
import logo from '../img/logo2.png'

function Header() {

    return (
        <div className="header">
            <div className="burger">
                <input type="checkbox" className="toggler" />
                <div className="burger_view">
                    <span></span>
                </div>
                <nav className="burger_nav">
                    <ul className="burger_menu">
                        <li className="menu_item"><a href="#">Статистика на карте</a></li>
                        <li className="menu_item"><a href="#chart_anchor">Статистика на графике</a></li>
                        <li className="menu_item"><a href="#table_anchor">Статистика в таблице</a></li>
                    </ul>
                </nav>
            </div>

            <div className="header_container">
        
                <img className="header_logo" src={logo} alt=""/>
                <div className="header_title">Coronovirus <span className="h_black">Monitor</span></div>
            </div>
        </div>
    )
}

export default Header
