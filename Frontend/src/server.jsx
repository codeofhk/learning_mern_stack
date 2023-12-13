import axios from 'axios'

const urlBase = 'http://localhost:3001/persons'

const getAll = () => { return axios.get(urlBase)
}

const create = (newObject) =>{
    return axios.post(urlBase,newObject)
}

const update = (id,newObject) =>{
    const request =  axios.put(`${urlBase}/${id}`,newObject)
    return request.then(response => response.data)
}

export default {
    getAll : getAll,
    create : create,
    update : update
}