import React from 'react'

const style = {
    listC: `flex items-center p-2 bg-green-100 my-2 rounded-md border-green-600`,
    listI: `flex items-center p-2 bg-red-100 my-2 rounded-md border-red-600`,
    para: `p-4 capitalize`
}

const Pokemon = ({pokeobj, pokeName}) => {
    const {name: pokename, sprites: pokesprite} = pokeobj
    return (
      <li>
          <div className={pokeName === pokename ? style.listC : style.listI}>
              <p className={style.para}>{pokename}</p>
              <img alt='' src={pokesprite.front_default}/>
          </div>
          
      </li>
    )
  }

export default Pokemon