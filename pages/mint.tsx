import LandingLayout from "../components/LandingLayout";
import Collection from "../components/Mint/collection";
import MintNow from "../components/Mint/mintNow";
import MintLayout from "../components/MintLayout";
import s from "../styles/mint.module.scss";
const Mint = () => {
  console.log('Mint');

  return (
    <MintLayout>
      <div className={s.mint__container}>
        <div className={s.mint__content}>
          <Collection />
          <MintNow />
        </div>
      </div>
    </MintLayout>
  );
};
export default Mint;
