/*this" is always an object.*/

class notCar {
    constructor() {
        this.speed = 2;
    };

    showSpeed() {
        console.log('We are using the method "showSpeed" from the object "_notCar" inside the object "car1": ' + this.speed);
    };
};


class Car {
    constructor() {
        this.speed = 1;

        this._notCar = new notCar();
    };


    showSpeed() {
        console.log('We are using the method "showSpeed" from the object "car1": ' + this.speed);
    };


    showSpeedForButton() {
        console.log('We are using the method "showSpeedForButton()" from the object "car1": ' + this.getAttribute('speed'));
    };


    start() {
        let buttonEl = document.querySelector('.ok-button');

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        /*
        "2".

        "this" is the object "car1", so the property "speed" is taken from the object "_notCar" inside the object "car1".
        */
        console.log(this._notCar.speed);

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        /*An anonymous function means that "this" is the place where an event has been triggered.*/
        buttonEl.addEventListener('click', function () {
            console.log(this);
        });

        /*An arrow function means that "this" is the place where an element has been subscribed.*/
        buttonEl.addEventListener('click', () => {
            console.log(this);
        });

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        /*
        "undefined".

        The first "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeed()" is taken from the object "car1".

        The second "this" inside the method "showSpeed()" is the button "buttonEl" (the place where an event has been triggered), 
        so the method "showSpeed()" tries to use the property "speed" from the button "buttonEl".
        */
        buttonEl.addEventListener('click', this.showSpeed);

        /*
        "1".

        The first "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeed()" is taken from the object "car1".

        The second "this" inside the method "showSpeed()" is the object "car1" (we bind the place where an element has been subscribed), 
        so the method "showSpeed()" uses the property "speed" from the object "car1".
        */
        buttonEl.addEventListener('click', this.showSpeed.bind(this));

        /*
        "1".

        The first "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeed()" is taken from the object "car1".

        The second "this" inside the method "showSpeed()" is the object "car1" (we bind the place where an element has been subscribed), 
        so the method "showSpeed()" uses the property "speed" from the object "car1".
        */
        let tempShowSpeed = this.showSpeed.bind(this);
        buttonEl.addEventListener('click', tempShowSpeed);

        /*
        "2".

        The first "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeed()" is taken from the object "car1".

        The second "this" inside the method "showSpeed()" is the object "_notCar" inside the object "car1" (we bind it), 
        so the method "showSpeed()" uses the property "speed" from the object "_notCar".
        */
        buttonEl.addEventListener('click', this.showSpeed.bind(this._notCar));

        /*
        "1".

        The first "this" is the object "_notCar" inside the object "car1" (we specify the place where an element has been subscribed), 
        so the method "showSpeed()" is taken from the object "car1".

        The second "this" inside the method "showSpeed()" is the object "car1" (we bind the place where an element has been subscribed), 
        so the method "showSpeed()" uses the property "speed" from the object "car1".
        */
        buttonEl.addEventListener('click', this._notCar.showSpeed.bind(this));
        

        /*
        Error.

        The "this" is the button "buttonEl", so the method "showSpeed()" is not found.
        */
        // buttonEl.addEventListener('click', function () {            
        //     this.showSpeed();
        // });

        /*
        "1".

        The first "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeed()" is taken from the object "car1".

        The second "this" inside the method "showSpeed()" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeed()" uses the property "speed" from the object "car1".
        */
        buttonEl.addEventListener('click', () => {
            this.showSpeed();
        });

        /*
        "5".

        The function "showSpeed()" is taken from the global object "window".
        */
        buttonEl.addEventListener('click', () => {
            showSpeed();
        });

        /*
        "5".

        The function "showSpeed()" is taken from the global object "window".
        */
        buttonEl.addEventListener('click', function () {
            showSpeed();
        });

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        /*
        "4".

        The "this" is the button "buttonEl" (the place where an event has been triggered), 
        so the property "speed" is taken from the button "buttonEl".
        */
        buttonEl.addEventListener('click', function () {
            console.log('The method "getAttribute()" gives us: ' + this.getAttribute('speed'));
        });

        /*
        Error.

        The "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "getAttribute()" is not found.
        */
        // buttonEl.addEventListener('click', () => {
        //     console.log('The method "getAttribute()" gives us: ' + this.getAttribute('speed'));
        // }); 

        /*
        "4".
        The function "showSpeedForButtonWrapped()" is taken from the method "start()" inside the object "car1".

        The "this" inside the function "showSpeedForButtonWrapped()" is the button "buttonEl" (the place where an event has been triggered), 
        so the function "showSpeedForButtonWrapped()" uses the property "speed" from the button "buttonEl".
        */
        function showSpeedForButtonWrapped() {
            console.log('We are using the local function "showSpeedForButtonWrapped" from the method "start()" inside the object "car1": ' + this.getAttribute('speed'));
        };

        buttonEl.addEventListener('click', showSpeedForButtonWrapped);

        /*
        Not error, but JS does nothing here, strange.

        The "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeedForButtonWrapped()" is taken from the object "car1".

        Even though the object "car1" does not have the method "showSpeedForButtonWrapped()", JS does not throw an error.
        */
        buttonEl.addEventListener('click', this.showSpeedForButtonWrapped);

        /*
        Error this time.

        The first "this" is the object "car1" (the place where an element has been subscribed).

        The second "this" inside the method "showSpeedForButtonWrapped()" is the object "car1" (we bind the place where an element has been subscribed).

        The method "showSpeedForButtonWrapped()" is not found in the first "this".
        */
        buttonEl.addEventListener('click', this.showSpeedForButtonWrapped.bind(this));

        /*
        Error.

        The "this" is the button "buttonEl", so the method "showSpeedForButtonWrapped()" is not found.
        */
        // buttonEl.addEventListener('click', function () {
        //     this.showSpeedForButtonWrapped();
        // });

        /*
        Error.

        The "this" is the object "car1", so the method "showSpeedForButtonWrapped()" is not found.
        */
        // buttonEl.addEventListener('click', () => {
        //     this.showSpeedForButtonWrapped();
        // });

        /*
        "4".

        The first "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeedForButton()" is taken from the object "car1".

        The second "this" inside the method "showSpeedForButton()" is the button "buttonEl" (the place where an event has been triggered),
        so the method "showSpeedForButton()" uses the property "speed" from the button "buttonEl".
        */
        buttonEl.addEventListener('click', this.showSpeedForButton);

        /*
        Error.

        The first "this" is the object "car1" (the place where an element has been subscribed), 
        so the method "showSpeedForButton()" is taken from the object "car1".

        The second "this" inside the method "showSpeedForButton()" is the object "car1" (we bind the place where an element has been subscribed), 
        so the method "getAttribute()" is not found.
        */
        // buttonEl.addEventListener('click', this.showSpeedForButton.bind(this));               

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        /*
        "this" is the global object "window".
        "5" from the function stop() from the global object "window".
        */
        window.addEventListener('click', function () {
            console.log(this);
            this.showSpeed();
        });

        /*
        "this" is the object "car1".
        "1" from the object "car1".
        */
        window.addEventListener('click', () => {
            console.log(this);
            this.showSpeed();
        });

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        /*"3" from the global object "window".*/
        window.addEventListener('click', this.showSpeed);

        /*"1" from the object "car1".*/
        window.addEventListener('click', this.showSpeed.bind(this));
    };    
};

window.speed = 3;

function showSpeed() {
    console.log('We are using the method "showSpeed" from the global object "window": ' + '5');
};

let car1 = new Car();
car1.start();