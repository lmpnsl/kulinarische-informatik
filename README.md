# Kulinarische Informatik

Ein persönliches System für Hobbyköche zur kulinarischen Dokumentation. Eine Sammlung von Actions für die App [Drafts](https://getdrafts.com), entwickelt für die eigene Küchenpraxis und den Austausch mit Freunden.

## Features

- Kulinarisches Journaling
- Rezeptverwaltung
- Menüplanung und Kochplanung
- Weinverkostungsnotizen
- Besuchsbuchführung
- Bäckerei-Dokumentation

## Voraussetzungen

- Drafts 5.x oder höher
- iOS, iPadOS oder macOS
- Deutsche Sprache

## Installation

**Option A: Automatische Installation (empfohlen)**

1. **Action Group installieren:**
  Die [Install-URL](/installation/actiongroup-install-url.txt) aufrufen.

2. **Workspaces installieren:**
  Klicke auf die Install-Links für die empfohlenen Workspaces:
  
    - [Rezepte](/installation/workspace-rezepte.txt)
    - [Verkostungsnotizen](/installation/workspace-vkn.txt)
    - [Besuchsbuchführung](/installation/workspace-besuch.txt)
    - [kochen!](/installation/workspace-kochen.txt)
    - [Neue Rezepte](/installation/workspace-neue-rezepte.txt)
    - [Journales culinaires](/installation/workspace-journales.txt)

1. Erstelle die benötigten Drafts (siehe unten)

**Option B: Manuelle Installation**

1. Lade die Action-Dateien aus dem Repository herunter
2. Erstelle für jede gewünschte Funktion eine neue Action in Drafts:
   - "Manage Actions" → "+" → "New Action"
   - Füge einen "Script" Action Step hinzu
   - Kopiere den JavaScript-Code aus der entsprechenden .js-Datei
3. Erstelle die benötigten Drafts (siehe unten)
4. Passe die Workspace-Konfiguration an deine Bedürfnisse an

**Hinweis:** Die Install-URLs funktionieren nur, wenn Drafts bereits auf dem Gerät installiert ist. Bei Problemen nutzen Sie die manuelle Installation.

## benötigte Drafts

Das System arbeitet mit folgenden Drafts. Diese Drafts müssen vorab manuell erstellt werden. Die fett markierten Namen müssen exakt als Überschrift verwendet werden:

- **Journal culinaire YYYY**: Hauptjournal für das jeweilige Jahr; mit Tag 'journalculinaire'
- **Kochplan**: Zentrale Kochplanung
- **Weinprotokoll**: Chronologische Weinverkostungen
- **Backprotokoll**: Dokumentation der Backergebnisse
- **Rezept-Drafts**: Mit Tags `rezept`, `neuesrezept` oder `verworfenesrezept`
- **VKN-Drafts**: Verkostungsnotizen mit Tag `vkn`
- **Gäste-Drafts**: Mit Tag `besuch`

Außerdem benötigt man zwei spezielle Drafts für die Wein-Action:
- **+++ Neuen Wein hinzufügen +++**: Trigger-Draft für neue Verkostungsnotizen mit dem genauen Inhalt:
```
# +++ Neuen Wein hinzufügen +++
Ist der Wein nicht dabei? Dann füge eine neue VKN hinzu! 🍾
```
- **+++ Schnell-VKN übernehmen +++**: Trigger-Draft für Quick-VKN-Verarbeitung mit dem genauen Inhalt:
```
# +++ Schnell-VKN übernehmen +++
VKN schon angelegt? Verkostungsnotitz übernehmen 🍷
```

**Beispiel:**
```markdown
1  # Journal culinaire 2025
```

Zusätzlich werden manuell getaggte Drafts in verschiedene Abläufe einbezogen.
- Rezept-Drafts mit Tags `rezept`, `neuesrezept` oder `verworfenesrezept`
- Drafts zur Menüplanung: Tag `menüplanung`
- Journal-Drafts sowie das Weinprotokoll sollten mit `journalculinaire` getaggt werden, um bequem per Workspace erreichbar zu sein.


## Workspaces (empfohlen)

- **Rezepte**: Für die Rezeptverwaltung (Tag `rezept`, Archive)
- **Verkostungsnotizen**: Für Weinnotizen (Tag `vkn`, Archive)
- **Besuchsbuchführung**: Alphabetische Liste aller Gäste (Tag `besuch`, Archive, alphabetisch sortiert)
- **kochen!**: Geflaggte Rezepte für die Küchenpraxis (Flag, Inbox + Archive)
- **Neue Rezepte**: Noch nicht getestete Rezepte (Tag `neuesrezept`, Archive)
- **Journale**: Für alle Journale (auch aus älteren Jahren) (Tag `journalculinaire`)
- **Verkostungsnotizen**: Für verkostete Weine (Tag `vkn`, Archive, alphabetisch sortiert)


## das Journal culinaire

Das kulinarische Journal ist das Herzstück des Systems. Es dokumentiert täglich, was gekocht und gegessen wurde, und verbindet alle anderen Bereiche (Rezepte, Wein, Gäste) miteinander.


### Wochenformat

Wöchentlich (am besten Montags) muss die Action **Neue Woche ins Journal** ausgelöst werden (am besten Erinnerung einstellen). Sie legt oben im Draft eine Wochenstruktur an:

```
Beispiel-Output:
KW 52

Mo 27.12. - 
Di 28.12. - 
Mi 29.12. - 
Do 30.12. - 
Fr 31.12. - 
Sa 01.01. - 
So 02.01. - 
```

Hier wird dann manuell oder mithilfe der Action **kulinarischer Tagebucheintrag** ausgefüllt.

### Eintragssyntax
Die Einträge folgen einer logischen Struktur - nutze diese Trennzeichen für bessere Lesbarkeit:

- **Komma `,`**: Verschiedene Elemente eines Gerichts
  - `Pasta Carbonara, grüner Salat`
- **Semikolon `;`**: Verschiedene Gänge eines Menüs  
  - `Vorspeise; Hauptgang; Dessert`
- **Punkt `.`**: Verschiedene Mahlzeiten des Tages
  - `Frühstück. Mittagessen (mittags). Abendessen`
- **Klammern `()`**: Besonderheiten und Notizen
  - `(Reste)`, `(nichts)`, `(Restaurant)`, `(Anna hat gekocht)`

**Beispiel komplexer Eintrag:**
```
Mo 27.12. - Müsli. Coq au Vin, Kartoffeln, Bohnen; Tiramisu. Wein: 2019 [[Côtes du Rhône]] (zu Besuch: Anna, Marcus)
```

**Beispiel Woche im Journal:**

```
KW 52

Mo 27.12. - Kürbissuppe (mittags). Pasta Carbonara; Tiramisu
Di 28.12. - (Reste)
Mi 29.12. - [[Coq au Vin]] Wein: 2019 [[Côtes du Rhône Rouge]]
Do 30.12. - (nichts)
Fr 31.12. - [[Silvestermenü]] (zu Besuch: Anna, Marcus)
Sa 01.01. - (Reste)
So 02.01. - [[Neujahrsbrunch]]

KW 51
...
```

## Besuchsbuchführung

Am Ende jeder Journal-Zeile kann Besuch eingegeben werden. Jeder Gast hat einen eigenen Draft (Tag `besuch`), zu dem die jeweilige Journal-Zeile (mit Datum, Essen, Weinen) hinzugefügt wird.

## Wein

Ähnlich funktioniert die Weinverkostung: Jeder verkostete Wein hat einen Draft (Tag `vkn`).

### Verkostungsnotiz

```markdown
# Weingut Name, Weinname

## Jahrgang 2019
### verkostet am 27.12.2024
ℹ️ Allgemeine Infos (Region, Rebsorte, etc.)
👃 Nase/Bouquet
👄 Geschmack
💬 Eindruck/Notizen
⭐ Bewertung
```

Die Weinverkostungs-Action hat drei Modi:

#### 1. Neuen Wein hinzufügen
- **Eingabe**: Jahrgang + Weingut/Wein
- **Template**: Vollständige VKN-Struktur mit Emoji-Platzhaltern
- **Automatik**: VKN wird erstellt, archiviert, getaggt
- **Verlinkung**: Journal + Weinprotokoll werden aktualisiert

#### 2. Schnell-VKN übernehmen
- **Voraussetzung**: Quick-VKN in Inbox vorhanden
- **Verarbeitung**: 
  - Name/Jahrgang werden validiert und korrigiert
  - Bestehende VKN wird gesucht
  - Neue VKN wird erstellt oder bestehende erweitert
- **Cleanup**: Quick-VKN wird nach Übernahme gelöscht

#### 3. Bestehende VKN erweitern
- **Jahrgangs-Auswahl**: Aus bereits verkosteten Jahrgängen
- **Option "Neuer Jahrgang"**: Für weitere Jahrgänge derselben Kellerei
- **Template-Einfügung**: Neue Verkostungsnotiz wird eingefügt

## Actions

### Journal-Verwaltung
- **Kulinarischer Tagebucheintrag**: Tägliche Essenseinträge. Menü erlaubt häufige Optionen ("Rezept gekocht", "Es gab Reste" usw.); die Auswahl "Rezept gekocht" erlaubt eine Auswahl und schließt ggf. weitere Prozession der Rezepteverwaltung an.
- **Neue Woche ins Journal**: Erstellt automatisch eine neue Woche mit formatierter Datumstabelle
- **Kalenderwochen sortieren**: Im Journal steht die aktuelle Woche oben für schnellen Zugriff beim Schreiben. Die Action sortiert die Wochen in der kalendarisch richtigen Ordnung – am besten am Anfang des neuen Jahres ausführen und dann archivieren.

### Rezept-Verwaltung
- **Neues Rezept einspeisen**: Rezepte kategorisieren und taggen
- **Hat gut geschmeckt!**: als bewährtes Rezept archivieren
- **Das koche ich nie wieder!**: als schlechtes Rezepte aussortieren
- **Tags zuweisen:** Tags zu bestehenden Drafts hinzufügen aus einer Auswahl bereits vergebener Tags. Die Tags nutzen den Namespace `rezept`, also z.B. `rezept/suppe`, `rezept/vegetarisch` usw.

### Kochplanung
- **auf den Kochplan setzen**: Rezept zum Kochen vormerken
- **Kochplan aufräumen**: Erledigte Einträge entfernen
- **Kochplan zeigen**: Aktuellen Plan anzeigen
- **Kochmodus**: Fokus-Modus fürs Kochen (kein Bildschirm-Timeout, keine versehentlichen Bearbeitungen)
- **auf die Einkaufsliste**: Zutaten aus Rezept auswählen, ggf. Mengen umrechnen und zur iOS Erinnerungen-App hinzufügen

### Wein-Verwaltung
- **Weinflasche entkorkt**: Wein mit detaillierte Verkostungsnotizen (VKN) ins Journal aufnehmen
- **Quick-VKN** - Schnelle Notizen für spontane Verkostungen. 

### Weitere
- **zur Menüplanung hinzufügen**: Rezepte und Weine zu aktuellen Menüplanungsdrafts hinzufügen
- **Besuch war da**: Gäste dokumentieren, automatische Gästeprofile
- **Brot gebacken**: Backergebnisse mit automatischem Backprotokoll



## Konfiguration

Setze den Kochplan in den Editor-Einstellungen auf Syntax "TaskPaper+" - dann können Einträge durch Antippen abgehakt werden.

### iOS Erinnerungen-Integration
Die Action **auf die Einkaufsliste** verwendet die iOS Erinnerungen-App:

1. Erstelle eine Erinnerungsliste namens "Einkaufen" in der iOS Erinnerungen-App
2. Oder passe in der Action den Listennamen in Zeile 4 an: 
   
```javascript
4  const shoppingList = ReminderList.findOrCreate("DeinListenname");
```
## Workflow

**Planung → Kochen → Dokumentation:**

1. Kochplan erstellen/anzeigen
2. Kochmodus aktivieren (beim Kochen)
3. Kulinarischer Tagebucheintrag (nach dem Essen)
4. Weinflasche entkorkt (falls Wein dazu)
5. Besuch war da (falls Gäste da waren)

### Syntax
Für die Syntax im Journal culinaire gibt es eine spezielle [Drafts-Syntax](/syntax/), die installiert werden kann.

## Lizenz

MIT License - siehe [LICENSE](LICENCE.txt) für Details.

---

*Die Dokumentation wurde von Claude geschrieben.*