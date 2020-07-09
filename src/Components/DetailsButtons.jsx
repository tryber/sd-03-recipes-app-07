import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const shareRecipe = (urlPath, callback) => {
  callback(true);
  if (urlPath.includes('in-progress')) {
    navigator.clipboard.writeText(urlPath.replace('/in-progress', ''));
  } else {
    navigator.clipboard.writeText(urlPath);
  }
  setTimeout(() => callback(false), 2000);
};

const renderButtons = (path, favorites, setFavorite, callback, state, {
  id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
}) => {
  const isFavorite = favorites.find((elem) => elem.id === id);
  const urlPath = `http://localhost:3000${path}`;
  return (
    <div className="buttons-container">
      <button
        data-testid="share-btn"
        onClick={() => shareRecipe(urlPath, callback)}
        src={shareIcon}
        type="button"
      >
        <img src={shareIcon} alt="Share" />
      </button>
      {state && <span>Link copiado!</span>}
      <button
        data-testid="favorite-btn"
        src={isFavorite ? blackHeartIcon : whiteHeartIcon}
        onClick={() => setFavorite(
          id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
        )}
        type="button"
      >
        {isFavorite
          ? <img src={blackHeartIcon} alt="is favorite" />
          : <img src={whiteHeartIcon} alt="not favorite" />}
      </button>
    </div>
  );
};

export default renderButtons;
