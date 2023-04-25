

//Te carga e js con este EVENTO cuando ha cargado toda la info html....
document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    fetchData(random);
    
})



function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchData = async (id) => {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // `${id}` interpolamos esto para que eleiga al azar el pokemon!!
        const data = await respuesta.json();
        pintarCard(data);
    }catch (error){
        console.log(error)
    }
}

const pintarCard = (pokemon) => {
    console.log(pokemon);
    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content;
    // Ahora hacemon un clon del Frangment de html
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    // Para cambiar la foto del html templane-clone, accedemos de esta manera!!
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.sprites.other.dream_world.front_default); //asi accedemos a las fotos de pokemon
    
    clone.querySelector('.card-body-title').innerHTML = 'Victor charst <span>26</span>'
    //Queremos que nos guarde el CLONE a nuestro FRAGMENTE en un appendchild
    fragment.appendChild(clone);
    //Una vez que lo tenemos en el fragment, lo pasamos a nuestra caja flex en html
    flex.appendChild(fragment);

}

