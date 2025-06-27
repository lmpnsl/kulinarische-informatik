// kulinarischer Tagebucheintrag
var journalEntry = "";
let inJournal = false;
let currentLine = "";

// Aktuelles Datum
const currentDate = new Date();
	
// Tag und Monat mit führender Null generieren
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const formattedDate = `${day}.${month}.`;

const currentYear = `${currentDate.getFullYear()}`;

const journal = Draft.queryByTitle("Journal culinaire " + currentYear)[0];

// Eintrags-Menü
function showMenu() {
	// Menü
	let menu = Prompt.create();
	menu.title = "kulinarischer Tagebucheintrag";
	menu.message = "Was gab's denn?";
	menu.addTextField('entry', 'Es gab:', '');
	menu.addButton("OK", 0, true);
	menu.addButton("Rezept gekocht", 1, false, true);
	menu.addButton("es gab Reste", 2, false);
	menu.addButton("heute nicht gekocht", 3, false);
	menu.show();

	// 3 einfache Fälle:
	// OK
	if (menu.buttonPressed == 0) {
		journalEntry = menu.fieldValues["entry"];
		editor.setSelectedText(journalEntry);

	// es gab Reste
	} else if (menu.buttonPressed == 2) {
		journalEntry = "(Reste)"
		editor.setSelectedText(journalEntry);

	// heute nicht gekocht
	} else if (menu.buttonPressed == 3) {
		journalEntry = "(nichts)"
		editor.setSelectedText(journalEntry);

	// ein komplexerer Fall:
	// Rezept gekocht
	} else if (menu.buttonPressed == 1) {

		let text = editor.getText();
		let pos = editor.getSelectedRange()[0];
		let before = text.slice(pos-14, pos);
		let regex = /(\. - )|\w\./g;
		let rezept = draft;

		let workspace = Workspace.find("Rezepte");
		let d = app.selectDraft(workspace);
		if(d) {
			rezept = d;
			d.isFlagged = false;
			d.update();
			if (regex.test(before)) {
		      editor.setSelectedText(`${d.displayTitle}`);   
		   } else {
		   	editor.setSelectedText('; ' + `${d.displayTitle}`);
			}
		}

		let ratePromt = Prompt.create();
		ratePromt.title = "Wie hat's geschmeckt?"
		ratePromt.message = "Soll das Rezept aufbewahrt oder verworfen werden?"
		ratePromt.addButton("hat gut geschmeckt!", 8)
		ratePromt.addButton("das koche ich nie wieder!", 9)

		if (rezept.hasTag("neuesrezept")) {
			if (ratePromt.show()) {
				if (ratePromt.buttonPressed == 8) {
					//app.queueAction(gutgeschmeckt);
					rezept.removeTag("neuesrezept");
					rezept.update();
					app.displaySuccessMessage(rezept.displayTitle + ": hat gut geschmeckt!")
				} else if (ratePromt.buttonPressed == 9) {
					//app.queueAction(niewieder);
					rezept.removeTag("neuesrezept");
					rezept.removeTag("rezept")
					rezept.addTag("verworfenesrezept");
					rezept.update();
					app.displaySuccessMessage(rezept.displayTitle + ": koche ich nie wieder!")
				}
			}
		}
	} else { // es steht schon etwas an dem Tag: Nur Journal offnen
		context.cancel();
	}
}


// zum Journal-Draft
if (draft.displayTitle == "Journal culinaire " + currentYear) {
	let inJournal = true;
	// Zeile im Journal abrufen
	var [lStart, lEnd] = editor.getSelectedLineRange();
	currentLine = editor.getTextInRange(lStart, lEnd);
	showMenu();
} else {
	editor.load(journal);

	// zum heutigen Tag im Journal
	let text = journal.content; // Text der aktuellen Draft
	const lines = text.split('\n'); // Zeilen im Text aufteilen

	// Index der Zeile mit dem aktuellen Datum finden
	let targetLineIndex = -1;
	for (let i = 0; i < lines.length; i++) {
	    if (lines[i].substring(3).startsWith(formattedDate)) {
	        targetLineIndex = i;
	    	currentLine = lines[i];
	        break;
	    }
	}

	// Wenn die Zeile mit dem aktuellen Datum gefunden wurde
	if (targetLineIndex !== -1) {
	    // Cursor zum Ende der Zeile setzen
	    const cursorPosition = lines[targetLineIndex].length + 1;
	    editor.setSelectedRange(lines.slice(0, targetLineIndex).join('\n').length + cursorPosition, 0);
	    showMenu();
	} else {
	    // Wenn das aktuelle Datum nicht gefunden wurde
	    app.displayWarningMessage("Das aktuelle Datum wurde nicht gefunden.");
	}
}