import styled from 'styled-components'

export const HomeBGContainer = styled.div`
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(24, 24, 24, 0.546875) 38.26%,
      #181818 92.82%,
      #181818 98.68%,
      #181818 108.61%
    ),
    url(${props => props.bgSmallIMG});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 605px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(24, 24, 24, 0.546875) 38.26%,
        #181818 92.82%,
        #181818 98.68%,
        #181818 108.61%
      ),
      url(${props => props.bgBigIMG});
  }
`
