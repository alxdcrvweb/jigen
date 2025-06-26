import { NextPage } from "next";
import { observer } from "mobx-react";
import s from "../styles/metalock.module.scss";
import { useInjection } from "inversify-react";
import { WalletStore } from "../stores/WalletStore";
import AppLayout from "../components/App/AppLayout";
import AppTooltip from "../components/App/AppTooltip";
import HelpIcon from "../components/Icons/HelpIcon";
import cn from "classnames";
import { MetalockGrid } from "../components/App/Metalock/MetalockGrid";
import { useEffect, useState } from "react";
import { ModalStore } from "../stores/ModalStore";
import { ModalsEnum } from "../modals";
import { MintStore } from "../stores/MintStore";

const Metalock: NextPage = observer(({}) => {
  const { disabled, userWallet, chainId } = useInjection(WalletStore);
  const { showModal } = useInjection(ModalStore);
  const { getAllNfts } = useInjection(MintStore);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [selectedCardIdsUnlock, setSelectedCardIdsUnlock] = useState<string[]>(
    []
  );
  const clickHandler = (id: string) => {
    setSelectedCardIds((prev) => {
      return prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id];
    });
  };
  const clickHandlerUnlock = (id: string) => {
    setSelectedCardIdsUnlock((prev) => {
      return prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id];
    });
  };
  useEffect(() => {
    if (userWallet && chainId) {
      getAllNfts();
    }
  }, [userWallet, chainId]);
  const MetalockHandler = () => {
    console.log('%cmetalock.tsx line:46 ', 'color: #007acc;', 'lock');
    showModal(ModalsEnum.Metalock, {
      ids: selectedCardIds,
      set: setSelectedCardIds,
    });
  };
  const UnlockHandler = () => {
    console.log('%cmetalock.tsx line:46 ', 'color: #007acc;', 'unlock');
    showModal(ModalsEnum.Metalock, {
      ids: selectedCardIdsUnlock,
      set: setSelectedCardIdsUnlock,
      unlock: true
    });
  };
  return (
    <AppLayout>
      <main className={cn(s.metalock, "_appContainer")}>
        <div className={s.metalock__content}>
          <div className={s.metalock__header}>
            <h1 className={cn(s.metalock__title, "_appTitle")}>Metalock</h1>
            <div className={s.metalock__tooltip}>
              <AppTooltip
                id={"learnMore"}
                text={"Learn more about metalocking"}
                icon={<HelpIcon />}
                tooltipText={
                  "In publishing and graphic design, lorem ipsum is common placeholder text"
                }
              />
            </div>
          </div>
          <div className={s.metalock__main}>
            <MetalockGrid
              clickHandler={clickHandler}
              clickHandlerUnlock={clickHandlerUnlock}
              selectedCardIds={selectedCardIds}
              selectedCardIdsUnlock={selectedCardIdsUnlock}
            />
            <div className={s.metalock__count}>
              <div>
                {" "}
                <span>
                  Metalock jigen hyperbeast ({selectedCardIds.length})
                </span>
                <button
                  className={s.metalock__lock}
                  disabled={selectedCardIds.length === 0 || disabled}
                  onClick={MetalockHandler}
                >
                  Lock
                </button>
              </div>
              <div>
                <span>Unlock hyperbeast ({selectedCardIdsUnlock.length})</span>
                <button
                  className={s.metalock__lock}
                  disabled={selectedCardIdsUnlock.length === 0 || disabled}
                  onClick={UnlockHandler}
                >
                  Unlock
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
});

export default Metalock;
