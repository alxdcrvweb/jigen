import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC, MutableRefObject } from 'react';
import s from '../../styles/main.module.scss';
// Direct React component imports
import { useSwiper, useSwiperSlide } from 'swiper/react';
import arrow from '../../public/icons/arrow-down.svg'
import Image from 'next/image'

interface HypebeastMobileFooterProps {
	activeIndex: number
	max: number
	navigationPrevRef: MutableRefObject<null>
	navigationNextRef: MutableRefObject<null>

}


const HypebeastMobileFooter: FC<HypebeastMobileFooterProps> = observer(({ max, activeIndex, navigationPrevRef, navigationNextRef }) => {
	const swiper = useSwiper()

	return (
		<div className={s.hypebeastSection__footer}>
			<div className={cn(
				s.hypebeastSection__nav,
				s.hypebeastSection__nav_prev,
				'_iconbtn'
			)}
				ref={navigationPrevRef}
			>
				<Image src={arrow} alt={'arrow prev'} width={24} height={24} />
			</div>
			<div className={s.hypebeastSection__fraction}>
				<span>{activeIndex}</span>
				<span>/{max}</span>
			</div>
			<div className={cn(
				s.hypebeastSection__nav,
				s.hypebeastSection__nav_next,
				'_iconbtn',
			)}
				ref={navigationNextRef}
			>
				<Image src={arrow} alt={'arrow prev'} width={24} height={24} />
			</div>
		</div>
	)
})

export default HypebeastMobileFooter
