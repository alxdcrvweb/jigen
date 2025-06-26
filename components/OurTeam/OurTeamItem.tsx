import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC, useState } from 'react';
import s from '../../styles/main.module.scss';
import Image, { StaticImageData } from 'next/image'

interface OurTeamItemProps {
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
}


const OurTeamItem: FC<OurTeamItemProps> = observer(({id, image, name, position, social, text, fullText}) => {

    const [active, setActive] = useState(false)

    const SeeMoreHandler = () => setActive(true)

    return (
        <div className={s.ourTeamItem}>
            <div className={s.ourTeamItem__image}>
                <Image src={image} alt={`image ${name}`} layout="fill" objectFit="cover" objectPosition="center"/>
            </div>
            <div className={s.ourTeamItem__contant}>
                <div className={s.ourTeamItem__labels}>
                    <div className={cn(s.ourTeamItem__label, '_smallbtn')}>
                        {position}
                    </div>
                    {social.map(el => <a key={el.id} target="_blank"rel="noreferrer" href={el.link} className={cn(s.ourTeamItem__label, s.ourTeamItem__label_link, '_smallbtn')}>
                        <Image src={el.icon} alt={'icon'} layout={'intrinsic'} objectFit="contain"/>
                    </a>)}
                </div>
                <div className={s.ourTeamItem__name}>{name}</div>
                <div className={s.ourTeamItem__text}>
                    {!active ? text : fullText}</div>
                {fullText.length > 0 && !active &&
                    <div onClick={SeeMoreHandler} className={s.ourTeamItem__see}>See more</div>
                }
            </div>
        </div>
    )
})

export default OurTeamItem
