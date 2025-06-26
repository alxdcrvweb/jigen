import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import ModalContainer from "./ModalContainer";
import s from "../styles/modal.module.scss";
import Image from "next/image";
import close from "../public/icons/close.svg";
import React, { useState } from "react";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import cn from "classnames";
import Link from "next/link";
import CheckboxWithLabel from "../components/CustomForm/CheckboxWithLabel";
import rolex01 from "../public/App/rewards/rolex01.png";

interface modalProps {
  modalKey: ModalsEnum;
  data?: any;
}

export const OrderSuccessfulModal = observer(
  ({ modalKey, data }: modalProps) => {
    const { hideAllModals } = useInjection(ModalStore);

    const close = () => {
      hideAllModals();
    };
    return (
      <ModalContainer modalKey={modalKey} width={484}>
        <div className={s.orderModal}>
          <h1 className={"_appTitle"}>Order successful</h1>
          <p>
            Your order is being prossed. You will receive an email once we start
            shipping the merch with your tracking information.
          </p>
          <div className={cn(s.orderModal__image)}>
            <Image src={rolex01} alt={"rolex01"} />
          </div>
          <button onClick={close} className={cn(s.orderModal__button, "_btn")}>
            Thank you
          </button>
        </div>
      </ModalContainer>
    );
  }
);
