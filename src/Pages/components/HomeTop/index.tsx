import { FC } from "react";
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from "@/assets/images/avatar.png";
import "./index.less";

const { Search } = Input;

type InitProps = {
};

const Header: FC<InitProps> = ({ }) => {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    navigate(`/search/${value}`)
  };

  return (
    <div className='nav-header'>
      <div className="g-container wrapper">
        <div className="nav-left-container">
          <div className="g-link-clear nav-left" >
            <a href="/"><img className="img--logo" src={Logo} alt="logo" /></a>
            <div className="title">Feed.xyz</div>
            <Search
              className="searchContainer"
              placeholder="Search for articles or writers"
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