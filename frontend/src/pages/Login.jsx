
import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) =>
        u.username === formData.username &&
        u.password === formData.password
    );

    if (matchedUser) {
      console.log("Login successful", matchedUser);

      // save logged-in user
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));

      // ✅ REDIRECT TO CHATLAYOUT
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const signupFirst = () =>{
  navigate("/signup");
  }


  return (
    <div className="auth-container">
    <form className="auth-card" onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
       

      />

      <button type="submit">Login</button>
          <div className="auth-footer">
          New here?{" "}
          <span onClick={() => navigate("/signup")}>Create account</span>
        </div>
    </form>
    </div>

  );
}

export default Login;

