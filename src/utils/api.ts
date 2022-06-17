import request from './request';
import { getProps } from "./type";

export function getArticle(params: getProps) {
  return request({
    url: "/get_latest_articles",
    method: "post",
    data: params,
  });
}

export function searchArticle(params: getProps) {
  return request({
    url: "/search_words",
    method: "post",
    data: params,
  });
}