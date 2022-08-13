const traerPais = async (codPais) => {
  const respuesta = await fetch(`https://restcountries.com/v3.1/alpha/${codPais}`)
  if (!respuesta.ok) {
    let oops = 'Oops, algo malió sal al tratar de reconocer el código de país'
    alert(oops)
    throw new Error(`${respuesta.status} ${respuesta.statusText}`)
  }
  const pais = await respuesta.json()
  return pais[0].name.common
}

const traerPaises = async () => {
  document.getElementById('mensaje').innerHTML = 'Cargando...'
  const respuesta = await fetch(`https://api.nationalize.io/?name=${document.getElementById('nombre').value}`);
  if (!respuesta.ok) {
    let oops = 'Oops, algo malió sal'
    alert(oops)
    throw new Error(`Error al traer el país: ${respuesta.status}`);
  }
  const nombre = await respuesta.json();
  return nombre;
}

const mostrarNombre = async (n) => {
  document.getElementById('mensaje').innerHTML = ''
  n.country.forEach(async value => {
    const pais = await traerPais(value.country_id)
    document.getElementById('mensaje').innerHTML += `<strong>${pais}: ${(value.probability * 100).toFixed(2)}%</strong><br>`
  })
}

const nombre = document.getElementById('nombre').value;
const boton = document.getElementById('boton')

boton.addEventListener('click', async () => {
  document.getElementById('mensaje').innerHTML = '<strong>Cargando...</strong>'
  const n = await traerPaises();
  await mostrarNombre(n);
})

document.getElementById('nombre').addEventListener('keyup', async (event) => {
  document.getElementById('mensaje').innerHTML = '<strong>Esperando un nombre para procesar...</strong>'
})
