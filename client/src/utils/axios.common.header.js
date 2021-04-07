import axios from 'axios'

const AUTH_TOKEN = localStorage.getItem('auth')

const defaultHeader = () =>{
    axios.defaults.headers.common['auth'] = AUTH_TOKEN;
}

export default defaultHeader;