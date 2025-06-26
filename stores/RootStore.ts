import { Container } from 'inversify'
import { UserStore } from './UserStore'
import { ModalStore } from './ModalStore'
import { WalletStore } from './WalletStore';
import { VideoStore } from './VideoStore';
import { AdminStore } from './AdminStore';
import { MintStore } from './MintStore';

export class RootStore {
    public userStore: UserStore
    public container: Container
    public modalStore: ModalStore
    public videoStore: VideoStore
    public adminStore: AdminStore
    public walletStore: WalletStore;
    public mintStore: MintStore;
    public constructor() {
        this.userStore = new UserStore(this)
        this.modalStore = new ModalStore(this)
        this.walletStore = new WalletStore(this);
        this.videoStore = new VideoStore(this);
        this.adminStore = new AdminStore(this);
        this.mintStore = new MintStore(this);
        this.container = new Container()
        this.container.bind(UserStore).toConstantValue(this.userStore)
        this.container.bind(ModalStore).toConstantValue(this.modalStore)
        this.container.bind(WalletStore).toConstantValue(this.walletStore);
        this.container.bind(VideoStore).toConstantValue(this.videoStore);
        this.container.bind(AdminStore).toConstantValue(this.adminStore);
        this.container.bind(MintStore).toConstantValue(this.mintStore);
        this.container.bind(Container).toConstantValue(this.container)
    }
}
