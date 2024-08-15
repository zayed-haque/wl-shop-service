import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Make sure to import the CSS file

// Mock function to check if user exists
const checkUserExists = (email, phoneNumber) => {
  // Replace this with actual logic to check user existence
  const existingUsers = [
    { email: 'sandeepan782@gmail.com.com', phoneNumber: '8101596976' },
    // Add more existing users here
  ];
  return existingUsers.some(user => user.email === email || user.phoneNumber === phoneNumber);
};

const LoginPage = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isNewUser) {
      try {
        const response = await fetch('https://0dmrp3hs-5000.inc1.devtunnels.ms/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
          }),
        });

        const data = await response.json();

        if (response.status === 409) {
          alert('A user with this email or phone number already exists.');
          return;
        }

        if (response.ok) {
          // Store the access token in local storage
          localStorage.setItem('accessToken', data.accessToken);
          console.log('New User Login:', firstName, lastName, email, phoneNumber);
          navigate('/home');
        } else {
          alert('Failed to register user.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering the user.');
      }
    } else {
      // Handle existing user login
      console.log('Existing User Login:', email);
      navigate('/home');
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <h2>Login</h2>
        
        <div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    id="newUser"
    checked={isNewUser}
    onChange={() => setIsNewUser(!isNewUser)}
  />
  <label className="form-check-label" htmlFor="newUser">
    Are you a new user?
  </label>
</div>
        {isNewUser && (
          <>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;