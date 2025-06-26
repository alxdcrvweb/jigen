import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ReactElement, useEffect, useRef } from "react";
import { LocomotiveScrollProvider, Scroll } from "react-locomotive-scroll";
import Footer from "./Footer";
import Header from "./Header";
import { Router, useRouter } from "next/router";
import HeaderMint from "./HeaderMint";

gsap.registerPlugin(ScrollTrigger);

interface MyHead {
  children: ReactElement;
}

export default function MintLayout({ children }: MyHead) {
  console.log('MintLayout');
  const router = useRouter();
  useEffect(()=>{
    router.push('../../')
  },[])
  return (
    <div>
      <HeaderMint />
      <div className="wrapper mint" data-scroll-container>
        <main>{children}</main>
        
      </div>
    </div>
  );
}
