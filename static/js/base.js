document.addEventListener("DOMContentLoaded", function() {
  // Находим все якорные ссылки в навигации
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      const targetId = this.getAttribute('href'); // Получаем id целевого элемента
      const targetElement = document.querySelector(targetId);

      // Если якорная ссылка найдена
      if (targetElement) {
        // Проверяем, виден ли блок навигации Offcanvas (используется ли кнопка-гамбургер)
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasNavbar'));

        if (offcanvas && window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
          // Останавливаем стандартное действие
          event.preventDefault();

          // Закрываем блок навигации
          offcanvas.hide();

          // Ждем завершения закрытия панели, затем перемещаемся к якорю
          offcanvas._element.addEventListener('hidden.bs.offcanvas', function() {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }, { once: true });

        } else {
          // Если панель навигации видна (не offcanvas), просто перемещаемся к нужному якорю
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
