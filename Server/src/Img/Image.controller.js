import { connection } from "../../configs/DB/SQLConnection.js"
import { v2 as cloudinary } from "cloudinary"

const dbConnection = connection()

export const test = (req, res) => {
    return res.send({ message: "Function TEST | IMG" })
}

export const testESP = (req, res)=>{
    console.log('ESP32CAM Connected !!');
    return res.send({message:'ESP32CAM Connected !!'})
}

export const upload = async (req, res) => {
    try {
        //# Validate is File was uploaded
        if (!req.files || !req.files.image) {
            return res.status(400).send({ message: "Image was not uploaded" })
        }
        const file = req.files.image

        //# Upload Img to Cloudinary
        const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.data.toString('base64')}`,{
            folder:'Home',
            public_id: `image_${Date.now()}`
        })
        return res.send({message: "Image was Uploaded Successfully !!"})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Error Uploading file, Try Again" })
    }
}

export const insertTest = async(req, res)=>{
    try {
        const {nombre, carrera} = req.body
        dbConnection.query(
            "call sp_insertTest(?,?)",
            [nombre, carrera],
            (error)=>{
                if(error){
                    console.error(error)
                    return res.status(500).send({message:'DB Error, Try Again'})
                }
                return res.send({message:'Data send successfully'})
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).send({message:'DB Error, please Try again'})
    }
}