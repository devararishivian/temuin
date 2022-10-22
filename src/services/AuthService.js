import { supabase } from '../lib/supabase';

export async function register(requestBody) {
    let response = {
        isError: false,
        errorMessage: null,
    };

    const { data, error } = await supabase.auth.signUp({
        email: requestBody.email,
        password: requestBody.password
    })

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;

        return response;
    }

    return response;
}

export async function logout() {
    let response = {
        isError: false,
        errorMessage: null,
    };

    const { error } = await supabase.auth.signOut();

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;

        return response;
    }

    console.log('signout');

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