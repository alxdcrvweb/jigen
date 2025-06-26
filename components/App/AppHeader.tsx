import s from '../../styles/appLayout.module.scss';
import { observer } from 'mobx-react';
import { useInjection } from 'inversify-react';
import { WalletStore } from '../../stores/WalletStore';
import cn from 'classnames';
import logo from '../../public/logo.svg'
import Image from 'next/image';
import { FC } from 'react';
import decorWallet from '../../public/App/decor-wallet.svg'
import { addressSlice } from '../../utils/utilities';

interface AppHeaderProps {
    open: boolean
    toggleHandler: () => void
}

export const AppHeader: FC<AppHeaderProps> = observer(({open, toggleHandler}) => {
    const {userWallet} = useInjection(WalletStore)

    return (
        <header className={cn(
            s.appLayoutWrapper__header,
            s.appHeader,
            open && s.appHeader_open
        )}>
            <div className={s.appHeader__logo}>
                <Image src={logo} alt="logo"/>
            </div>
            <div className={cn(s.appHeader__actions, '_appContainer')}>
                <span className={s.appHeader__action}>
                    <span>
                            {addressSlice(userWallet)}
                    </span>
                    <Image src={decorWallet} alt="decor wallet" width={20} height={20}/>
                    </span>
                <button
                    className={cn(s.appHeader__action, s.appHeader__action_burger)}
                    onClick={toggleHandler}
                >
                        <span className={cn(s.appHeader__burger, open && s._active)}>
                            <span></span>
                        </span>
                </button>
            </div>
        </header>
    )
});