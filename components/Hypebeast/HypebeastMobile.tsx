import { observer } from 'mobx-react';
import { FC, useRef, useState } from 'react';
import { Navigation } from 'swiper';
import s from '../../styles/main.module.scss';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';


import HypebeastItem from './HypebeastItem';
import HypebeastMobileFooter from './HypebeastMobileFooter';
import { StaticImageData } from 'next/image';

interface HypebeastMobileProps {
    HypebeastSectionList: { id: number, title: string, Text: () => JSX.Element, icon: StaticImageData }[]
}


const HypebeastMobile: FC<HypebeastMobileProps> = observer(({HypebeastSectionList}) => {

    const [swiper, setSwiper] = useState<any>(null)
    const [activeIndex, setActiveIndex] = useState(1)
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    return (
        <div className={s.hypebeastSection__mobile}>
            <Swiper
                className={s.hypebeastSection__slider}
                observer={true}
                observeParents={true}
                speed={1000}
                slidesPerView={1}
                modules={[Navigation]}
                navigation={{
                    nextEl: navigationNextRef.current,
                    prevEl: navigationPrevRef.current,
                    disabledClass: '_disabled'
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex + 1)
                }}
                id="hypebeastSlider"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                        centeredSlides: true
                    },
                    767.98: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        centeredSlides: false
                    },
                }}
                onSwiper={swiper => setSwiper(swiper)}
            >
                {HypebeastSectionList.map(el => (
                    <SwiperSlide
                        className={s.hypebeastSection__slide}
                        key={el.id}
                    >
                        <HypebeastItem {...el} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <HypebeastMobileFooter max={HypebeastSectionList.length} activeIndex={activeIndex} navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}/>
        </div>
    )
})

export default HypebeastMobile
