import { useState, useRef, useEffect } from 'react';
import { Usuario, ReqResListado } from '../interfaces/reqRes';
import { reqResApi } from '../api/reqRes';

export const useUsuarios = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const paginaRef = useRef(1)

    useEffect(() => {
        //Llamar a API y saco todos los usuarios
        cargarUsuarios();
    }, [])

    const cargarUsuarios = async () => {
        const resp = await reqResApi.get<ReqResListado>('/users', {
            params: {
                page: paginaRef.current
            }
        })

        if(resp.data.data.length > 0){
            setUsuarios(resp.data.data);
            
        }else{
            paginaRef.current--;
            alert('No hay más registros');
        }
            
    }
    const paginaSiguiente = () => {
        paginaRef.current++;
        cargarUsuarios();
    }

    const paginaAnterior = () => {
        if(paginaRef.current > 1){
            paginaRef.current--;
            cargarUsuarios();
        }
    }

    return {
        usuarios, paginaSiguiente, paginaAnterior,
    }
}
