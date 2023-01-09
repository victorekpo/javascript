import { Robot } from './classes/bots'
import { Neighborhood } from './classes/places'
import { getSplashTopLogs } from "./utils/events/splashTopLogs";
import { runOnDate } from "./utils/exec/runOnDate";

export const main = async (): Promise<any> => {
    // create object class and object
    const vic = new Robot('vicBot');
    console.log("\r\n",vic.name,"lives at", vic.residence,"\r\n");

    // create environment
    const myNeighborhood = new Neighborhood(
        'Royals Point',
        {
            city: 'Houston',
            state: 'Texas',
            restaurants: ['Shipleys']
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

    // run time-taking operation
    const delay = (sec: number | undefined) => new Promise(resolve => {
        setTimeout(resolve, (sec || 0)*1000)
    })
    for(let i=0;i<1;i++) {
        await delay(1);
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


    const vic2 = new Robot('vicBot2');

    vic2.read();

    vic2.getAge()
    vic2.learn({
        type:'sports',
        item: 'baseball',
        value: 'How to hit it out of the park'
    })



    // ------------------------------------------
    // Schedulers
    // ------------------------------------------

    //Tasks
    const scheduledTasksEveryMinAt10 = async () => {
        vic2.learn({
            type: 'computer_events',
            item: 'splashtop',
            value: JSON.stringify(await getSplashTopLogs())
        });
    }

    // Runners
    runOnDate(
        {
            min: 10,
            s: 15,
            ms: 100,
            interval: 'min',
            loop: true
        },async () => {
            await scheduledTasksEveryMinAt10();
        })

    // continue running until purpose is reached

    // continuous: save object to JSON file while processing
}

main()
    .then(res => res);

