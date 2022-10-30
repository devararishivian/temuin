import { supabase } from '../lib/supabase';
import useAuthStore from '../store/AuthStore'

async function insertPostData(requestBody) {
    const authData = useAuthStore(state => state.authData);

    let response = {
        isError: false,
        errorMessage: null
    };

    const { data, error } = await supabase
        .from('post')
        .insert([
            {
                user_id: authData.user.id,
                title: requestBody.title,
                description: requestBody.description,
                is_looking_for: requestBody.is_looking_for,
            },
        ]);

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;
        return response;
    }

    return response;
}