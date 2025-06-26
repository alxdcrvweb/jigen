import { NextPage } from 'next';
import { observer } from 'mobx-react'
import { useRouter } from 'next/router';
import s from '../styles/jigenlist.module.scss'
import JigenListLayout from '../components/JigenListPage/JigenListLayout';
import cn from 'classnames';
import { JigenListFirst } from '../components/JigenListPage/JigenListFirst';
import JigenListSecond from '../components/JigenListPage/JigenListSecond';
import JigenListFormLayout from '../components/JigenListPage/JigenListFormLayout';
import JigenListThird from '../components/JigenListPage/JigenListThird';
import JigenListFour from '../components/JigenListPage/JigenListFour';
import { useEffect } from 'react';
import JigenListFive from '../components/JigenListPage/JigenListFive';
import decor01 from '../public/jigenListPage/decor01.png'
import decor02 from '../public/jigenListPage/decor02.png'
import decor03 from '../public/jigenListPage/decor03.png'
import Image from 'next/image';

const Jigenlist: NextPage = observer(({}) => {

    const router = useRouter();
    const formStep = router.query.step ?? 0

    const goToStep = (step: number) => {
        router.push(`${router.pathname}?step=${step}`);
    }
    const clickHandler = () => {
        goToStep(1)
    }

    useEffect(() => {
        if (router.query.step !== undefined && Number(formStep) <= 0) goToStep(0)
    }, [formStep])

    return (
        <JigenListLayout>
            <main className={s.jigenListMain}>
                <div className={cn(s.jigenListMain__container, '_container')}>
                    <div className={cn(s.jigenListMain__decorations, Number(formStep) > 0 && s.jigenListMain__decorations_desktop)}>
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
                    {Number(formStep) <= 0 && <JigenListFirst
                        clickHandler={clickHandler}
                        text={'Apply for the Jigenlist and be ready to experience a new phygital dimension as one of the 500 privileged community member.'}
                        btnText={'Apply now'}
                    />
                    }
                    {Number(formStep) > 0 && Number(formStep) < 4 &&
                        <JigenListFormLayout goToStep={goToStep}>
                            {formStep === '1' && <JigenListSecond goToStep={goToStep}/>}
                            {formStep === '2' && <JigenListThird goToStep={goToStep}/>}
                            {formStep === '3' && <JigenListFour goToStep={goToStep}/>}
                        </JigenListFormLayout>
                    }
                    {Number(formStep) === 4 && <JigenListFive goToStep={goToStep}/>}
                </div>
            </main>
        </JigenListLayout>
    )
})

export default Jigenlist

