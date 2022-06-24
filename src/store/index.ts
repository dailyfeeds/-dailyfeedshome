import React from 'react'
import HomeStore from './home'

const storesContext = React.createContext({
  HomeStore: HomeStore,
})

export const useStores = () => React.useContext(storesContext)