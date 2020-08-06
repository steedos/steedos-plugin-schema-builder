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

export const toERDModels : ItoErd  = (models: models) =>{
    
    return models?.value.map(v => {
          return {
              fields : Object.entries(v.fields).filter(([_,v]) => !v.is_system ).map(([_,v])=> {
                  return {
                          type : v.type,
                          key: v.name,
                          originalKey: v.name,
                          name: v.label,
                          typeMeta: v.reference_to && {
                              type:'Relation',
                              relationModel: v.reference_to
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