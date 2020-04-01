import React from 'react'
import axios from 'axios'

const index = (props) => {
  const { examples } = props

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {
          examples.map(item => <li key={item._id}>{item.text}</li>)
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
