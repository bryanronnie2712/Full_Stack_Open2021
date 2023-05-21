import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

const baseUrl = process.env.API_URL || 'https://phone-servicefs23.onrender.com/api/persons';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [msgs,setMsgs] = useState('')
  const [filterTerm,setFilterTerm] = useState('');

  

  const hook = () => {
    axios.get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const nameChange = (event) => setNewName(event.target.value)
  const numberChange = (event) => setNewNum(event.target.value)
  const filterInputOnChange = (event) => setFilterTerm(event.target.value);


  const AlertMessage = ({message}) =>{
    if (message === null ) {
      return null
    }
    if(message.includes('Enter a name') || message === 'Enter a number')
    {
      return (
        <div style = {{ color: "red",
                        background: "lightgrey",
                        fontSize: "20px",
                        borderStyle: "solid",
                        borderRadius: "5px" }}>
          {message}
        </div>
      )
    }
    else if(message.includes('New contact added!') || message.includes('Deleted') || message.includes('Edited'))
    {
      return (
        <div style = {{ color: "green",
                        background: "lightgrey",
                        fontSize: "20px",
                        borderStyle: "solid",
                        borderRadius: "5px" }}>
          {message}
        </div>
      )
    }
    else{
      return (
        <div>
          
        </div>
        )
    }

  }


  const addContact = (event) =>{
    event.preventDefault();
  
    const personsArray = persons.map(event => event.name);
    const personObj = {name : newName, number : newNum};
    if(personsArray.includes(personObj.name)){
      persons.forEach(element => {
        if(element.name === newName && newName !== null && newNum !== null) {
          axios.put(`${baseUrl}/${element.id}`, personObj).then(response => {
          setPersons(persons.map(person => person.id === response.data.id ? response.data : person))
          setNewName('')
          setNewNum('')
          setMsgs("Edited " + response.data.name + "!")

          setTimeout(() => {
            setMsgs(null)
          }, 3000)
        })
        .catch(error => {
          setMsgs({
            text: error.response.data.error,
            type: "error"
          })
          setTimeout(() => {
            setMsgs(null)
          }, 3000)
        })
      setNewName('')
      setNewNum('')
        
        }
        })
    }
    
    else if(newName === ''){
      setMsgs('Enter a name')
    }
    else if(newNum === ''){
      setMsgs('Enter a number')
    }
    else{
      // setPersons(persons.concat(personObj));
      axios.post(`${baseUrl}/api/persons`, personObj).then(response => setPersons(persons.concat(response.data)))
      setNewName(''); 
      setNewNum('');
      setMsgs('New contact added! : '+ newName)

      setTimeout(() => {
        setMsgs(null)
      }, 3000)
    
    .catch(error => {
      setMsgs({
        text: error.response.data.error,
        type: "error"
      })
      setTimeout(() => {
        setMsgs(null)
      }, 3000)
    })
  setNewName('')
  setNewNum('')
  
    }
  }


  const deleteContact = (n) =>{
    if(window.confirm("Delete "+ n.name + '?')){
      persons.forEach(element => {
        if(element === n){
          axios.delete(`${baseUrl}/api/persons` + n.id).then(setPersons(persons.filter(p => p.id !== n.id)))
          setMsgs('Deleted '+ n.name)
          

          setTimeout(() => {
            setMsgs(null)
          }, 3000)
        
        .catch(error => {
          setMsgs({
            text: error.response.data.error,
            type: "error"
          })
          setTimeout(() => {
            setMsgs(null)
          }, 3000)
        })
      setNewName('')
      setNewNum('')

          
        }
      });
    }
  } 


  return (
    <div>
      <AlertMessage message = {msgs}/>
      <h2>Phonebook</h2>
      Filter by name : <input onChange={filterInputOnChange}/>
      <h2>Add New Numbers</h2>


    <form onSubmit={addContact} >
      <table><tbody>
        <tr>
          <td>Name</td>
          <td>: <input  onChange={nameChange}/></td>
        </tr>
        <tr>
          <td>Number</td>
          <td>: <input  onChange={numberChange} type='number' pattern='[0-9]{10}'/></td>
        </tr>
      </tbody></table>
      <br/>

          <button id = 'add_button' type="submit">Add</button>  
    </form>


      <h2>Numbers</h2>
      <ol>
      {persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase())).map(filteredPerson => (

        <li key={filteredPerson.id}>
          <td style={{width:'300px', backgroundColor:'#efefef',border:'1px solid white', paddingLeft:'10px'}}>{filteredPerson.name}</td>
          <td style={{width:'150px',backgroundColor:'#efefef',border:'1px solid white', textAlign:'right', paddingRight:'10px'}}>{filteredPerson.number}</td>
          <td ><button onClick={() => deleteContact(filteredPerson)}>Delete</button></td>
        </li>

      ))}</ol>
    </div>
  )
}



export default App;