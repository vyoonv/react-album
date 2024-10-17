import { atom } from 'recoil'; 
import { CardDTO } from '../../pages/index/types/card';

export const bookmarkState = atom<CardDTO[]> ({
    key: 'bookmarkState', 
    default: [],
});