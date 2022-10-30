import { supabase } from '../lib/supabase';
import { DEFAULT_RESPONSE as defaultResponse } from './Response';
import { decode } from 'base64-arraybuffer';

export async function newPost(requestBody, authData) {
    let response = defaultResponse;

    const { data: storageData, error: storageError } = await supabase.storage
        .from('image')
        .upload(`post/post-${Date.now()}.png`, decode(requestBody.image), {
            contentType: 'image/png',
            upsert: true
        });

    console.log('storage error: ', storageError);
    if (storageError) {
        response.isError = true;
        response.errorMessage = storageError.message;
        return response;
    }

    console.log('storage data: ', storageData);

    const { data: postData, error: postError } = await supabase
        .from('post')
        .insert([
            {
                user_id: authData.user.id,
                title: requestBody.title,
                description: requestBody.description,
                is_looking_for: requestBody.isLookingFor,
            },
        ]);

    console.log('post error: ', postError);
    if (postError) {
        response.isError = true;
        response.errorMessage = postError.message;
        return response;
    }

    return response;
}