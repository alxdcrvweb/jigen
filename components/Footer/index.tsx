import { FC } from "react";
import s from "../../styles/footer.module.scss";
import SocialList from "../SocialList";
import logo from "../../public/logo.svg";
import Image from "next/image";
import cn from "classnames";
// import man from '../../public/footer/man.webp'
import FooterLeftCircle from "./FooterLeftCircle";
import FooterRightCircle from "./FooterRightCircle";
import FooterMobileCircles from "./FooterMobileCircles";
// import Lottie from "react-lottie-player";
import man from "../../public/gifs/3.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), {
  ssr: false,
});
interface FooterProps {}
const Footer: FC<FooterProps> = () => {
  return (
    <footer className={s.footer}>
      <div className={cn(s.footer__container, "_container")}>
        <div className={s.footer__body}>
          <div className={s.footer__logo}>
            <Image src={logo} alt={"logo"} layout="responsive" />
          </div>
          <div className={cn(s.footer__title, "_title", "_title_gradient")}>
            JOIN OUR <br />
            COMMUNITY<span>😋</span>
          </div>
          <div className={s.footer__social}>
            <SocialList />
          </div>
          <div className={s.footer__box}>
            <div className={s.footer__links}>
              <FooterMobileCircles />
              <FooterLeftCircle />
              <div className={s.footer__man}>
                <Lottie
                  // className={s.utilities__image}
                  loop
                  animationData={man}
                  play
                />
                {/* <Image src={man} alt={'man image'} layout='responsive' /> */}
              </div>
              <FooterRightCircle />
            </div>
            <div className={s.footer__bottom}>
              <a href="#" target={"_blank"} rel="noreferrer">
                Privacy Policy
              </a>
              <span></span>
              <a href="#" target={"_blank"} rel="noreferrer">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
