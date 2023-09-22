import { useEffect, useState } from "react"
import "./heroBanner.scss"
import { useNavigate } from "react-router-dom"
import useFetch from "../../../hooks/useFetch"
import { useSelector } from "react-redux"
import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"


const HeroBanner = () => {
    const { url } = useSelector((state) => state.home)
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { data, loading } = useFetch('movie/upcoming');


    // Effects
    useEffect(() => {
        const bg = url?.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackground(bg)
    }, [data])



    // Methods 
    const handleSearchQuery = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className="heroBanner">
            {!loading &&
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            }

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">Millians of movies, TV shows and people to discover. Explore now</span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="searc for a movie or TV show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={handleSearchQuery}
                        />
                        <button>search</button>

                    </div>
                </div>
            </ContentWrapper>

        </div>
    )
}

export default HeroBanner