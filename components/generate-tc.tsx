'use client'

import useGenerateTc from "@/hooks/useGenerateTc";
import { GenerateTc } from "./generate-tc-dialog";
import { useEffect } from "react";

const GenerateTcComponent = () => {
  const {user, tc, showDialog, generateTc, confirmGenerateFile } = useGenerateTc();

  useEffect(() => {
    console.log("showDialogggg", showDialog);
  }
  , [showDialog]);

  return <GenerateTc
    isOpen={showDialog}
    user={user}
    // tc={tc}
    // generateTc={generateTc} 
    />
}

export default GenerateTcComponent;