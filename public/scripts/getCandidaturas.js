document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/candidaturas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
        
        return response.json();
      })
      .then(data => {
        const ul = document.getElementById('candidaturas');
  
        if (!Array.isArray(data) || data.length === 0) {
          ul.innerHTML = '<li>Nenhuma vaga disponível no momento.</li>';

          return;
        }
  
        data.forEach(candidatura => {
          const li = document.createElement('li');
  
          li.innerHTML = `
            <strong>${candidatura.titulo}</strong><br>

            <span>${candidatura.descricao}</span><br>

            <button onclick="abrirModal(${candidatura.id})">Candidatar-se</button>
          `;
  
          ul.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar candidaturas:', error);

        alert('Erro ao carregar as vagas. Tente novamente mais tarde.');
      });
  });
  
  function abrirModal(vagaId) {
    const modal = document.getElementById('modal-candidatura');

    const inputId = document.getElementById('vaga-id');
  
    if (inputId) inputId.value = vagaId;

    if (modal) modal.style.display = 'block';
  }
  
  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal-candidatura').style.display = 'none';
  });
  
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal-candidatura');

    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  