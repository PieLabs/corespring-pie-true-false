exports.state = function(question, session, env){
  console.log('[state] question:', JSON.stringify(question, null, '  '));
  console.log('[state] session:', JSON.stringify(session, null, '  '));
  console.log('[state] env:', JSON.stringify(env, null, '  '));

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

  console.debug('returning', JSON.stringify(out, null, '  '));
  return out;
}
