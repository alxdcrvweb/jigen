
import cn from 'classnames';
import { FC } from "react";
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import s from '../../styles/footer.module.scss';

interface FooterLeftCircleProps { }
const FooterLeftCircle: FC<FooterLeftCircleProps> = () => {

	const { scroll } = useLocomotiveScroll()

	return (
		<div className={cn(s.footer__circles, s.footer__circles_1)}>
			<div onClick={() => scroll.scrollTo('#FAQ', { duration: 1, disableLerp: false })} className={cn(s.footer__circle, s.footer__circle_1, '_circleLink _circleLink_underline')}>
				<span>FAQ</span>
				<span>
					<span></span>
				</span>
			</div>
			<a href='/Litepaper.pdf' download className={cn(s.footer__circle, s.footer__circle_2, '_circleLink _circleLink_underline')}>
				<span>LITEPAPER</span>
				<span>
					<span></span>
				</span>
			</a>
		</div>
	)
}


export default FooterLeftCircle