/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http')
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')
const serve = serveStatic('./storybook-static')
const port = process.env.PORT || 4561
const server = http.createServer(function (req, res) {
  const done = finalhandler(req, res)
  serve(req, res, done)
})

server.listen(port)
console.log(`> Storybook Server is running on http://localhost:${port}`)
