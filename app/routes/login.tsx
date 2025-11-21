import { Button, Input, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const Div = styled('div')(({theme})=>({
    border:`1px solid ${theme.palette.divider}`,
    display:'flex',
    flexDirection:'column',
    padding:theme.spacing(5),
    borderRadius:theme.spacing(1),
    gap:theme.spacing(5)
}))

export default function Login() {
    const navigate = useNavigate()
    function SingIn() {
        navigate('home') 
    }
   return <>
    <div className="grid place-items-center h-screen">
        <Div>
            <Typography>Login</Typography>
            <Input placeholder="Usuario"/>
            <Input placeholder="Contraseña"/>
            <Button variant="contained" onClick={SingIn}>Iniciar sesión</Button>
        </Div>
    </div>
   </> 
}