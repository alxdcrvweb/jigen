import s from "../styles/size.module.scss";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import cn from "classnames";
import Image from "next/image";
import image01 from '../public/App/metalock/01.png';
import { IAboutInfo, IRewardsCard } from "../models/models";
import rolex01 from "../public/App/rewards/rolex01.png";
import AppLayout from "../components/App/AppLayout";
import arrow from "../public/icons/arrow-down.svg";
import { useState } from "react";

const sizes = ["XS", "S", "m", "l", "xl", "2xl", "3xl"];

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<{ props: IRewardsCard }> => {
  const card: IRewardsCard = {
    _id: "1",
    title: "Physical Hoodie",
    locked: true,
    expressIn: "2D",
    image: rolex01,
    metalock: "4 weeks",
    requirement: "",
    info: {
      listImages: [
        "/App/rewards/rolex01.png",
        "/jigenListPage/decor01.png",
        "/jigenListPage/decor02.png",
      ],
      description: [
        "The first collection by Jigen is focused on the web3 values, their dynamics are unfolded through its characters, creating a strong union between two apparently far worlds, but closer than you think: hypebeast and degens.",
        "Each hoodie is made with care by expert italian manufacturers, mixing different printing techniques in order to obtain the best possible result in terms of aesthetics and comfort.\n" +
          "The product is provided with an NFC tag inside, placed under the logo label, through which it is possible to check the authenticity of the product.",
      ],
      bigTitle: "physical hoodies",
      aboutItem: [
        { id: "1", value: "Italy", name: "Made in" },
        { id: "2", value: "Regular", name: "Fit" },
        { id: "3", value: "Regular", name: "Fit" },
        { id: "4", value: "Regular", name: "Fit" },
        { id: "5", value: "Regular", name: "Fit" },
      ],
    },
  };

  return {
    props: { ...card }, // will be passed to the page component as props
  };
};

const Size = observer(
  ({
    image,
    title,
    locked,
    _id,
    expressIn,
    requirement,
    info,
    metalock,
  }: IRewardsCard) => {
    // @ts-ignore
    const { listImages, description, aboutItem, bigTitle }: IAboutInfo = info;
    const router = useRouter();
    const [selectSize, setSelectSize] = useState("");
    const continueShipping = () =>{
        router.push('../../shipping')
    }
    return (
      <AppLayout>
        <main className={s.size}>
          <div className={cn(s.size__header, "_appContainer")}>
            <button
              className={cn(s.size__back, "_iconbtn")}
              onClick={() => router.push("/rewards")}
            >
              <Image src={arrow} alt={"arrow prev"} width={24} height={24} />
            </button>
            Select your size
          </div>
          <div className={cn(s.size__main)}>
            <div className={s.size__box}>
              <div className={s.size__cards}>
                <div
                  className={cn(
                    s.size__image,
                  )}
                >
                  <Image src={image01} alt={title} />
                </div>
                <div
                  className={cn(
                    s.size__image,
                  )}
                >
                  <Image src={image} alt={title} />
                </div>
              </div>
              <div className={s.size__sizes}>
                {sizes.map((el) => (
                  <button
                    className={cn(
                      s.size__item,
                      selectSize === el.toLowerCase() && s.size__item_active
                    )}
                    key={el}
                    onClick={() => setSelectSize(el.toLowerCase())}
                  >
                    {el}
                  </button>
                ))}
                <div className={s.size__guide}>Size guide</div>
              </div>
              <button className={cn(s.size__btn, '_btn')}onClick={continueShipping}disabled={selectSize==''}>Continue</button>
            </div>
          </div>
        </main>
      </AppLayout>
    );
  }
);

interface SizeProps {}

export default Size;
