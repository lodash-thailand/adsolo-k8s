import { ROOT_URL } from '../../config'
import { processMethod } from '../../helpers/trickerApi'
const URL = `${ROOT_URL}/api/v1/examples`

/** =============================================================
 * @description เป็นส่วน Endpoint ที่จัดการการสร้าง example
 * =========================================================== */
const create = {
  method: 'post',
  getUrl: () => URL,
  invoke: async (url, bodyData, options) => {
    try {
      const results = await processMethod({ method: 'post', url, bodyData, options })
      const { response } = results
      const { data } = response

      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default create
