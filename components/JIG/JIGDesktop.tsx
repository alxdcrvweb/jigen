import cn from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { observer } from 'mobx-react';
import Image, { StaticImageData } from 'next/image';
import { FC, MutableRefObject, useEffect, useRef } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import arrow01 from '../../public/jig/arrow01.svg';
import arrow02 from '../../public/jig/arrow02.svg';
import arrow03 from '../../public/jig/arrow03.svg';
import arrow04 from '../../public/jig/arrow04.svg';
import coin01 from '../../public/jig/coins/01.webp';
import coin02 from '../../public/jig/coins/02.webp';
import coin03 from '../../public/jig/coins/03.webp';
import coin04 from '../../public/jig/coins/04.webp';
import s from '../../styles/main.module.scss';


interface JIGDesktopProps {
    JIGList: {
        id: number;
        icon: StaticImageData;
        title: string;
        Text: () => JSX.Element;
        ref: MutableRefObject<null>;
    }[]
    itemRef01: MutableRefObject<null>;
    itemRef02: MutableRefObject<null>;
    itemRef03: MutableRefObject<null>;
    itemRef04: MutableRefObject<null>;
    jigDesktopRef: MutableRefObject<null>;
}

gsap.registerPlugin(ScrollTrigger)

const JIGDesktop: FC<JIGDesktopProps> = observer(({JIGList, itemRef01, itemRef02, itemRef03, itemRef04, jigDesktopRef}) => {

    const {scroll} = useLocomotiveScroll()
    // const jigDesktopRef = useRef(null)
    const coinRef01 = useRef(null)
    const coinRef02 = useRef(null)
    const coinRef03 = useRef(null)
    const coinRef04 = useRef(null)
    const arrowRef01 = useRef(null)
    const arrowRef02 = useRef(null)
    const arrowRef03 = useRef(null)
    const arrowRef04 = useRef(null)

    useEffect(() => {
        if (!scroll) return

        ScrollTrigger.scrollerProxy(scroll.el, {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: scroll.el!.style.transform ? 'transform' : 'fixed'
        });

        ScrollTrigger.defaults({
            scroller: scroll.el,
            trigger: jigDesktopRef.current,
            toggleActions: 'play none reverse none',
            // markers: true,
            // pin: true,
            // scrub: true,
        })


        const tl = gsap.timeline({
            scrollTrigger: {
                start: 'center bottom',
                end: '+=0',
            },
        })

        tl.to([coinRef04.current, arrowRef01.current, itemRef01.current], {
            opacity: 1,
            ease: 'ease',
            // duration: 0.5,
            transitionDuration: 0.5,
        }).to([coinRef03.current, arrowRef02.current, itemRef03.current], {
            opacity: 1,
            ease: 'ease',
            // duration: 0.5,
            transitionDuration: 0.5,
        }).to([coinRef02.current, arrowRef03.current, itemRef02.current], {
            opacity: 1,
            ease: 'ease',
            // duration: 0.5,
            transitionDuration: 0.5,
        }).to([coinRef01.current, arrowRef04.current, itemRef04.current], {
            opacity: 1,
            ease: 'ease',
            // duration: 0.5,
            transitionDuration: 0.5,
        })

        return () => {
            tl.kill()
        }

    }, [scroll])


    return (
        <div className={s.jigDesktop}>
            <div className={s.jigDesktop__column}>
                {JIGList.map((el, index) => {
                    if (index < 2) {
                        return (
                            <div key={el.id} ref={el.ref} className={s.jigItem}>
                                <div className={s.jigItem__image}>
                                    <Image src={el.icon} alt={`icon ${el.title}`} width={60} height={60}/>
                                </div>
                                <div className={s.jigItem__title}>{el.title}</div>
                                <div className={cn(s.jigItem__text, '_text')}>{el.Text()}</div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className={s.jigDesktop__coins}>
                <div className={cn(s.jigDesktop__coin, s.jigDesktop__coin_1)} ref={coinRef01}>
                    <Image src={coin04} alt={'coin'} layout="fixed" width={360} height={190}/>
                </div>
                <div className={cn(s.jigDesktop__coin, s.jigDesktop__coin_2)} ref={coinRef02}>
                    <Image src={coin03} alt={'coin'} layout="fixed" width={360} height={190}/>
                </div>
                <div className={cn(s.jigDesktop__coin, s.jigDesktop__coin_3)} ref={coinRef03}>
                    <Image src={coin02} alt={'coin'} layout="fixed" width={360} height={190}/>
                </div>
                <div className={cn(s.jigDesktop__coin, s.jigDesktop__coin_4)} ref={coinRef04}>
                    <Image src={coin01} alt={'coin'} layout="fixed" width={360} height={190}/>
                </div>
                <div className={cn(s.jigDesktop__arrow, s.jigDesktop__arrow_1)} ref={arrowRef01}>
                    <Image src={arrow01} alt={'arrow 1'} layout="fixed" width={121} height={90}/>
                </div>
                <div className={cn(s.jigDesktop__arrow, s.jigDesktop__arrow_2)} ref={arrowRef02}>
                    <Image src={arrow02} alt={'arrow 2'} layout="fixed" width={56.56} height={45.82}/>
                </div>
                <div className={cn(s.jigDesktop__arrow, s.jigDesktop__arrow_3)} ref={arrowRef03}>
                    <Image src={arrow03} alt={'arrow 3'} layout="fixed" width={116.61} height={36.44}/>
                </div>
                <div className={cn(s.jigDesktop__arrow, s.jigDesktop__arrow_4)} ref={arrowRef04}>
                    <Image src={arrow04} alt={'arrow 4'} layout="fixed" width={106.9} height={77.85}/>
                </div>
            </div>
            <div className={s.jigDesktop__column}>
                {JIGList.map((el, index) => {
                    if (index >= 2) {
                        return (
                            <div key={el.id} ref={el.ref} className={s.jigItem}>
                                <div className={s.jigItem__image}>
                                    <Image src={el.icon} alt={`icon ${el.title}`} width={60} height={60}/>
                                </div>
                                <div className={s.jigItem__title}>{el.title}</div>
                                <div className={cn(s.jigItem__text, '_text')}>{el.Text()}</div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
})

export default JIGDesktop
