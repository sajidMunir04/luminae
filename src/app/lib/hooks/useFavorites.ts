import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


const cookieName : string = 'favorites';

const useFavorites = (): { favorites: string[]; toggleFavorite: (productId: string) => void } => {
  const [favorites, setFavorites] = useState<string[]>([]);
  let modifiedData : string[] = [];
  useEffect(() => {
    const favoritesFromCookies = Cookies.get(cookieName);
    if (favoritesFromCookies) {
      modifiedData = JSON.parse(favoritesFromCookies);
    }
  }, []);

  const toggleFavorite = (productId: string) => {
    if (modifiedData.includes(productId))
    {
        modifiedData =  modifiedData.filter((product) => product != productId);
        setFavorites(modifiedData);
    }
    else{
      modifiedData.push(productId);
        setFavorites(modifiedData);
    }
  };

  useEffect(() => {
    Cookies.set(cookieName, JSON.stringify(favorites), { expires: 365 });
  }, [favorites]);

  return { favorites, toggleFavorite };
};

export default useFavorites;
