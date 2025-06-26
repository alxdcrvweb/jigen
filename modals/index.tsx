import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react';
import { ModalStore } from '../stores/ModalStore';
import { ExampleModal } from './Example';
import { MetalockModal } from './MetalockModal';
import { OrderSuccessfulModal } from './OrderSuccessful';

export enum ModalsEnum {
    Example,
    Metalock,
    Order
}

const MODAL_REGISTRY = {
    [ModalsEnum.Example]: ExampleModal,
    [ModalsEnum.Metalock]: MetalockModal,
    [ModalsEnum.Order]: OrderSuccessfulModal,
};

export const ModalsContainer = observer(() => {
    const modalStore = useInjection(ModalStore);

    return (
        <>
            {modalStore.activeModals.map((m) => {
                const Component = MODAL_REGISTRY[m.key];
                return (
                    <Component key={m.key} data={m.data} modalKey={m.key}/>
                )
            })}
        </>
    );
});
