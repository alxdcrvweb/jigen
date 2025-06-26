import { observer } from 'mobx-react'
import s from '../../styles/jigenlist.module.scss'
import cn from 'classnames';
import status from '../../public/icons/status.svg'
import arrow from '../../public/icons/arrow-down.svg'
import logo from '../../public/logo.svg'
import Image from 'next/image';
import { useRouter } from 'next/router';


interface JigenListHeaderProps {
}

const JigenListHeader = observer(({}: JigenListHeaderProps) => {

    const router = useRouter();
    const formStep = router.query.step ?? 0;

    const goToStep = (step: number) => {
        router.push(`${router.pathname}?step=${step}`);
    };

    const backHandler = () => {
        if (Number(formStep) !== 0) return router.push(`${router.pathname}?step=${Number(formStep) - 1}`);
    }


    return (
        <header className={s.jigenListHeader}>
            <div className={cn(s.jigenListHeader__container, '_container')}>
                <div className={s.jigenListHeader__box}>
                    {formStep <= 0 ?
                        <button className={cn(s.jigenListHeader__status, '_smallbtn')} onClick={() => goToStep(4)}>
                            <Image src={status} alt="status icon" width={20} height={20}/>
                            Check status
                        </button> : <>
                            <button className={cn(s.jigenListHeader__back, '_iconbtn _iconbtn_small')} onClick={backHandler}>
                                <Image src={arrow} alt="arrow icon" width={20} height={20}/>
                            </button>
                            <div className={s.jigenListHeader__logo} onClick={() => router.push('/')}>
                                <Image src={logo} alt="logo" width={80} height={32}/>
                            </div>
                        </>
                    }
                </div>
            </div>
        </header>
    )
})

export default JigenListHeader

