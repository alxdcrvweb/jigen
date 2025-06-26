import cn from 'classnames';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { FC } from 'react';
import mobDecor from '../../public/whatsNext/decorMobile.svg';
import s from '../../styles/main.module.scss';
import WhatsNextItem from './WhatsNextItem';


const WhatsNextList = [
    {id: 1, Text: () => <>Launch of the <br/>Genesis Collection</>},
    {id: 2, Text: () => <>Redeem our limited-edition <br/>of Hoodies</>},
    {id: 3, Text: () => <>More Airdrops and <br/>Opportunities</>},
    {id: 6, Text: () => <>IRL Events for <br/> the community</>},
    {id: 5, Text: () => <>Jigen Marketplace</>},
    {id: 4, Text: () => <>Metaverse <br/> experience</>},
]

const WhatsNext: FC = observer(({}) => {


    return (
        <section className={s.whatsNext}>
            <div className={cn(s.whatsNext__container, '_container')}>
                <div className={s.whatsNext__box}>
                    <h2 className={cn(s.whatsNext__title, '_title')}>WHAT&rsquo;S NEXT?</h2>
                    <div className={s.whatsNext__body}>
                        <div className={s.whatsNext__list}>
                            {WhatsNextList.map(el => <WhatsNextItem key={el.id} {...el} />)}
                        </div>
                        <div className={s.whatsNext__descDecor}></div>
                        <div className={s.whatsNext__mobileDecor}>
                            <Image src={mobDecor} alt={'mibile Decor'} layout="intrinsic" width={340} height={1000}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})

export default WhatsNext
