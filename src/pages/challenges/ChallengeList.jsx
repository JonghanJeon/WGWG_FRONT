import React from "react";
import styled from 'styled-components';
import NChallengeList from './NChallengeList';
import CoffeeChallengeList from './CoffeeChallengeList'

const ChallengeList = () => {
    return (
      <>
        <Container>
          <NChallengeList/>
          <br />
          <hr/>
          <br />
          <CoffeeChallengeList/>
        </Container>
      </>
    );
}

const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 2rem auto;
`

export default ChallengeList;