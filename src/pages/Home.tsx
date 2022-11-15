import { useState, useEffect } from 'react';
import { AlbumItem } from '../components/AlbumItem';
import { api } from '../helpers/api';
import { Album } from '../types/Album';

export const Home = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Album[]>([]);

    useEffect(() => {
        loadAlbums();
    }, []);

    async function loadAlbums() {
        setLoading(true);
        const albums = await api.getAlbums();
        setList(albums);
        setLoading(false);

        console.log(albums)
    }

    return (
        <div>
            <>
            <h4>Albums list:</h4> <br />
            {loading && "Carregando"}

            {list.map((item, index) => (
                <AlbumItem 
                    key={index} 
                    id={item.id} 
                    title={item.title} 
                />
            ))}
            </>
        </div>
    );
};