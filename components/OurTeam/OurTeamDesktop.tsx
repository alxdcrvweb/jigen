import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';
import OurTeamItem from './OurTeamItem'
import { StaticImageData } from 'next/image';

interface OurTeamDesktopProps {
    ourTeamList: {
        id: number;
        image: StaticImageData;
        position: string;
        social: {
            id: number;
            link: string;
            icon: any;
        }[] | [];
        name: string;
        text: string;
        fullText: string;
    }[]
}

const OurTeamDesktop: FC<OurTeamDesktopProps> = observer(({ourTeamList}) => {

    return (
        <div className={s.ourTeamDesktop}>
            {ourTeamList.map(el => <OurTeamItem key={el.id} {...el} />)}
        </div>
    )
})

export default OurTeamDesktop
