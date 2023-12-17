import { ENV } from '@/config/app.config'
import { GET, POST } from '@/core/lib/AxiosClient'

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

export const upateFav = (data:any) =>
  POST({
    url: ENV.BASE_URL + `favouriteMenus`,
    data,
  })

  export const postOrders = (data:any) =>
  POST({
    url: ENV.BASE_URL + `orders`,
    data,
  })


export const upateUser = (data:any) =>
  POST({
    url: ENV.BASE_URL + `user`,
    data,
  })

export const upateUserAddress = (data:any) =>
  POST({
    url: ENV.BASE_URL + `user/address`,
    data,
  })


export const searchMenus = (data:any) =>
    POST({
      url: ENV.BASE_URL + `search-menu`,
      data,
    })

export const test=()=>
GET({
  url: ENV.BASE_URL + 'posts',
})

