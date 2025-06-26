import { NextPage } from 'next';
import { observer } from 'mobx-react'
import s from '../styles/test.module.scss'
import AppLayout from '../components/App/AppLayout';
import cn from 'classnames';
import AppTooltip from '../components/App/AppTooltip';
import HelpIcon from '../components/Icons/HelpIcon';
import { useRouter } from 'next/router';

const TextPage: NextPage = observer(({}) => {
    const router = useRouter();
    const approveClaim = () =>{
        router.push('../../size')
    }
    return (
        <AppLayout>
            <main className={cn(s.main)}>
                <div className={cn(s.test, '_appContainer')}>
                <div className={s.test__top}>
                    <h1 className={cn(s.test__title, '_appTitle')}>
                        WE WILL NOW BEGIN THE CLAIMING PROCESS
                    </h1>
                    <p>
                        You will be able to claim your Jigen hypebeast hoodie
                    </p>
                </div>
                <div className={s.test__main}>
                    <div className={s.test__top}>
                        <div className={s.test__subtitle}>
                            Header
                        </div>
                        <div className={s.test__text}>
                            <p>
                                Your character will lose its hoodie and will be changed into a temporary version.
                            </p>
                            <p>
                                Once the claiming window is over there will be a rarity re-roll and you&apos;ll be able to discover the secret trait below the hoodie.
                            </p>
                            <p>
                                The rarity of the secret trait is in no way related to the rarity of the hoodie.
                            </p>
                            <p>
                                This means that you could obtain a rare trait from a common rarity hypebeast.
                            </p>
                        </div>
                    </div>
                    <div className={s.test__info}>
                        <AppTooltip id={'onlyOnce'} regular={true} text={'Please note that you\'re able to claim the hoodie only once and the process is not reversible.'} icon={<HelpIcon/>}
                                    tooltipText={'Test'}/>
                    </div>

                    <p>
                        We will charge a small fee to cover the shipping cost depengin on your
                        country (EU = ??? ETH, extra EU = ??? ETH)
                    </p>
                </div>
                <button className={cn(s.test__btn, '_btn')} onClick={approveClaim}>Continue</button>
                </div>
            </main>
        </AppLayout>
    )
})

export default TextPage

