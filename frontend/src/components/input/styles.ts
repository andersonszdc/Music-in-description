import styled from "styled-components";

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  grid-template:
    "label icon" auto
    "input icon" auto
    / 1fr auto;
  padding: 12px 20px;
  gap: 4px;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0);
  transition: 0.5s ease-out;

  :focus-within {
    border: 1px solid #16d3e4;
  }

  :focus-within .label {
    color: #16d3e4;
  }

  .label {
    transition: 0.5s ease-out;
    color: #9b9b9b;
    grid-area: label;
    font-weight: 500;
    font-size: 12px;
  }

  .input {
    background-color: transparent;
    color: #ffffff;
    border: none;
    grid-area: input;
    font-weight: 400;
    font-size: 20px;
    ::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }
    :focus {
      outline: none;
    }
  }

  .icon {
    grid-area: icon;
  }
`;
