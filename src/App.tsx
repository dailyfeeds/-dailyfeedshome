import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { setTwoToneColor } from '@ant-design/icons';
import Home from "./Pages/Home";
import UserHome from "./Pages/UserHome";
import SearchPage from "./Pages/SearchPage";
import ArticleDetails from "./Pages/ArticleDetails";
import Setting from "./Pages/Setting";
import './styles/index.less';

const App: FC = () => {

  useEffect(() => {
    setTwoToneColor('#0045ff')
  }, [])

  return (<Router >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:searchWord" element={<SearchPage />} />
      <Route path="/author/:address" element={<UserHome />} />
      <Route path="/details/:id" element={<ArticleDetails />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  </Router>)
};

export default App