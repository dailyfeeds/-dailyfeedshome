import { observable, action, computed, makeObservable } from "mobx";

class AccountStore {
  /**
   * observable
   */
  @observable walletAddress = ''

  constructor() {
    // makeObservable 在mobx6 版本之后 比添加项
    makeObservable(this);
  }

  /**
   * action
   */
  @action changeWalletAddress = (address: string) => {
    this.walletAddress = address
  }
}

const homeStore = new AccountStore()

export default homeStore
