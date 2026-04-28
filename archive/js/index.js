function createCard() {
  const card = document.createElement('div');
  card.classList.add('card');
  document.getElementById('card-list').appendChild(card);
}

document.addEventListener('DOMContentLoaded', function () {
  const buttonAdd = document.getElementById('button-add');
  const buttonDone = document.getElementById('button-done');
  const inputAddress = document.getElementById('input-address');
  const headerMaskContent = document.querySelector('.header-mask-content');

  buttonAdd.addEventListener('click', function () {
      headerMaskContent.classList.add('active');
  });

  buttonDone.addEventListener('click', function () {
      headerMaskContent.classList.remove('active');
  });

  headerMaskContent.addEventListener('transitionend', function () {
      if (headerMaskContent.classList.contains('active')) {
          inputAddress.focus();
      }
  });

  [...Array(50).keys()].forEach(i => createCard());

  window.addEventListener('scroll', function () {
      const scrollTop = document.body.scrollTop;
      const topHeader = document.getElementById('top-header');
      const inPoint = 400;
      const outPoint = 400;

      if (scrollTop > outPoint) {
          topHeader.classList.add('hidden');
      } else if (scrollTop < inPoint) {
          topHeader.classList.remove('hidden');
      }
  });
});
