import React, { useRef, useState } from 'react'
import getConfig from 'next/config'

import { ROOT_URL } from '../src/config'
import { manageExample } from '../src/endpoint'

const { publicRuntimeConfig } = getConfig()
const { BACKEND_DOMAIN_URL } = publicRuntimeConfig

const index = (props) => {
  console.log(BACKEND_DOMAIN_URL)
  const { examples } = props
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const [data, setData] = useState(examples)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    const file = imageRef.current.files[0]
    const textValue = textRef.current.value

    formData.append('text', textValue)
    formData.append('fileInput', file)

    const options = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    try {
      const URL = manageExample.create.getUrl()
      const response = await manageExample.create.invoke(URL, formData, options)
      setData([...data, response.data])
      imageRef.current.value = ''
      textRef.current.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  console.log(ROOT_URL)

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' ref={textRef} />
        <input type='file' ref={imageRef} />
        <button>Submit</button>
      </form>

      <ul>
        {
          data.map(item => {
            return (
              <li key={item._id}>
                {item.text}:
                <img src={`${BACKEND_DOMAIN_URL}/uploads/${item._id}.jpg`} width={200} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {
  const URL = manageExample.list.getUrl()
  const { result } = await manageExample.list.invoke(URL)

  return {
    props: {
      examples: result || []
    }
  }
}

/** =========================================
 * @description ถ้าใช้ getInitialProps ใช้แบบนี้
 * ======================================= */
// index.getInitialProps = async () => {
//   const URL = manageExample.list.getUrl()
//   const { result } = await manageExample.list.invoke(URL)

//   return { examples: result }
// }

export default index
