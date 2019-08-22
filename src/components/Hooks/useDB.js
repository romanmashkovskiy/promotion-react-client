import { useState, useEffect } from 'react';

const useDB = (dbParam) => {
    const [db, setDb] = useState(null);

    useEffect(() => {
        setDb(dbParam)
    }, [dbParam]);

    return db;
};

export default useDB;