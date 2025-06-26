import { FC, useEffect, useState } from "react";
import s from '../styles/header.module.scss'
import sm from '../styles/appLayout.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import logo from '../public/logo.svg'
import HeaderLeftDesktop from "./HeaderLeftDesktop";
import { useRouter } from "next/router";
import SocialList from "./SocialList";
import { useLocomotiveScroll, Scroll } from "react-locomotive-scroll";
import HeaderLeftMobile from "./HeaderLeftMobile";
import HeaderBurger from "./HeaderBurger";
import { useInjection } from "inversify-react";
import { WalletStore } from "../stores/WalletStore";
import { CHAIN_ID } from "../utils/config";
import { addressSlice } from "../utils/utilities";
import decorWallet from '../public/App/decor-wallet.svg'
import { observer } from "mobx-react";
import Link from "next/link";

interface HeaderProps { }
const HeaderMint: FC<HeaderProps> = observer (() => {
	const {switchNetwork,connectWallet,userWallet, connected, resetWallet, walletConnected, tryReconnect} = useInjection(WalletStore)
	const clickHandler = async () => {
		await switchNetwork(CHAIN_ID).then(() => {
		  if (connected) resetWallet()
		  if (!walletConnected) connectWallet('from HeaderMint')
		})
		  
	  }
	useEffect(()=>{
		if(!userWallet) tryReconnect("headerMint")
	},[userWallet])
	return (
		<header
			data-scroll
			data-scroll-sticky
			data-scroll-target="#wrapper"
			className={cn(
				s.header
			)}
		>
			<div className={cn(s.header__container, '_container')}>
				<div className={s.header__body}>
					<div className={s.header__left}>
					<ul className={s.desktopList}>
						<Link href="/metalock"><li className={cn(s.desktopList__item, '_smallbtn')} >Metalock</li></Link>
					</ul>
						<HeaderLeftMobile />
					</div>
					<div className={s.header__logo}>
						<Image src={logo} alt={'logo'} width={80} height={32} />
					</div>
					<div className={s.header__right}>
					{userWallet ? (
						<span className={sm.appHeader__action}>
						<span>
								{addressSlice(userWallet)}
						</span>
						<Image src={decorWallet} alt="decor wallet" width={20} height={20}/>
						</span>
					) : (
					<div className={sm.appLayoutContent}>
						<button className="_btn"onClick={clickHandler}>Connect wallet</button>
					</div>
					)}
					</div>
				</div>
			</div>
		</header>
	)
})


export default HeaderMint