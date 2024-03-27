function toggleAnimation(card) {
    card.classList.toggle('flipped');
  }
  document.addEventListener('DOMContentLoaded', function () {
    const days = document.querySelectorAll('.linha_h');
    const infos = document.querySelectorAll('.info');
  
    
    days.forEach(day => {
      day.addEventListener('click', function () {
        const dayNumber = this.getAttribute('data-day');
        infos.forEach(info => {
          info.style.display = 'none';
        });
        document.getElementById(`info-${dayNumber}`).style.display = 'block';
      });
    });
  });
  