
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
        { id: 11, name: 'Captain America' },
        { id: 12, name: 'Iron Man' },
        { id: 13, name: 'Ant Man' },
        { id: 14, name: 'Falcon' },
        { id: 15, name: 'Black Panther' },
        { id: 16, name: 'Incredible Hulk' },
        { id: 17, name: 'Thor' },
        { id: 18, name: 'Black Widow' },
        { id: 19, name: 'War Machine' },
        { id: 20, name: 'Dr. Strange' }
    ];
    return {heroes};
  }
}
