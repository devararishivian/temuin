import { supabase } from "../lib/supabase";
import {
  DEFAULT_RESPONSE as defaultResponse,
  DEFAULT_RESPONSE_WITH_DATA as defaultResponseWD,
} from "./Response";
import { decode } from "base64-arraybuffer";

export async function newPost(requestBody, authData) {
  let response = defaultResponse;

  const unixCurrentTimestamp = Date.now();

  const { data: storageData, error: storageError } = await supabase.storage
    .from("image")
    .upload(
      `post/post-${unixCurrentTimestamp}.png`,
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
    .getPublicUrl(`post/post-${unixCurrentTimestamp}.png`);

  const { data: postData, error: postError } = await supabase
    .from("post")
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

export async function getUserPost(userID) {
  let response = defaultResponseWD;

  let { data: posts, error } = await supabase
    .from("post")
    .select("*")
    .eq("user_id", userID);

  if (error) {
    response.isError = true;
    response.errorMessage = error.message;
    return response;
  }

  response.data = posts;
  return response;
}
export async function getAllPost() {
  let response = defaultResponseWD;

  let { data: posts, error } = await supabase
    .from("post")
    .select("*,user(name)");

  if (error) {
    response.isError = true;
    response.errorMessage = error.message;
    return response;
  }

  response.data = posts;
  return response;
}
