import Image from "next/image";
import styles from "./page.module.css";
import HeaderTemplate from "./shared/HeaderTemplate";
import StoreInteractionContainer from "./shared/StoreInteractionContainer";

export default function Home() {
  return (<>
      <HeaderTemplate/>
      <StoreInteractionContainer/>
  </>
  );
}
