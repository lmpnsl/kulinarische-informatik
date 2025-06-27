// ACTION: BROT GEBACKEN!
// Textblock unten anfügen
// Eintrag in "Backprotokoll" mit Datum und link auf das Ausgangsrezept

// VORAUSSETZUNG
// 1. es gibt genau einen Draft mit dem Titel "# Backprotokoll"

// heute
let today = draft.processTemplate('[[date|%d.%m.%Y]]');

// thisdraft
let query = "Backprotokoll";
let backprotokoll = Draft.queryByTitle(query)[0];

let template = "### " + today + "\n♨️ Temperatur (Luft): \n🌡 Temperatur (Teig): \n⏳ Zeiten:  \n💧 Wasser/Hydration: \n🌾 (Mehl)Mengen: \n💭 Sonstiges: \n";

// check: gibt es schon einen Abschnitt "Backevents"? Wenn nein, zuerst erzeugen, dann/sonst ganz unten template einfügen
if (draft.content.includes("## Backevents")) {
		draft.append(template)
	} else {
		draft.append("\n## Backevents\n" + template);
	}

// anschließend today + thisdraft auf das Backprokoll
backprotokoll.append("- " + today + ": [[" + draft.displayTitle + "]]");
backprotokoll.update();