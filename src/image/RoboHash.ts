export class RoboHash{
    static getImageUri(name: string, setName: string = "set1"){
        const uri = `https://robohash.org/${name}.png?set=${setName}`;
        return uri;
    }
}