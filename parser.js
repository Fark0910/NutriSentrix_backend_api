const parsing=async(aiResp)=>{
    const aiText = aiResp?.text ?? "";
    let parsedResponse;
    try {
      let cleaned = aiText.replace(/```(?:json)?/gi, "").trim();
      try {
        parsedResponse = JSON.parse(cleaned);
      } catch {
        const objMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);//regex
        if (objMatch) {
          parsedResponse = JSON.parse(objMatch[0]);
        } else {
          throw new Error("No valid JSON block found");
        }
      }
      return parsedResponse;
    }catch (parseErr) {
      console.error("JSON parse failed:", parseErr);

    }

}
module.exports=parsing;
