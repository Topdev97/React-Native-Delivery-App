import { ENV } from '@/config/app.config'
import { GET } from '@/core/lib/AxiosClient'

export const getBanners=()=>
  GET({
    url: ENV.BASE_URL + 'banners',
  })

  export const getCategories=()=>
GET({
  url: ENV.BASE_URL + 'menu-categories',
})

export const getCatMenus=(id:any)=>
GET({
  url: ENV.BASE_URL + `menu-category/menus/${id}`,
})

export const getAllMenus=()=>
GET({
  url: ENV.BASE_URL + `menu-category/menus`,
})

export const getAddress=()=>
GET({
  url: ENV.BASE_URL + 'user',
})

  export const test=()=>
GET({
  url: ENV.BASE_URL + 'posts',
})