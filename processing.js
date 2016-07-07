exports.state = function(env, question, session){
  return {
    prompt: question.model.prompt, 
    disabled: true 
  }
}
