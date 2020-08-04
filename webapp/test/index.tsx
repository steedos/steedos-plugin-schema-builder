import dva from 'dva'
import React, { useMemo } from 'react'
import { useRequest } from 'ahooks';
import Page , { DvaModel } from '../src'
// import getAllModelsTest from './g6-test/mock/model-test'
// import getAllModulesTest from './g6-test/mock/module-test'
import { toModules, toERDModels  } from './g6-test/mock/steedos-test'


import init from  './unstated'

const ErdPdmPage =  (props) => {
  const { data, error, loading } = useRequest('/api/v4/objects');
  // alert(JSON.stringify(data))
   const { getModels, getModules } = useMemo(() => ({
    getModels: async () =>  ({ res: toERDModels(data) }),
    getModules: async () => ({ res: toModules() }),
   }), [data])
    
   if(!data) return null
   return (
   <Page {...props}
     getModels={getModels}
     getModules={getModules}
     isFullScreen
       />
   )
}
// alert()
// // 创建应用
// const app = dva()
// app.model(DvaModel({namespace: 'erd'}) as any)
// // 注册视图
// app.router(() => (
//   <div>
//    <ErdPdmPage />
//   </div>
// ))
// // 启动应用
// app.start('#app')
init(ErdPdmPage)
// document.appendChild(new HTMLDivElement({}))
// import './testg6'
