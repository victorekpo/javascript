import { Robot } from './classes/bots'
import { Neighborhood } from './classes/places'

// MAIN
export const main = async (): Promise<any> => {
    // create object class and object
    const vic = new Robot(
        'vicBot',
        {
            attitude: 'chill'
        })
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

    // run time-taking operation
    const delay = (sec: number | undefined) => new Promise(resolve => {
        setTimeout(resolve, (sec || 0)*1000)
    })
    for(let i=0;i<1;i++) {
        await delay(3);
    }
    vic.getAge();



    // run object actions

      // run learn
    vic.learn({
          type:'coding',
          item: 'typescript',
          value: 'Typescript is a very powerful language built as a superset of Javascript'
      })

    vic.learn({
        type:'coding',
        item: 'react',
        value: 'React library'
    })

    vic.learn({
        type:'sports',
        item: 'basketball',
        value: 'How to shoot a jump shot'
    })

    vic.read();

    // continue running until purpose is reached

    // save object to JSON file

}

main()
    .then(res => res);
