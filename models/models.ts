import { Session } from "next-auth";
import { StaticImageData } from "next/image";

export interface IAccount {
  _id: string;
  address: string;
  twitter?: string;
  hasTokens?: boolean;
  additionalInfo?: string;
  waitingForApproval?: boolean;
  approvalStatus?: "PENDING" | "APPROVED" | "DENIED";
  isAdmin?: boolean;
}
export interface IToken {
  mount: string;
  block_number: string;
  block_number_minted: string;
  contract_type: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata:any
  minter_address: string
  name: string;
  owner_of: string;
  symbol: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
  nesting?: boolean;
  loading?: boolean
  timer: string
}
export interface ISession {
  data:
    | ({
        twitter?: {
          twitterHandle: string;
          followersCount: number;
        };
      } & Session)
    | null;
  status: "authenticated" | "unauthenticated" | "loading";
}

export interface IMetalockCard {
  _id: string;
  image: StaticImageData;
  title: string;
  timer?: string;
  status: IMetalockCardStatus;
  bg: string;
}

export type IMetalockCardStatus = "locked" | "notLocked";

export interface IRewardsCard {
  _id: string;
  image: StaticImageData;
  title: string;
  requirement: string;
  metalock: string;
  expressIn: string;
  locked: boolean;
  info?: IAboutInfo;
}

export interface IAboutItem {
  id: string;
  name: string;
  value: string;
}

export interface IAboutInfo {
  listImages: string[];
  bigTitle: string;
  description: string[];
  aboutItem: IAboutItem[];
}

export interface IStatusCard {
  id: string;
  title: string;
  image: StaticImageData;
}
