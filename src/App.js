import logo from './logo.svg';
import './App.css';
import Profile from './profile.js';

function App() {

    return (
      <div className="App">
          <header className="App-header">
              <h1>Pharmacy Order Management</h1>
          </header>
          <main>
              <Profile />
          </main>
      </div>
  );
  
}

export default Profile;
