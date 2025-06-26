import cn from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { FC, useEffect, useRef } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import man01 from '../../public/collection/01.webp';
import man02 from '../../public/collection/02.webp';
import man03 from '../../public/collection/03.webp';
import man04 from '../../public/collection/04.webp';
import man05 from '../../public/collection/05.webp';
import bg from '../../public/collection/bg.webp';
import logo from '../../public/collection/logo.svg';
import s from '../../styles/main.module.scss';

gsap.registerPlugin(ScrollTrigger)



const Collection: FC = observer(({ }) => {
	const { scroll } = useLocomotiveScroll()
	const wrapperRef = useRef(null)
	const bodyRef = useRef<HTMLDivElement | null>(null)
	const imageRef01 = useRef<HTMLDivElement | null>(null)
	const imageRef02 = useRef<HTMLDivElement | null>(null)
	const imageRef03 = useRef<HTMLDivElement | null>(null)
	const imageRef04 = useRef<HTMLDivElement | null>(null)
	const imageRef05 = useRef<HTMLDivElement | null>(null)


	useEffect(() => {
		if (!scroll) return

		ScrollTrigger.scrollerProxy(scroll.el, {
			scrollTop(value) {
				return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
			},
			getBoundingClientRect() {
				return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
			},
			pinType: scroll.el!.style.transform ? "transform" : "fixed"
		});

		ScrollTrigger.defaults({
			scroller: scroll.el,
			trigger: bodyRef.current,
		})

		const tl = gsap.timeline()


		ScrollTrigger.matchMedia({
			'(min-width: 767.98px)': function () {
				tl.to([], {
					scrollTrigger: {
						trigger: wrapperRef.current,
						start: 'center center',
						end: '+=1400 center',
						pin: true,
						scrub: 2,
					},
				}).fromTo([imageRef01.current], {
					x: -200,
					opacity: 0
				}, {
					scrollTrigger: {
						start: '110% bottom',
						end: '130% bottom',
						scrub: 2,
					},
					x: 0,
					opacity: 1
				}).fromTo([imageRef02.current], {
					x: 200,
					opacity: 0
				}, {
					scrollTrigger: {
						start: '130% bottom',
						end: '150% bottom',
						scrub: 2,
					},
					x: 0,
					opacity: 1
				}).fromTo([imageRef03.current], {
					x: -200,
					opacity: 0
				}, {
					scrollTrigger: {
						start: '150% bottom',
						end: '170% bottom',
						scrub: 2,
					},
					x: 0,
					opacity: 1
				}).fromTo([imageRef04.current], {
					x: 200,
					opacity: 0
				}, {
					scrollTrigger: {
						start: '170% bottom',
						end: '190% bottom',
						scrub: 2,
					},
					x: 0,
					opacity: 1
				}).fromTo([imageRef05.current], {
					x: -200,
					opacity: 0
				}, {
					scrollTrigger: {
						start: '190% bottom',
						end: '210% bottom',
						scrub: 2,
					},
					x: 0,
					opacity: 1
				})
			},
			'(max-width: 767.98px)': function () {
				ScrollTrigger.create({
					animation: tl,
					trigger: wrapperRef.current,
					start: 'center center',
					end: '+=2000 center',
					pin: true,
					scrub: true,
				})

				tl.from([imageRef01.current], {
					scale: 0.7,
					xPercent: 20,
					opacity: 0,
				}).to([imageRef01.current], {
					scale: 0.7,
					xPercent: -20,
					opacity: 0,
				}).from([imageRef02.current], {
					scale: 0.7,
					xPercent: 20,
					opacity: 0,
				}, '-=0.5').to([imageRef02.current], {
					scale: 0.7,
					xPercent: -20,
					opacity: 0,
				}).from([imageRef03.current], {
					scale: 0.7,
					xPercent: 20,
					opacity: 0,
				}, '-=0.5').to([imageRef03.current], {
					scale: 0.7,
					xPercent: -20,
					opacity: 0,
				}).from([imageRef04.current], {
					scale: 0.7,
					xPercent: 20,
					opacity: 0,
				}, '-=0.5').to([imageRef04.current], {
					scale: 0.7,
					xPercent: -20,
					opacity: 0,
				}).from([imageRef05.current], {
					scale: 0.7,
					xPercent: 20,
					opacity: 0,
				}, '-=0.5').to([imageRef05.current], {
					// scale: 0.7,
					// xPercent: -20,
					// opacity: 0,
				})
			}
		})

		return () => {
			tl.kill()
		}

	}, [scroll])

	return (
		<section className={s.collection} ref={wrapperRef}>
			<div className={s.collection__bg}>
				<Image src={bg} alt={'bg'} layout='fill' objectFit='contain' />
			</div>
			<div className={cn(s.collection__container, '_container')} ref={bodyRef}>
				<div className={s.collection__title}>
					<Image src={logo} alt={'logo'} layout='responsive' />
				</div>
				<div className={s.collection__row}>
					<div className={cn(s.collection__nft, s.collection__nft_1)} ref={imageRef05}>
						<Image src={man01} alt={'man image'} layout='responsive' />
					</div>
					<div className={cn(s.collection__nft, s.collection__nft_2)} ref={imageRef03}>
						<Image src={man02} alt={'man image'} layout='responsive' />
					</div>
					<div className={cn(s.collection__nft, s.collection__nft_3)} ref={imageRef01}>
						<Image src={man03} alt={'man image'} layout='responsive' />
					</div>
					<div className={cn(s.collection__nft, s.collection__nft_4)} ref={imageRef02}>
						<Image src={man04} alt={'man image'} layout='responsive' />
					</div>
					<div className={cn(s.collection__nft, s.collection__nft_5)} ref={imageRef04}>
						<Image src={man05} alt={'man image'} layout='responsive' />
					</div>
				</div>
			</div>

		</section>
	)
})

export default Collection
