import UAParser from 'ua-parser-js'

export default function ({ req }) {
    let userAgent
    if (process.server) {
        userAgent = req.headers['user-agent']
    } else {
        userAgent = navigator.userAgent
    }

    const parser = new UAParser(userAgent)
    const result = parser.getResult()
    const store = useMainStore()

    store.setDevice(result.device.type || 'desktop')
}
