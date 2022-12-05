const $form = document.querySelector('form');

$form.addEventListener('submit', generateQR);

function generateQR(event) {
  event.preventDefault();
  const qrObject = {};
  const encodedURL = encodeURI(event.target.elements.url.value);
  qrObject.url = encodedURL;
  qrObject.size = event.target.elements.size.value;
  getQR(qrObject, updateQRImage);
  $form.reset();
}

function getQR(qrObject, imgUpdate) {
  const getURL = 'http://api.qrserver.com/v1/create-qr-code/?data=' + qrObject.url + '&size=' + qrObject.size + 'x' + qrObject.size;
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      imgUpdate(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', getURL);
  xhr.responseType = 'blob';
  xhr.send();
}

function updateQRImage(imgSource) {
  const $qrHero = document.querySelector('#qrHero');
  $qrHero.setAttribute('src', imgSource);
}
