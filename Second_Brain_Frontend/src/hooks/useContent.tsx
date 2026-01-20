import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/content`, {
            withCredentials: true
        }).then((response) => {
            setContents(response.data.content);
        });
    }, []); // ✅ run once

    return contents; // ✅ RETURN DATA
}
