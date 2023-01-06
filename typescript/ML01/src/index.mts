import { Human } from './classes/person.mjs'
import { Neighborhood } from './classes/places.mjs'

// MAIN
export const main = (): void => {
    // create object class and object
    const vic = new Human('victor',23,{attitude: 'chill'})
    console.log(JSON.stringify(vic, null, 2));

    // create environment
    const myNeighborhood = new Neighborhood('Houston','Texas',{ restaurants: ['Shipleys'], population: 300});
    console.log(JSON.stringify(myNeighborhood, null, 2));

    // interact object meets environmentm

    // run object actions

    // continue running until purpose is reached

}

main();
