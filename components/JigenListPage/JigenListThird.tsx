import { observer } from 'mobx-react'
import cn from 'classnames';
import s from '../../styles/jigenlist.module.scss';
import Image from 'next/image';
import twitter from '../../public/icons/twitter.svg';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useInjection } from 'inversify-react';
import { WalletStore } from '../../stores/WalletStore';
import { useRouter } from 'next/router';
import { ISession } from '../../models/models';

const JigenListThird = observer(({goToStep}: JigenListThirdProps) => {

    const router = useRouter();
    const {walletConnected, web3Modal} = useInjection(WalletStore)
    const {data, status}: ISession = useSession()

    const clickHandler = async () => {
        status === 'authenticated' ? await signOut({redirect: false}) :
            await signIn('twitter', {redirect: false, callbackUrl: `${router.pathname}?step=3`})
    }

    useEffect(() => {
        if (!Boolean(web3Modal?.cachedProvider) && !walletConnected) goToStep(1)
    }, [walletConnected])

    return (
        <div className={cn(s._box, s.jigenListSecond)}>
            <div className={cn(s.jigenListSecond__title, '_subtitle')}>
                Verify your twitter <br/>
                {data?.user?.name && `session : @${data?.twitter?.twitterHandle}`}
            </div>
            <div className={s.jigenListSecond__text}>
                We’re only requesting access to verify your username. You can revoke at any time.
            </div>

            {status !== 'authenticated' ?
                <button className={cn(s.jigenListThird__btn, '_btn')} onClick={clickHandler}>
                    <div className="_btn__icon">
                        <Image src={twitter} alt="twitter icon" width={23} height={20}/>
                    </div>
                    <span>Verify with twitter</span>
                </button> :
                <>
                    <button className={cn(s.jigenListThird__btn, '_btn')} onClick={clickHandler}>
                        <div className="_btn__icon">
                            <Image src={twitter} alt="twitter icon" width={23} height={20}/>
                        </div>
                        <span>Sign out</span>
                    </button>
                    <button className={cn(s.jigenListThird__btn, '_btn')} onClick={() => goToStep(3)}>
                        <span>Next step</span>
                    </button>
                </>
            }
        </div>
    )
})

interface JigenListThirdProps {
    goToStep: (step: number) => void
}

export default JigenListThird

