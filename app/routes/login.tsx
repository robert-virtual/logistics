import { Button, Input, styled, Typography, useTheme } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "~/config/firebase/config";

const Div = styled('div')(({theme})=>({
    border:`1px solid ${theme.palette.divider}`,
    display:'flex',
    flexDirection:'column',
    padding:theme.spacing(5),
    borderRadius:theme.spacing(1),
    gap:theme.spacing(5),
    // RESPONSIVE WIDTH
    width: '90%',              // mobile
    maxWidth: 350,             // mobile/tablet

    [theme.breakpoints.up('md')]: {
        maxWidth: 450,           // desktop
    },

    [theme.breakpoints.up('lg')]: {
        maxWidth: 550,           // pantallas grandes
    },
}))

export default function Login() {
    const navigate = useNavigate()
    const theme = useTheme()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    async function SingIn() {
        const {user} = await signInWithEmailAndPassword(auth,username,password)
        if (user) {
            console.log({user})
            //navigate('home') 
            return
        }
       setError("Usuario o contraseña incorrecta") 
    }
   return <>
    <div className="grid place-items-center h-screen">
        <Div>
            <img className="rounded-md self-center" src="icons/icon-512.png" width={200} />
            <Typography sx={{textAlign:'center',fontSize:theme.typography.h4.fontSize}}>Login</Typography>
            {
                error && <Typography sx={{color:theme.palette.error.light}}>{error}</Typography>
            }
            <Input onChange={({target})=>setUsername(target.value)} value={username} placeholder="Usuario"/>
            <Input onChange={({target})=>setPassword(target.value)} value={password} placeholder="Contraseña"/>
            <Button variant="contained" onClick={SingIn}>Iniciar sesión</Button>
        </Div>
    </div>
   </> 
}