import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC, useRef, useState } from 'react';
import s from '../../styles/main.module.scss';
import OurTeamMobileFooter from './OurTeamMobileFooter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import OurTeamItem from './OurTeamItem';
import { StaticImageData } from 'next/image';


interface OurTeamMobileProps {
    ourTeamList: {
        id: number;
        image: StaticImageData;
        position: string;
        social: {
            id: number;
            link: string;
            icon: any;
        }[];
        name: string;
        text: string;
        fullText: string;
    }[]
}

const OurTeamMobile: FC<OurTeamMobileProps> = observer(({ourTeamList}) => {

    const [swiper, setSwiper] = useState<any>(null)
    const OurTeamNextRef = useRef(null)
    const OurTeamPrevRef = useRef(null)

    return (
        <div className={s.ourTeamMobile}>
            <Swiper
                className={s.ourTeamMobile__slider}
                observer={true}
                observeParents={true}
                speed={1000}
                spaceBetween={20}
                slidesPerView={'auto'}
                modules={[Navigation, Pagination]}
                centeredSlides={true}
                simulateTouch={true}
                navigation={{
                    nextEl: OurTeamNextRef.current,
                    prevEl: OurTeamPrevRef.current,
                    disabledClass: '_disabled'
                }}
                id="ourTeamSlider"
                pagination={{
                    type: 'fraction',
                    el: '.ourTeamFraction',
                }}
                breakpoints={{
                    320: {
                        // slidesPerView: 1,
                        centeredSlides: true
                    },
                    767.98: {
                        // slidesPerView: 'auto',
                        centeredSlides: false
                    },
                    // 991.98: {
                    // 	slidesPerView: 'auto',
                    // 	spaceBetween: 20,
                    // 	centeredSlides: false
                    // },
                    // 1200: {
                    // 	slidesPerView: 2,
                    // 	spaceBetween: 20,
                    // 	centeredSlides: false
                    // },
                }}
                onSwiper={swiper => setSwiper(swiper)}
            >
                {ourTeamList.map(el => (
                    <SwiperSlide
                        className={s.ourTeamMobile__slide}
                        key={el.id}
                    >
                        <OurTeamItem {...el} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <OurTeamMobileFooter navigationPrevRef={OurTeamPrevRef} navigationNextRef={OurTeamNextRef}/>
        </div>
    )
})

export default OurTeamMobile
