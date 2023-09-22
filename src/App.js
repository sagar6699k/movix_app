import { useEffect } from "react";
import { fetchDataFromApi, fetchDataFromApiUsingKey } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SearchResult from "./pages/searchResult/SearchResult";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";


function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)
  useEffect(() => {
    fetchApiConfig()
  }, [])


  const fetchApiConfig = async () => {
    const res = await fetchDataFromApi('configuration')

    const url = {
      backdrop : res.images.secure_base_url + 'original',
      poster : res.images.secure_base_url + 'original',
      profile : res.images.secure_base_url + 'original',
    }

    dispatch(getApiConfiguration(url))
    // console.log("Movies", res);
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<SearchResult />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
