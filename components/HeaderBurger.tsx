import { FC, useState } from 'react';
import s from '../styles/header.module.scss'
import cn from 'classnames'
import Image from 'next/image'
// import sound from '../public/icons/soundHeader.svg'
import arrow from '../public/icons/arrow-down.svg'
import burger from '../public/icons/burger.svg'
import burgerClose from '../public/icons/burgerClose.svg'
import boat from '../public/icons/boat.svg'
import twitter from '../public/icons/twitter.svg'
import discord from '../public/icons/discord.svg'
import { CSSTransition } from 'react-transition-group';
import CircleSocials from './CircleSocials';

interface HeaderBurgerProps {
    openMenu: boolean
    toggleMenu: () => void
    FAQHandler: () => void
}

const HeaderBurger: FC<HeaderBurgerProps> = ({openMenu, FAQHandler, toggleMenu}) => {

    const [activeSublist, secActiveSublist] = useState(false)

    const openSublist = () => {
        secActiveSublist(prev => !prev)
    }

    const mobileSocialList = [
        {id: 1, link: '', icon: boat},
        {id: 2, link: 'https://twitter.com/JigenOfficial', icon: twitter},
        {id: 3, link: 'https://discord.gg/jigen', icon: discord},
    ]

    return (
        <div className={s.header__mobile}>
            <div className={s.header__burger} onClick={toggleMenu}>
                {openMenu ? <Image src={burgerClose} alt={'burger icon'} width={18} height={17}/> : <Image src={burger} alt={'burger icon'} width={18} height={17}/>}
            </div>
            {/*@ts-ignore*/}
            <CSSTransition
                in={openMenu}
                timeout={500}
                classNames={{
                    enterDone: s.fadeEnterDone,
                    enter: s.fadeEnter,
                    enterActive: s.fadeEnterActive,
                    exit: s.fadeExit,
                    exitActive: s.fadeExitActive,
                }}
                mountOnEnter
                unmountOnExit
            >
                <div className={s.mobileHeader}>
                    <ul className={s.mobileHeader__list}>
                        <li className={s.mobileHeader__item} onClick={FAQHandler}>FAQ</li>
                        <li onClick={openSublist} className={cn(s.mobileHeader__item, activeSublist && s.mobileHeader__item_active,)}>
                            TOKEN
                            <Image src={arrow} alt={'arrow icon'} width={28} height={28}/>
                        </li>
                        {activeSublist &&
                            <>
                                <a href='https://app.uniswap.org/#/swap?outputCurrency=0xe2fc859c838f31c1450448f4fed92e3284ae49e9' target='_blank' rel='noreferrer' ><li className={s.mobileHeader__item}>
                                    Buy
                                </li></a>
                                {/* <li className={s.mobileHeader__item}>
                                    Stake
                                </li> */}
                            </>
                        }
                    </ul>
                    <div className={s.mobileHeader__box}>
                        <CircleSocials/>
                    </div>
                </div>
            </CSSTransition>
        </div>

    )
}


export default HeaderBurger