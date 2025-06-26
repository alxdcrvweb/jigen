import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import ModalContainer from "./ModalContainer";
import s from "../styles/modal.module.scss";
import Image from "next/image";
import close from "../public/icons/close.svg";
import React, { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import cn from "classnames";
import Link from "next/link";
import CheckboxWithLabel from "../components/CustomForm/CheckboxWithLabel";
import { MintStore } from "../stores/MintStore";
import { toast } from "react-toastify";

interface modalProps {
  modalKey: ModalsEnum;
  data?: any;
}

export const MetalockModal = observer(({ modalKey, data }: modalProps) => {
  const { showModal, hideAllModals } = useInjection(ModalStore);
  const mintStore = useInjection(MintStore);
  const [read, setRead] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("ockModal.tsx line:26 ", "color: #007acc;", "object");

  const loadMetalock = () => {
    setLoading(true);
    try {
      mintStore.toggleMetalock(data.ids).then((res: any) => {
        if (res) {
          setLoading(false);
          console.log("FINISH");
          mintStore.getAllNfts();
          data.set([]);
          hideAllModals();
        } else {
          hideAllModals();
          toast.error("Transaction error");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ModalContainer modalKey={modalKey}>
      <div className={s.metalockModal}>
        <div className={s.metalockModal__header}>
          <div className={s.metalockModal__title}>
          {data.unlock ? "Unlocking " :'Metalocking '} your jigen hyperbeast
          </div>

          <button
            className={cn(s.metalockModal__close, "_iconbtn _iconbtn_small")}
            onClick={() => hideAllModals()}
          >
            <Image src={close} alt="close icon" width={14} height={14} />
          </button>
        </div>
        {loading ? (
          <div className={cn(s.metalockModal__main, s.metalockModal__loading)}>
            <img
              src={"../../gifs/Loading.gif"}
              className={s.metalockModal__loading}
            />
          </div>
        ) : (
          <>
            <div className={s.metalockModal__main}>
              <div className={s.metalockModal__label}>IMPORTANT:</div>
              <div className={s.metalockModal__text}>
                <p>
                  While your Jigen hypebeast is metalocked, you won&apos;t be
                  able to sell it on secondary marketplaces like Opensea. To do
                  this, you&apos;ll need to un-metalock your hypebeast directly
                  on this website. Also, to prevent confusion and errors, if we
                  detect that you have listed your hypebeast on a marketplace,
                  we reserve the right to remove it from the metalock. <br />
                  When a hypebeast is removed from its metalock, the metalock
                  will reset and the timer will revert to zero.
                </p>
                <p>
                  Full terms and conditions
                  <Link href={"#"}>HERE</Link>
                </p>
              </div>
            </div>
            <div className={s.metalockModal__footer}>
              <div className={s.metalockModal__checkbox}>
                <CheckboxWithLabel
                  name={"read"}
                  checked={read}
                  id={"read"}
                  onChange={() => setRead((prev) => !prev)}
                  label={"I HAVE READ THE ABOVE AND I AGREE"}
                />
              </div>
              <button
                className={cn(s.metalockModal__btn, "_btn")}
                disabled={!read}
                onClick={loadMetalock}
              >
               {data.unlock ? "unlock" :'metalock'} 
              </button>
            </div>
          </>
        )}
      </div>
    </ModalContainer>
  );
});
