import { observer } from 'mobx-react'
import Image from 'next/image';
import { IRewardsCard } from '../../../models/models';
import s from '../../../styles/rewards.module.scss';
import cn from 'classnames';
import timerIcon from '../../../public/App/metalock/timer.svg';
import { useInjection } from 'inversify-react';
import { WalletStore } from '../../../stores/WalletStore';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';


interface RewardsCardProps extends IRewardsCard {
}


const RewardsCard = observer(({image, title, locked, expressIn, requirement, metalock, _id}: RewardsCardProps) => {
    const {disabled} = useInjection(WalletStore)
    const router = useRouter()
    // const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     router.push('../../select')
    // }

    return (
        <div className={s.rewardsCard}>
            <div className={cn(s.rewardsCard__image, locked && s.rewardsCard__image_locked)}>
                <Image src={image} alt={title}/>
            </div>
            <div className={s.rewardsCard__info}>
                <div className={s.rewardsCard__title}>{title}</div>
                <div className={s.rewardsCard__requirement}>
                    <span>Requirement:</span>
                    <span>{requirement}</span>
                </div>
                <div className={s.rewardsCard__metalock}>
                    <span>Metalock</span>
                    <span>{metalock}</span>
                </div>
            </div>
            <Link href={locked ? '' : `/card/${_id}` }>
                <button className={cn(s.rewardsCard__btn, '_btn')}  style={{marginBottom:'25px'}} disabled={locked || disabled}>
                    <span>Claim now</span>
                </button>
            </Link>
            <div className={s.rewardsCard__expressIn}>
                <b>Expires in </b>
                <b>
                    {expressIn}
                    <Image src={timerIcon} alt="timer icon" width={14} height={14}/>
                </b>
            </div>
        </div>
        
    )
})
export default RewardsCard

