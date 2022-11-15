import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PhotoItem } from "../components/PhotoItem";
import { api } from "../helpers/api";
import { Album as AlbumType } from '../types/Album';
import { Photo } from "../types/Photo";

import './Album.module.css'

export const Album = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Photo[]>([])
    const [albumInfo, setAlbumInfo] = useState<AlbumType>({ id: 0, userId: 0, title: '' })

    useEffect(() => {
        if (params.id) {
            loadPhotos(params.id);
            loadAlbumInfo(params.id)
        }
    }, [])

    async function loadPhotos(id: string) {
        setLoading(true);
        const photos = await api.getPhotosFromAlbum(id);
        setList(photos);
        setLoading(false);
    }

    async function loadAlbumInfo(id: string) {
        const albumInfo = await api.getAlbum(id);
        setAlbumInfo(albumInfo);
    }

    function handleBackButton() {
        navigate(-1);
    }

    return (
        <div>
            <button onClick={handleBackButton}>Voltar</button> <br /><br />

            {loading && "Carregando..."}

            <h1>{albumInfo.title}</h1>

            {list.map((item, index) => (
                <PhotoItem
                    key={index}
                    data={item}
                />
            ))}
        </div>
    );
};