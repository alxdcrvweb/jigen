import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';

interface WhatsNextItemPtrops {
	id: number;
	Text: () => JSX.Element;
}

const WhatsNextItem: FC<WhatsNextItemPtrops> = observer(({ id, Text }) => {

	return (
		<div className={s.whatsNext__item}>
			<div className={s.whatsNext__number}>
				<span>{id}</span>
			</div>
			<div className={cn(s.whatsNext__text, '_text')}><Text /></div>
		</div>
	)
})

export default WhatsNextItem
