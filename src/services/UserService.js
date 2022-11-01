import { supabase } from '../lib/supabase';
import { DEFAULT_RESPONSE_WITH_DATA as defaultResponseWD } from './Response';

export async function getUserData(id) {
    let response = defaultResponseWD;

    let { data: user, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', id)
        .limit(1);

    if (error) {
        response.isError = true;
        response.errorMessage = error.message;
        return response;
    }

    response.data = user;
    return response;
}