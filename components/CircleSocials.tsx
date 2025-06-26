import cn from 'classnames';
import Image from 'next/image';
import { FC } from "react";
import s from '../styles/header.module.scss';
// import sound from '../public/icons/soundHeader.svg'
import boat from '../public/icons/boat.svg';
import discord from '../public/icons/discord.svg';
import twitter from '../public/icons/twitter.svg';

interface CircleSocialsProps {
}
const CircleSocials: FC<CircleSocialsProps> = ({ }) => {

	const mobileSocialList = [
		{ id: 1, link: '', icon: boat },
		{ id: 2, link: '', icon: twitter },
		{ id: 3, link: '', icon: discord },
	]

	return (
		<div className={s.mobileHeader__socials}>
			{mobileSocialList.map(el => (
				<a key={el.id} href={el.link}target="_blank" rel="noreferrer"className={cn(s.mobileHeader__social, '_circleLink')}>
					<span>
						<Image src={el.icon} alt={'icon'} layout='fixed' width={40} height={40} />
					</span>
					<span>
						<span></span>
					</span>
				</a>
			))}
		</div>
	)
}


export default CircleSocials