import { useEffect, useState } from "react";
import { supabase } from "./../../lib/supabase";
import { Session } from "@supabase/supabase-js";

export const useProfile = () => {
  const fetchProfile = async (session: Session | null) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  };

  return {
    fetchProfile,
  };
};
