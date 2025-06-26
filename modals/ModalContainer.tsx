import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { ModalStore } from '../stores/ModalStore';
import { useInjection } from 'inversify-react';
import s from '../styles/modal.module.scss';
import Image from 'next/image';
import close from '../public/icons/close.svg';
import cn from 'classnames';
import { ModalsEnum } from './';


interface ModalProps {
    modalKey: ModalsEnum;
    width?: number;
    onShow?: () => void;
    onHide?: () => void;
    closable?: boolean;
}

const ModalContainer = observer(({modalKey,width, children, onShow, onHide, closable = true}: PropsWithChildren<ModalProps>) => {

        const fade = useRef<HTMLDivElement>(null);
        const {hideModal, activeHide} = useInjection(ModalStore);

        useEffect(() => {
            onShow?.();
            return () => onHide?.();
        }, []);

        const closeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
            e.target === fade.current && closable && hideModal(modalKey)
        };

        return (
            <div
                className={cn(s.modal, activeHide && s.modal_hide)}
                ref={fade}
                onClick={closeClickHandler}
            >
                <div className={cn(s.modal__body)} style={width ? {maxWidth:width+'px'}: {}}>
                    {children}
                </div>
            </div>
        );
    },
);

export default ModalContainer;
