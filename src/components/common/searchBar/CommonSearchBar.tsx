import { useState } from 'react'
import styles from './CommonSearchBar.module.scss'
import { useRecoilState } from 'recoil'
import { searchState } from '../../../store/atoms/searchState'
import { pageState } from '../../../store/atoms/pageState'

function CommonSearchBar() {
    const [search, setSearch] = useRecoilState(searchState)
    const [page, setPage] = useRecoilState(pageState)
    const [text, setText] = useState('')
    const onChange = (event) => {
        console.log(event.target.value)
        setText(event.target.value)
    }
    const onSearch = () => {
        if(text === "") { // 태그가 빈값일 때 
            setSearch('Korea')
            setPage(1)
        } else {
          setSearch(text) // 작성한 input value 값 할당   
          setPage(1)
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if(event.key === "Enter") { // enter는 대문자 Enter로 입력해야 함 
            if(text === "") { // 태그가 빈값일 때 
                setSearch('Korea')
            } else {
              setSearch(text) // 작성한 input value 값 할당  
              setPage(1)
            }
        }
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBar__search}>
                <input type='text' placeholder='찾으실 이미지를 검색하세요'
                        className={styles.searchBar__search__input} onChange={onChange}
                        onKeyDown={handleKeyDown}/>
                <img src='src/assets/icons/icon-search.svg' alt=''onClick={onSearch}/>        
            </div>
        </div>
    )
}

export default CommonSearchBar