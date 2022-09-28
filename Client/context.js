import React from "react";

export const PrefContext = React.createContext({
  lang: "en",
  DetailOrReview: false,
  isAdmin: false
});