import { useNavigate } from "react-router"

const PageHome = () =>{

    const navigate = useNavigate();

    return (<><h1>Home</h1><button onClick={()=>{
        navigate("/login")
    }}>Login</button></>)
}

export default PageHome