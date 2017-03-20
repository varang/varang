import { Injectable } from '@angular/core';

@Injectable()
export class HtmlHelper {


public getViewport(): any {
	let win_ = window, doc_ = document, doce_ = doc_.documentElement, tag_ = doc_.getElementsByTagName('body')[0];
	return { 
		width: win_.innerWidth || doce_.clientWidth || tag_.clientWidth, 
		height: win_.innerHeight || doce_.clientHeight || tag_.clientHeight 
	};
}

public getHiddenElementOuterHeight(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return elementHeight;
    }

    public getHiddenElementOuterWidth(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return elementWidth;
    }


}
