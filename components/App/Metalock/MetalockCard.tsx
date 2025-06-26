import { observer } from 'mobx-react'
import check from '../../../public/App/metalock/check.svg'
import timerIcon from '../../../public/App/metalock/timer.svg'
import Image from 'next/image';
import LockIcon from '../../Icons/LockIcon';
import UnlockIcon from '../../Icons/UnlockIcon';
import { IMetalockCard, IToken } from '../../../models/models';
import s from '../../../styles/metalock.module.scss';
import cn from 'classnames';
import {useState, useEffect} from "react"
import image01 from "../../../public/App/metalock/01.png";

interface MetalockCardProps extends IToken {
    clickHandler: (id: string) => void
    i:number
    select: boolean
}


const MetalockCard = observer(({ metadata, token_uri, select, timer,loading, token_id,nesting, clickHandler, i}: MetalockCardProps) => {
    console.log('%cMetalockCard.tsx line:20 select', 'color: #007acc;', select);
    const toggleSelect = () => {
        clickHandler(token_id)
    }
    const [timeDays, setTimeDays] = useState(0)
    useEffect(()=>{
        if(timer) {
            let d = Math.floor(Number(timer) / (3600*24))
            setTimeDays(d)
        }
    },[timer])
    const image = metadata.image.replace("ipfs://", 'https://ipfs.io/ipfs/')
    return (
        <div className={s.metalockCard}>
            <div className={s.metalockCard__image}>
                {/* <img src={image} alt={token_id} /> */}
                <img src={"/App/metalock/01.png"} alt={token_id} />
            </div>
            <div className={s.metalockCard__info}>
                <div className={cn(s.metalockCard__title, '_subtitle')}>#{' '}{token_id}</div>
                <div className={s.metalockCard__labels}>
                    {timer &&
                        <div className={cn(s.metalockCard__label, s.metalockCard__label_timer)}>
                            <Image src={timerIcon} alt="timer icon" width={14} height={14}/>
                            <span>{timeDays}{' '}D</span>
                        </div>
                    }
                    <div className={cn(
                        s.metalockCard__label,
                        nesting && s.metalockCard__label_locked,
                        !nesting && 'notLocked' && s.metalockCard__label_notLocked,
                    )}>
                        {nesting ? (
                            <>
                                <LockIcon/>
                                <span>metalocked</span>
                            </>
                        ) : (
                            <>
                                <UnlockIcon/>

                                <span>not metalocked</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <button className={cn(s.metalockCard__btn, '_btn')} onClick={toggleSelect} disabled={loading}>
                {select ? <><Image src={check} alt="check" width={20} height={20}/> <span>Selected</span></> : <span>Select</span>}
            </button>
        </div>
    )
})
export default MetalockCard

