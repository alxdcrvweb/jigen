import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { MintStore } from "../../stores/MintStore";
import s from "../../styles/mint.module.scss";


const Collection = observer(() => {

  let rows = [
    {
      symbol: "🎯",
      type: "total supply",
      value: "500",
    },
    {
      symbol: "💸",
      type: "total supply",
      value: "gas + free",
    },
    {
      symbol: "⏳",
      type: "end time",
      value: "24H",
    },
  ];
  return (
    <div className={s.collection}>
      <h1 className="_appTitle">Jigen NFT collection</h1>
      {rows.map((row, i) => {
        return (
          <div className={s.row} key={i}>
            <div className={s.symbol}>{row.symbol}</div>
            {row.type + ":"}
            <span>{row.value}</span>
          </div>
        );
      })}
    </div>
  );
})
export default Collection;
