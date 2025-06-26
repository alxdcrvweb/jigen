import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import request, { getAuthToken, IResponse } from "../service";
import { toast } from "react-toastify";
import axios from "axios";
import { CustomError } from "../utils/utilities";
import { IAccount } from "../models/models";
import { baseURL } from "../utils/config";
import fileDownload from 'js-file-download'

@injectable()
export class AdminStore {
  @observable applications: IAccount[] = [];
  @observable approved: string[] = [];
  @observable disabled: boolean = false;

  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  download = async () => {
    console.log("object");
    try {
      this.disabled = true;
      const config = {
        headers: {
          "Content-Type": "text/csv",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : "",
        },
      };
      const res = await axios.get(baseURL + `api1/v1/admin/download`, config);
      fileDownload(res.data, "data.csv");
    } catch (e) {
      if (
        axios.isAxiosError(e) ||
        e instanceof Error ||
        (e instanceof Object && e?.hasOwnProperty("message"))
      ) {
        //@ts-ignore
        const err = new CustomError(e?.message as string);
        toast.error(err.getErrorMessage());
      }
    } finally {
      this.disabled = false;
    }
  };
  getApplications = async (
    status: "all" | "pending" | "approved" | "denied" = "all"
  ) => {
    try {
      this.disabled = true;
      const { data } = await request<IResponse<IAccount[]>>({
        url: `admin/users/${status}`,
      });
      this.applications = data;
    } catch (e) {
      if (
        axios.isAxiosError(e) ||
        e instanceof Error ||
        (e instanceof Object && e?.hasOwnProperty("message"))
      ) {
        //@ts-ignore
        const err = new CustomError(e?.message as string);
        toast.error(err.getErrorMessage());
      }
    } finally {
      this.disabled = false;
    }
  };
  getApproved = async () => {
    try {
      this.disabled = true;
      const { data } = await request<IResponse<string[]>>({
        url: `admin/addresses`,
      });
      this.approved = data;
    } catch (e) {
      if (
        axios.isAxiosError(e) ||
        e instanceof Error ||
        (e instanceof Object && e?.hasOwnProperty("message"))
      ) {
        //@ts-ignore
        const err = new CustomError(e?.message as string);
        toast.error(err.getErrorMessage());
      }
    } finally {
      this.disabled = false;
    }
  };
  approveApplications = async (addresses: string[]): Promise<boolean> => {
    try {
      this.disabled = true;
      await request({
        url: `admin/approve`,
        method: "POST",
        data: { addresses: addresses },
      });
      return true;
    } catch (e) {
      if (
        axios.isAxiosError(e) ||
        e instanceof Error ||
        (e instanceof Object && e?.hasOwnProperty("message"))
      ) {
        //@ts-ignore
        const err = new CustomError(e?.message as string);
        toast.error(err.getErrorMessage());
      }
      return false;
    } finally {
      this.disabled = false;
    }
  };
  denyApplications = async (addresses: string[]): Promise<boolean> => {
    try {
      this.disabled = true;
      await request({
        url: `admin/deny`,
        method: "POST",
        data: { addresses: addresses },
      });
      return true;
    } catch (e) {
      if (
        axios.isAxiosError(e) ||
        e instanceof Error ||
        (e instanceof Object && e?.hasOwnProperty("message"))
      ) {
        //@ts-ignore
        const err = new CustomError(e?.message as string);
        toast.error(err.getErrorMessage());
      }
      return false;
    } finally {
      this.disabled = false;
    }
  };
}
