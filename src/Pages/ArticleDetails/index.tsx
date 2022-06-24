import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Comment, Avatar, Tooltip, Spin } from 'antd';
import moment from 'moment';
import showdown from 'showdown'
import { UserOutlined } from '@ant-design/icons';
import HomeTop from "../components/HomeTop";
import { getArticleDetails } from "@/utils/api";
import { axiosResult } from '@/utils/type';
import './index.less';

const ArticleDetails: FC = () => {
  const routerParams = useParams();
  const navigate = useNavigate();

  const [details, handleDetails] = useState<any>({})
  const [loading, handleLoading] = useState<any>(true)
  const [initStyLoading, handleInitStyLoading] = useState<any>(true)
  const [detailsContent, handleDetailsContent] = useState<any>('')

  useEffect(() => {
    getArticleDetailsData()
    // let converter = new showdown.Converter()
    // let html = converter.makeHtml('## The Next Music Industry\n\n![](https://images.mirror-media.xyz/publication-images/ZfE0oJmDN8T-qgdgjqCy1.jpg?height=1080&width=1920)\n\nSince the early days of Ethereum, innovators have been looking towards Crypto as a solution space in which to build a new Music industry.\n\nIt makes sense. Despite ever decreasing barriers to access, the challenging economics and logistics of building a career as a creator have never been in greater focus. The internet has brought endless opportunities, but platform dynamics and oppressive algorithms are creating more and more space between the people making music and those listening to it. Everything is starting to feel sterile. Some are doing well in this streaming meta, but the increasing majority are not.\n\nBlockchain and Music has been through a couple of waves. At first, we focussed on building new infrastructure; coming at the definition of rights, licensing, and payment, with a decentralized coordination approach. It worked in terms of grabbing the attention of industry. Many column inches were written and innovation deals were put in place with major players, but ultimately we failed to make significant change.\n\n*We learned that trying to disrupt the music industry through alternative rails for incumbents isn’t going to work. **Artists and Fans hold the power to disrupt**.*\n\nFast forward five years and a lot has happened. The boom in NFTs and Social Tokens is hinting towards a future where creators can build a business model in parallel to the traditional industry. Artists are leaning into new ways of thinking about online engagement, through their own communities and DAOs. Fans, too, are starting to explore digital collecting and deeper value exchange with the people they support. It’s nascent and experimental, but the green shoots are there.\n\nHowever, it’s trite to say, but we really are still so early on this journey. Darwinistic early years of ideation where the cost to innovate is low and the potential to build short term hype is high. There is a lot going on in different places at all times of the day. Keeping track with who’s doing what, what is working, and what it all means, is difficult.\n\nIncentives are largely stacked towards spinning up something new rather than working with other teams, but Web3 is built on composable interoperability and optionality. We are developing pieces of a grand ever-changing tapestry that hints towards a future where there will *not* be one platform to rule them all. For that to work, we need to keep true to the roots of decentralization. As activity increases we need to make sure that the graphs underpinning interactions remain open for users that want the utility that brings.\n\nMore than anything else though, we need to find a place where the internet feels personal again, where self-expression can lead to deeper connections between people. The vision for Web3 is truly owning your place within the communities that you interact with. We want to help build this for Music.\n\n## musicOS\n\nWe formed musicOS to provide solutions.\n\nAt its core, musicOS will be an information, analysis, and social layer on top of the Web3 Music ecosystem. **The homepage for Web3 Music** and a foundation to keep pushing the space forwards.\n\nmusicOS will provide a common layer across projects and experiments to serve as a catalyst for further exploration and development. It will be built on top of open data and services, provide open data and services, be unopinionated, and **credibly neutral.**\n\nInterest in the Web3 Music industry is currently dominated by NFTs, but we expect that the future market make-up will be comprised of a far more nuanced set of tools that Crypto can provide. musicOS will be developed with this in mind, empowering creators, fans, and everyone in-between to engage in the most rewarding way possible as the space continues to develop.\n\nTo users, **musicOS will be a thin *community owned* application** to check what is happening, to manage your interests, and to own your space within it. Under the hood, it will build and champion decentralization and progression of the future of music through collaboration.\n\n![](https://images.mirror-media.xyz/publication-images/w2YESQ0sB-0_I1XNi2MTb.png?height=2160&width=3841)\n\n## Building a Web3 Organization in the Right Way\n\nWe believe that the next iteration of the internet will be comprised of entities that work in a more democratic model than those that have become increasingly dominant in recent years. It is imperative that musicOS is owned and run by the community that it is serving.\n\nTo this end, we have had the honor of being part of [Seed Club](https://seedclub.xyz/)’s accelerator program to learn and explore the best way to build a next generation organization. The future of musicOS is a DAO.\n\nWe are currently incubating musicOS through [HIFI Labs](https://www.hifilabs.co/), which provides unrivaled support to nurture conception to launch, and beyond. Great product is the basis on which musicOS will achieve its ambitious plans and so we will build in a product focussed, lean, and agile, way.\n\nThe progression toward decentralization is a journey that requires careful thought. Fortunately Web3 is at a stage now where certain success stories are starting to emerge as good execution case studies.\n\n## How To Get Involved\n\nIf this sounds exciting to you then we want your help.\n\nOur Open Beta of musicOS v1 will be live in the coming weeks. Until then, you can head to our [staging site](https://musicos.xyz/) to submit your interest.\n\nAdditionally, we are set up on the [HIFI Labs discord](https://discord.gg/P5rrpZN4ds) to explore the potential for musicOS with a growing community of active participants.\n\nFinally, if you are an Artist and are interested in investigating the potential of Web3 Music for your own career then get in contact with HIFI Labs [here](https://www.hifilabs.co/).')
    // handleDetailsContent(html)
  }, [])

  // useEffect(() => {
  //   setTimeout(() => initStyle(), 1000)
  // }, [])

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

  return (
    <>
      <HomeTop />
      <div className='ArticleDetailsContainer'>
        <Spin spinning={loading && initStyLoading}>
          <Comment
            author={[<div className='authorSty'>{details.title}</div>,
            <div className='authorTimeSty'>发布于 {loading ? '' : moment((details.publishedAtTimestamp) * 1000).format('YYYY-MM-DD HH:mm:ss')}
              <a className="authorTimeA" href={`https://mirror.xyz/${details.address}/${details.contentDigest}`} target='_blank'>•Read on Mirror.xyz</a></div>]}
            avatar={<span onClick={() => toUserHome()}>{details.avatarURL ? <Avatar src={details.avatarURL} alt="avatar" /> : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}</span>}
            content={<div dangerouslySetInnerHTML={{ __html: detailsContent }} />}
          />
        </Spin>
      </div>
    </>
  )
};

export default ArticleDetails