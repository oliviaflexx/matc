import logo from "./logo.svg";
import "./App.css";
import { axiosInstance } from "./config";

function App() {
  const getrooms = async () => {
    try {
      // const res = await axiosInstance.post("/api/auth/signup", {email: "oliviaflexx@gmail.com", password: "mm7373922", name: "oliviaflexx"});
      const res = await axiosInstance.post("/api/credentials/", {
        title: "a credential",
        url: "something.com",
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getrooms2 = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/signup", {email: "oliviaflexx@gmail.com", password: "mm7373922", name: "oliviaflexx"});
      // const res = await axiosInstance.post("/api/credentials/", {
      //   title: "a credential",
      //   url: "something.com",
      // });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getrooms()}>Click it</button>
        <button onClick={() => getrooms2()}>Click it 2</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit the code <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
