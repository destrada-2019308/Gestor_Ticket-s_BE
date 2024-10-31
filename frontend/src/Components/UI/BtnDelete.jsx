import React from "react";
import styled from "styled-components";

const BtnDelete = () => {
  return (
    <StyledWrapper>
      <button className="noselect">
        <span className="text">Eliminar</span>
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
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
 box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
 background: #ebebeb;
}

button, button span {
 transition: 200ms;
}

button .text {
 transform: translateX(35px);
 color: #707070;
 font-weight: 600;
}

button .icon {
 position: absolute;
 border-left: 1px solid #707070;
 transform: translateX(110px);
 height: 40px;
 width: 40px;
 display: flex;
 align-items: center;
 justify-content: center;
}

button svg {
 width: 15px;
 fill: #707070;
}

button:hover {
 background: #ebebeb;
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
`;

export default BtnDelete;
