import { injectable } from 'inversify';
import { RootStore } from './RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { ModalsEnum } from '../modals';


export interface ModalEntry {
    key: ModalsEnum;
    data?: any;
}


@injectable()
export class ModalStore {
    @observable activeModals: ModalEntry[] = [];
    @observable activeHide: boolean = false;

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
    }


    @action showModal = (key: ModalsEnum, data?: any) => {
        console.log('key', key);
        this.activeHide = false
        this.activeModals.push({key, data});
    }

    isVisible = (key: ModalsEnum) => {
        return this.activeModals.some(m => m.key === key);
    }

    @action hideModal = (idx: number) => {
        console.log('hideModal', idx)
        this.activeHide = true
        setTimeout(() => {
            this.activeModals = this.activeModals.filter((m, i) => {
                return m.key !== idx
            });
        }, 300)
    }

    @action hideAllModals = () => {
        this.activeModals = [];
    }
}
