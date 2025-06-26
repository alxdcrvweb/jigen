import { NextPage } from 'next';
import { observer } from 'mobx-react'
import { useRouter } from 'next/router';
import s from '../styles/jigenlist.module.scss'
import JigenListLayout from '../components/JigenListPage/JigenListLayout';
import cn from 'classnames';
import { JigenListFirst } from '../components/JigenListPage/JigenListFirst';
import decor01 from '../public/jigenListPage/decor01.png'
import decor02 from '../public/jigenListPage/decor02.png'
import decor03 from '../public/jigenListPage/decor03.png'
import Image from 'next/image';
import { useInjection } from 'inversify-react';
import { WalletStore } from '../stores/WalletStore';


const Home: NextPage = observer(({}) => {

    const router = useRouter();
    const {connectWallet, login, walletConnected, connected, resetWallet} = useInjection(WalletStore)

    const clickHandler = async () => {
        if (!walletConnected) return await connectWallet("fromClickHandler")
        if (!connected) return await login()
        await router.push('/metalock')
    }

    return (
        <JigenListLayout>
            <main className={s.jigenListMain}>
                <div className={cn(s.jigenListMain__container, '_container')}>
                    <div className={s.jigenListMain__decorations}>
                        <div className={cn(s.jigenListMain__decorItem, s.jigenListMain__decorItem_1)}>
                            <Image src={decor01} alt="decor01"/>
                        </div>
                        <div className={cn(s.jigenListMain__decorItem, s.jigenListMain__decorItem_2)}>
                            <Image src={decor02} alt="decor02"/>
                        </div>
                        <div className={cn(s.jigenListMain__decorItem, s.jigenListMain__decorItem_3)}>
                            <Image src={decor03} alt="decor03"/>
                        </div>
                    </div>
                    {/*<JigenListFirst goToStep={goToStep}/>*/}
                    <JigenListFirst
                        clickHandler={clickHandler}
                        text={'Apply for the Jigenlist and be ready to experience a new phygital dimension as one of the 500 privileged community member.'}
                        btnText={
                            !walletConnected ? 'connect wallet' :
                                !connected ? 'login' :
                                    'Metalock'
                        }
                    />
                </div>
            </main>
        </JigenListLayout>
    )
})

export default Home

