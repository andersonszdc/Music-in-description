import styled from "styled-components";

export const LoginWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  .banner {
    display: flex;
    height: 100vh;
  }

  .logo {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .logo-img {
    display: flex;
    background-color: #16d3e4;
    border-radius: 50%;
    width: 48px;
    aspect-ratio: 1;
  }

  .logo-name {
    font-weight: 700;
    font-size: 16px;
  }

  .action {
    padding: 80px;
  }

  .banner-img {
    width: 100%;
    object-fit: cover;
  }
`;
