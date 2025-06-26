import cn from 'classnames';
import { useInjection } from 'inversify-react';
import Image from 'next/image';
import { FC, useState } from "react";
import arrow from '../public/icons/arrow-down.svg';
import sound from '../public/icons/sound.svg';
import { VideoStore } from '../stores/VideoStore';
import s from '../styles/header.module.scss';

interface HeaderLeftDesktopProps {
	routeHandler: (href: string) => void
	scrollY: number
	FAQHandler: () => void


}

const HeaderLeftDesktop: FC<HeaderLeftDesktopProps> = ({ routeHandler, FAQHandler, scrollY, }) => {
	const { mutedHandler } = useInjection(VideoStore)

	const [activeSublist, secActiveSublist] = useState(false)

	const openSublist = () => {
		secActiveSublist(prev => !prev)
	}

	return (
		<ul className={s.desktopList}>
			<li className={cn(s.desktopList__item, '_smallbtn')} onClick={FAQHandler}>FAQ</li>
			<li className={cn(s.desktopList__item, activeSublist && s.desktopList__item_active,)}>
				<span onClick={openSublist} className={cn('_smallbtn')}>
					TOKEN
					<Image src={arrow} alt={'arrow icon'} width={18} height={18} />
				</span>
				<ul className={cn(
					s.desktopList__sublist,
					activeSublist && s.desktopList__sublist_active,
				)}>
					<a href='https://app.uniswap.org/#/swap?outputCurrency=0xe2fc859c838f31c1450448f4fed92e3284ae49e9' target='_blank' rel='noreferrer' className={cn(s.desktopList__item, '_smallbtn')}>
						Buy
					</a>
					{/* <a href='https://staking.jigen.app/' target='_blank' rel='noreferrer' className={cn(s.desktopList__item, '_smallbtn')}>
						Stake
					</a> */}
				</ul>
			</li>
			<li className={cn(
				scrollY < 150 && s.desktopList__item_hidden,
				s.desktopList__item,
				'_smallbtn'
			)}
				onClick={mutedHandler}
			>
				Sound on
				<Image src={sound} alt={'sound'} width={20} height={20} />
			</li>
		</ul>
	)
}


export default HeaderLeftDesktop