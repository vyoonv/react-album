import { CardDTO } from '../types/card';
import Styles from './Card.module.scss'

interface Props {
    data : CardDTO
    handleDialog: (eventValue: boolean) => void
    handleSetData: (eventValue: CardDTO) => void
}

function Card({data, handleDialog, handleSetData}: Props) {

    const openDialog = () => {
        //console.log("함수호출"); 
        handleDialog(true)
        handleSetData(data)
    }

    const imageUrl = data.urls?.small || data.url;

    return (
        <div className={Styles.card} onClick={openDialog}>
            <img src={imageUrl} alt={data.alt_description} className={Styles.card__image} />
        </div>
    )
}

export default Card