Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  if (date.getDay() === 0) {
    date.setDate(date.getDate() + 1);
  }
  date.setDate(date.getDate() + (1 - date.getDay() + 7) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
};

var heute = new Date();
var weekNumber = heute.getWeek();

var dd = String(heute.getDate()).padStart(2, '0');
var mm = String(heute.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = heute.getFullYear();


const wochentag = new Array("Mo", "Di", "Mi", "Do", "Fr", "Sa", "So")
const woche = Array.from(Array(7).keys()).map((idx) => {
    const d = new Date(); 
    d.setDate(d.getDate() - d.getDay() + idx + 1); 
    return String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.';
    }
);

function zuordnung() {
    return wochentag.flatMap(function (val, i) {
      if (woche[i]) {
        return [val + ' ' + woche[i] + ' - '];
      }
      return [val];
    });
  }

let liste = '\nKW ' + weekNumber + '\n' + zuordnung(wochentag, woche).join('\n');

let query = "Journal culinaire " + yyyy;
let journal = Draft.queryByTitle(query)[0];

journal.insert(liste, 1)
journal.update()