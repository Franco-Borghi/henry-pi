import React from 'react';
import { useSelector } from 'react-redux';
import './Create.scss'

function Create() {

  const genres = useSelector(state => state.genres);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [releaseDate, setReleaseDate] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [genre, setGenre] = React.useState([]);
  const [platforms, setPlatforms] = React.useState([]);

  function filterName(str) {
    return str.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  function filterDescription(str) {
    return str.replace(/[^\w\s.;:à-ÿ,]/gi, '');
  }

  function validateRating(str) {
    // Eliminar cualquier caracter que no sea un número o un punto
    let filteredStr = str.replace(/[^0-9.]/g, '');
    
    // Separar enteros de decimales usando el punto
    let parts = filteredStr.split('.');
    
    // Si hay más de un punto, usar solo el primero y descartar el resto
    if (parts.length > 2) {
      parts = [parts[0], parts[1]];
    }
    
    // Si no hay parte entera, usar 0
    let integerPart = parts[0] || '0';
    
    // Si hay parte decimal, limitarla a 2 dígitos
    let decimalPart = parts[1] || '';
    if (decimalPart.length > 2) {
      decimalPart = decimalPart.slice(0, 2);
    }
    
    // Combinar la parte entera y la parte decimal con un punto

    if (decimalPart) {
      str = integerPart + '.' + decimalPart;
    }
    
    // Convertir la cadena resultante a un número y asegurarse de que esté entre 0 y 5
    let num = Number(str);
    if (isNaN(num)) {
      alert('El valor ingresado no es un número válido entre 0 y 5');
      return '';
    } else if (num < 0 || num > 5) {
      alert('El valor ingresado debe estar entre 0 y 5');
      return '';
    }
    
    return str;
  } 

  const handleGenre = (gen) => {
    if (genre.length && genre.includes(gen)) {
      const newGenre = genre.filter(el => {
        return el != gen;
      })
      setGenre(newGenre)
    } else {
      setGenre([...genre, gen])
    }
  }

  const handlePlatforms = (plat) => {
    if (platforms.length && platforms.includes(plat)) {
      const newPlatform = platforms.filter(el => {
        return el != plat;
      })
      setPlatforms(newPlatform)
    } else {
      setPlatforms([...platforms, plat])
    }
  }

  const handleSubmit = () => {
    if (!name || !description || platforms.length === 0) {
      return alert('The name, description, and platforms fields are obligatory')
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": name,
      "description": description,
      "releaseDate": releaseDate || '',
      "rating": rating || 0,
      "platforms": [...platforms],
      "genre": [...genre] || []
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3001/videogames", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
        
  }

  React.useEffect(() => {
    let formatDate = (str) => {
      // Filter solo los números de la entrada
      let cleaned = ('' + str).replace(/\D/g, '');
  
      if (cleaned.length > 8) {
        cleaned = cleaned.slice(0, 8);
      }
  
      // Verifica si la entrada tiene la longitud correcta
      let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
  
      if (match) {
        return match[1] + '/' + match[2] + '/' + match[3];
      };
  
      return cleaned;
    };
    setReleaseDate(formatDate(releaseDate));
  }, [releaseDate]);

  React.useEffect(() => {
    console.log(genre);
  }, [genre])

  React.useEffect(() => {
    console.log(platforms);
  }, [platforms])

  return (
    <section className='videogame-create-container'>
      {/* Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- [ ] Posibilidad de seleccionar/agregar varios géneros
- [ ] Posibilidad de seleccionar/agregar varias plataformas
- [ ] Botón/Opción para crear un nuevo videojuego */}
      <div className='form'>
      <label>
          Name:
          <input type="text" placeholder='Name...' value={name} onChange={(e) => setName(filterName(e.target.value))} />
        </label>
        <label>
          Description:
          <input type="text" placeholder='Description...' value={description} onChange={(e) => setDescription(filterDescription(e.target.value))} />
        </label>
        <label>
          Release date:
          <input type="text" placeholder='0000/00/00' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
        </label>
        <label>
          Rating:
          <input type="text" value={rating} onChange={(e) => setRating(validateRating(e.target.value))} />
        </label>
        <div className='genres'>
          <p>Genres:</p>
          <div className='genres-items'>
          {
            genres ? genres.map((el, i) => (
              <label>
                <input onChange={() => handleGenre(el.name)} type="checkbox" />
                <span className='text'>{el.name}</span>
                <span className='bg'></span>
              </label>
            ))
            :
            null
          }
          </div>
        </div>
        <div className='genres'>
          <p>Platforms:</p>
          <div className='genres-items'>
            <label>
              <input onChange={() => handlePlatforms('PC')} type="checkbox" />
              <span className='text'>PC</span>
              <span className='bg'></span>
            </label>
            <label>
              <input onChange={() => handlePlatforms('PlayStation')} type="checkbox" />
              <span className='text'>PlayStation</span>
              <span className='bg'></span>
            </label>
            <label>
              <input onChange={() => handlePlatforms('Xbox')} type="checkbox" />
              <span className='text'>Xbox</span>
              <span className='bg'></span>
            </label>
            <label>
              <input onChange={() => handlePlatforms('Linux')} type="checkbox" />
              <span className='text'>Linux</span>
              <span className='bg'></span>
            </label>
            <label>
              <input onChange={() => handlePlatforms('PS Vita')} type="checkbox" />
              <span className='text'>PS Vita</span>
              <span className='bg'></span>
            </label>
            <label>
              <input onChange={() => handlePlatforms('Nintendo Switch')} type="checkbox" />
              <span className='text'>Nintendo Switch</span>
              <span className='bg'></span>
            </label>
            <label>
              <input onChange={() => handlePlatforms('macOS')} type="checkbox" />
              <span className='text'>macOS</span>
              <span className='bg'></span>
            </label>
            <label>
              <input onChange={() => handlePlatforms('Android')} type="checkbox" />
              <span className='text'>Android</span>
              <span className='bg'></span>
            </label>
            <label>
              <input onChange={() => handlePlatforms('iOS')} type="checkbox" />
              <span className='text'>iOS</span>
              <span className='bg'></span>
            </label>
            </div>
        </div>
        <button onClick={() => handleSubmit()} className='create-videogame-button large-text'>Create Videogame</button>
      </div>
    </section>
  )
}

export { Create };