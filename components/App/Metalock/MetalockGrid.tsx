import s from "../../../styles/metalock.module.scss";
import MetalockCard from "./MetalockCard";
import { observer } from "mobx-react";
import image01 from "../../../public/App/metalock/01.png";
import { IMetalockCard } from "../../../models/models";
import { useInjection } from "inversify-react";
import { MintStore } from "../../../stores/MintStore";

const metalockList: IMetalockCard[] = [
  {
    _id: "1",
    title: "#333",
    status: "locked",
    timer: "2d",
    image: image01,
    bg: "rgba(255, 168, 0, 0.1)",
  },
  {
    _id: "2",
    title: "#333",
    status: "locked",
    timer: "1w",
    image: image01,
    bg: "rgba(79, 196, 174, 0.1)",
  },
  {
    _id: "3",
    title: "#333",
    status: "notLocked",
    timer: "",
    image: image01,
    bg: "rgba(236, 236, 236, 0.1)",
  },
];

interface MetalockGridProps {
  clickHandler: (id: string) => void;
  clickHandlerUnlock: (id: string) => void;
  selectedCardIds: string[];
  selectedCardIdsUnlock: string[];
}

export const MetalockGrid = observer(
  ({ clickHandler,clickHandlerUnlock, selectedCardIds,selectedCardIdsUnlock }: MetalockGridProps) => {
    const { myTokens } = useInjection(MintStore);
    return (
      <div className={s.metalock__body}>
        {myTokens.map((el, i) => {
        console.log(el)
          return (
            <MetalockCard
              key={i}
              {...el}
              metadata={JSON.parse(el.metadata)}
              clickHandler={!el.nesting ? clickHandler : clickHandlerUnlock}
              i={i}
              select={!el.nesting ? selectedCardIds.includes(el.token_id) : selectedCardIdsUnlock.includes(el.token_id)}
            />
          );
        })}
      </div>
    );
  }
);
