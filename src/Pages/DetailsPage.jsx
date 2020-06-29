import React from 'react';
import PropTypes from 'prop-types';

const DetailsPage = (props) => {
  const { location: { state } } = props;
  if (state) {
    console.log('tem estado');
    return (
      <div>
        <h1>Página de detalhes</h1>
        {console.log('history:', state)}
      </div>
    );
  }
  if (!state) {
    console.log('não tem estado, fazer requisiçao');
  }
  return <h1>Loading...</h1>;
};

DetailsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
};

export default DetailsPage;
