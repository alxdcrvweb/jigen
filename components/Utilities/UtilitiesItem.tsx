import { observer } from "mobx-react";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import s from "../../styles/main.module.scss";
import cn from "classnames";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), {
  ssr: false,
});

interface UtilitiesItemProps {
  title: string;
  Text: () => JSX.Element;
  icon: StaticImageData;
  image?: StaticImageData | any;
}

const UtilitiesItem: FC<UtilitiesItemProps> = observer(
  ({ Text, icon, title, image }) => {
    return (
      <div className={s.utilities__cell}>
        <div className={s.utilities__icon}>
          <Image src={icon} alt={`icon ${title}`} width={60} height={60} />
        </div>
        <div className={cn(s.utilities__subtitle)}>{title}</div>
        <div className={cn(s.utilities__text, "_text")}>
          <Text />
        </div>
        {image && (
          <Lottie
            className={s.utilities__image}
            loop
            animationData={image}
            play
          />
        )}
      </div>
    );
  }
);

export default UtilitiesItem;
