function checkStringLenght (string, length) {
  if(string.length <= length) {
    return true;
  }

  return false;
}

checkStringLenght('проверяемая строка', 20);
checkStringLenght('проверяемая строка', 18);
checkStringLenght('проверяемая строка', 10);

function checkPallid (string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for(let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString[i];
  }

  return newString === normalizeString;
}

checkPallid('топот');
checkPallid('Довод');


function getNumber(string) {
  const newStr = string.toString();
  let getStr = '';

  for (let i = 0; i < newStr.length; i++) {
    if (!isNaN(newStr[i]) && newStr[i] !== ' ') {
      getStr += newStr[i];
    }
  }

  return getStr.length > 0 ? getStr : NaN;
}


getNumber('2023');
