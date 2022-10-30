import { supabase } from '../lib/supabase';
import { DEFAULT_RESPONSE as defaultResponse } from './Response';
import { decode } from 'base64-arraybuffer';

export async function newPost(requestBody, authData) {
    let response = defaultResponse;

    const unixCurrentTimestamp = Date.now();

    const { data: storageData, error: storageError } = await supabase.storage
        .from('image')
        .upload(`post/post-${unixCurrentTimestamp}.png`, decode(requestBody.image), {
            contentType: 'image/png',
            upsert: true
        });

    if (storageError) {
        response.isError = true;
        response.errorMessage = storageError.message;
        return response;
    }

    const { data: imagePublicURL } = supabase
        .storage
        .from('image')
        .getPublicUrl(`post/post-${unixCurrentTimestamp}.png`)

    const { data: postData, error: postError } = await supabase
        .from('post')
        .insert([
            {
                user_id: authData.user.id,
                title: requestBody.title,
                description: requestBody.description,
                image: imagePublicURL.publicUrl,
                is_looking_for: requestBody.isLookingFor, //TODO: jika is looking for false maka terjadi error
            },
        ]);

    if (postError) {
        response.isError = true;
        response.errorMessage = postError.message;
        return response;
    }

    return response;
}