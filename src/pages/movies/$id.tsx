import { useParams } from "react-router-dom"

const Movie = () => {

    const { id } = useParams()

    return (
        <>
            <div>ID: {id}</div>
        </>
    )
}

export default Movie
