import styled from "styled-components";

export const Post_section = styled.form`
  figure {
    width: 100px;
    height: 100px;
    border: 1px solid rgb(198, 201, 207);
    background-image: url(${props => props.postImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  h3 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  div {
    width: 100%;
    margin-bottom: 1.5rem;
  }
  div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  select {
    padding: 0.5rem;
    background: none;
    border: 1px solid rgb(198, 201, 207);
  }
  option {
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  input,
  textarea {
    width: 100%;
    background: #ecf0f1;
    border: 1px solid rgb(198, 201, 207);
    border-radius: 1em;
    padding: 0.5rem;
  }
  textarea {
    padding-bottom: 5rem;
  }
  button {
    font-size: 0.8rem;
    padding: 0.7em 1.5em 0.7em 1.5em;
    margin-right: 0.5em;
    font-weight: bold;
    background: #ecf0f1;
    border: 1px solid rgb(198, 201, 207);
    border-radius: 1em;
    z-index: 10;
    box-shadow: none;
  }
  @media (min-width: 650px) {
    figure {
      width: 200px;
      height: 200px;
    }
    div {
      width: 100%;
      display: flex;
    }
    h3 {
      width: 15%;
    }
    input,
    textarea {
      width: 85%;
    }
  }
`;
