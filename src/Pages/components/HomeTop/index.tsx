import { FC, useState, useEffect } from "react";
import { observer } from 'mobx-react'
import { useStores } from "@/store";
import { Input, Button, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Logo from "@/assets/images/avatar.png";
import closeModalImg from "@/assets/images/closeModal.svg";
import metaMaskIcon from "@/assets/images/metaMaskIcon.svg";
import "./index.less";

const { Search } = Input;

const Header: FC = () => {
  const navigate = useNavigate();
  const {
    HomeStore: { changeWalletAddress, walletAddress },
  } = useStores()
  const [connectVisible, handleConnectVisible] = useState<boolean>(false)

  const onSearch = (value: string) => {
    navigate(`/search/${value}`)
  };

  const connectWallet = () => {
    if (!Web3.givenProvider) {
      message.error('no_available_provider')
      return;
    }
    let relWeb3 = new Web3(Web3.givenProvider)
    relWeb3.eth.requestAccounts().then((res) => {
      changeWalletAddress(res[0])
      handleConnectVisible(false)
    }).catch((err: any) => {
      message.error(JSON.stringify(err))
      handleConnectVisible(false)
    })
  }

  const handleOk = () => {
    handleConnectVisible(false)
  }
  const handleCancel = () => {
    handleConnectVisible(false)
  }

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
            <div className='connectBtnContainer'><Button disabled={Boolean(walletAddress)} type='primary' className='connectBtn' onClick={() => { handleConnectVisible(true) }}>Connect Wallet</Button></div>
          </div>
        </div>
      </div>
      <Modal
        title="Connect a Wallet"
        visible={connectVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        className='connectWalletModal'
        closeIcon={<img src={closeModalImg} alt='close' />}
        footer={false}>
        <div className='walletList' onClick={connectWallet}>
          <img className='leftWalletIcon' src={metaMaskIcon} alt="metamask" />
          <span className='rightWalletTitle'>MetaMask</span>
        </div>
      </Modal>
    </div>
  )
}

export default observer(Header)