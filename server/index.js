const WebSocket = require('ws')

const state = {
  elements: {}
}

const wss = new WebSocket.Server({ port: 2001 })

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
} 

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    type: 'drag-init',
    payload: state.elements
  }))

  ws.on('message', (data) => {
    const msg = JSON.parse(data)

    switch (msg.type) {
      case 'drag':
        state.elements[msg.payload.id] = msg.payload
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data)
          }
        })
        break
    }
  }) 
})
