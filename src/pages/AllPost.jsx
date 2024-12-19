import { useState, useEffect } from "react"
import service from "../appwrite/config"
import { Container, Postcard } from "../components"

function AllPost() {

    const [post, setPost] = useState([])
    useEffect(() => { }, [])
    service.getPosts([]).then((posts) => {
        if (posts) {
            setPost(posts.documents)
        }
    })

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {post.map((post) => (
                        <div key={post.$id} className="w-1/4 p-2">
                            <Postcard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost