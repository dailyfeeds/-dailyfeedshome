import { FC, useState, useEffect } from "react";
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from "@/assets/images/avatar.jpeg";
import "./index.less";

const { Search } = Input;

const Header: FC = () => {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
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