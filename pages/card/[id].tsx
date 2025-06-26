import s from '../../styles/productCard.module.scss';
import { observer } from 'mobx-react'
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useInjection } from 'inversify-react';
import cn from 'classnames';
import Image from 'next/image';

import { IAboutInfo, IRewardsCard } from '../../models/models';
import rolex01 from '../../public/App/rewards/rolex01.png';
import AppLayout from '../../components/App/AppLayout';
import arrow from '../../public/icons/arrow-down.svg';
import { WalletStore } from '../../stores/WalletStore';
import { ProductCardSlider } from '../../components/App/ProductCard/ProductCardSlider';


export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: IRewardsCard }> => {
    const card: IRewardsCard = {
        _id: '1',
        title: 'Physical Hoodie',
        locked: true,
        expressIn: '2D',
        image: rolex01,
        metalock: '4 weeks',
        requirement: '',
        info: {
            listImages: [
                '/App/rewards/rolex01.png',
                '/jigenListPage/decor01.png',
                '/jigenListPage/decor02.png',
            ],
            description: [
                'The first collection by Jigen is focused on the web3 values, their dynamics are unfolded through its characters, creating a strong union between two apparently far worlds, but closer than you think: hypebeast and degens.',
                'Each hoodie is made with care by expert italian manufacturers, mixing different printing techniques in order to obtain the best possible result in terms of aesthetics and comfort.\n' +
                'The product is provided with an NFC tag inside, placed under the logo label, through which it is possible to check the authenticity of the product.'
            ],
            bigTitle: 'physical hoodies',
            aboutItem: [
                {id: '1', value: 'Italy', name: 'Made in'},
                {id: '2', value: 'Regular', name: 'Fit'},
                {id: '3', value: 'Regular', name: 'Fit'},
                {id: '4', value: 'Regular', name: 'Fit'},
                {id: '5', value: 'Regular', name: 'Fit'},
            ]
        }
    }

    return {
        props: {...card}, // will be passed to the page component as props
    }
}

const CardPage = observer(({image, title, locked, _id, expressIn, requirement, info, metalock}: IRewardsCard) => {
    // @ts-ignore
    const {listImages, description, aboutItem, bigTitle}: IAboutInfo = info
    const router = useRouter();
    const {disabled} = useInjection(WalletStore)
    const [open, setOpen] = useState(false);

    const toggleClick = () => {
        setOpen(prev => !prev)
    }

    return (
        <AppLayout>
            <main className={s.productCard}>
                <div className={cn(s.productCard__header, '_appContainer')}>
                    <button className={cn(s.productCard__back, '_iconbtn')} onClick={() => router.push('/rewards')}>
                        <Image src={arrow} alt={'arrow prev'} width={24} height={24}/>
                    </button>
                    {title}
                </div>
                <div className={cn(s.productCard__main, '_appContainer')}>
                    <div className={s.productCard__left}>
                        <ProductCardSlider listImages={listImages}/>
                        <div className={s.productCardInfo}>
                            <div className={s.productCardInfo__head}>
                                <div className={s.productCardInfo__label}>Additional information</div>
                                <button className={s.productCardInfo__more} onClick={toggleClick}>
                                    {open ? 'Less' : 'More'}
                                </button>
                            </div>
                            <ul className={s.productCardInfo__list}>
                                {aboutItem?.map((el, index) => {
                                    if (!open && index > 1) return
                                    return (
                                        <li key={el.id} className={s.productCardInfo__item}>
                                            <span>{el.name}</span>
                                            <b>{el.value}</b>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className={s.productCard__right}>
                        <h1 className={s.productCard__title}>
                            Explore our <br/>
                            {bigTitle}
                        </h1>
                        <div className={cn(s.productCard__text, '_text')}>
                            {description?.map((el: string) => (
                                <p key={el}>{el}</p>
                            ))}
                        </div>
                        <button className={cn(s.productCard__btn, '_btn')} disabled={disabled} onClick={()=>{router.push('../../select')}}>Claim now</button>
                    </div>
                </div>
            </main>
        </AppLayout>
    )
})

export default CardPage

