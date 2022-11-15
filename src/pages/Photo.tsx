import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../helpers/api";
import { Photo as PhotoType } from '../types/Photo';

import './Photo.module.css'

export const Photo = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [photoInfo, setPhotoInfo] = useState<PhotoType>();

    useEffect(()=> {
        if (params.id) {
            loadPhoto(params.id);
        }
    }, []);

    async function loadPhoto(id: string) {
        setLoading(true);
        const photo = await api.getPhoto(id);
        setPhotoInfo(photo);
        setLoading(false);
    };

    function handleBackButton() {
        navigate(-1);
    };

    return (
        <div>
            {loading && "Carregando..."}

            <button onClick={handleBackButton}>Voltar</button>

            {photoInfo && 
                <>
                    <p>{photoInfo.title}</p>
                    <img src={photoInfo.url} alt={photoInfo.title} />
                </>
            }
        </div>
    )
}