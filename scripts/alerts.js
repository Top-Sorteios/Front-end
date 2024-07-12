
export function mostrarAlert(msg, iconClass){
    let alertBox = document.getElementById('alert-box');
    let alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = `<span class="${iconClass}"></span> ${msg}`;
    alertBox.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 3000);
  
    if(msg.includes('Não foi possível')){
      alert.classList.add('error');
    }
  }
  