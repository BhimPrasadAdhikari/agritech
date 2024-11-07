import { useOrigin } from '@/hooks/use-origin'
import React from 'react'
import { ApiAlert } from './api-alert'
interface ApiListProps{
    entityName:string
    entityIdName:string
}
const ApiList:React.FC <ApiListProps> = ({
    entityName,
    entityIdName,
}) => {
    const origin=useOrigin()
    const baseUrl= `${origin}/api`
  return (
    <>
    <ApiAlert description={`${baseUrl}/${entityName}`} title='GET' variant='public'/>
    <ApiAlert description={`${baseUrl}/${entityName}/(${entityIdName})`} title='GET' variant='public'/>
    <ApiAlert description={`${baseUrl}/${entityName}`} title='POST' variant='admin'/>
    <ApiAlert description={`${baseUrl}/${entityName}`} title='PATCH' variant='admin'/>
    <ApiAlert description={`${baseUrl}/${entityName}`} title='DELETE' variant='admin'/>

    </>
  )
}

export default ApiList