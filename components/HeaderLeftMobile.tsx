import { FC } from 'react';
import s from '../styles/header.module.scss'
import Image from 'next/image'
import sound from '../public/icons/soundHeader.svg'
import { VideoStore } from '../stores/VideoStore';
import { useInjection } from 'inversify-react';

// import burger from '../public/icons/burger.svg'

interface HeaderLeftMobileProps {}

const HeaderLeftMobile: FC<HeaderLeftMobileProps> = () => {
    const {mutedHandler} = useInjection(VideoStore)

    return (
        <div className={s.header__music} onClick={mutedHandler}>
            <Image src={sound} alt={'pause icon'} width={18} height={17}/>
        </div>
    )
}


export default HeaderLeftMobile