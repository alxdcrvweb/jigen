import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ReactElement, useEffect, useRef } from "react";
import { LocomotiveScrollProvider, Scroll } from "react-locomotive-scroll";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

interface MyHead {
  children: ReactElement;
}

export default function LandingLayout({ children }: MyHead) {
  const mainRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().map((st) => st.kill());
    };
  }, [router]);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        touchMultiplier: 4,
        getDirection: true,
        smartphone: {
          breakpoint: 0,
          smooth: true,
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
        },
      }}
      watch={[]}
      onUpdate={(locoScroll: Scroll) => {
        if (!locoScroll) return;
        try {
          console.log("locoScroll", locoScroll);
          locoScroll.on("scroll", ScrollTrigger.update);
          const call = () => { locoScroll.update && locoScroll?.update() }
          ScrollTrigger.addEventListener("refresh", call);
          ScrollTrigger.refresh();
          return () => {
            ScrollTrigger.removeEventListener("refresh", call);
          };
        } catch (e) {
          console.log("%cindex.tsx line:19 e", "color: #007acc;", e);
          window.location.reload()
        }
      }}
      containerRef={mainRef}
    >
      <Header />
      <div className="wrapper" data-scroll-container ref={mainRef}>
        <main>{children}</main>
        <Footer />
      </div>
    </LocomotiveScrollProvider>
  );
}
