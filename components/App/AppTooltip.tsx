import { observer } from 'mobx-react'
import { ReactNode, useState } from 'react';
import ReactTooltip from 'react-tooltip'
import cn from 'classnames';

interface AppTooltipProps {
    icon: ReactNode,
    id: string
    text: string
    regular?: boolean
    tooltipText: string
}

const AppTooltip = observer(({id, icon, text, regular, tooltipText}: AppTooltipProps) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <a
                className={cn('_tooltip__body', open && '_tooltip__body_active', regular && '_regular')}
                data-for={id}
                data-tip
                data-event="click focus"
            >
                {icon} <span>{text}</span>
            </a>
            {/*@ts-ignore*/}
            <ReactTooltip
                id={id}
                className={'_tooltip__content _text'}
                globalEventOff="click"
                place="top"
                effect="solid"
                afterHide={() => setOpen(false)}
                afterShow={() => setOpen(true)}
            >
                <span>{tooltipText}</span>
            </ReactTooltip>
        </>
    )
})


export default AppTooltip

