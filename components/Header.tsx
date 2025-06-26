import { FC, useEffect, useState } from "react";
import s from '../styles/header.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import logo from '../public/logo.svg'
import HeaderLeftDesktop from "./HeaderLeftDesktop";
import { useRouter } from "next/router";
import SocialList from "./SocialList";
import { useLocomotiveScroll, Scroll } from "react-locomotive-scroll";
import HeaderLeftMobile from "./HeaderLeftMobile";
import HeaderBurger from "./HeaderBurger";

interface HeaderProps { }
const Header: FC<HeaderProps> = () => {

	const router = useRouter()

	const { scroll } = useLocomotiveScroll()
	const [scrolling, setScrolling] = useState<undefined | 'down' | 'up'>(undefined)
	const [scrollY, setScrollY] = useState(0)
	const [openMenu, setOpenMenu] = useState(false)

	const toggleMenu = () => {
		setOpenMenu(prev => !prev)
	}


	useEffect(() => {
		if (!scroll) return
		scroll.on('scroll', (scroll: Scroll) => {
			setScrolling(scroll.direction)
			setScrollY(scroll.scroll.y)
		})
	}, [scroll])



	const routeHandler = (href: string) => {
		router.push(href)
	}


	const FAQHandler = () => {
		if(scroll) {
			scroll.scrollTo('#FAQ', { duration: 1, disableLerp: false })
		}
		
	}



	return (
		<header
			data-scroll
			data-scroll-sticky
			data-scroll-target="#wrapper"
			className={cn(
				s.header,
				scrolling === 'down' && s.header_down
			)}
		>
			<div className={cn(s.header__container, '_container')}>
				<div className={s.header__body}>
					<div className={s.header__left}>
						<HeaderLeftDesktop scrollY={scrollY} routeHandler={routeHandler} FAQHandler={FAQHandler} />
						<HeaderLeftMobile />
					</div>
					<div className={s.header__logo}>
						<Image src={logo} alt={'logo'} width={80} height={32} />
					</div>
					<div className={s.header__right}>
						<div className={s.header__desktop}>
							<SocialList />
						</div>
						<HeaderBurger openMenu={openMenu} toggleMenu={toggleMenu} FAQHandler={FAQHandler} />
					</div>
				</div>
			</div>
		</header>
	)
}


export default Header