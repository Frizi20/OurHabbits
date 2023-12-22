import axios from '../axios/axios'



export async function login(){
    const res = await axios.post('/auth/login')
        
}

export async function register(){
    const res = await axios.post('/auth/login')
    
}

export async function logout(){
    const res = await axios.delete('/auth/logout')
    
}

export async function getCurrentUser(){
    const res = await axios.get('/showMe')
}