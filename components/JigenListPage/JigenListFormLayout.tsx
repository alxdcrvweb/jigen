import { observer } from 'mobx-react'
import { FC } from 'react';
import s from '../../styles/jigenlist.module.scss';
import restart from '../../public/icons/restart.svg'
import Image from 'next/image';
import cn from 'classnames';
import step01 from '../../public/jigenListPage/step01.png';
import step02 from '../../public/jigenListPage/step02.png';
import step03 from '../../public/jigenListPage/step03.png';
import { useRouter } from 'next/router';
import { useInjection } from 'inversify-react';
import { WalletStore } from '../../stores/WalletStore';
import { signOut } from 'next-auth/react';

const stepsList = [
    {id: 1, text: 'Wallet'},
    {id: 2, text: 'Twitter'},
    {id: 3, text: 'Questions'},
]

const JigenListFormLayout: FC<JigenListFormLayoutProps> = observer(({children, goToStep}) => {

    const {resetWallet} = useInjection(WalletStore)
    const router = useRouter();
    const formStep = router.query.step ?? 0

    const resetHandler = async () => {
        await resetWallet()
        await signOut({redirect: false})
        goToStep(1)
    }


    return (
        <div className={s.jigenListFormLayout}>
            <div className={cn(s.jigenListFormLayout__steps, s.steps)}>
                <div className={s.steps__line}>
                    {Number(formStep) === 1 && <Image src={step01} alt="step 1 image" layout="responsive"/>}
                    {Number(formStep) === 2 && <Image src={step02} alt="step 2 image" layout="responsive"/>}
                    {Number(formStep) === 3 && <Image src={step03} alt="step 3 image" layout="responsive"/>}
                </div>
                <div className={s.steps__labels}>
                    {stepsList.map(step => (
                        <span key={step.id} className={cn(step.id === Number(formStep) && s._active)}>{step.text}</span>
                    ))}
                </div>
            </div>
            {children}
            <div className={cn(s.jigenListFormLayout__restart, s.restart)}>
                <div className={s.restart__left}>
                    <div className={s.restart__title}>
                        Made a mistake?
                    </div>
                    <div className={cn(s.restart__text, '_text')}>
                        Restart application
                    </div>
                </div>
                <button className={cn(s.restart__btn, '_smallbtn _smallbtn_icon')} onClick={resetHandler}>
                    <Image src={restart} alt="restart icon" width={20} height={20}/>
                </button>
            </div>
        </div>
    )
})

interface JigenListFormLayoutProps {
    goToStep(step: number): void
}

export default JigenListFormLayout

