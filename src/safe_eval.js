/* eslint no-eval: "off", no-console: "off" */
import path from 'path'

export const evalExpression = (evalString, filePath) => {
  try {
    if (filePath !== undefined) filePath = filePath.replace(/\\/g,'/');
    const code = `require('${filePath}').${evalString}`
    const result = eval(code)
    return { result }
  } catch (error) {
    return { error }
  }
}

export const evalValue = evalString => {
  const wrappedEvalString = `(${evalString})`
  try {
    return { result: eval(wrappedEvalString) }
  } catch (error) {
    return { error }
  }
}

export default ({ resultString, stringToEval }, filePath, instance) => {
  const fullFilePath = path.join(process.cwd(), filePath)
  if (!instance) {
    const actual = evalExpression(resultString, fullFilePath)
    const expected = evalValue(stringToEval)
    return { actual, expected }
  } else {
    const result = eval(`instance.${resultString};`)
    const actual = { result }
    const expected = evalValue(stringToEval)
    return { actual, expected }
  }
}
