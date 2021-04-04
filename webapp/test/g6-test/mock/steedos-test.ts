import { IModel, IModule } from '../../../src/type'

export type models = {
    value : model[]
}

export type model = {
   fields: Record<string, field>
   label: string,
   name: string ,
   is_system: boolean
}

export type field = {
    label: string,
    name: string,
    type : string, //lookup
    is_system: boolean,
    is_enable: boolean,
    reference_to: string
    required: boolean
}

export type ItoErd = (models: models)=> IModel[]

const FIELDTYPEMAP:any = {
    boolean: '勾选框',
    currency: '金额',
    date: '日期',
    datetime: '日期时间',
    email: '邮件地址',
    html: 'Html文本',
    lookup: '相关表',
    master_detail: '主表/子表',
    number: '数值',
    password: '密码',
    select: '选择框',
    text: '文本',
    textarea: '长文本',
    url: '网址',
    autonumber: '自动编号'
}
const getFieldTypeLabel = function(type: string){
    let lable = FIELDTYPEMAP[type];
    return lable ? lable: type
}

export const toERDModels : ItoErd  = (models: models) =>{
    
    return models?.value.map(v => {
          return {
              fields : Object.entries(v.fields).filter(([_,v]) => !v.is_system ).map(([_,v])=> {
                  let relationModel = v.reference_to && v.reference_to === 'users'? 'space_users' : v.reference_to
                  return {
                          type : getFieldTypeLabel(v.type),
                          key: v.name,
                          originalKey: v.name,
                          name: v.label,
                          typeMeta: relationModel && {
                              type:'Relation',
                              relationModel: relationModel
                          },
                          required: v.required
                        
                  }
              }),
              key: v.name,
              name: v.label,
              moduleKey : v.is_system ? "system" :"business",
              originalKey: v.name,
              type: ""
          }
    })
}

export type toModules = ()=> IModule[]

export const toModules = () => {
    return [{
        key :'system',
        name:'系统'
    },{
        key :'business',
        name:'业务'
    }]
}