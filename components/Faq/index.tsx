import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';
import FaqListItem from './FaqListItem';
import Image from 'next/image'
import man from '../../public/faq/man.webp'



const Faq: FC = observer(({ }) => {

	const faqList = [
		{ id: 1, Answer: () => <>Free mint with a limited supply of 500 NFTs</>, question: 'MINT SUPPLY AND PRICE', },
		{ id: 2, Answer: () => <>February</>, question: 'MINT DATE', },
		{ id: 3, Answer: () => <>We&rsquo;ll announce the redeem phase after the launch. There will be no rush to claim the IRL product as the window will stay open for a long time.</>, question: 'WHEN CAN I REDEEM THE PRODUCTS?', },
		{ id: 4, Answer: () => <>{"No, the metadata associated to the NFT will change and you'll get a new version of it."}</>, question: 'Will the NFT be burned after the redeem?', },
		{
			id: 5, Answer: () => <>Each holder can choose the size for the hoodie based on the size guide. No change allowed. <br />
				A small fee in ETH will be asked for the shipping cost during the claim process.</>, question: 'SIZE AND SHIPPING',
		},
	]

	return (
		<section className={s.faq} id='FAQ'>
			<div className={cn(s.faq__container, '_container')}>
				<h2 className={cn(s.faq__title, '_title')}>faq</h2>
				<div className={s.faq__box}>
					<div className={s.faq__list}>
						{faqList.map(el => <FaqListItem key={el.id} {...el} />)}
					</div>
					<div className={s.faq__right}>
						<div className={s.faq__text}>
							FREQUENTLY ASKED QUESTIONS
						</div>
						<div className={s.faq__image}>
							<Image src={man} alt={'man image'} layout='intrinsic' objectFit='cover' objectPosition='center' />
						</div>
					</div>

				</div>
			</div>
		</section>
	)
})

export default Faq
