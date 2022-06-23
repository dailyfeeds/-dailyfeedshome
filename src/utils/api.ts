import request from './request';
import { articleParams, searchArticleParams, userArticleParams, recommendedAuthorParams } from "./type";

export function getArticle(params: articleParams) {
  return request({
    url: `/latest?num=${params.num}&after_ts=${params.after_ts}&after_id=${params.after_id}`,
    method: "get",
    data: params,
  });
}


export function getUserArticle(params: userArticleParams) {
  return request({
    url: `/premium_contributor?address=${params.address}`,
    method: "get",
    data: params,
  });
}

export function searchArticle(params: searchArticleParams) {
  return request({
    url: `/search?words=${params.words}`,
    method: "get",
    data: params,
  });
}

export function getArticleDetails(id: string) {
  return request({
    url: `/premium_article?digest=${id}`,
    method: "get",
  });
}

export function getRecommendedAuthorData(params: recommendedAuthorParams) {
  return request({
    url: `/recommended_contributors?num=${params.num}&after_ts=${params.after_ts}&after_id=${params.after_id}`,
    method: "get",
  });
}