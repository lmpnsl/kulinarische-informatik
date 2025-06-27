function getYearFromTitle() {
    let yearMatch = editor.draft.displayTitle.match(/Journal\sculinaire\s(\d{4})/);
    return yearMatch ? yearMatch[1] : draft.processTemplate('[[date|%Y]]');
}

function formatAndUpdate(draft) {
    draft.update();
    draft.content = draft.content.replace(/\n{2,}/g, '\n\n'); // Doppelte Leerzeilen in einfache umwandeln
    draft.content = draft.content.replace(/(^(?!#).*\n)^(#)/gm, '$1\n$2'); // Leerzeilen vor Zeilen, die mit '#' beginnen, einfügen
    draft.update();
}

function getDrinkDate(line, drinkyear) {
    let today = draft.processTemplate('[[date|%d.%m.%Y]]');
    let extractedDate = line.match(/^\w{2}\s(\d{2}\.\d{2}\.)\s-\s/);
    return extractedDate ? extractedDate[1] + drinkyear : today;
}

function showWarningPrompt() {
    let warningPrompt = Prompt.create();
    warningPrompt.title = "Willst Du das wirklich?";
    warningPrompt.message = "Diese Aktion sollte normalerweise im kulinarischen Tagebuch in der Zeile des Verkostungstages ausgelöst werden.";
    warningPrompt.addButton("trotzdem fortfahren");
    return warningPrompt.show() && warningPrompt.buttonPressed === "trotzdem fortfahren";
}

function curateProtokoll(protokoll, protokolleintrag, drinkdate) {
    let eintraege = protokoll.content.split("\n");
    let letzterEintrag = eintraege[eintraege.length - 1];
    let datumLetzterEintrag = letzterEintrag.split(" - ")[0];

    if (datumLetzterEintrag == drinkdate) {
        let nurWein = protokolleintrag.split(/(\d{2}\.\d{2}\.\d{4}) - (.*)/)[2];
        protokolleintrag = letzterEintrag + ", " + nurWein;
        eintraege.pop();
    }
    eintraege.push(protokolleintrag);
    protokoll.content = eintraege.join("\n");
    protokoll.update();
}

function createVKN(vintage, wine, vkntemplate) {
    let vkn = Draft.create();
    vkn.content = `# ${wine}\n${vkntemplate}`;
    vkn.isArchived = true;
    vkn.addTag("vkn");
    vkn.update();
    return vkn;
}

function useQuickVKN(existingQuickVKN, drinkdate) {
    let wineFromQuickVKN = {
        name: existingQuickVKN.displayTitle.replace(/\d{4}/, '').trim(),
        vintage: existingQuickVKN.displayTitle.match(/\d{4}/)?.[0] || "",
        text: existingQuickVKN.content.split('\n').slice(1).join('\n')
    };

    let targetWine = {
        name: wineFromQuickVKN.name,
        vintage: wineFromQuickVKN.vintage,
        draft: null
    };

    let matchPrompt = Prompt.create();
    matchPrompt.title = "Wein";
    matchPrompt.message = `Ist der Name des Weins so korrekt?\n\nWein: ${wineFromQuickVKN.name}\nJahrgang: ${wineFromQuickVKN.vintage}`;
    matchPrompt.addTextField("correctedName", "korrekter Name", wineFromQuickVKN.name);
    matchPrompt.addTextField("correctedYear", "korrekter Jahrgang", wineFromQuickVKN.vintage);
    matchPrompt.addButton("Übernehmen");

    if (matchPrompt.show() && matchPrompt.buttonPressed === "Übernehmen") {
        targetWine.name = matchPrompt.fieldValues["correctedName"];
        targetWine.vintage = matchPrompt.fieldValues["correctedYear"];
    }

    // Check if a VKN already exists for this wine
    let existingVKNs = Draft.query("", "all", ["vkn"], [], "created", true, false);
    let foundVKN = existingVKNs.find(vkn => vkn.displayTitle.includes(targetWine.name));

    if (foundVKN) {
        // Update the existing VKN
        updateExistingVKN(foundVKN, targetWine.vintage, drinkdate, wineFromQuickVKN.text);
    } else {
        // Create a new VKN
        let vkntemplate = `## Jahrgang ${targetWine.vintage}\n### verkostet am ${drinkdate}\n${wineFromQuickVKN.text}`;
        let vkn = createVKN(targetWine.vintage, targetWine.name, vkntemplate);
        insertLinkAndProtokoll(targetWine.vintage, vkn.displayTitle, drinkdate);
    }

    // Trash the quickVKN after use
    existingQuickVKN.isTrashed = true;
    formatAndUpdate(existingQuickVKN);
}

function updateExistingVKN(existingVKN, vintage, drinkdate, content) {
    let vintageHeader = `## Jahrgang ${vintage}`;
    let dateHeader = `### verkostet am ${drinkdate}`;
    let lines = existingVKN.content.split('\n');

    // Find the index of the vintage header
    let vintageIndex = lines.findIndex(line => line.trim() === vintageHeader);

    if (vintageIndex === -1) {
        // If the vintage doesn't exist, add it at the end with a blank line before
        lines.push(vintageHeader, dateHeader, ...content.split('\n'), '');
    } else {
        if (vintageIndex === 0 || lines[vintageIndex - 1].trim() !== '') {
            lines.splice(vintageIndex, 0, '');
            vintageIndex++;
        }

        // Find where to insert the new tasting note
        let insertIndex = vintageIndex + 1;
        while (insertIndex < lines.length && !lines[insertIndex].startsWith('## ')) {
            insertIndex++;
        }

        // Insert the new tasting note
        lines.splice(insertIndex, 0, dateHeader, ...content.split('\n'));
    }

    // Join the lines back together
    existingVKN.content = lines.join('\n');

    formatAndUpdate(existingVKN);
    insertLinkAndProtokoll(vintage, existingVKN.displayTitle, drinkdate);
}

function insertLinkAndProtokoll(vintage, displayTitle, drinkdate) {
    let linkText = `${vintage} [[${displayTitle}]]`;
    let [st, len] = editor.getSelectedRange();

    if (line.search(/Wein:/) == -1) {
        editor.setSelectedText("Wein: " + linkText);
    } else {
        line = line.trim();
        editor.setSelectedText(", " + linkText);
    }
    editor.setSelectedRange(st + linkText.length, 0);

    let protokoll = Draft.queryByTitle("Weinprotokoll")[0];
    let protokolleintrag = `${drinkdate} - ${linkText}`;
    curateProtokoll(protokoll, protokolleintrag, drinkdate);
}

function handleVKNSelection(drinkdate) {
    let workspace = Workspace.find("Verkostungsnotizen");
    let d = app.selectDraft(workspace);
    if (d) {
        if (d.displayTitle === '+++ Neuen Wein hinzufügen +++') {
            let addVKN = Prompt.create();
            addVKN.title = "Wein verkostet";
            addVKN.message = "Erzeugt eine neue Verkostungsnotiz und verlinkt sie im Tagebuch.";
            addVKN.addTextField("vintage", "Jahrgang", "");
            addVKN.addTextField("wine", "Weingut, Wein", "");
            addVKN.addButton("VKN erstellen");

            if (addVKN.show() && addVKN.buttonPressed === "VKN erstellen") {
                let vintage = addVKN.fieldValues["vintage"];
                let wine = addVKN.fieldValues["wine"];
                let vkntemplate = `## Jahrgang ${vintage}\n### verkostet am ${drinkdate}\nℹ️ \n👃 \n👄 \n💬 \n⭐ `;

                let vkn = createVKN(vintage, wine, vkntemplate);
                insertLinkAndProtokoll(vintage, vkn.displayTitle, drinkdate);
            }
        } else if (d.displayTitle === '+++ Schnell-VKN übernehmen +++') {
            let quickVKNs = Draft.query("", "inbox", ["quickvkn"], [], "created", true, false);
            if (quickVKNs.length > 0) {
                let quickVKNPrompt = Prompt.create();
                quickVKNPrompt.title = "Schnell-VKN auswählen";
                quickVKNPrompt.message = "Wähle eine Schnell-VKN aus:";
                quickVKNs.forEach(quickVKN => {
                    quickVKNPrompt.addButton(quickVKN.displayTitle);
                });

                if (quickVKNPrompt.show() && quickVKNPrompt.buttonPressed) {
                    let selectedQuickVKN = quickVKNs.find(quickVKN => quickVKN.displayTitle === quickVKNPrompt.buttonPressed);
                    useQuickVKN(selectedQuickVKN, drinkdate);
                }
            } else {
                app.displayWarningMessage("Keine Schnell-VKNs gefunden");
            }
        } else {
            // Handle existing VKN
            let vinTasted = d.content.match(/^## Jahrgang .*$/gm);
            if (vinTasted !== null) {
                let vinTastedTrmd = vinTasted.map(x => x.replace(/## Jahrgang /g, ''));
                let vintagePrompt = Prompt.create();
                vintagePrompt.title = "Verkosteter Jahrgang";
                vintagePrompt.message = "Welcher Jahrgang wurde verkostet?";
                vinTastedTrmd.forEach(x => vintagePrompt.addButton(x));
                vintagePrompt.addButton("Neuer Jahrgang");

                if (vintagePrompt.show() && vintagePrompt.buttonPressed !== "") {
                    let enteredVintage = vintagePrompt.buttonPressed;
                    let vintageTemplate = `### verkostet am ${drinkdate}\nℹ️ \n👃 \n👄 \n💬 \n⭐ `;

                    if (enteredVintage === "Neuer Jahrgang") {
                        let newVintagePrompt = Prompt.create();
                        newVintagePrompt.title = "Neuer Jahrgang";
                        newVintagePrompt.addTextField("neuerJahrgang", "Neuer Jahrgang", "");
                        newVintagePrompt.addButton("OK");

                        if (newVintagePrompt.show() && newVintagePrompt.buttonPressed === "OK") {
                            enteredVintage = newVintagePrompt.fieldValues["neuerJahrgang"];
                        }
                    }

                    if (enteredVintage !== "") {
                        if (d.content.includes(`## Jahrgang ${enteredVintage}`)) {
                            d.content = d.content.replace(`## Jahrgang ${enteredVintage}`, `## Jahrgang ${enteredVintage}\n${vintageTemplate}`);
                        } else {
                            let enteredVintageTemplate = `\n## Jahrgang ${enteredVintage}\n${vintageTemplate}`;
                            d.content += `${enteredVintageTemplate}`;
                        }
                        formatAndUpdate(d);

                        if (line.search(/Wein:/) !== -1) {
                            line = line.trim();
                            editor.setSelectedText(', ' + enteredVintage + ` [[${d.displayTitle}]]`);
                        } else {
                            editor.setSelectedText('Wein: ' + enteredVintage + ` [[${d.displayTitle}]]`);
                        }

                        let protokoll = Draft.queryByTitle("Weinprotokoll")[0];
                        let protokolleintrag = `${drinkdate} - ${enteredVintage} [[${d.displayTitle}]]`;
                        curateProtokoll(protokoll, protokolleintrag, drinkdate);
                    }
                }
            }
        }
    } else {
        app.displayWarningMessage("Aktion abgebrochen");
    }
}

// Main script
var [lStart, lEnd] = editor.getSelectedLineRange();
var line = editor.getTextInRange(lStart, lEnd);
let drinkyear = getYearFromTitle();
let drinkdate = getDrinkDate(line, drinkyear);

if (!editor.draft.displayTitle.startsWith('Journal culinaire') && !showWarningPrompt()) {
    context.cancel();
} else {
    handleVKNSelection(drinkdate);
}
