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

    const userDataToInsert = {
        id: createdUserID,
        username: requestBody.username,
        name: requestBody.name
    };

    const { isError: insertUserDataErr, errorMessage: insertUserDataErrMsg } = await insertUserData(userDataToInsert);
    if (insertUserDataErr) {
        response.isError = true;
        response.errorMessage = insertUserDataErrMsg;

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

async function insertUserData(requestBody) {
    let response = {
        isError: false,
        errorMessage: null
    };

    const { data, error } = await supabase
        .from('user')
        .insert([
            {
                id: requestBody.id,
                username: requestBody.username,
                name: requestBody.name
            },
        ]);

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;

        return response;
    }

    return response;
}