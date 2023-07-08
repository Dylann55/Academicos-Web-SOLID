import React from 'react';

const LoginForm = ({ email, password, setUsername, setPassword, handleLogin, submitButtonLabel }) => {
  return (
    <form onSubmit={handleLogin}>
      <div className="form-outline mb-4">
        <input
          id="form3Example3"
          className="form-control luminicente"
          placeholder="Correo"
          type="text"
          value={email}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="form-outline mb-4">
        <input
          id="form3Example4"
          className="form-control luminicente"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        {submitButtonLabel}
      </button>
    </form>
  );
};

export default LoginForm;
