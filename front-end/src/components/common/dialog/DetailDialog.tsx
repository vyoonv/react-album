import { useEffect, useState } from 'react'
import { CardDTO, Tag } from '../../../pages/index/types/card'
import styles from './DetailDialog.module.scss'
import { toast } from 'react-toastify';
import { bookmarkState } from '../../../stores/atoms/bookmarkState';
import { useRecoilState } from 'recoil';
import { totalmem } from 'os';

interface Props {
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
}

function DetailDialog({data, handleDialog}: Props) {
    
    const [bookmarks, setBookmarks] = useRecoilState(bookmarkState); 

    // 로컬 스토리지에서 북마크 로드 
    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmark')||'[]')
        setBookmarks(storedBookmarks)
    }, [])

    // 북마크가 업데이트될 때 로컬 스토리지에 저장 
    // useEffect(() => {
    //     localStorage.setItem('bookmark', JSON.stringify(bookmarks))
    // }, [bookmarks])
    
    // 다이얼로그 끄기 
    const closeDialog = () => {
        handleDialog(false)
    }

    useEffect( () => {
        
        // ESC 키를 눌렀을 때, 다이얼로그 창 닫기 
        const escKeyDownCloseDialog = (event: KeyboardEvent) => {
            if(event.key === 'Escape') {
                closeDialog();
            }
        }
        
        window.addEventListener('keydown', escKeyDownCloseDialog)
        return () => window.removeEventListener('keydown', escKeyDownCloseDialog)
    }, [])
                    
    // 북마크 추가 이벤트 
    const toggleBookmark = async (selected: CardDTO) => {
        const userEmail = localStorage.getItem('userEmail'); 
        
        const isBookmarked = bookmarks.find(item => item.imageId === selected.id); 
        
        if(isBookmarked) {

            try {
                const response = await fetch(`http://localhost:80/bookmark/${selected.id}`, {
                    method: 'DELETE',
                })

                if( !response.ok ) {
                    const errorData = await response.json()
                    throw new Error(errorData.message || '북마크 삭제 실패')
                }
                
                const updatedBookmarks = bookmarks.filter(item => item.imageId !== selected.id)
                setBookmarks(updatedBookmarks)
                localStorage.setItem('bookmark', JSON.stringify(updatedBookmarks))
                toast.info('북마크에서 삭제되었습니다.')

            } catch (error) {
                console.error('Error : ', error)
            }
        } else {

        try {
            const {id, urls, user, width, height, created_at, updated_at, likes} = selected; 
            const createdAt = created_at.split('T').join(' ').slice(0,18)
            const updatedAt = updated_at.split('T').join(' ').slice(0,18)
            const bookmarkData = {
                imageId: id, 
                imageUrl: urls.small, 
                authorName: user.name, 
                width, 
                height, 
                userEmail,
                createdAt,
                updatedAt, 
                likes: likes
            }

            // DB에 저장 
            const response = await fetch('http://localhost:80/bookmark', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookmarkData), 
            })

            if(!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || '북마크 추가 실패하였습니다.')
            }

            const updatedBookmarks = [...bookmarks, bookmarkData]; 
            setBookmarks(updatedBookmarks)
            localStorage.setItem('bookmark', JSON.stringify(updatedBookmarks));  
            
            toast.info('이미지를 북마크에 저장하였습니다. 😘'); 

        } catch (error) {
            console.error('Error : ', error);
        }
        }
    }

    return (
    <div className={styles.container} onClick={closeDialog}>
        <div className={styles.container__dialog}>
            <div className={styles.container__dialog__header}>
                <div className={styles.close}>
                    <button className={styles.close__button} onClick={closeDialog}>
                        {/* 구글 아이콘 사용 */}
                        <span className="material-symbols-outlined" style={{fontSize: 26 + 'px'}}>close</span>
                    </button>
                    <img src={data.user.profile_image.small} alt='사진작가 프로필' className={styles.close__authorImage} />
                    <span className={styles.close__authorName}>{data.user.name}</span>
                </div>
                <div className={styles.bookmark}>
                        <button className={styles.bookmark__button} onClick={() => toggleBookmark(data)}>
                            <span className='material-symbols-outlined' style={{ fontSize: '16px', color: bookmarks.some(item => item.imageId === data.id) ? 'red' : 'black' }}>
                                favorite
                            </span>
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