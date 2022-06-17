import { FC } from "react";
import { Input } from 'antd';
import { searchArticle } from "@/utils/api";
import Logo from "@/assets/images/avatar.jpeg";
import { axiosResult } from '@/utils/type';
import "./index.less";

const { Search } = Input;

type InitProps = {
  changeData: (value: any) => void;
};

const Header: FC<InitProps> = ({ changeData }) => {

  const onSearch = (value: string) => {
    let params = {
      "num": 10,
      "id_before": 0,
      'words': value
    }
    searchArticle(params).then((res: axiosResult) => {
      if (res.code === 0) {
        changeData(res.result)
      }
    })
    console.log(value)
  };

  return (
    <div className='nav-header'>
      <div className="g-container wrapper">
        <div className="nav-left-container">
          <div className="g-link-clear nav-left" >
            <a href="/"><img className="img--logo" src={Logo} alt="logo" /></a>
            <h2>Article</h2>
            <Search
              className="searchContainer"
              placeholder="搜索文章或作者"
              onSearch={onSearch}
              allowClear
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header