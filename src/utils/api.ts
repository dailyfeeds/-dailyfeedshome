import request from './request';
import { articleParams, articleTopicParams, searchArticleParams, userArticleParams, recommendedAuthorParams, shareTwitterParams, authorizeTwitterCallbackParams } from "./type";

export function getArticle(params: articleParams) {
  let lan = localStorage.getItem('lan') || 'en'
  return request({
    url: `/latest?num=${params.num}&after_ts=${params.after_ts}&after_id=${params.after_id}&lan=${lan}`,
    method: "get",
    data: params,
  });
}

export function getArticleByTopic(params: articleTopicParams) {
  return request({
    url: `/search_topic?topic=${params.topic}&lan=${params.lan}&scroll_id=`,
    method: "get",
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
  let lan = localStorage.getItem('lan') || 'en'
  return request({
    url: `/search?words=${params.words}&lan=${lan}`,
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
  let lan = localStorage.getItem('lan') || 'en'
  return request({
    url: `/recommended_contributors?num=${params.num}&after_ts=${params.after_ts}&after_id=${params.after_id}&lan=${lan}`,
    method: "get",
  });
}

export function shareTwitter(params: shareTwitterParams) {
  return request({
    url: '/twitter_share',
    method: "post",
    data: params,
  });
}

export function authorizeTwitter(state: string) {
  return request({
    url: `/twitter_authorize?state=${state}`,
    method: "get",
  });
}

export function authorizeTwitterCallback(params: authorizeTwitterCallbackParams) {
  return request({
    url: `/twitter_authorize_callback?state=${params.state}&code=${params.code}`,
    method: "get",
  });
}

export function getTwitterConnectStatus(state: string) {
  return request({
    url: `/twitter_user?state=${state}`,
    method: "get",
  });
}

export function getRandomArticle(params: articleParams) {
  let lan = localStorage.getItem('lan') || 'en'
  return request({
    url: `/random_articles?num=${params.num}&after_ts=${params.after_ts}&after_id=${params.after_id}&lan=${lan}`,
    method: "get",
    data: params,
  });
}
