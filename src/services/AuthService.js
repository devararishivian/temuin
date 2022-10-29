import { supabase } from '../lib/supabase';
import { DEFAULT_RESPONSE as defaultResponse } from './Response';

export async function register(requestBody) {
    let response = defaultResponse;

    const { data, error } = await supabase.auth.signUp({
        email: requestBody.email,
        password: requestBody.password,
        options: {
            data: {
                username: requestBody.username,
                name: requestBody.name,
            }
        }
    })

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;

        return response;
    }

    return response;
}

export async function login(requestBody) {
    let response = defaultResponse;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: requestBody.email,
        password: requestBody.password,
    })

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;

        return response;
    }

    return response;
}

export async function logout() {
    let response = defaultResponse;

    const { error } = await supabase.auth.signOut();

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;

        return response;
    }

    return response;
}

// async function insertUserData(requestBody) {
//     let response = {
//         isError: false,
//         errorMessage: null
//     };

//     const { data, error } = await supabase
//         .from('user')
//         .insert([
//             {
//                 id: requestBody.id,
//                 username: requestBody.username,
//                 name: requestBody.name
//             },
//         ]);

//     if (error) {
//         response.isError = true;
//         response.errorMessage = error.message;

//         return response;
//     }

//     return response;
// }