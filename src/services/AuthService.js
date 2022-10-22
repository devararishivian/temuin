import { supabase } from '../lib/supabase';

export async function register(requestBody) {
    let response = {
        isError: false,
        errorMessage: null,
    };
    
    const { isError, errorMessage, createdUserID } = await registerToSupabase(requestBody.email, requestBody.password);
    if (isError) {
        response.isError = true;
        response.errorMessage = errorMessage;

        return response;
    }
}

async function registerToSupabase(email, password) {
    let response = {
        isError: false,
        errorMessage: null,
        createdUserID: null
    };

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;

        return response;
    }

    response.createdUserID = data.user.id;
    return response;
}