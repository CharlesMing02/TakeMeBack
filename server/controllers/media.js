import axios from 'axios';

export const getSongs = async (req, res) => {
    try {
        const response = await axios.get(`https://api-v2.soundcloud.com/search?client_id=SHBP59ZbnkOWhy3perfU0I83tRB8UuJk&offset=0&limit=10&q=${req.query.query}`)
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}