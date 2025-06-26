import classNames from "classnames";
import AppLayout from "../components/App/AppLayout";
import s from "../styles/shipping.module.scss";
import { ICountry, Country, ICity, City } from "country-state-city";
// import 'react-phone-input-2/lib/style.css'
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import { observer } from "mobx-react";
import { ModalsEnum } from "../modals";
import Image from "next/image";
import arrow from "../public/icons/arrow-down.svg";
import { useRouter } from "next/router";
import size from "../styles/size.module.scss";
const Shipping = observer(() => {
  const Personality = ["E-mail", "First name", "Last name"];
  const Location = [
    "State/Province/Region",
    "City",
    "Zip/Postal Code",
    "Address",
    "Additional Info",
  ];

  const [phone, setPhone] = useState();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [chosenCountry, setChosenCountry] = useState<string>("");
  const {showModal, hideModal} = useInjection(ModalStore)
  const router = useRouter();
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);
  const placeOrder = (e:any) =>{
    e.preventDefault()
    showModal(ModalsEnum.Order)
  }
  return (
    <AppLayout>
      
      <form onSubmit={placeOrder}  className={classNames(s.shipping)}>
        <div className={classNames(size.size__header, "_appContainer")}>
            <button
              className={classNames(size.size__back, "_iconbtn")}
              type="button"
              onClick={() => router.push("/rewards")}
            >
              <Image src={arrow} alt={"arrow prev"} width={24} height={24} />
            </button>
            Select your size
          </div>
        <div className={classNames(s.shipping__content, "_appContainer")}>
          <div className={s.shipping__header}>
            <h1 className={classNames(s.shipping__title, "_appTitle")}>
              Shipping information
            </h1>
          </div>
          <div className={s.shipping__personality}>
            <h1 className={classNames(s.shipping__subtitle, "_appTitle")}>
              Personality
            </h1>
            {Personality.map((field,i) => {
              return <input placeholder={field} key={i} />;
            })}
          </div>
          <div
            className={classNames(
              s.shipping__personality,
              s.shipping__location
            )}
          >
            <h1 className={classNames(s.shipping__subtitle, "_appTitle")}>
              Location
            </h1>
            <select
              onChange={(e) => {
                setChosenCountry(e.target.value);
              }}
            >
              {countries.map((el,i) => {
                return <option value={el.isoCode} key={i}>{el.name}</option>;
              })}
            </select>

            {Location.map((field, i) => {
              return <input placeholder={field} key={i} />;
            })}
            {/* @ts-ignore */}
            <PhoneInput
              containerClass={s.shipping__phoneInput}
              value={phone}
              buttonClass={s.shipping__flag_button}
              dropdownClass={s.shipping__flag_dropdown}
            //   onChange={(phone) => setPhone(phone)}
            />
          </div>
        </div>
        <button type="submit"className={classNames(s.shipping__button, '_btn')}>Place order</button>
      </form>
    </AppLayout>
  );
});
export default Shipping;
