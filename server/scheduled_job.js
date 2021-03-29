import axios from 'axios';

const dailyUpdate = async () => {
    try {
        const res = await axios.post('http://localhost:5000/user', {}); //https://take-me-back.herokuapp.com/
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
dailyUpdate();