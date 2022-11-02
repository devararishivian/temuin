import { supabase } from "../lib/supabase";
import {
  DEFAULT_RESPONSE as defaultResponse,
  DEFAULT_RESPONSE_WITH_DATA as defaultResponseWD,
} from "./Response";

export async function insertComment(requestBody) {
  let response = {
    isError: false,
    errorMessage: null,
  };

  const { data, error } = await supabase.from("comment").insert([
    {
      user_id: requestBody.userId,
      post_id: requestBody.postId,
      comment: requestBody.comment,
    },
  ]);

  if (error) {
    response.isError = true;
    response.errorMessage = error.message;

    return response;
  }

  return response;
}

export async function getAllCommentByPostId(postId) {
  let response = defaultResponseWD;

  let { data: posts, error } = await supabase
    .from("comment")
    .select("*,user(name)")
    .eq("post_id", postId);

  if (error) {
    response.isError = true;
    response.errorMessage = error.message;
    return response;
  }

  response.data = posts;
  return response;
}
