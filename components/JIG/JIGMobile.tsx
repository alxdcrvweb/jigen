import { observer } from 'mobx-react'
import { FC, useRef, useState } from 'react'
import s from '../../styles/main.module.scss'
import { Navigation, Grid, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image, { StaticImageData } from 'next/image'
import cn from 'classnames'
import JIGMobileFooter from './JIGMobileFooter';

interface JIGMobileProps {
    JIGList: {
        id: number;
        icon: StaticImageData;
        title: string;
        Text: () => JSX.Element;
    }[]
}


const JIGMobile: FC<JIGMobileProps> = observer(({JIGList}) => {

    const [swiper, setSwiper] = useState<any>(null)
    const navigationJIGNext = useRef(null)
    const navigationJIGPrev = useRef(null)

    return (
        <div className={s.jigMobile}>
            <Swiper
                className={s.jigMobile__slider}
                modules={[Navigation, Grid, Pagination]}
                observer={true}
                observeParents={true}
                speed={1000}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                    nextEl: navigationJIGNext.current,
                    prevEl: navigationJIGPrev.current,
                    disabledClass: '_disabled',
                }}
                grid={{
                    rows: 2,
                }}
                pagination={{
                    type: 'fraction',
                    el: '.jigFraction',
                }}
                autoHeight={false}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    767.98: {
                        slidesPerView: 2,
                    },
                }}
                onSwiper={swiper => setSwiper(swiper)}
            >
                {JIGList.map(el => (
                    <SwiperSlide className={s.jigMobile__slide} key={el.id}>
                        <div className={s.jigItem}>
                            <div className={s.jigItem__image}>
                                <Image src={el.icon} alt={`icon ${el.title}`} width={60} height={60}/>
                            </div>
                            <div className={s.jigItem__title}>{el.title}</div>
                            <div className={cn(s.jigItem__text, '_text')}>{el.Text()}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <JIGMobileFooter navigationPrevRef={navigationJIGPrev} navigationNextRef={navigationJIGNext}/>
        </div>
    )
})

export default JIGMobile
