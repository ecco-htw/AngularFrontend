# HTW F4 Ecco Frontend

## Installation

Um das Frontend zu installieren benötigt man node.js. 
Sobald das Repository geclont ist, kann man `npm install` eingeben und die erforderlichen Packete werden
heruntergeladen und installiert.

## Development Server

Den Development Server startet man über den Befehl `npm run start`.
Er beinhaltet die nicht optimierte Version des Frontends und hat ein Hot-Reload-Feature.

## Production Server

Dieser wird auf dem Server der HTW gestartet und beinhaltet eine compilierte und produktionsfähige Version.
Er wird über die Befehle `npm run build` und `npm run start:prod` gestartet.

## Weitere Befehle

Weitere Befehle können in der Datei **package.json** gefunden werden.


## Code

Der Code orientiert sich überwiegend an Best-Practice-Ansätzen von Angular.
Diese können in der [offiziellen Dokumentation](https://angular.io/docs) nachgelesen werden.
Außerdem kommt das State-Management-System [Akita](https://github.com/datorama/akita) zum Einsatz.
Alle Daten werden, nachdem sie vom Server abgerufen wurden, vorerst in einen global verfügbaren Store gespeichert.
Die einzelnen Angular Komponenten können auf diesen Store zugreifen und Änderungen überwachen.

Für die Darstellung der Karte wird die JavaScript-Bibliothek [Leaflet](https://leafletjs.com) verwendet.
Diese arbeitet mit Layern die in der Karte eingeblendet werden können.
Diese Layer wurden im Ordner **src/app/buoys-map/services/leaflet/layers/** in TypeScript-Klassen abstrahiert.


### Schwierigkeiten und TODOS

Leaflet ist nicht für die Verwendung mit TypeScript ausgelegt und es stehen keine offiziellen Type-Definitionen zur Verfügung.
Die Einbung einiger Plugins wurde dadurch erschwert.

Für die Darstellung der Punkte auf der Karte wird das Plugin [Leaflet.glify](https://github.com/robertleeplummerjr/Leaflet.glify)
verwendet. Welches die Punkte mit WebGL auf die Karte rendert. Für das Plugin steht kein npm package zur Verfügung. Die Einbindung
in das Projekt hat sich als schwierig erwießen. Das Git-Repository wird geclont und wird danach noch gebuildet. Hier könnte ggf.
über ein alternatives Plugin, welches eine offzieles npm Package zur Verfügung stellt, nachgedacht werden. 
Außerdem unerstüzt Leaflet.glify keinen Mouseover-Effekt. Somit ist es nicht möglich zu sehen wann die Maus über eine Boje bewegt wird. 
