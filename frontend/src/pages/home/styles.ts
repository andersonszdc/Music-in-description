import styled from "styled-components";

export const HomeWrapper = styled.main`
  .title {
    color: #faf8f8;
    font-size: 22px;
    font-family: 700;
    margin-bottom: 24px;
  }

  .action {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
  }

  .btn-wrapper {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
  }

  .btn-link {
    color: #0f1419;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    transition: 0.1s ease-out;
    text-decoration: none;
  }

  .btn-link:hover {
    opacity: 0.75;
  }

  .btn-spotify {
    background-color: #00ffe0;
  }

  .btn-twitter {
    background-color: #16d3e4;
  }
`;
