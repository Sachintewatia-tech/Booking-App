// import {createContext, useReducer} from 'react';
// const INITIAL_STATE = {
//     city : undefined,
//     dates : [],
//     options : {
//         adult: undefined,
//         children: undefined,
//         rooms: undefined
//     }
// };

// export const SearchContext = createContext(INITIAL_STATE);

// const SearchReducer = (state,{type,payload})=>{
//     switch(type){
//         case 'NEW_SEARCH':
//             return payload;
//         case 'RESET_SEARCH':
//             return INITIAL_STATE;
//         default:
//             return state;
//     }
// }


// export const SearchContextProvider = ({children})=>{
//     const [state,dispatch] = useReducer(SearchContext,INITIAL_STATE);
//     return(
//         <SearchContext.Provider value={{city:state.city,dates:state.dates,options:state.options,dispatch}}>
//             {children}
//         </SearchContext.Provider>
//     )
// }



import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        rooms: undefined,
    },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, { type, payload }) => {
    switch (type) {
        case 'NEW_SEARCH':
            return payload;
        case 'RESET_SEARCH':
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    // Correct usage of useReducer
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider value={{ city: state.city, dates: state.dates, options: state.options, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
};
