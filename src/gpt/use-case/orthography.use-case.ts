import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Se te proporcionarán textos con posibles errores 
        ortográficos y gramaticales. 
        Las palabras usadas deben de existir en el diccionario de la real academia española,
        Tu tarea es corregirlos y devolver 
        la información corregida en formato JSON. Además, 
        debes proporcionar un porcentaje de acierto por parte del usuario.

        
        si no hay errores, debes de retornar un mend¿saje de felicitaciones.
        
        ejemplo de salida:
        {

          userScore: number,
          errors: string[], // ['error -> solucion']
          message: string,  // Usa emojis y texo para felicitar al usuario

        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  console.log(prompt);
  console.log(completion);

  const jsonRest = JSON.parse(completion.choices[0].message.content);

  return jsonRest;
};
