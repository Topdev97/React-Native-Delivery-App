import { ENV } from '@/config/app.config'
import { GET } from '@/core/lib/AxiosClient'


export const getEmployees=()=>
  GET({
    url: ENV.BASE_URL + 'employees',
  })
