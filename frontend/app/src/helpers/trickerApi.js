import axios from 'axios'

import errorExtraction from './errorExtraction'

export const processMethod = async ({ method, url, bodyData, ...rest }) => {
  try {
    const response = await axios({
      method: method,
      url,
      data: bodyData,
      ...rest
    })

    return { response }
  } catch (err) {
    const error = await errorExtraction(err)

    throw error
  }
}
