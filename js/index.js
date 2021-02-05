window.addEventListener('load', () => {
  const submitElement = document.querySelector('.form_button');
  submitElement.onclick = () => {
    let isError = false;
    const formInputElements = document.querySelectorAll('.form_input');
    for (let i = 0; i < formInputElements.length; i++) {
      if (!formInputElements[i].value) {
        isError = true
        const formErrorElements = document.querySelectorAll('.form_label__error');
        for (let j = 0; j < formErrorElements.length; j++) {
          if (j == i) { formErrorElements[j].innerHTML = "値が入力されていません"; }
        }
      }
    }
    if (!isError) {
      window.location.href = "pages/flashMain.html?between="
                              + formInputElements[0].value + "&timenum="
                              + formInputElements[1].value + "&digitnum="
                              + formInputElements[2].value + "&loopnum="
                              + formInputElements[3].value + "&subtraction="
                              + document.querySelector('.form_checkbox').checked + "&loopcount=0";
    }
  }
});
