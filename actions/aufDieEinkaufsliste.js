// Zutaten aus Rezept auswählen und auf Einkaufsliste setzen

const allLines = draft.content.split("\n");
const  shoppingList = ReminderList.findOrCreate("Einkaufen");

// wenn es eine selection gibt: alle ausgewählte zeilen
// sonst: alle zeilen, die mit /^- / beginnen
let selection = editor.getTextInRange(...editor.getSelectedLineRange());
if (editor.getSelectedRange()[1] >= 1) {
    things = selection.split(/\n|, /gm);
    things.pop();
    // var wasSelected = true; //wenn aktiv, werden manuell ausgewählte Zutaten per default markiert
} else {
    things = allLines.filter(line => /^\s?-\s/.test(line));
    var wasSelected = false;
}
// die Spiegelstriche entfernen
things.forEach((item, index) => {
    if (item.startsWith("- ")) {
      things[index] = item.slice(2);
    }
  });

// diese Zeilen auf einen Selection-Promt zum auswählen
let p = Prompt.create();
p.title = "Auf die Einkaufsliste...";
p.message = "Was brauche ich?";
if (wasSelected == true) {
    p.addSelect('missing', '', things, things, true);    
} else {
    p.addSelect('missing', '', things, [], true);
}
p.addButton('OK', 1, true);
p.addDivider();
p.addSegmentedControl('convert', 'Mengen umrechnen', ['1x', '1,5x', '2x', '2,5x', '3x'], '1x');
if (things.length == 0) {
    let n = Prompt.create();
    n.title = "Keine Zutaten erkannt";
    n.message = "Markiere Zeilen, die Zutaten enthalten und probiere es erneut."
    n.addButton('OK', 3, true);
    n.isCancellable = false;
    n.show();
} else {
    p.show();
}

if (p.buttonPressed == "1") {
    // Multiplier hier setzen, nach p.show()
    let multiplier;
    switch (p.fieldValues['convert']) {
        case '1x':
            multiplier = 1;
            break;
        case '1,5x':
            multiplier = 1.5;
            break;
        case '2x':
            multiplier = 2;
            break;
        case '2,5x':
            multiplier = 2.5;
            break;
        case '3x':
            multiplier = 3;
            break;
        default:
            multiplier = 1;
    }

    if (multiplier == 1) {
        var missingthings = p.fieldValues['missing'];
        missingthings.forEach(function(thing) {
        let reminder = shoppingList.createReminder();
        reminder.title = thing;
        reminder.update(); 
    });
    } else {
        var missingthings = p.fieldValues['missing'];
        missingthings.forEach(function(thing) {
            // Extrahiere Zahl und Text
            let match = thing.match(/(\d*[.,]?\d+)\s*(.*)/);
            if (match) {
                let amount = parseFloat(match[1].replace(',','.'));
                let item = match[2];
                // Multipliziere Menge und formatiere
                let calculatedAmount = amount * multiplier;
                let decimal = calculatedAmount % 1;
                if (decimal > 0 && decimal < 0.5) {
                    calculatedAmount = Math.floor(calculatedAmount) + 0.5;
                } else if (decimal > 0.5) {
                    calculatedAmount = Math.ceil(calculatedAmount);
                }
                let newAmount = calculatedAmount.toString().replace('.',',');
                let reminder = shoppingList.createReminder();
                reminder.title = newAmount + ' ' + item;
                reminder.update();
            } else {
                // Falls keine Zahl gefunden, übernehme Original
                let reminder = shoppingList.createReminder();
                reminder.title = thing;
                reminder.update();
            }
        });
    }
} else {
    context.cancel();
    app.displayInfoMessage("Nichts zur Einkaufsliste hinzugefügt");
}