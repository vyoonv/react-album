import { useEffect, useState } from 'react'
import CommonHeader from '../../components/common/header/CommonHeader'
import Card from './components/Card'
// CSS
import styles from './styles/index.module.scss'
import { CardDTO } from '../index/types/card'

function index() {
    const [data, setData] = useState<CardDTO[]>([])

    const getData = () => {
        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark') || '[]')
        console.log('loaded bookmarks : ', getLocalStorage)
        setData(getLocalStorage)
    }

    useEffect( () => {
        getData()
        // console.log('current bookmarks : ', data) 비어있고 
    }, [])

  return (

    <div className={styles.page}>
        <CommonHeader />
        <main className={styles.page__contents}>
            {/* 만약 데이터가 없을 때  */}
            {data.length === 0 ? 
            <div className={styles.page__contents__noData}>조회 가능한 데이터가 없습니다.</div> : (
                data.map((item: CardDTO) => {
                return <Card prop={item} key={item.imageId}/>
            }))} 
            
        </main>
    </div>
  )
}

export default index