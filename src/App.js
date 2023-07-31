
import pokeLogo from './whothatpokemon.png'
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import {FcSearch} from 'react-icons/fc'
import {GrRefresh} from 'react-icons/gr'
import Pokemon from './pokemon'
import pokedex from './pokedex.json'

const pokemons = pokedex.pokemons
const API_URL = 'https://pokeapi.co/api/v2/pokemon'



const style = {
  list: `grid place-items-center`,
  heading: `text-6xl font-pokemon p-4 text-[#ffcb05] font-outline-2`,
  form: `p-4`,
  input: `border rounded-md p-3`,
  text: `capitalize p-3 font-bold text-sm`,
  textC: `capitalize p-1 font-bold text-xl`,
  dropdown: `bg-white display-flex flex-col border border-gray-100`,
  dropdownrow: `cursor-pointer text-start m-2`
}

const App = () => {
  
  const [pokemon, setPokemon] = useState([]);
  const {name: pokeName, types: pokeType} = pokemon
  const [pokemonGuess, setPokemonGuess] = useState('')
  const [checkGuess, setCheckGuess] = useState(false)
  var [numOfGuesses, setNumOfGuesses] = useState(0)
  const [pokemonType, setPokemonType] = useState([])
  const [pokemonType2, setPokemonType2] = useState([])
  const [pokeList, setPokeList] = useState([])
  var [xNum, setXNum] = useState(0)
  const [pokeLength, setPokeLength] = useState(0)
  const {type: type1} = pokemonType
  const {type: type2} = pokemonType2
  const [pokeType1, setPokeType1] = useState('')
  const [pokeType2, setPokeType2] = useState('')
  
  
  const searchPokemon = useCallback(async (pokeNum) => {
    const response = await fetch(`${API_URL}/${pokeNum}`);
    const data = await response.json();
    

    setPokemon(data)
    
    setPokemonType(data.types[xNum])
    if(data.types[1] != null) {
      setPokemonType2(data.types[1])
    }
    
    console.log(data)
    
  }, [xNum])

  const handleSubmit = (e) => {
    e.preventDefault()
    compareNames()
    setPokeLength(pokeType.length)
    settypes()

  }

  const settypes = () => {
    setPokeType1(type1.name)
    if(pokeType.length > 1) {
      setPokeType2(type2.name)
    }
  }

  

  const compareNames = async () => {

 
    const response = await fetch(`${API_URL}/${pokemonGuess.toLowerCase()}`);
    const data = await response.json();
    if (pokemonGuess!=='') {
      setPokeList([...pokeList, data])
      setPokemonGuess('')
      setNumOfGuesses(numOfGuesses+=1)
      if (pokemonGuess.toLowerCase() === pokemon.name) {
        setCheckGuess(true)
      } else {
        setCheckGuess(false)
      }
    } else {
      alert('Please enter Pokemon Name')
    }
    
    
  }


  const setValue = (searchTerm) => {
    setPokemonGuess(searchTerm)
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

  useEffect(() => {
    searchPokemon(Math.floor(Math.random() * 151) + 1)
    setNumOfGuesses(0)
    setXNum(0)
    return () => searchPokemon
  }, [searchPokemon]);

  return (
    <div className={style.list}>
      <img alt='' src={pokeLogo} height={20}/>
      <div className='text-center'>
        <div className='flex'>
          <div className={style.form}>
            <input className={style.input}
              placeholder='Guess the Pokemon'
              value={pokemonGuess}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className={style.dropdown}>
              {pokemons.filter(item => {
                const searchTerm = pokemonGuess.toLowerCase()
                const pokeNames = item.name.toLowerCase()
                return searchTerm && pokeNames.startsWith(searchTerm) && pokeNames !== searchTerm
              })
              .map((item, index) => (
                <div onClick={() => setValue(item.name)} key={index} className=   {style.dropdownrow}>{item.name}</div>
              ))}
            </div>
            
          </div>
          <div>
            <button onClick={handleSubmit} className='p-4' ><FcSearch size={20}/></button>
            <button className='text-center text-xs' onClick={refreshPage}>
            Refresh <GrRefresh/></button>
          </div>
          
          
        </div>
        <p className='font-bold'>Number of Guesses: {numOfGuesses}</p>
        <div className='flex'>
          {numOfGuesses > 0 ? <p className={style.text}># of types: {pokeLength}</p> : null}
          {numOfGuesses > 1 ? <p className={style.text}>Type 1: {pokeType1}</p> : null}
          {numOfGuesses > 2 && pokeType2 !== '' ? <p className={style.text}>Type 2: {pokeType2}</p> : null}
        </div>
        <div>
          {checkGuess ? <p className={style.textC}>Correct!</p> : null}
        </div>
        
        <ul className=''>
          {pokeList.map((pokeobj, index) => (
            <Pokemon key={index} pokeobj={pokeobj} pokeName={pokeName}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
