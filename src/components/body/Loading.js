
import { faSnowflake } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Loading = () => {
  return (
    <div className='col-12' style={{padding: '60px'}} height='100vh' >
       <FontAwesomeIcon className='snowFlake pb-5' icon={faSnowflake} beatFade size="2xl" style={{color: '#ffffff'}}/>
    </div>
  )
}

export default Loading