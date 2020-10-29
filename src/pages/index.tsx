import React from "react";
import NavBar from "../components/NavBar";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../graphql/urqlProvider";

const Index = () => <>
    <NavBar/>
</>


export default withUrqlClient(createUrqlClient, {ssr:false})(Index)
