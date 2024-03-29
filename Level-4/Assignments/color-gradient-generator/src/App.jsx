import {useState} from 'react'
import './App.css'

export default function App() {
  const [state, setState] = useState({
    angle: "",
    color1: "", 
    color2: '', 
    color3: ''
  })
  console.log(state)

  console.log(state.color1)
  const handleInputChange = (e) =>{
    setState((prevState) =>({
      ...prevState, 
      [e.target.name]: e.target.value
    }));
  }
  console.log(handleInputChange)
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log({color1}, {color2}, {color3})
  }
  console.log(handleSubmit)
  return (
    <div className="App">
    <header>
      <h1>React Linear Gradient Generator </h1>
    </header>
    <div className='color-square' style={{border: "1px solid black", background: `linear-gradient(${state.angle}deg, ${state.color1}, ${state.color2}, ${state.color3})`}}>
    </div>
    <form onSubmit = {handleSubmit}>
      <div className='form-control'>
      <label>Angle: </label>
        <input type = 'number'
        className='angle-input'
        name = 'angle'
        value={state.angle}
        onChange = {handleInputChange}
        />
        <br />
        <label>Color 1: </label>
        <input
          className='input-color1'
          type = 'color'
          name = 'color1'
          value = {state.color1}
          onChange = {handleInputChange}
        />
        <br/>
        <label>Color 2: </label>
        <input type = 'color'
        className='input-color2'
        name = 'color2'
        value = {state.color2}
        onChange = {handleInputChange}
        />
        <br />
        <label>Color 3: </label>
        <input type = 'color'
        className='input-color3'
        name='color3'
        value={state.color3}
        onChange = {handleInputChange} />
        </div>
    </form>
    </div>
  )
}


