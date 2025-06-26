
import cn from 'classnames';
import { FC } from "react";
import s from '../../styles/footer.module.scss';

interface FooterRightCircleProps { }
const FooterRightCircle: FC<FooterRightCircleProps> = () => {

	return (
		<div className={cn(s.footer__circles, s.footer__circles_2)}>
			<a href='https://staking.jigen.app/' style={{pointerEvents:'none'}} target='_blank' rel='noreferrer' className={cn(s.footer__circle, s.footer__circle_1, '_circleLink _circleLink_underline')}>
				<span>stake</span>
				<span>
					<span></span>
				</span>
			</a>
			<a href='https://app.uniswap.org/#/swap?outputCurrency=0xe2fc859c838f31c1450448f4fed92e3284ae49e9' target='_blank' rel='noreferrer' className={cn(s.footer__circle, s.footer__circle_2, '_circleLink _circleLink_underline')}>
				<span>BUY</span>
				<span>
					<span></span>
				</span>
			</a>
		</div>
	)
}


export default FooterRightCircle