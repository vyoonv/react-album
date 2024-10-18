import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import navJason from './nav.json'
import styles from './CommonNav.module.scss'
import { useRecoilState } from 'recoil'
import { pageState } from '../../../stores/atoms/pageState'
import { searchState } from '../../../stores/atoms/searchState'


interface Navigation {
        index: number,
        path: string,
        label: string,
        searchValue: string,
        isActive: boolean
}

function CommonNav() {

    const location = useLocation()
    const [navigation, setNavigation] = useState<Navigation[]>(navJason) // 초기값이 navigation안에 할당된 상태 
    const [page, setPage] = useRecoilState(pageState) // page 디폴트 값
    const [search, setSearch] = useRecoilState(searchState)

    useEffect( () => {
        // console.log(location.pathname)
        navigation.forEach( (nav: Navigation) => {
            nav.isActive = false

            if(nav.path === location.pathname || location.pathname.includes(nav.path)) {
                nav.isActive = true
                setSearch(nav.searchValue)
                setPage(1)
            }
        })
        setNavigation([...navigation]) // 재할당 
    }, [location.pathname])

     // useState로 선언한 반응성을 가진 데이터를 기반으로 UI를 반복 
     const navLinks = navigation.map((item: Navigation) => {
        return (
            <Link to={item.path} key={item.path}
                className={item.isActive ? `${styles.navigation__menu} ${styles.active}` : `${styles.navigation__menu} ${styles.inactive}`}>
                <span className={styles.navigation__menu__label}>{item.label}</span>
            </Link>
        )
    })

        return (
            <nav className={styles.navigation}>{navLinks}</nav>
        )
}

export default CommonNav