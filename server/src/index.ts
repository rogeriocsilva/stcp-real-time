import fs from 'fs'
import express, { Request, Response } from 'express'
import {
  exportGtfs,
  importGtfs,
  getStops,
  getRoutes,
  getTrips,
  updateGtfsRealtime,
} from 'gtfs'

const app = express()
const port = 3000

const EXPORT_PATH = './agencies/exported/'

const STCP_FROM_FILES = {
  path: EXPORT_PATH + 'stcp/',
}

const STCP_FROM_URL = {
  url: 'https://opendata.porto.digital/dataset/5275c986-592c-43f5-8f87-aabbd4e4f3a4/resource/f6b85210-3b86-4617-8327-405f50791cf0/download/gtfs-stcp-2023-09.zip',
  realTimeUrls: [
    'https://broker.fiware.urbanplatform.portodigital.pt/v2/entities?q=vehicleType==bus&limit=1000',
  ],
}

const setup = async () => {
  // Load GTFS data
  const config = {
    agencies: [],
    exportPath: EXPORT_PATH,
    sqlitePath: './agencies/db/gtfs.db',
  }
  let populatedConfig

  if (fs.existsSync(EXPORT_PATH)) {
    populatedConfig = { ...config, agencies: [STCP_FROM_FILES] }
    await importGtfs(populatedConfig)
  } else {
    populatedConfig = { ...config, agencies: [STCP_FROM_URL] }
    await importGtfs(populatedConfig)
    await exportGtfs(populatedConfig)
  }
  await updateGtfsRealtime(populatedConfig)
}

// Define endpoints
app.get('/stops', async (req: Request, res: Response) => {
  try {
    const stops = await getStops()
    res.json(stops)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/routes', async (req: Request, res: Response) => {
  try {
    const routes = await getRoutes()
    res.json(routes)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/trips', async (req: Request, res: Response) => {
  try {
    const trips = await getTrips()
    res.json(trips)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/stops/:stopName', async (req: Request, res: Response) => {
  const { stopName } = req.params
  try {
    const stop = getStops({ stop_id: stopName })
    res.json(stop)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Start the server
app.listen(port, () => {
  setup()
  console.log(`Server is running on port ${port}`)
})
