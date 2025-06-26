
import cn from 'classnames';
import { FC } from "react";
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import s from '../../styles/footer.module.scss';

interface FooterMobileCirclesProps { }
const FooterMobileCircles: FC<FooterMobileCirclesProps> = () => {
	const { scroll } = useLocomotiveScroll()


	return (
		<div className={s.footerMobileCircles}>
			{/* {circlesList.map(el => (
				<a key={el.id} href={el.link} target='_blank' rel='noreferrer' className={cn(s.footerMobileCircles__social, '_circleLink _circleLink_underline')}>
					<span>
						{el.text}
					</span>
					<span>
						<span></span>
					</span>
				</a>
			))} */}
			<div onClick={() => scroll.scrollTo('#FAQ', { duration: 1, disableLerp: false })} className={cn(s.footerMobileCircles__social, '_circleLink _circleLink_underline')}>
				<span>FAQ
				</span>
				<span>
					<span></span>
				</span>
			</div>
			<a href='/Litepaper.pdf' download className={cn(s.footerMobileCircles__social, '_circleLink _circleLink_underline')}>
				<span>Litepaper
				</span>
				<span>
					<span></span>
				</span>
			</a>
			<a href={'#'} target='_blank' rel='noreferrer' className={cn(s.footerMobileCircles__social, '_circleLink _circleLink_underline')}>
				<span>TOKENS
				</span>
				<span>
					<span></span>
				</span>
			</a>
		</div>
	)
}


export default FooterMobileCircles