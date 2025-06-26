import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC, MutableRefObject } from 'react';
import s from '../../styles/main.module.scss';
// Direct React component imports
import Image from 'next/image';
import arrow from '../../public/icons/arrow-down.svg';

interface JIGMobileFooterProps {
	navigationPrevRef: MutableRefObject<null>
	navigationNextRef: MutableRefObject<null>
}


const JIGMobileFooter: FC<JIGMobileFooterProps> = observer(({ navigationPrevRef, navigationNextRef }) => {

	return (
		<div className={s.jigMobile__footer}>
			<div className={cn(
				s.jigMobile__nav,
				s.jigMobile__nav_prev,
				'_iconbtn'
			)}
				ref={navigationPrevRef}
			>
				<Image src={arrow} alt={'arrow prev'} width={24} height={24} />
			</div>
			<div className={cn(s.jigMobile__fraction, 'jigFraction')}>
			</div>
			<div className={cn(
				s.jigMobile__nav,
				s.jigMobile__nav_next,
				'_iconbtn',
			)}
				ref={navigationNextRef}
			>
				<Image src={arrow} alt={'arrow prev'} width={24} height={24} />
			</div>
		</div>
	)
})

export default JIGMobileFooter
