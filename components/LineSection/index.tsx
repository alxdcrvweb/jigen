import { observer } from 'mobx-react'
import { FC, useEffect, useRef } from 'react'
import s from '../../styles/main.module.scss'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import cn from 'classnames'

gsap.registerPlugin(ScrollTrigger)

const LineSection: FC = observer(({}) => {
    const {scroll} = useLocomotiveScroll()
    const wrapperRef = useRef(null)
    const rowRef01 = useRef(null)
    const rowRef02 = useRef(null)

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
            trigger: wrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
        })

        gsap.to([rowRef01.current], {
            scrollTrigger: {
                scrub: 2,
            },
            x: -700
        })

        gsap.to([rowRef02.current], {
            scrollTrigger: {
                scrub: 5,
            },
            x: 700
        })

        return () => {
            // tl.kill()
        }

    }, [scroll])

    return (
        <div>
            <section className={s.lineSection} ref={wrapperRef}>
                <div className={cn(s.lineSection__row, s.lineSection__row_1)}>
                    <div className={s.lineSection__line} ref={rowRef01}>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                    </div>
                </div>
                <div className={cn(s.lineSection__row, s.lineSection__row_2)}>
                    <div className={s.lineSection__line} ref={rowRef02}>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        <img src="/lineSectionImages/line.webp" alt={'line image'}/>
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                        {/* <Image src={line} alt={'line image'} layout='responsive' objectFit='cover' /> */}
                    </div>
                </div>
            </section>
        </div>
    )
})

export default LineSection
