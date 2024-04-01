import { useState } from "react"

const useLoading = () => {
    const [ loading, setLoading ] = useState<boolean>(false);

    const openLoading = () => setLoading(true);
    const closeLoading = () => setLoading(false);

    return { loading, openLoading, closeLoading }
}

export default useLoading