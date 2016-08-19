exports.model = function(question, session, env){
  console.log('question:', JSON.stringify(question, null, '  '));
  console.log('session:', JSON.stringify(session, null, '  '));
  console.log('env:', JSON.stringify(env, null, '  '));

  var isCorrect =  session.selected === question.model.correctResponse.value;

  var correctness = isCorrect ? 'correct' : 'incorrect';
  var locale = env.locale || question.model.defaultLocale || 'en_US';
  var out = {
    prompt: question.model.labels[locale].prompt, 
    disabled: env.mode !== 'gather',
    correctness: env.mode === 'evaluate' ? correctness : null 
  }

  if(env.mode === 'evaluate' && !isCorrect){
    out.correctResponse = question.model.correctResponse
  }

  out.labels = question.model.labels[locale];
  out.className = env.accessibility ? env.accessibility.colorContrast : null;
  console.debug('returning', JSON.stringify(out, null, '  '));
  return out;
}
