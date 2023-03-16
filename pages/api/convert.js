import fetch from "isomorphic-unfetch";

const translateToCSS = async (query, apiKey) => {
  let prompt = `Create html and Tailwind CSS for input. input: ${query}`;

  
  
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      temperature: 0.5,
      max_tokens: 2048,
      n: 1,
      // stop: "/n",
      model: "text-davinci-003",
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      logprobs: 10,
    }),
  });

  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    console.log(response);
    throw new Error(data.error || "Error translating to CSS.");
  }

  return data.choices[0].text.trim();
};


if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not defined in .env file. Please add it there (see README.md for more details)."
    );
  }


export default async function handler(req,res) {

    const { input } = req.body
    console.log(input)
    const output = await translateToCSS(input, process.env.OPENAI_API_KEY);
    res.status(200).json({ output });






}