//get HTML elements
const inpQuestion = document.getElementById("inp-question");
const btnAsk = document.getElementById("btn-question");
btnAsk.addEventListener("click", getAnswer);
const resDiv = document.getElementById("res-div");
const resQuestion = document.getElementById("res-question");
const resAnswer = document.getElementById("res-answer");

async function getAnswer() {
  const question = inpQuestion.value;
  //Has user entered something?
  if (!question) alert("Enter your question first.");

  //SETUP OPENAI API CONNECTION
  //using Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Request/body

  const requestUrl =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";

  let options = {};
  options.method = "POST";
  //ATTENTION: never publish your API KEY. This is only for learning purposes.
  options.headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR-OPENAI-API-KEY",
  };
  //stringify
  options.body = JSON.stringify({
    prompt: question,
    temperature: 0.1,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const response = await fetch(requestUrl, options);
  const data = await response.json();
  //remove linebrakes for formatting
  const answer = data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "");

  //Show the answer
  resQuestion.innerText = question;
  resAnswer.innerText = answer;
  resDiv.classList.remove("hidden");
}
