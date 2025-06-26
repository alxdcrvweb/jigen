import { observer } from 'mobx-react';
import { ModalsEnum } from '.';
import ModalContainer from './ModalContainer';

interface modalProps {
    modalKey: ModalsEnum,
    data?: any,
}

export const ExampleModal = observer(({modalKey, data}: modalProps) => {

    return (
        <ModalContainer modalKey={modalKey}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ipsum, maiores omnis deleniti provident tempore eos quo est, sequi aut vitae. Quibusdam possimus velit quis
                eius, autem quaerat? Non, dignissimos!</p>
        </ModalContainer>
    )
});

