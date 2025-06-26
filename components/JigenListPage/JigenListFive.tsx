import { observer } from "mobx-react";
import cn from "classnames";
import s from "../../styles/jigenlist.module.scss";
import Image from "next/image";
import under_review from "../../public/icons/under_review.svg";
import approved from "../../public/icons/approved.svg";
import denied from "../../public/icons/denied.svg";
import not_applied from "../../public/icons/not_applied.svg";
import { useInjection } from "inversify-react";
import { WalletStore } from "../../stores/WalletStore";
import { UserStore } from "../../stores/UserStore";
import { useEffect } from "react";
import { addressSlice } from "../../utils/utilities";
import web3 from "web3";
import Link from "next/link";

const JigenListFive = observer(({ goToStep }: JigenListFiveProps) => {
  const {
    walletConnected,
    tryReconnect,
    userBalance,
    connectWallet,
    getBalance,
    resetWallet,
    connected,
    login,
    disabled,
    userWallet,
  } = useInjection(WalletStore);
  const { getUser, accountData } = useInjection(UserStore);
  useEffect(() => {
    tryReconnect("jigenList");
  }, []);
  const refreshHandler = async () => {
    getBalance();
    await getUser();
  };

  const clickHandler = async () => {
    if (connected) return await resetWallet();
    if (!walletConnected) return await connectWallet('from clickHandler');
    if (walletConnected && !connected) await login();
  };

  useEffect(() => {
    if (!connected) return;
    getUser();
    getBalance();
  }, [connected]);

  return (
    <div className={cn(s._box, s.jigenListFive)}>
      <div className={cn(s.jigenListFive__title, "_subtitle")}>
        Application status <br />
        {userWallet && addressSlice(userWallet)}
      </div>
      <div className={s.jigenListFive__text}>
        Connect your wallet to check your <br />
        application status
      </div>
      <button
        className={cn(s.jigenListFive__connect, "_btn")}
        disabled={disabled}
        onClick={clickHandler}
      >
        <span>
          {walletConnected && connected && "Reset wallet"}
          {!walletConnected && "Connect eth wallet"}
          {walletConnected && !connected && "Login"}
        </span>
      </button>
      {connected && (
        <div className={s.jigenListFive__status}>
          <span className="_subtitle">Status:</span>
          <div
            className={cn(
              s.jigenListFive__value,
              accountData?.approvalStatus === "APPROVED" &&
                s.jigenListFive__value_approved,
              accountData?.approvalStatus === "PENDING" &&
                s.jigenListFive__value_pending,
              accountData?.approvalStatus === "DENIED" &&
                s.jigenListFive__value_denied
            )}
          >
            <Image
              src={
                accountData?.approvalStatus === "APPROVED"
                  ? approved
                  : accountData?.approvalStatus === "PENDING"
                  ? under_review
                  : accountData?.approvalStatus === "DENIED"
                  ? denied
                  : not_applied
              }
              alt="loader icon"
              width={16}
              height={16}
            />
            <span>
              {accountData?.approvalStatus === "APPROVED"
                ? "Approved"
                : accountData?.approvalStatus === "PENDING"
                ? "Under Review"
                : accountData?.approvalStatus === "DENIED"
                ? "Denied"
                : "Not Applied"}
            </span>
          </div>
        </div>
      )}
      <div className={s.jigenListFive__balance}>
        <span>Balance :</span>
        <div className={s.jigenListFive__amount}>{userBalance || 0} $jig</div>
      </div>
      {/* {accountData?.approvalStatus === "APPROVED" && (
        <>
          <Link href={"mint"}>
            <button className={cn(s.jigenListFive__mint, "_btn")}>
              <span>MINT</span>
            </button>
          </Link>
          <Link href={"metalock"}>
            <button className={cn(s.jigenListFive__mint, "_btn")}>
              <span>METALOCK</span>
            </button>
          </Link>
        </>
      )} */}
      <button className={s.jigenListFive__refresh} onClick={refreshHandler}>
        Refresh
      </button>
    </div>
  );
});

interface JigenListFiveProps {
  goToStep: (step: number) => void;
}

export default JigenListFive;
