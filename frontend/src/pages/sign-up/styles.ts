import styled from "styled-components";

export const SignupWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .notification {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .title {
    font-size: 50px;
    font-weight: 700;
    margin: 24px 0;
  }

  .subtitle {
    font-size: 16px;
    font-weight: 500;
  }

  .dot,
  .to-signin {
    color: #16d3e4;
  }

  .to-signin {
    cursor: pointer;
  }

  .form {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .full-name {
    display: flex;
    gap: 24px;
  }
`;
