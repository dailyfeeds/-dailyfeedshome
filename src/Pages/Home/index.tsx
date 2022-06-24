import { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react'
import HomeTop from "../components/HomeTop";
import HomeLeft from "./components/HomeLeft";
import HomeContent from "./components/HomeContent";
import HomeRight from "./components/HomeRight";
import { getArticle } from "@/utils/api";
import './index.less';
import { axiosResult, articleParams } from '@/utils/type';

const Home: FC = () => {
  const [articleData, handleData] = useState<any>([])
  const [loading, handleLoading] = useState<boolean>(false)
  const [id, handleId] = useState<number>(0)

  useEffect(() => {
    let params = {
      num: 10,
      after_ts: '',
      after_id: ''
    }
    getArticleData(params)
  }, [])

  const getArticleData = (params: articleParams) => {
    handleLoading(true)
    getArticle(params).then((res: axiosResult) => {
      handleLoading(false)
      if (res.code === 0) {
        // handleData(articleData.concat(res.result))
        handleData(res.result)
        handleId(res.result[res.result.length - 1].id)
      }
    })
  }

  const changeData = () => { }

  const refreshArticleData = () => {
    let params = {
      num: 10,
      after_ts: 0,
      after_id: ''
    }
    getArticleData(params)
  }

  return (
    <>
      <HomeTop />
      <div className='homePageContainer' >
        <div className='container'>
          <HomeLeft changeData={changeData} />
          <HomeContent data={articleData} loading={loading} refreshArticleData={refreshArticleData} />
          <HomeRight />
        </div>
      </div>
    </>
  )
};

export default observer(Home)