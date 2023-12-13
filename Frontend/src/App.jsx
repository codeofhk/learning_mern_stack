import axios from 'axios'
import { useEffect, useState} from 'react'
import './index.css'

const App = () => {

  const [phoneBook,setPhoneBook] = useState([])
  const [data,setData] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:3001/api/phonebook').then((data)=>{setPhoneBook(data.data)})},[])

  //console.log(phoneBook)

  const handleEvent = (e) => {
    const {name,value} = e.target
    setData((prevData)=>({
      ...prevData,[name]:value,
    }))
    //console.log(data)
  }

  const handleSubmit = () => {
    console.log('click')
    axios.post('http://localhost:3001/api/phonebook',data).then(({data})=>{setPhoneBook(data)})}
    

    //axios.get('http://localhost:3001/api/phonebook')
  return (
    <div>
      <h1>PhoneBook</h1>
      filter shown with : <input/>
      <h2>Add New</h2>
      name : <input name='name' onChange={handleEvent}/>
      number: <input name='number' onChange={handleEvent}/>
      <button onClick={handleSubmit}>Add</button>
      <h1>Registry</h1>
      {
        phoneBook.map(value => <p key={value._id}>{value.name} {value.number}</p>)
      }
    </div>
  )

}

export default App


