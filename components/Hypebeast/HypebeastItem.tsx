import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';
import Image, { StaticImageData } from 'next/image'
import cn from 'classnames'
// Direct React component imports

import 'swiper/css';

// import 'swiper/css/navigation';

interface HypebeastItemProps {
    title: string,
    Text: () => JSX.Element,
    icon: StaticImageData
}


const HypebeastItem: FC<HypebeastItemProps> = observer(({icon, Text, title,}) => {
    return (
        <div className={s.hypebeastSection__item}>
            <div className={s.hypebeastSection__body}>
                <div className={s.hypebeastSection__icon}>
                    <Image src={icon} alt={'icon'} width={60} height={60}/>
                </div>
                <div className={s.hypebeastSection__subtitle}>{title}</div>
                <div className={cn(s.hypebeastSection__text, '_text')}><Text/></div>
            </div>
        </div>
    )
})

export default HypebeastItem
