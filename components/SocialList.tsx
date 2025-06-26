import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import boat from '../public/icons/boat.svg';
import discord from '../public/icons/discord.svg';
import twitter from '../public/icons/twitter.svg';
import s from '../styles/social.module.scss';

interface SocialListProps {}

const SocialList: FC<SocialListProps> = () => {

    const socialList = [
        {id: 1, link: 'https://twitter.com/JigenOfficial', icon: twitter},
        {id: 2, link: 'https://discord.gg/jigen', icon: discord},
        {id: 3, link: '', icon: boat},
    ]

    return (
        <ul className={s.social}>
            {socialList.map(el => (
                <li key={el.id} className={s.social__item}>
                    <a className={cn('_smallbtn')} href={el.link} target={'_blank'} rel="noreferrer">
                        <Image src={el.icon} alt={el.link} layout="intrinsic"/>
                    </a>
                </li>
            ))}
        </ul>
    )
}


export default SocialList