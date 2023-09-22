import { useEffect } from "react";
import { fetchDataFromApi, fetchDataFromApiUsingKey } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addUrlDetails } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)
  useEffect(() => {
    apiTesting()

  }, [])

  const apiTesting = async () => {
    const res = await fetchDataFromApi('movie/popular')
    dispatch(addUrlDetails(res))
    console.log("Movies", res);
  }

  return (
    <div className="App">
      <h1>Hellloooo</h1>
      <h2>Total pages : {url.total_pages}</h2>
      <h2>Total pages : {url.results[0].title}</h2>
    </div>
  );
}

export default App;
