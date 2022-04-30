import styled from "styled-components";

export const SigninWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 24px;
  }
  .subtitle {
    font-size: 16px;
    font-weight: 500;
  }
  .dot,
  .to-signup {
    color: #16d3e4;
  }
  .to-signup {
    cursor: pointer;
  }
  .form {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .btn-login {
    margin-top: 24px;
  }
`;
