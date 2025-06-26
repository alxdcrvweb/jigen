import { observer } from 'mobx-react'
import cn from 'classnames';
import s from '../../styles/jigenlist.module.scss';
import Image from 'next/image';
import info from '../../public/icons/info.svg';
import { useInjection } from 'inversify-react';
import { WalletStore } from '../../stores/WalletStore';
import { addressSlice } from '../../utils/utilities';


const JigenListSecond = observer(({goToStep}: JigenListSecondProps) => {

    const {connectWallet, connected, login, disabled, resetWallet, walletConnected, userWallet} = useInjection(WalletStore)

    const connectHandler = async () => {
        await connectWallet("fromClickHandler")
        goToStep(2)
    }

    const clickHandler = async () => {
        if (connected) return await resetWallet()
        if (!walletConnected) return await connectWallet("fromClickHandler")
        if (walletConnected && !connected) {
            const redirect = await login()
            redirect && goToStep(2)
        }
    }

    return (
        <div className={cn(s._box, s.jigenListSecond)}>
            <div className={cn(s.jigenListSecond__title, '_subtitle')}>
                Start your application <br/>
                {userWallet && addressSlice(userWallet)}
            </div>
            <div className={s.jigenListSecond__text}>
                Create your account using your eth wallet
            </div>
            {/*{!walletConnected ?*/}
            {/*    <button className={cn(s.jigenListSecond__btn, '_btn')} onClick={connectHandler}>*/}
            {/*        <span>Connect eth wallet</span>*/}
            {/*    </button> :*/}
            {/*    <>*/}
            {/*        <button className={cn(s.jigenListThird__btn, '_btn')} onClick={disconnectHandler}>*/}
            {/*            <span>Disconnect wallet</span>*/}
            {/*        </button>*/}
            {/*        <button className={cn(s.jigenListSecond__btn, '_btn')} onClick={() => goToStep(2)}>*/}
            {/*            <span>Next step</span>*/}
            {/*        </button>*/}
            {/*    </>*/}
            {/*}*/}

            <button className={cn(s.jigenListThird__btn, '_btn')} disabled={disabled} onClick={clickHandler}>
                    <span>
                        {walletConnected && connected && 'Reset wallet'}
                        {!walletConnected && 'Connect eth wallet'}
                        {walletConnected && !connected && 'Login'}
                    </span>
            </button>
            {connected &&
                <button className={cn(s.jigenListSecond__btn, '_btn')} onClick={() => goToStep(2)}>
                    <span>Next step</span>
                </button>
            }

            <div className={s.jigenListSecond__info}>
                <div className={s.jigenListSecond__icon}>
                    <Image src={info} alt="info icon" width={16} height={16}/>
                </div>
                <span>Please if you hold any $jig token <b>(BSC/ETH)</b> <br/>connect that wallet</span>
            </div>
        </div>
    )
})

interface JigenListSecondProps {
    goToStep: (step: number) => void
}

export default JigenListSecond

