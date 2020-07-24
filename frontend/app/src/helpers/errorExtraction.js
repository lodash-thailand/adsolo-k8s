/** ====================================================
 * @name errorExtraction
 * @description เป็นตัวจัดการ Error ว่าจะให้ Throw อะไรออกไป
 * @version 1.0.0
 * ================================================== */
const errorExtraction = async err => {
  try {
    const { status, data: { error } } = err.response
    const errData = { status, errMessage: error.message, errKey: error.status }

    return errData
  } catch (e) {
    return {
      status: 400,
      errMessage: 'unknow error',
      errKey: 'DEFAULT_ERROR'
    }
  }
}

export default errorExtraction
