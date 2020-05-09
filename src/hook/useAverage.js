import { useEffect } from "react";
import demoData from "../demoData";

export default function useAverage(subject) {
  useEffect(() => {
    demoData._addSubject(subject);
    return () => {
      demoData._removeSubject(subject);
    };
  }, [subject.code]);

  return (score) => {
    demoData._editScore({ ...subject, ...{ score } });
  };
}
