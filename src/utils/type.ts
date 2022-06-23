import { StringGradients } from "antd/lib/progress/progress";

export interface getProps {
  [key: string]: any;
}
export interface getStatusProps {
  [key: string]: any;
}

export interface loginProps {
  [key: string]: any;
  address: string,
  invitation_code_ref: string,
  lang: number,
  signature: string,
}

export interface axiosResult {
  [key: string]: any;
  code?: number;
  msg?: string;
  result?: any;
}

export interface axiosError {
  stack?: string | undefined;
  msg?: string;
  code?: number;
}

export interface articleParams {
  num: number;
  after_ts: number | string | undefined;
  after_id: number | string | undefined;
  [key: string]: any;
}


export interface userArticleParams {
  address: string;
}

export interface searchArticleParams {
  words: string;
}

export interface recommendedAuthorParams {
  num: number;
  after_ts?: number | string;
  after_id?: number | string
}