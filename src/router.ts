import express = require("express");
import axios = require("axios");
import {API_KEY} from "./server";

export const router = express.Router();

router.get("/test", (req, res) => res.send("Hello world "));
router.get("/rovers", async (req, res) => {
    async function getRovers() {
        try {
            const response = await axios.default.get(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${API_KEY}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    res.send(await getRovers());
});
router.get("/rovers/:rover_name/photos/:camera_type", async (req, res) => {
    const roverName = req.params.rover_name;
    const cameraType = req.params.camera_type;

    async function getPhotos() {
        try {
            const response = await axios.default.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&camera=${cameraType}&api_key=${API_KEY}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return {"photos": []};
        }
    }

    const photoDetails = await getPhotos();
    const photoURLs = photoDetails.photos.map((photoDetail: { img_src: any; }) => photoDetail.img_src);
    res.send()
    res.send(photoURLs);
})