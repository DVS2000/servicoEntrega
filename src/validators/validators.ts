/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

/**
 * Função para validar se o **Email** está correcto
 * *Se estiver correcto vai retornar **TRUE** senão
 * vai retornar **FALSE***
 * @param email string
 */
export function validateEmail (email: string): boolean {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return regex.test(email)
}

/**
 * Função para validar a quantidade de texto digitado
 * *Se o **Usuário** digitar um texto que o seu tamanho
 * seja maior que do **Length** vai retornar **FALSE** senão
 * vai retornar **TRUE***
 * @param text string
 * @param length number
 */
export function validateLengthText (text: string, length: number): boolean {
  if (text.length !== length) {
    return false
  } else {
    return true
  }
}

/**
 * Função para validar o tamanho do **TEXTO**
 * @param text string
 * @param maxLength number
 */
export function validateMaxLength (text: string, maxLength: number): boolean {
  if (text.length > maxLength) {
    return false
  } else {
    return true
  }
}

/**
 * Função para validar se o campo só
 * contém **LETRAS**
 * @param text string
 */
export function validateFieldText (text: string): boolean {
  const regex = /^[a-zA-Z\wÀ-ú ]/g

  return regex.test(text)
}

/**
 * Validar se o campo contém **NÚMERO**
 * @param number string
 */
export function validateFieldNumber (number: string): boolean {
  const regex = /^[0-9]{1,}$/

  return regex.test(number)
}

/**
 * Função para validar a matrícula. *SE ESTÁ
 * TUDO OKEY VAI RETORNAR **TRUE**
 * SE NÃO VAI RETORNAR **FALSE***
 * @param matricula string
 */
export function validateMatricula (matricula: string): boolean {
  const regex = /^[A-Z]{2}-\d{2}-\d{2}-[A-Z]{2}$|^[A-Z]{3}-\d{2}-\d{2}$/

  return regex.test(matricula)
}
