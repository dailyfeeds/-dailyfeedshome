import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react'
import { Comment, Avatar, Button, Spin, message } from 'antd';
import { useStores } from "@/store";
import moment from 'moment';
import showdown from 'showdown'
import { UserOutlined } from '@ant-design/icons';
import HomeTop from "../components/HomeTop";
import { getArticleDetails, shareTwitter, authorizeTwitter } from "@/utils/api";
import { axiosResult } from '@/utils/type';
import './index.less';

const ArticleDetails: FC = () => {
  const routerParams = useParams();
  const navigate = useNavigate();

  const {
    HomeStore: { walletAddress },
  } = useStores()

  const [details, handleDetails] = useState<any>({})
  const [loading, handleLoading] = useState<any>(true)
  const [initStyLoading, handleInitStyLoading] = useState<any>(true)
  const [detailsContent, handleDetailsContent] = useState<any>('')

  useEffect(() => {
    getArticleDetailsData()
  }, [])

  const initStyle = () => {
    //获取img节点 调整img样式
    let imgNode = document.getElementsByTagName('img')
    for (var i = 0; i < imgNode.length; i++) {
      //获取img节点父元素p
      let parentNode = imgNode[i].parentElement
      parentNode?.style.setProperty('text-align', 'center')
    }
    //调整p样式
    let pNode = document.getElementsByTagName('p')
    for (var i = 0; i < pNode.length; i++) {
      pNode[i].style.setProperty('font-size', '1.1rem')
      pNode[i].style.setProperty('color', '#334155')
      pNode[i].style.setProperty('line-height', '1.625')
      pNode[i].style.setProperty('margin-top', '0.75rem')
      pNode[i].style.setProperty('margin-bottom', '0.75rem')
    }
    //调整h2样式
    let h2Node = document.getElementsByTagName('h2')
    for (var i = 0; i < h2Node.length; i++) {
      h2Node[i].style.setProperty('font-size', '1.67rem')
      h2Node[i].style.setProperty('font-weight', '700')
      h2Node[i].style.setProperty('margin-top', '1.87rem')
      h2Node[i].style.setProperty('margin-bottom', '1.87rem')
      h2Node[i].style.setProperty('line-height', '1.33')
    }
    //调整h3样式
    let h3Node = document.getElementsByTagName('h3')
    for (var i = 0; i < h3Node.length; i++) {
      h3Node[i].style.setProperty('font-size', '1.33rem')
      h3Node[i].style.setProperty('font-weight', '600')
      h3Node[i].style.setProperty('margin-top', '1.67rem')
      h3Node[i].style.setProperty('margin-bottom', '0.67rem')
      h3Node[i].style.setProperty('line-height', '1.5')
    }
    handleInitStyLoading(false)
    handleLoading(false)
  }

  const getArticleDetailsData = () => {
    let id = routerParams['id'] || '';
    getArticleDetails(id).then((res: axiosResult) => {
      if (res.code === 0) {
        handleDetails(res.result)
        let converter = new showdown.Converter()
        let html = converter.makeHtml(res.result.body)
        handleDetailsContent(html)
        setTimeout(() => initStyle(), 500)
      }
    })
  }

  const toUserHome = () => {
    navigate(`/author/${details.address}`)
  }

  const reTwitter = () => {
    let url = `https://twitter.com/intent/tweet?text=${details.title}\n http://feedculb.xyz/details/${details.contentDigest}`
    window.open(url)
    // let params = {
    //   state: walletAddress,
    //   content_digest: details.contentDigest,
    //   text: `${details.title}\n http://feedculb.xyz/details/${details.contentDigest}`
    // }
    // shareTwitter(params).then((res: axiosResult) => {
    //   if (res.code !== 0) {
    //     authorizeTwitter(walletAddress).then((res: axiosResult) => {
    //       if (res.code === 0) {
    //         window.open(res.result)
    //       } else {
    //         message.error(res.msg)
    //       }
    //     })
    //   } else {
    //     message.success('Share Success')
    //   }
    // })
  }

  return (
    <>
      <HomeTop />
      <div className='ArticleDetailsContainer'>
        <Spin spinning={loading && initStyLoading}>
          <Comment
            author={
              <div className="articleTop">
                <div className="leftTips">
                  <div className='authorSty'>{details.title}</div>
                  <div className='authorTimeSty'>Posted on {loading ? '' : moment((details.publishedAtTimestamp) * 1000).format('YYYY-MM-DD HH:mm:ss')}
                    <a className="authorTimeA" href={`https://mirror.xyz/${details.address}/${details.contentDigest}`} target='_blank'>• Read on Mirror.xyz</a>
                  </div>
                </div>
                <div className="rightOption"><Button type="primary" onClick={reTwitter}>Twitter</Button></div>
              </div>
            }
            avatar={<span onClick={() => toUserHome()}>{details.avatarURL ? <Avatar src={details.avatarURL} alt="avatar" /> : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}</span>}
            content={<div dangerouslySetInnerHTML={{ __html: detailsContent }} />}
          />
        </Spin>
      </div>
    </>
  )
};

export default observer(ArticleDetails)