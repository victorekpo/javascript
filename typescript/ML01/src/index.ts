import { Human } from './classes/persons'
import { Neighborhood } from './classes/places'

// MAIN
export const main = (): void => {
    // create object class and object
    const vic = new Human(
        'vicBot',
        23,
        {
            attitude: 'chill'
        },
        null)
    console.log("object",vic.name,"is born","\r\n")
    console.log(JSON.stringify(vic, null, 2));
    console.log("\r\n",vic.name,"lives at", vic.residence,"\r\n");

    // create environment
    const myNeighborhood = new Neighborhood(
        'Royals Point',
        'Houston',
        'Texas',
        {
            restaurants: ['Shipleys'],
            population: 300
        },
        {
            total: 300
        });
    console.log(JSON.stringify(myNeighborhood, null, 2),"\r\n");

    // interact object meets environment
    vic.live(myNeighborhood);
    console.log("\r\n",vic.name,"lives at", vic.residence,"\n");
    console.log("\r\nJune 2023, the mayor of Royal Point issues a reward to the residents because of the great economic rising in",myNeighborhood.name,"\n")
    myNeighborhood.affectResident(vic,{
        type: 'city rewards to residents',
        newBankBalance: 200,
        newPersonality: 'refreshed'
    });
    console.log("vic's current mood",vic);

    // run object actions

    // continue running until purpose is reached

}

main();
