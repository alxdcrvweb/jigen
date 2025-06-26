import cn from 'classnames';
import { observer } from 'mobx-react';
import { FC } from 'react';
import s from '../../styles/main.module.scss';

interface TokenomicsLabelProps {
	id: number;
	text: string;
	color: string;
}

const TokenomicsLabel: FC<TokenomicsLabelProps> = observer(({ color, id, text }) => {

	return (
		<div className={cn(s.tokenomicsLabel, '_smallbtn')}>
			<span style={{ backgroundColor: color }} className={s.tokenomicsLabel__circle}></span>
			{text}
		</div>
	)
})

export default TokenomicsLabel
