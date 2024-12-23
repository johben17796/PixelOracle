//imports & interface


import React, { useEffect, useState } from 'react';
import { fetchGames } from '../api/gamesApi';

interface Game {
    id: number;
  name: string;
  background_image: string;
  released: string;
}

//return code
const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
      const loadGames = async () => {
          try {
              const data = await fetchGames();
              setGames(data.results);
            } catch (err) {
        setError('Failed to fetch games.');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>RAWG Video Games</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {games.map((game) => (
          <div key={game.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <img
              src={game.background_image}
              alt={game.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3>{game.name}</h3>
            <p>Release Date: {game.released}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;