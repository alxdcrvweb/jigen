import { observer } from 'mobx-react'
import { FC, useRef } from 'react'
import s from '../../styles/main.module.scss'
import cn from 'classnames'
import JIGDesktop from './JIGDesktop'
import JIGMobile from './JIGMobile'
import icon01 from '../../public/jig/01.webp'
import icon02 from '../../public/jig/02.webp'
import icon03 from '../../public/jig/03.webp'
import icon04 from '../../public/jig/04.webp'

const JIG: FC = observer(({ }) => {

	const itemRef01 = useRef(null)
	const itemRef02 = useRef(null)
	const itemRef03 = useRef(null)
	const itemRef04 = useRef(null)
	const jigDesktopRef = useRef(null)
	const JIGList = [
		{ id: 1, ref: itemRef01, icon: icon01, title: 'Exclusive Access', Text: () => <>Exclusive access to NFT Releases and Airdrops as staker</> },
		{ id: 2, ref: itemRef02, icon: icon03, title: 'Mean of Payment', Text: () => <>Buy exclusive products, <br /> WL and more</> },
		{ id: 3, ref: itemRef03, icon: icon02, title: 'Governance', Text: () => <>Vote for ecosystem initiatives and new feature developments</> },
		{ id: 4, ref: itemRef04, icon: icon04, title: 'Deflationary model', Text: () => <>60% of all fees collected on NFT secondary market used to buyback and burn</> },
	]

	return (
		<section className={s.jig}>
			<div className={cn(s.jig__container, '_container')} >
				<div className={s.jig__box} ref={jigDesktopRef}>
					<h2 className={cn(s.jig__title, '_title', '_title_gradient')}>JIGEN TOKEN (JIG) </h2>
					<div className={s.jig__label}>
						<img src={'https://app.uniswap.org/favicon.png'} alt={'buyOn icom'} width={24} height={24} />
						<a href='https://app.uniswap.org/#/swap?outputCurrency=0xe2fc859c838f31c1450448f4fed92e3284ae49e9' target='_blank' rel='noreferrer'>Buy on Uniswap</a>
					</div>
					<div className={s.jig__body} >
						<JIGDesktop JIGList={JIGList} jigDesktopRef={jigDesktopRef} itemRef01={itemRef01} itemRef02={itemRef02} itemRef03={itemRef03} itemRef04={itemRef04} />
						<JIGMobile JIGList={JIGList} />
					</div>
				</div>
			</div>
		</section>
	)
})

export default JIG
