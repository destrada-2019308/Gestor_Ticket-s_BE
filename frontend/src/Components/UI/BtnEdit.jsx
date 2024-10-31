import React from "react";
import styled from "styled-components";

const BtnEdit = ({onClick}) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} type="reset" className="noselect">
        <span className="text">Editar</span>
        <span className="icon">
          <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="#263061" height="24" width="24" viewBox="0 0 24 24">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
  width: 150px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center; 
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  background: #87d1f5;
}

button,
button span {
  transition: 200ms;
}

button .text {
  transform: translateX(35px);
  color: #263061;
  font-weight: 600;
}

button .icon {
  position: absolute;
  border-left: 1px solid #007300;
  transform: translateX(110px);
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button svg {
  width: 15px;
  fill: #87d1f5;
}

button:hover {
  background: #87d1f5;
}

button:active {
  background: #87d1f5;
}

button:hover .text {
  color: transparent;
}

button:hover .icon {
  width: 150px;
  border-left: none;
  transform: translateX(0);
}

button:focus {
  outline: none;
}

button:active .icon svg {
  transform: scale(0.8);
}

.buttonSpan {
  color: #007300;
  margin: 150px;
  font-size: 30px;
}

`;

export default BtnEdit;
