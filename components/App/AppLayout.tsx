import { observer } from "mobx-react";
import s from "../../styles/appLayout.module.scss";
import { FC, useEffect, useState } from "react";
import { AppHeader } from "./AppHeader";
import { useRouter } from "next/router";
import { AppAside } from "./AppAside";
import { AppFooter } from "./AppFooter";
import { isAuth } from "../../utils/utilities";
import ReactTooltip from "react-tooltip";
import { useInjection } from "inversify-react";
import { WalletStore } from "../../stores/WalletStore";
import { CHAIN_ID } from "../../utils/config";

interface AppLayoutProps {}

const AppLayout: FC<AppLayoutProps> = observer(({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { userWallet, switchNetwork } = useInjection(WalletStore);
  const toggleHandler = () => {
    setOpen((prev) => !prev);
  };
  const {connectWallet, connected, resetWallet, walletConnected} = useInjection(WalletStore)
 useEffect(()=>{
    router.push('../../')
  },[])
  const clickHandler = async () => {
    switchNetwork(CHAIN_ID).then(async() => {
      if (connected) return await resetWallet()
      if (!walletConnected) return await connectWallet("fromClickHandler")
    })
      
  }
  useEffect(() => {
    if (!isAuth) router.push("/home");
  }, []);

  return (
    <div className={s.appLayoutWrapper}>
      <AppHeader open={open} toggleHandler={toggleHandler} />
      <AppAside open={open} />
      <div
        className={s.appLayoutWrapper__content}
        onScroll={() => ReactTooltip.hide()}
      >
        {userWallet ? (
          children
        ) : (
          <div className={s.appLayoutContent}>
            <button className="_btn"onClick={clickHandler}>Connect wallet</button>
          </div>
        )}
        <AppFooter />
      </div>
    </div>
  );
});

export default AppLayout;
