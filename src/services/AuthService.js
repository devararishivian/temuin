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