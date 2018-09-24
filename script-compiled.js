'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Wyszukaj atrybut id i nasluchuj na zdarzenie na klikniecie przycisku aby zarejestrowac metode zatrzymujaca zegar
var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    return stopwatch.start();
});

// Wyszukaj atrybut id i nasluchuj na zdarzenie na klikniecie przycisku aby zarejestrowac metode zatrzymujaca zegar
var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
    return stopwatch.stop();
});

// Stworz konstruktor w klasie i przekaz odpowiednie parametry 

var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        // parametr odpowiedzialny za to czy stoper pracuje, domyslnie wylaczony 
        this.running = false;
        // parametr przechowujacy element DOM wyswietlajacy tarcze stopera
        this.display = display;
        // parametr resetujacy licznik
        this.reset();
        // parametr drukujacy czasy
        this.print(this.times);
    }
    // Metoda ktora ustawia czasy w domyslnym polozeniu


    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.times = {
                // Ustawianie poczatkowe czasu dla minut
                minutes: 0,
                // Ustawianie poczatkowe czasu dla sekund
                seconds: 0,
                // Ustawianie poczatkowe czasu dla milisekund
                miliseconds: 0
            };
        }
        // Metoda ktora ustawia wewnetrzny tekst elementu DOM znajdujacy sie pod atrybutem display

    }, {
        key: 'print',
        value: function print() {
            this.display.innerText = this.format(this.times);
        }
        // Metoda zwraca szablon do pozniejszego wyswietlenia ktory wykorzystuje obiekt times podany do metody jako argument

    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ' : ' + pad0(times.seconds) + ' : ' + pad0(Math.floor(times.miliseconds));
        }
        // Metoda ktora sprawdza czy nasz stoper juz nie chodzi

    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            // Jesli stoper aktualnie nie chodzi, to wykonaj ponizsza instrukcje
            if (!this.running) {
                // Przypisz flage running aby uruchomic stoper
                this.running = true;
                // Przypisz flage watch i ustaw funkcje zajmujaca sie interwalami ktora przyjmuje jako pierwszy argument callback
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
        }
        // Metoda stop ktora zatrzymuje nasz czas w stoperze

    }, {
        key: 'stop',
        value: function stop() {
            // Przypisz flage running aby zatrzymac stoper
            this.running = false;
            // Wyczysc interwal odwolujac sie do parametru watch
            clearInterval(this.watch);
        }
        // Metoda sprawdzajaca czy nasz licznik jest juz uruchomiony

    }, {
        key: 'step',
        value: function step() {
            // Jesli nasz licznik jest urchomiony to zwroc nastepujace metody
            if (!this.running) return;
            // Metoda ktora ma za zadanie przeliczac odpowiednio minuty, sekundy i milisekundy
            this.calculate();
            // Metoda ktora drukuje wynik
            this.print();
        }
        // Metoda ktora zeruje wartosci milisekund i sekund

    }, {
        key: 'calculate',
        value: function calculate() {
            // Zwieksz w parametrze times milisekundy o 1 na samym poczatku urchomionego stopera
            this.times.miliseconds += 1;
            // Jesli na tablicy milisekundy sa wieksze lub rowne 100 -
            // Dlaczego 100? Poniewaz nasz stoper wyswietla dwie cyfry obok siebie zamiast trzech. 
            // Stad tez trzeba 1000 milisekund ( odpowiednik jednej sekundy) podzielic przez 10 co nam daje 100
            if (this.times.miliseconds >= 100) {
                // - zwieksz tablice z sekundami o 1
                this.times.seconds += 1;
                // Nastepnie wyzeruj tablice z milisekundami
                this.times.miliseconds = 0;
            }
            // Jesli sekundy sa wieksze lub rowne 60
            if (this.times.seconds >= 60) {
                // Zwieksz tablice z minutami o 1
                this.times.minutes += 1;
                // Wyzeruj tablice z sekundami
                this.times.seconds = 0;
            }
        }
    }]);

    return Stopwatch;
}();
// Funkcja ktorej zadaniem jest dodanie zera do liczb jednocyfrowych


function pad0(value) {
    // Funkcja przyjmuje wartosc liczbowa przeksztalcajac na stringa
    var result = value.toString();
    // Sprawdz czy dlugosc tablicy tego stringa jest mniejsza niz 2
    if (result.length < 2) {
        // Jesli tak, to jako rezultat dodaj zero przed ta liczbe
        result = '0' + result;
    }
    // zwroc tablice rezultatow
    return result;
}

// Stworz instancje klasy ktora pobierze klase przycisku zatrzymujacego czas
var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
