import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC, useState } from 'react';
import s from '../../styles/main.module.scss';
import arrow from "../../public/icons/arrow-down.svg";
import Image from 'next/image'

interface FaqListItem {
	id: number;
	Answer: () => JSX.Element;
	question: string;
}


const FaqListItem: FC<FaqListItem> = observer(({ Answer, id, question, }) => {

	const [active, setActive] = useState(false)


	const clickHandler = () => {

	}
	return (
		<div className={s.faq__item} onClick={() => setActive(prev => !prev)}>
			<div className={cn(
				s.faq__question,
				active && s.faq__question_active
			)}>
				<span>{question}</span>
				<Image src={arrow} alt={'arrow icon'} width={25} height={25} />
			</div>
			{active &&
				<div className={s.faq__answer}>
					<Answer />
				</div>
			}
		</div>
	)
})

export default FaqListItem
