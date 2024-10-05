import { selector } from "recoil";
import { pageState } from "../atoms/pageState";
import { searchState } from "../atoms/searchState";

import axios from "axios";

const API_URL = 'https://api.unsplash.com/search/photos'
const API_KEY = '8qpOIpUl1MNvuqQwkI2pCDK8zWQsN-EglgJ9JEv5pPU'
const PER_PAGE = 30

export const imageData = selector({
    key: 'imageData',
    get: async ({get}) => {

        const searchValue = get(searchState)
        const pageValue = get(pageState)

        // api 호출 
        try {
            const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)

            return res.data.results
        } catch (error) {
           console.log(error) 
        }
    }
})