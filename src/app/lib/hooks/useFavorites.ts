import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useFavorites = (): { favorites: string[]; toggleFavorite: (productId: string) => void } => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const favoritesFromCookies = Cookies.get('favorites');
    if (favoritesFromCookies) {
      setFavorites(JSON.parse(favoritesFromCookies));
    }
  }, []);

  const toggleFavorite = (productId: string) => {
    setFavorites((prevFavorites) => {
      const index = prevFavorites.indexOf(productId);
      if (index !== -1) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });

    console.log(favorites);
  };

  useEffect(() => {
    Cookies.set('favorites', JSON.stringify(favorites), { expires: 365 });
  }, [favorites]);

  return { favorites, toggleFavorite };
};

export default useFavorites;
