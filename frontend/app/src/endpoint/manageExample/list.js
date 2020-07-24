import { ROOT_URL } from '../../config'
import { processMethod } from '../../helpers/trickerApi'
const URL = `${ROOT_URL}/api/v1/examples`

/** =============================================================
 * @description เป็นส่วน Endpoint ที่จัดการดึงข้อมูล example
 * =========================================================== */
const list = {
  method: 'get',
  getUrl: () => URL,
  invoke: async (url) => {
    try {
      const results = await processMethod({ method: 'get', url })
      const { response } = results
      const { data } = response

      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default list
