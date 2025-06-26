import cn from "classnames";
import { observer } from "mobx-react";
import { FC } from "react";
import s from "../../styles/main.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import Image from "next/image";
import image01 from "../../public/partners/01.webp";
import image02 from "../../public/partners/02.webp";
import image03 from "../../public/partners/03.webp";
import image04 from "../../public/partners/04.webp";
import image05 from "../../public/partners/05.webp";
import image06 from "../../public/partners/06.webp";
import image07 from "../../public/partners/07.webp";
import image08 from "../../public/partners/08.webp";
import Marquee from "react-fast-marquee";
SwiperCore.use([Autoplay]);

const Partners: FC = observer(({}) => {
  const PartnersList = [
    { id: 1, image: image01 },
    { id: 2, image: image02 },
    { id: 3, image: image03 },
    { id: 4, image: image04 },
    { id: 5, image: image05 },
    { id: 6, image: image06 },
    { id: 7, image: image07 },
    { id: 8, image: image08 },
  ];

  return (
    <section className={s.partners}>
      <div className={cn(s.partners__container)}>
        <div className={s.partners__box}>
          <h2 className={cn(s.partners__title, "_title")}>Partners</h2>
          <div className={s.partners__sliders}>
            <Marquee gradient={false} speed={30}>
              <div className={s.partners__slider}>
                {PartnersList.map((el, index) => {
                  if (index < 4) {
                    return (
                      <div className={s.partners__slide} key={index}>
                        <div className={s.partners__image}>
                          <Image src={el.image} alt={`image ${el.id}`} unoptimized/>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </Marquee>
            <Marquee gradient={false} speed={30} direction={"right"}>
              <div className={s.partners__slider}>
                {PartnersList.map((el, index) => {
                  if (index >= 4) {
                    return (
                      <div className={s.partners__slide} key={index}>
                        <div className={s.partners__image}>
                          <Image src={el.image} alt={`image ${el.id}`}  unoptimized/>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Partners;
