import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';
// Direct React component imports

import 'swiper/css';
import HypebeastItem from './HypebeastItem';
import { StaticImageData } from 'next/image';

// import 'swiper/css/navigation';

interface HypebeastDesktopProps {
    HypebeastSectionList: { id: number, title: string, Text: () => JSX.Element, icon: StaticImageData }[]
}


const HypebeastDesktop: FC<HypebeastDesktopProps> = observer(({HypebeastSectionList}) => {
    return (
        <div className={s.hypebeastSection__grid}>
            {HypebeastSectionList.map(el => <HypebeastItem key={el.id} {...el} />)}
        </div>
    )
})

export default HypebeastDesktop
