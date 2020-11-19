import WDSK from 'wesenderjs'

class WesenderService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static async sendSms (destine, sms) {
    const payload = {
      destine,
      message: sms,
      hasSpecialCharacters: true
    }
    const weSender = new WDSK(
      '9663702a7fff408c8ff41d257fa1b2991f7413b6668e4522a09fa27880cf4c37'
    )
    const status = await weSender.sendMessage(payload).then((res) => {
      return res.Exito
    })

    return status
  }
}

export default WesenderService
