import React from 'react';

const gamesList = (games, handleClick) => {
  return games.map(game =>
    <li className="game-list-item"
        key={game.name}
        onClick={handleClick}
        id={game.name}>
      <img src={game.box.small}  />
      <div>{game.name}</div>
    </li>
  );
};

const Sidebar = (props) => {
  const { searchGames, handleChange, handleClick, searchTerm, games} = props;
  return (
    <div className="sidebar">
      <div className="logo">
        Twitch Roulette
      </div>
      <div className="search-box">
        <div className="magnifying-glass">
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <form onSubmit={searchGames}>
          <input type="text"
                 placeholder="Search games"
                 onChange={handleChange}
                 className="search-input"
                 value={searchTerm}></input>
        </form>
      </div>
      <div className="games-list">
        <li className="game-list-item"
            key='all'
            onClick={handleClick}
            id='all'>
          <div id="all-games">
            <i className="fa fa-twitch" aria-hidden="true"></i>
          </div>
          <div>All Games</div>
        </li>
        {gamesList(games)}
      </div>
    </div>
  );
};

export default Sidebar;
