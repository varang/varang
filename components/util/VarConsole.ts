import {varConfig} from "../VarConfig";
/**
 * Created by CAN on 13.02.2017.
 */

export class VarConsole {



    info(any) {
        if (varConfig.isLoggingOn) {
            //console.trace();
            console.info(any);
        }
    }



    error(any) {
        if (varConfig.isLoggingOn) {
            console.trace();
            console.error(any);
        }
    }

    log(any) {
        if (varConfig.isLoggingOn) {
            console.trace();
            console.log(any);
        }
    }

    debug(any) {
        if (varConfig.isLoggingOn) {
            console.trace();
            console.debug(any);
        }
    }

}

export const varConsole:VarConsole = new VarConsole();