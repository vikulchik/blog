import React from "react";

function App(): JSX.Element {
  useEffect(() => {
    const
    axios.post('http://localhost:5000/api/users', {
      her: 'her',

    });

  })
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello
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
