import React from "react";

const profile = {
  name: "chunsen.zhao",
  email: "chunsen.zhao@accenture.com"
};
export default profile;
export const NameContext = React.createContext({
  name: profile.name,
  changeName: () => {}
});
export const EmailContext = React.createContext(profile.email);
