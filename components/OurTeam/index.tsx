import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';
import OurTeamDesktop from './OurTeamDesktop';
import OurTeamMobile from './OurTeamMobile';
import image01 from '../../public/ourTeam/01.webp'
import image02 from '../../public/ourTeam/notmissing.webp'
import image03 from '../../public/ourTeam/thom.webp'
import image04 from '../../public/ourTeam/04.webp'
import image05 from '../../public/ourTeam/05.webp'
import image06 from '../../public/ourTeam/06.webp'
import image07 from '../../public/ourTeam/07.webp'
import twitter from '../../public/icons/twitter.svg'



const OurTeam: FC = observer(({ }) => {



	const ourTeamList = [
		{ id: 1, fullText: 'Entrepreneur with extensive knowledge in the fashion industry. Web3 Maximalist with more than 4 years of experience in the crypto and NFT space, as seasoned investor and active community member.', image: image01, position: 'ceo', social: [{ id: 1, link: 'https://twitter.com/web3_Phil', icon: twitter }], name: 'Phil', text: 'Entrepreneur with extensive knowledge in the fashion industry. Web3 Maximalist with more than 4 years of experience ...'},
		{ id: 2, fullText: '', image: image02, position: 'cto', social: [{ id: 1, link: 'https://twitter.com/notmissing_', icon: twitter }], name: 'NotMissing', text: 'Crypto enthusiast & early adopter of BTC. Driven developer with 3+ years of broad experience in the blockchain field.' },
		{ id: 3, fullText: 'Entrepreneur originally from the e-commerce, turned 100% into web3 since 2021 as Meme Coinnosseur and Director of Vibes.', image: image03, position: 'Social Media Manager', social: [{ id: 1, link: 'https://twitter.com/TchrThom974', icon: twitter }], name: 'Thom', text: 'Entrepreneur originally from the e-commerce, turned 100% into web3 since 2021 as Meme Coinnosseur ...' },
		{ id: 4, fullText: 'Web2 business owner and Marketing coordinator for his own company`s e-commerce store. NFT enthusiast who loves to help and connect with people in order to build the web3 future', image: image04, position: 'Community Manager', social: [{ id: 1, link: '#', icon: twitter }], name: 'Kenos', text: "Web2 business owner and Marketing coordinator for his own company's e-commerce store ..." },
		{ id: 5, fullText: 'Legal advisor for several successful companies in the blockchain & crypto field. Lawyer with over 15 years of experience with a demonstrated track record in the field of IT, Intellectual Property and FinTech Law. Founder & CEO at Advisorn.', image: image05, position: 'Head of Legal', social: [{ id: 1, link: '#', icon: twitter }], name: 'Thomas Contin', text: 'Legal advisor for several successful companies in the blockchain & crypto field. Lawyer with over 15 years of experience ...' },
		{ id: 6, fullText: 'Sales Agent for several fashion and luxury brands in the Asian Markets with 10+ years of experience in the field. Chief Executive Officer at Naias Ltd, an international company focused on fashion trading services.', image: image06, position: 'PR Manager', social: [], name: 'Andrea Muser', text: 'Sales Agent for several fashion and luxury brands in the Asian Markets with 10+ years of experience in the field. Chief ...' },
		{ id: 7, fullText: 'Core Team Member of TrustSwap. Designed tokenomics for various projects and/or serving as a strategic advisor/consultant for over 20+ projects encompassing DeFi, GameFi and Layer-1 protocols.', image: image07, position: 'Advisor', social: [], name: 'Sundeep Krishna', text: 'Core Team Member of TrustSwap. Designed tokenomics for various projects and/or serving as a strategic ...' },
	]

	return (
		<section className={s.ourTeam}>
			<div className={cn(s.ourTeam__container, '_container')}>
				<h2 className={cn(s.ourTeam__title, '_title')}>ourTeam</h2>
				<div className={s.ourTeam__box}>
					<OurTeamDesktop ourTeamList={ourTeamList} />
					<OurTeamMobile ourTeamList={ourTeamList} />
				</div>
			</div>
		</section>
	)
})

export default OurTeam
