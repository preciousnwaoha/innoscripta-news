
import reactLogo from '../assets/react.svg'
import { useGetNewYorkTimesArticlesQuery } from '../store/topics/topicsApiSlice';
import viteLogo from '/vite.svg'
const HomePage = () => {
  const { data, error, isLoading } = useGetNewYorkTimesArticlesQuery({
    topics: ["ELON"],
    from: "2025-02-24",
    sortBy: "popularity",
  });

  console.log(data, error, isLoading);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
       
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default HomePage