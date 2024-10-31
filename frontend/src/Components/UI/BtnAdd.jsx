import React from "react";
import styled from "styled-components";

const BtnAdd = ({onClick, name}) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} className="noselect">
        <span className="text">{name}</span>
        <span className="icon">
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          />
          <span className="buttonSpan">+</span>
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
  background: #3873ba;
}

button,
button span {
  transition: 200ms;
}

button .text {
  transform: translateX(35px);
  color: #fff;
  font-weight: 600;
}

button .icon {
  position: absolute;
  border-left: 1px solid #ebebeb;
  transform: translateX(110px);
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button svg {
  width: 15px;
  fill: #eee;
}

button:hover {
  background: #3873ba;
}

button:active {
  background: rgba(56, 115, 186, 0.8);
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
  color: white;
  margin: 150px;
  font-size: 30px;
}

`;

export default BtnAdd;
