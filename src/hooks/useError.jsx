import { useEffect, useState } from "react";

export default function useError() {
  const [error, setError] = useState("");

  useEffect(() => {
    if (error.length > 0) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return { error, setError };
}
