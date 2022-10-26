import jwt from "jsonwebtoken";
import fetch from 'node-fetch';

export const JobList = async (req, res) => {
    try {
        let { description, location, full_time} = req.query;
        description = description ? description : '';
        location = location ? location : '';
        full_time = full_time ? full_time : '';
        // res.json(`${process.env.API_URL}?description=${description}&location=${location}&full_time=${full_time}`);
        const apiResponse = await fetch(`${process.env.API_URL}?description=${description}&location=${location}` )
        const apiResponseJson = await apiResponse.json()
        
        res.send(apiResponseJson);

    } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
}