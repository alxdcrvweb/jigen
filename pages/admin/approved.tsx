import { NextPage } from "next";
import { observer } from "mobx-react";
import s from "../../styles/admin.module.scss";
import cn from "classnames";
import { useInjection } from "inversify-react";
import { AdminStore } from "../../stores/AdminStore";
import { useEffect } from "react";

const Approved: NextPage = observer(() => {
  const { disabled, getApproved, approved } = useInjection(AdminStore);

  useEffect(() => {
    if(getApproved) {
      getApproved();
    }
  }, []);

  return (
    <div className={s.admin}>
      <div className={cn(s.admin__container, "_container")}>
        <h1 className={"_title"}>Approved</h1>
        <div className={s.admin__row}>
          <button
            className={cn(s.jigenListFirst__btn, "_btn")}
            disabled={disabled}
            onClick={() => {
              getApproved();
            }}
          >
            <span>Refresh</span>
          </button>
        </div>
        <div className={s.admin__row}>
          <div className={s.admin__addresses}>
            {approved.map((address) => (
              <p key={address}>{address}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});


export default Approved;
