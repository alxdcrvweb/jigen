import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react';
// import ReactPlayer from 'react-player'
import { VideoStore } from '../../stores/VideoStore'
import s from '../../styles/main.module.scss'
import pause from '../../public/icons/pause.svg'
import sound from '../../public/icons/sound.svg'
import arrow from '../../public/icons/arrow-down.svg'
import cn from 'classnames'
import Image from 'next/image'
import { mouseMoveHandler } from '../../utils/helper'
import { useLocomotiveScroll } from 'react-locomotive-scroll'
import Link from 'next/link';
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from 'react-player/types/lib';

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const FullpageSection = observer(({}) => {
    const {scroll} = useLocomotiveScroll()
    const {setPlayer, playPauseHandler, mutedHandler, playing, muted} = useInjection(VideoStore)

    const ref = useRef(null)
    const sectionRef = useRef<HTMLElement>(null)

    const mouseHandler = (e: globalThis.MouseEvent) => {
        mouseMoveHandler(e, sectionRef)
    }

    useEffect(() => {
        setPlayer(ref)
        sectionRef.current?.addEventListener('mousemove', mouseHandler)
        return () => sectionRef.current?.removeEventListener('mousemove', mouseHandler)
    }, [])

    const exploreHandler = () => {
        scroll.scrollTo('#HypebeastSection', {duration: 0.8, disableLerp: false})
    }

    return (
        <section className={s.fullpageSection} ref={sectionRef}>
            <ReactPlayer
                playsinline={true}
                autoPlay={true}
                loop={true}
                playing={playing}
                muted={muted}
                ref={ref}
                className={s.fullpageSection__video}
                url={'./videos/mainVideo.webm'}
                width="100%"
                height="100%"
            />
            <div className={cn(s.fullpageSection__container, '_container')}>
                <div className={s.fullpageSection__content}>
                    <div className={s.fullpageSection__text}>
                        <p>
							<span>
								Blurring  <span className={s.fullpageSection__parallax}>
									<img className={cn('paralaxItem')} data-speed="-1" src="./mainSection/parallax01.webp" alt=""/>
								</span> the line
							</span>
                            <span>between digital <span className={s.fullpageSection__parallax}>
								<img className={cn('paralaxItem')} data-speed="-1" src="./mainSection/parallax02.webp" alt=""/></span> and</span>
                            <span>
								<span className={s.fullpageSection__parallax}>
									<img className={cn('paralaxItem')} data-speed="-1" src="./mainSection/parallax03.webp" alt=""/>
								</span>physical world.
							</span>
                        </p>
                        <p>
                            <span>Blurring the</span>
                            <span>line between</span>
                            <span>
								digital and <span className={s.fullpageSection__parallax}>
									<img src="./mainSection/parallax02.webp" alt=""/></span>
							</span>
                            <span>
								<span className={s.fullpageSection__parallax}>
									<img src="./mainSection/parallax03.webp" alt=""/>
								</span>	physical
							</span>
                            <span> world.</span>
                        </p>
                    </div>
                    <Link href={'/jigenlist'} className={cn(s.fullpageSection__btn, '_btn')}>
                        <span>Jigenlist</span>
                    </Link>
                </div>
                <div className={s.fullpageSection__footer}>
                    <div className={s.fullpageSection__action} onClick={playPauseHandler}>
						<span className={cn('_iconbtn')}>
							<Image src={pause} alt={'pause icon'} width={13} height={14}/>
						</span>
                        <span>Stop video</span>
                    </div>
                    <div className={s.fullpageSection__explore}>
                        <span>Explore</span>
                        <span className={cn('_iconbtn')} onClick={exploreHandler}>
							<Image src={arrow} alt={'arrow icon'} width={29} height={29}/>
						</span>
                    </div>
                    <div className={cn(s.fullpageSection__action, s.fullpageSection__action_reverse)} onClick={mutedHandler}>
                        <Image src={sound} alt={'pause icon'} width={30} height={23}/>
                        <span>Sound on</span>
                    </div>
                </div>
            </div>

        </section>
    )
})

export default FullpageSection
