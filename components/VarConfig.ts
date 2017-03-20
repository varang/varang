/**
 * Created by halil on 20/03/2017.
 */

export class VarConfig {
    public isLoggingOn:boolean=true;
    public properties={};

    constructor(){
        this.properties["server.host"]="localhost";
        this.properties["server.port"]="8281";
        this.properties["app.root"]="http://"+this.properties["server.host"]+":"+this.properties["server.port"];
    }
}

export const varConfig:VarConfig = new VarConfig();