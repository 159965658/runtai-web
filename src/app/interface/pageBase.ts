import { RequestBase } from "./requestBase";

export class PageBase extends RequestBase {
  public pageIndex: number;
  public pageSize: number = 10;
}
