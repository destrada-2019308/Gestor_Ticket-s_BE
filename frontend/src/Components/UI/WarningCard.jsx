import React from "react";
import styled from "styled-components";

const WarningCard = ({ onAcepted, onCanceled, onClosed}) => {
  return (
    <StyledWrapper>
      <div className="card">
         
        <div className="content">
          <span className="title">¿Estás seguro de querer eliminar a este dato?</span>
          <div className="desc">
            Este dato será eliminado permanentemente de la base de datos.
          </div>
          <div className="actions">
            <div>
              <a href="#" className="download" onClick={onAcepted}>
                Aceptar
              </a>
            </div>
            <div>
              <a href="#" className="notnow" onClick={onCanceled}>
                Cancelar
              </a>
            </div>
          </div>
        </div>
        <button type="button" className="close" onClick={onClosed} >
          <svg
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  z-index: 1000;

  .card {
  position: absolute;
  max-width: 320px;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
  background: #606c88;
  background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
  background: linear-gradient(to right top, #3f4c6b, #606c88);
  padding: 1rem;
  color: rgb(107, 114, 128);
  box-shadow: 0px 87px 78px -39px rgba(0,0,0,0.4);
}

.icon {
  height: 2rem;
  width: 2rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #153586;
  color: rgb(59, 130, 246);
}

.icon svg {
  height: 1.25rem;
  width: 1.25rem;
}

.content {
  margin-left: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
}

.title {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: rgb(255, 255, 255);
}

.desc {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: rgb(202, 200, 200);
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 0.5rem;
  gap: 0.5rem;
}

.download, .notnow {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.375rem 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(255, 255, 255);
  outline: 2px solid transparent;
  border: 1px solid rgba(253, 253, 253, 0.363);
}

.download {
  background-color: #284385;
  font-weight: 600;
}

.download:hover {
  background-color: #153586;
}

.notnow {
  background-color: #606c88;
  font-weight: 500;
}

.notnow:hover {
  background-color: #3f4c6b;
}

.close {
  margin: -0.375rem -0.375rem -0.375rem auto;
  height: 2rem;
  width: 2rem;
  display: inline-flex;
  border-radius: 0.5rem;
  background-color: #606c88;
  padding: 0.375rem;
  color: rgba(255, 255, 255, 1);
  border: none;
}

.close svg {
  height: 1.25rem;
  width: 1.25rem;
}

.close:hover {
  background-color: rgb(58, 69, 83);
}
`;

export default WarningCard;
