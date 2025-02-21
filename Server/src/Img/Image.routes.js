import express from "express"
import { insertTest, test, testESP, upload } from "./Image.controller.js"

const api = express.Router()

api.get('/test', test)
api.post('/upload', upload)
api.get('/cam', testESP)
api.post('/insert', insertTest)
export default api