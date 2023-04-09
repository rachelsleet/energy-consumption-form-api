import { createApp } from './api/createApp'

const PORT: Number = 5050

const start = () => {
  console.log('starting app')
  createApp().then((app) =>
    app.listen(PORT, (): void => console.log(`running on port ${PORT}`))
  )
}

start()
