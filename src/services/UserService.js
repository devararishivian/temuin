import { supabase } from '../lib/supabase';
import {
    DEFAULT_RESPONSE_WITH_DATA as defaultResponseWD,
    DEFAULT_RESPONSE as defaultResponse
} from './Response';

export async function getUserData(userID) {
    let response = defaultResponseWD;

    let { data: user, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', userID)
        .limit(1);

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;
        return response;
    }

    response.data = user;
    return response;
}

export async function updateUserData(requestBody) {
    let response = defaultResponseWD;

    const { data: storageData, error: storageError } = await supabase.storage
        .from("image")
        .upload(
            `avatar/${requestBody.userID}.png`,
            decode(requestBody.image),
            {
                contentType: "image/png",
                upsert: true,
            }
        );

    if (storageError) {
        response.isError = true;
        response.errorMessage = storageError.message;
        return response;
    }

    const { data: imagePublicURL } = supabase.storage
        .from("image")
        .getPublicUrl(`avatar/${requestBody.userID}.png`);

    const { data, error } = await supabase
        .from('user')
        .update({
            name: requestBody.name,
            profil_pict: imagePublicURL.publicUrl,
        })
        .eq('id', requestBody.userID)

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;
        return response;
    }

    response.data = user;
    return response;
}