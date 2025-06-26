import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useState } from "react";
import { MintStore } from "../../stores/MintStore";
import { WalletStore } from "../../stores/WalletStore";
import s from "../../styles/mint.module.scss";
import { useEffect } from "react";
import { CHAIN_ID, NetworksEnum } from "../../utils/config";
const MintNow = observer(() => {
  const [count, setCount] = useState(1);
  const [allowMint, setAllowMint] = useState(false);
  const mintStore = useInjection(MintStore);
  const walletStore = useInjection(WalletStore);
  useEffect(() => {
    mintStore.getSupply();
    
  }, []);
  useEffect(()=>{
    if(walletStore.userWallet) {
      console.log('allowwwwww');
      mintStore.isMintAllowed(walletStore.userWallet).then((res)=>{
        if(res) {
          setAllowMint(true)
        } else {
          setAllowMint(false)
        }
      })
    }
  },[walletStore.userWallet])
  const mint = () => {
    walletStore.switchNetwork(CHAIN_ID).then(() =>
      walletStore.connectWallet("fromMint").then(() => {
        mintStore.mintNFT().then(()=>{
          mintStore.isMintAllowed(walletStore.userWallet).then((res)=>{
            if(res) {
              setAllowMint(true)
            } else {
              setAllowMint(false)
            }
          })
        });
      })
    );
  };
  return (
    <div className={s.mint_nft}>
      <h1 className={classNames(s.mint_title, "_appTitle")}>Mint nft</h1>
      <div className={s.counter}>
        {mintStore.supply} / 500
        <div className={s.line}>
          <div
            className={s.line_full}
            style={{ width: mintStore.supply / 10 + "%" }}
          ></div>
        </div>
      </div>
      <p style={{marginTop:'10px'}}>You can mint one NFT on whitelist stage</p>
      {/* <div className={s.change_mint}>
        <div className={s.change_text}>Mint</div>
        <div className={s.count}>
          <button
            disabled={count == 0}
            onClick={() => {
              setCount(count - 1);
            }}
          >
            -
          </button>
          {count}
          <button
            disabled={count >= 5}
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </button>
        </div>
        <div className={s.max}>
          <button
            disabled={count >= 5}
            onClick={() => {
              setCount(5);
            }}
          >
            <img src="../../lightning.svg" /> 5 MAX
          </button>
        </div>
      </div> */}
      <button
        onClick={mint}
        disabled={walletStore.walletConnected && (count == 0 || count > 5) || !allowMint}
        className={classNames(s.mint_button, "_btn")}
      >
        Mint now
      </button>
    </div>
  );
});
export default MintNow;
