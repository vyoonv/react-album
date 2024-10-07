import { useEffect, useState } from 'react'
import { CardDTO, Tag } from '../../../pages/index/types/card'
import styles from './DetailDialog.module.scss'
import { toast } from 'react-toastify';

interface Props {
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
}

function DetailDialog({data, handleDialog}: Props) {

    const [bookmark, setBookmark] = useState(false)
    // 다이얼로그 끄기 
    const closeDialog = (event: any) => {
        handleDialog(false)
        event.stopPropagation
    }

    // 북마크 추가 이벤트 
    const addBookmark = (selected: CardDTO) => {
        setBookmark(true) // true값으로 바뀌면 

        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark') || '[]') // null처리 꼭 해주기 

        // 1. 로컬스토리지에 bookmark이라는 데이터가 없을 경우
        if (!getLocalStorage || getLocalStorage === null) {
            localStorage.setItem('bookmarks', JSON.stringify([selected]))
            toast.info('해당 이미지를 북마크에 저장하였습니다. 😄')
        } else {
            // 2. 이미 해당 이미지가 로컬스토리지 bookmark라는 데이터에 저장되어 있는 경우 
            if(getLocalStorage.findIndex((item: CardDTO) => item.id === selected.id) > -1) {
                toast.info('해당 이미지는 이미 추가되어 있습니다')
            } else {
                // 3. 해당 이미지가 로컬스토리지 bookmark라는 데이터에 저장되어있지 않은 경우 + bookmark라는 데이터에 이미 어떤 값이 담긴 경우 
                const res = [...getLocalStorage]
                res.push(selected)
                localStorage.setItem('bookmark', JSON.stringify(res))

                toast.info('해당 이미지를 북마크에 저장하였습니다. 😘')
            }
        }
        
    }

    useEffect( () => {
        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark') || '[]')

        if(getLocalStorage && getLocalStorage.findIndex((item: CardDTO) => item.id === data.id) > -1) {
            setBookmark(true)
        } else if (!getLocalStorage) return

        // ESC 키를 눌렀을 때, 다이얼로그 창 닫기 
        const escKeyDownCloseDialog = (event: React.KeyboardEvent) => {
            if(event.key === 'Escape') {
                closeDialog()
            }
        }

        window.addEventListener('keydown', escKeyDownCloseDialog)
        return () => window.removeEventListener('keydown', escKeyDownCloseDialog)
    }, [])

  return (
    <div className={styles.container} onClick={closeDialog}>
        <div className={styles.container__dialog}>
            <div className={styles.container__dialog__header}>
                <div className={styles.close}>
                    <button className={styles.close__button} onClick={closeDialog}>
                        {/* 구글 아이콘을 사용 */}
                        <span className="material-symbols-outlined" style={{fontSize: 26 + 'px'}}>close</span>
                    </button>
                    <img src={data.user.profile_image.small} alt='사진작가 프로필' className={styles.close__authorImage} />
                    <span className={styles.close__authorName}>{data.user.name}</span>
                </div>
                <div className={styles.bookmark}>
                    <button className={styles.bookmark__button} onClick={()=>{addBookmark(data)}}>
                        {/* 구글 아이콘 사용 */}
                        {bookmark === false ? (
                            <span className='material-symbols-outlined' style={{fontSize: 16 +'px'}}>favorite</span>
                        ) : (
                            <span className='material-symbols-outlined' style={{fontSize: 16 + 'px', color: 'red'}}>favorite</span>
                        )}
                        
                    </button>
                    <button className={styles.bookmark__button}>다운로드</button>
                </div>
            </div> 
            <div className={styles.container__dialog__body}>
                <img src={data.urls.small} alt='상세이미지' className={styles.image} />
            </div>
            <div className={styles.container__dialog__footer}>
                <div className={styles.infoBox}>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>이미지 크기</span>
                        <span className={styles.infoBox__item__value}>{data.width} X {data.height}</span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>업로드</span>
                        <span className={styles.infoBox__item__value}>{data.created_at.split('T')[0]}</span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>마지막 업데이트</span>
                        <span className={styles.infoBox__item__value}>{data.updated_at.split('T')[0]}</span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>다운로드</span>
                        <span className={styles.infoBox__item__value}>{data.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailDialog