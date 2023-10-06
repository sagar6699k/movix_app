import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import "./searchResult.scss"
import { fetchDataFromApi } from "../../utils/api"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import noResults from "../../assets/no-results.png"
import Spinner from "../../components/spinner/Spinner"
import MovieCard from "../../components/movieCard/MovieCard"


const SearchResult = () => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res)
        setPageNum((prev) => prev + 1)
        setLoading(false)
      }).catch((err) => {
        console.log("Error" + err);
      });
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...data?.results, ...res?.results]
          })
        } else {
          setData(res)
        }
  const fetchNextPageData = () => {
    fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...data?.results, ...res?.resuts]
          })
        } else {
          setData(res)
        }

        console.log("pageNum...", pageNum);
        setPageNum((prev) => prev + 1)
      }).catch((err) => {
        console.log("Error" + err);
      });
  }
        console.log("pageNum...", pageNum);
        setPageNum((prev) => prev + 1)
      }).catch((err) => {
        console.log("Error" + err);
      });
  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])


  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.results?.length > 1 ? "results" : "result"} of '${query}'`}
              </div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {
                  data?.results?.map((ele, index) => {
                    if (ele.media_type === "person") return;
                    return (
                      <MovieCard
                        key={index}
                        data={ele}
                        fromSearch={true}
                      />
                    )
                  })
                }
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">
              Sorry, Reuslts not found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult