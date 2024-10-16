import { useMemo, useState } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { imageData } from '../../store/selectors/imageSelector'
import CommonHeader from '../../components/common/header/CommonHeader'
import CommonNav from '../../components/common/navigation/CommonNav'
import CommonSearchBar from '../../components/common/searchBar/CommonSearchBar'
import CommonFooter from '../../components/common/footer/CommonFooter'
import Card from './component/Card'
import DetailDialog from '../../components/common/dialog/DetailDialog'
import Loading from './component/Loading'
// css
import styles from './styles/index.module.scss'
import { CardDTO } from './types/card'
import { userState } from '../../store/atoms/userState'


function index() {
    // const imgSelector = useRecoilValue(imageData) 아래 코드로 수정 
    const imgSelector = useRecoilValueLoadable(imageData)
    const [imgData, setImgData] = useState<CardDTO>()
    const [open, setOpen] = useState<boolean>(false) // 이미지 상세 다이얼로그 발생(관리) state
    const user = useRecoilValue(userState); 
    
    /* const CARD_LIST = imgSelector.data.results.map((card: CardDTO) => {
        return (
            <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData} />
        )
    }) */ 

    // store과 비슷하게 useMemo로 캐싱     
    const CARD_LIST = useMemo( () => {
        // imgSelector.stat = hasValue or loading
        if(imgSelector.state === "hasValue") {
            const result = imgSelector.contents.results.map((card: CardDTO) => {
                return (
                    <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData} />
                )
            })
            return result
        } else {
            return <Loading />
        }
    }, [imgSelector] )

  return (
    <div className={styles.page}>
        {/* 공통 헤더 UI 부분 */}
        <CommonHeader user={user}/>
        {/* 공통 네비게이션 UI 부분 */}
        <CommonNav />
        <main className={styles.page__contents}>
            <div className={styles.page__contents__introBox}>
                <div className={styles.wrapper}>
                    <span className={styles.wrapper__title}>YoonSplash</span>
                    <span className={styles.wrapper__desc}>
                        인터넷의 시각 자료 출처입니다. 
                        모든 지역에 있는 크리에이터들의 지원을 받습니다. 
                    </span>
                    {/* 검색창 UI 부분 */}
                    <CommonSearchBar />
                </div>
            </div>
            <div className={styles.page__contents__imageBox}>
                {/* Props : 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 작업  */}
                {CARD_LIST}
            </div>
        </main>
        {/* 공통 푸터 UI 부분  */}
        <CommonFooter />
        {open && <DetailDialog data={imgData} handleDialog={setOpen} userEmail={user.email}/>}
    </div>
  )
}

export default index