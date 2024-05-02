let text: string = ''
let index: number = 0
let elemdId: string = ''

function printNextChar(): void {
  if (index < text.length) {
    const element = document.getElementsByClassName(elemdId)[0]
    if (element) {
      element.textContent += text.charAt(index)
      index++
      setTimeout(printNextChar, 125) // Adjust the speed here (milliseconds)
    }
  }
}

export function startAnimation(elemdId_in: string, text_in: string): void {
  console.log('START ANIMATION')
  text = text_in
  elemdId = elemdId_in
  const element = document.getElementsByClassName(elemdId_in)[0]
  if (element) {
    element.textContent = ''
    index = 0
    setTimeout(() => {
      printNextChar()
    }, 450)
    //printNextChar()
  }
}
