import './Header.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';


const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      setUserData(response.data.results);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const renderUserData = () => {
    if (loading && !userData.length) {
      return <h3>Carregando</h3>;
    }
    return (
      <div>
      <h3>STATS ON POKEMONS</h3>
      <div className='formt'>
      {userData.map(pokemon => (
        <div  key={pokemon.name}>
          <div className="card">
            <h4>Name: {pokemon.name}</h4>
            <h4>{pokemon.url}</h4>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

  return (
    <div className='container'>
      {renderUserData()}
    </div>
  );
};

export default UserList;
