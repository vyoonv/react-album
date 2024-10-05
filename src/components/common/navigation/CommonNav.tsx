import { useState } from 'react'
import { Link } from 'react-router-dom'
import navJason from './nav.json'
import styles from './CommonNav.module.scss'


interface Navigation {
        index: number,
        path: string,
        label: string,
        searchValue: string,
        isActive: boolean
}

function CommonNav() {

    const [navigation, setNavigation] = useState<Navigation[]>(navJason)

    // useState로 선언한 반응성을 가진 데이터를 기반으로 UI를 반복 
    const navLinks = navigation.map((item: Navigation) => {
        return (
            <Link to={item.path} className={styles.navigation__menu} key={item.path}>
                <span className={styles.navigation__menu__label}>{item.label}</span>
            </Link>
        )
    })

        return (
            <nav className={styles.navigation}>{navLinks}</nav>
        )
}

export default CommonNav