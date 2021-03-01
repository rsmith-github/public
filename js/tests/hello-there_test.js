import { readFileSync as read } from 'fs'

// /*/ // ⚡
export const tests = [
  ({ eq }) => // code must use console.log
    read('/jail/student/hello-there.js', 'utf8').trim().includes('console.log'),

  async ({ eq, code }) => {
    // console.log must have been called with the right value
    const log = console.log.bind(console)
    const args = []
    console.log = (..._args) => {
      args.push(..._args)
      log(..._args)
    }

    const b64 = Buffer.from(code).toString("base64")
    const url = `data:text/javascript;base64,${b64}`
    await import(url)
    console.log = log
    eq(args.join(' ').trim(), 'Hello There')
  },
]
