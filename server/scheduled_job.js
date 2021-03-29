import axios from 'axios';

const dailyUpdate = async () => {
    try {
        const res = await axios.post('https://take-me-back.herokuapp.com/', {}); //http://localhost:5000/user
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
dailyUpdate();