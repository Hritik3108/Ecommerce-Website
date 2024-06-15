import { useLocation, useNavigate } from 'react-router-dom';
import SearchPagination from '../pagination/searchPagination';
import { useEffect, useState } from 'react';

const Search = () => {
    const location = useLocation();
    const [search, setSearch] = useState(new URLSearchParams(location.search).get('search'));

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearch(params.get('search'));
    }, [location.search]);
    return (
        
        <div className="container-fluid search">
        <div className="row search-row align-items-center justify-content-center">
            <SearchPagination filter={search} productsperpage={12}/>    
        </div>
    </div>        
        
    )
}

export default Search;