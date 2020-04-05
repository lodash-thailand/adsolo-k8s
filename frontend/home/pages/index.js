import React, { useRef, useState } from 'react'
import axios from 'axios'

const index = (props) => {
  const { examples } = props
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const [data, setData] = useState(examples)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
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
      const response = await axios.post('http://localhost:2000/api/v1/examples', formData, options)
      setData([...data, response.data.data])
      imageRef.current.value = ''
      textRef.current.value = ''
    } catch (error) {

    }
  }

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
                <img src={`http://localhost:2000/profile/${item._id}.jpg`} width={200} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

index.getInitialProps = async () => {
  let examples = []
  try {
    const response = await axios.get('http://backend:2000/api/v1/examples')
    examples = response.data.result
  } catch (error) {}

  return { examples }
}

export default index
