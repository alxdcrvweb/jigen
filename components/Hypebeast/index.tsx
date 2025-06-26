import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';
// Direct React component imports

import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

import image01 from '../../public/jigenHypebeast/01.webp';
import image02 from '../../public/jigenHypebeast/02.webp';
import image03 from '../../public/jigenHypebeast/03.webp';
import image04 from '../../public/jigenHypebeast/04.webp';
import HypebeastDesktop from './HypebeastDesktop';
import HypebeastMobile from './HypebeastMobile';


const HypebeastSection: FC = observer(({ }) => {

	const HypebeastSectionList = [
		{ id: 1, title: 'Unique Art', Text: () => <>Jigen Hypebeast is our genesis collection of <span>500 3D</span> unique characters living on the Ethereum blockchain</>, icon: image01 },
		{ id: 2, title: 'Dynamic Drop', Text: () => <>First Dynamic Drop where holders can decide to redeem the physical item or keep it in the digital form.   Our NFTs feature a 2nd reveal system to differentiate their status</>, icon: image02 },
		{ id: 3, title: 'Membership', Text: () => <>Your avatar becomes your digital identity within our ecosystem and you get exclusive access to NFT drops, lifestyle products and sensational experiences</>, icon: image03 },
		{ id: 4, title: 'Merch Quality', Text: () => <>Hoodies have been realized by expert designers from the fashion sector. All products are certified made in Italy and their ownership is proved by our registered NFC system</>, icon: image04 },
	]

	return (
		<section className={s.hypebeastSection} id='HypebeastSection'>
			<div className={cn(s.hypebeastSection__container, "_container")}>
				<div className={s.hypebeastSection__box}>
					<h2 className={cn(s.hypebeastSection__title, '_title', '_title_gradient')}>
						Jigen Hypebeast
					</h2>
					<HypebeastDesktop HypebeastSectionList={HypebeastSectionList} />
					<HypebeastMobile HypebeastSectionList={HypebeastSectionList} />
				</div>
			</div>
		</section>
	)
})

export default HypebeastSection
