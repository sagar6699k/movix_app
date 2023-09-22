import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../utils/api"

const useFetch = (url) => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading("Loading..")
        setError(null)
        setData(null)

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false)
                setData(res)
            })
            .catch((err) => {
                setLoading(false)
                setError("Something went wrong!" + err)
            })

    }, [url])


    return { data, loading, error }
}

export default useFetch