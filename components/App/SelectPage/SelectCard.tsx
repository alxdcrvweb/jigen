import { observer } from 'mobx-react'
import { IStatusCard } from '../../../models/models';
import s from '../../../styles/select.module.scss'
import Image from 'next/image';
import cn from 'classnames';

interface SelectCardProps extends IStatusCard {
    selectCardHandler: (id: string) => void
    selected: boolean
    eligible: boolean
}

const SelectCard = observer(({selectCardHandler, eligible, id, title, image, selected}: SelectCardProps) => {

    return (
        <div
            onClick={() => eligible && selectCardHandler(id)}
            className={cn(
                s.selectCard,
                eligible && s.selectCard_eligible,
                selected && s.selectCard_selected,
            )}
        >
            <div className={s.selectCard__image}>
                <Image src={image} alt={title}/>
            </div>
            <div className={s.selectCard__info}>
                <div className={s.selectCard__title}>
                    {title}
                </div>
                <div className={cn(
                    s.selectCard__status,
                    eligible && s.selectCard__status_eligible,
                )}>
                    {eligible ? 'Eligible' : 'Not Eligible'}
                </div>
            </div>
            <div className={
                s.selectCard__circle
            }/>
        </div>
    )
})


export default SelectCard

