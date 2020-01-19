import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {

    // const [devs, setDevs]   = useState([]);
    const [techs, setTechs] = useState('');
    const [github_username, setGithub_username] = useState('');
  
    const [latitude, setLatitude ]   = useState('');
    const [longitude, setLongitude ] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            
          }, 
          (error) => {
            console.log(error);
            
          },
          {
            timeout: 30000,
          }
        );
    
      }, []);

    
      async function handleSubmit(evt) {
          evt.preventDefault();
          await onSubmit( {
              github_username,
              techs,
              latitude,
              longitude
            });

            setGithub_username('');
            setTechs('');
      }

    return (
        <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="Usuário do Github">Github (username)</label>
          <input name="github_username"
          onChange={(e) => setGithub_username(e.target.value)} id="github_username" required/>
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias </label>
          <input 
            name="techs"
            onChange={(e) => setTechs(e.target.value)} 
            id="techs" 
            required />
        </div>


        <div className="input-group"> 
          <div className="input-block">
              <label htmlFor="Latitude">Latitude</label>
              <input
                type="number" 
                name="latitude" 
                id="latitude"  
                value={latitude} 
                onChange={ (e) => setLatitude(e.target.value)}
                required/>

          </div>

          <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude"
                value={longitude} 
                onChange={ (e )=> setLongitude(e.target.value)}
                required/>
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
}


export default DevForm;