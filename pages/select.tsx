import { NextPage } from 'next';
import { observer } from 'mobx-react'
import { useRouter } from 'next/router';
import s from '../styles/select.module.scss'
import AppLayout from '../components/App/AppLayout';
import cn from 'classnames';
import Image from 'next/image';
import arrow from '../public/icons/arrow-down.svg';
import image01 from '../public/App/metalock/01.png';
import SelectCard from '../components/App/SelectPage/SelectCard';
import { IStatusCard } from '../models/models';
import { useState } from 'react';

const selectList: IStatusCard[] = [
    {id: '1', title: '#333', image: image01},
    {id: '2', title: '#333', image: image01},
]


const Select: NextPage = observer(({}) => {

    const router = useRouter();
    const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

    const selectCardHandler = (id: string) => {
        setSelectedCardIds(prev => {
            return prev.includes(id) ? prev.filter(el => el !== id) : [...prev, id]
        })
    }
    const continueSelect = () =>{
        router.push('../../claimingProcess')
    }
    const text = "If your hypebeast is not eligible you may have not reached the required minimum metalock time or you may already have claimed the hoodie for that nft."
    return (
        <AppLayout>
            <main className={s.select}>
                <div className={cn(s.select__header, '_appContainer')}>
                    <div className={s.select__name}>
                        <button className={cn(s.select__back, '_iconbtn')} onClick={() => router.push('/rewards')}>
                            <Image src={arrow} alt={'arrow prev'} width={24} height={24}/>
                        </button>
                        SELECT YOUR JIGEN HYPEBEAST
                    </div>
                    <div className={s.select__text}>
                        {text}
                    </div>
                    
                </div>
                <div className={s.select__text_mobile}>
                    {text}
                </div>
                <div className={cn(s.select__main, '_appContainer')}>
                    <div className={s.select__grid}>
                        {selectList.map((el,i) => (
                            <SelectCard key={el.id} {...el} eligible={i == 0 ? true : false} selectCardHandler={selectCardHandler} selected={selectedCardIds.includes(el.id)}/>
                        ))}
                    </div>
                    {/* {console.log(object)} */}
                    <button className={cn(s.select__btn, '_btn')} disabled={selectedCardIds.length == 0} onClick={continueSelect}>Continue</button>
                </div>
            </main>
        </AppLayout>
    )
})

export default Select

