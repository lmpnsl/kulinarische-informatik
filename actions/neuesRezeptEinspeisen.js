tags = ['rezept', 'neuesrezept']

let allTags = Tag.query("");
let regex = /^rezept\//
let rezeptTags = allTags
    .filter(eintrag => regex.test(eintrag))  // Nur die Einträge behalten, die mit "rezept/" beginnen
    .map(eintrag => eintrag.replace(regex, ''));  // "rezept/" aus den gefilterten Einträgen entfernen

let prompt = Prompt.create();
prompt.title = 'Tags zuweisen';
prompt.message = 'Wähle aus der Liste.\nUm neue Tags einzugeben, drücke Cancel und gib manuell oben in der Tag-Zeile ein. Führe diese Action dann nochmal aus.'
prompt.addSelect('selection', '', rezeptTags, [], true);
prompt.addButton("OK", 1, true)

if (prompt.show()) {
  var selectedTags = prompt.fieldValues['selection'];
  let praefix = "rezept/";
  let tagList = selectedTags.map(tag => praefix + tag);
  tags.push(...tagList);
}

if (prompt.buttonPressed == 1) {
  draft.append(tags);
  tags.forEach(function(tag) {
    draft.addTag(tag);
  });
  draft.isArchived = true;
  draft.update();
}

