import { useState } from "react";
import { generateUUID } from "@/utils"
import { createModel } from "@/components/hox";

const useId = () => {
  const [state, set] = useState(generateUUID());
  const reset = () => {
    set(generateUUID());
  }
  return {
    id: state,
    reset,
  }
};

export default createModel(useId);
