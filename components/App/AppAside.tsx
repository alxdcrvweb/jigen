import cn from 'classnames';
import s from '../../styles/appLayout.module.scss';
import { observer } from 'mobx-react';
import disconnect from '../../public/App/Layout/disconnect.svg'
import Image from 'next/image';
import ProfileIcon from '../Icons/ProfileIcon';
import Link from 'next/link';
import MetalockIcon from '../Icons/MetalockIcon';
import RewardsIcon from '../Icons/RewardsIcon';
import { useRouter } from 'next/router';
import { useInjection } from 'inversify-react';
import { WalletStore } from '../../stores/WalletStore';

interface AppAsideProps {
    open: boolean
}

export const AppAside = observer(({open}: AppAsideProps) => {

    const router = useRouter();
    const {resetWallet, disabled} = useInjection(WalletStore)

    const navList = [
        {id: 1, icon: <MetalockIcon/>, text: 'Metalock', link: '/metalock'},
        {id: 2, icon: <RewardsIcon/>, text: 'Rewards', link: '/rewards'},
        // {id: 3, icon: <ProfileIcon/>, text: 'Profile', link: '/profile'},
    ]

    return (
        <aside className={cn(
            s.appLayoutWrapper__aside,
            s.appSide,
            open && s.appSide_open
        )}>
            <nav className={s.appSide__navigation}>
                {navList.map(el => (
                    <Link
                        className={cn(
                            s.appSide__link,
                            router.asPath === el.link && s.appSide__link_active
                        )}
                        key={el.id}
                        href={el.link}
                    >
                        {el.icon}
                        {el.text}
                    </Link>
                ))}
            </nav>
            <button className={s.appSide__footer} disabled={disabled} onClick={resetWallet}>
                <Image src={disconnect} alt="disconnect" width={20} height={20}/>
                <span>Disconnected</span>
            </button>
        </aside>
    )
});