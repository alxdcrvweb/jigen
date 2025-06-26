import s from '../../../styles/productCard.module.scss';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { observer } from 'mobx-react';
import SwiperCore, { Autoplay, EffectFade, FreeMode, Thumbs } from 'swiper';
import { FC, useEffect, useState } from 'react';

interface ProductCardSliderProps {
    listImages: string[]
}

export const ProductCardSlider: FC<ProductCardSliderProps> = observer(({listImages}) => {
    const [mainSwiper, setMainSwiper] = useState<SwiperCore | undefined>(undefined);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | undefined>(undefined);

    useEffect(() => {
        mainSwiper?.autoplay?.run()
    }, [mainSwiper, thumbsSwiper])
    return (
        <div className={s.productCardSliders}>
            <div className={s.productCardSliders__main}>
                <Swiper
                    className={'_cardSlider'}
                    observer={true}
                    observeParents={true}
                    onSwiper={setMainSwiper}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false
                    }}
                    effect={'fade'}
                    thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                    modules={[FreeMode, Thumbs, Autoplay, EffectFade]}
                >
                    {listImages?.map(el => (
                        <SwiperSlide key={el}>
                            <img src={el} alt={el}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={s.productCardSliders__thumb}>
                <Swiper
                    className={'_thumbSlider'}
                    observer={true}
                    observeParents={true}
                    onSwiper={setThumbsSwiper}
                    modules={[FreeMode, Thumbs, Autoplay,]}
                    watchOverflow={true}
                    slidesPerView={'auto'}
                    breakpoints={{
                        360: {
                            direction: 'horizontal',
                            spaceBetween: 16,
                        },
                        991.98: {
                            direction: 'vertical',
                            spaceBetween: 12,
                        }
                    }}

                >
                    {listImages?.map(el => (
                        <SwiperSlide key={el}>
                            <img src={el} alt={el}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
});


