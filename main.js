

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
        //Creamos esta const objeto para guardar los datos que queremos pintar en la card
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat


        };
        
        console.log(data);


        pintarCard(pokemon);
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
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img); //asi accedemos a las fotos de pokemon
    
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp}  hp</span>`

    clone.querySelector('.card-body-text').textContent =  pokemon.experiencia +  ' Exp'//textcomten se usa solo para texto no etiquetas, para ello innerHTML

    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + ' K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + ' K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + ' K';



    //Queremos que nos guarde el CLONE a nuestro FRAGMENTE en un appendchild
    fragment.appendChild(clone);
    //Una vez que lo tenemos en el fragment, lo pasamos a nuestra caja flex en html
    flex.appendChild(fragment);

}

