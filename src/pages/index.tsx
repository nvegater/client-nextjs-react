import React from "react";
import NavBar from "../components/NavBar";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../graphql/urqlProvider";
import {usePostsQuery} from "../generated/graphql";

const Index = () => {
    const [{data:postsResponse, fetching}] = usePostsQuery()
    return <>
        <NavBar/>
        {
            fetching && <h1>Loading</h1>
        }
        {
            !fetching && postsResponse && <>
                {
                    postsResponse.posts.length > 0 && <>
                        {
                            postsResponse.posts.map((post)=>
                                <div key={post.id}>{post.title}</div>
                            )
                        }
                    </>
                }
                {
                    postsResponse.posts.length === 0 && <>
                        <h1>No posts available</h1>
                    </>
                }
            </>
        }
    </>
}

export default withUrqlClient(createUrqlClient, {ssr:true})(Index)
