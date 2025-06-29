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

1. Lade die Action-Dateien aus dem Repository herunter
2. Erstelle für jede gewünschte Funktion eine neue Action in Drafts:
    - "Manage Actions" → "+" → "New Action"
    - Füge einen "Script" Action Step hinzu
    - Kopiere den JavaScript-Code aus der entsprechenden .js-Datei
3. Erstelle die benötigten Drafts (siehe unten)
4. Passe die Workspace-Konfiguration an deine Bedürfnisse an

## benötigte Drafts

Das System arbeitet mit folgenden Drafts. Diese Drafts müssen vorab manuell erstellt werden. Die fett markierten Namen müssen exakt als Überschrift verwendet werden:

- **Journal culinaire YYYY**: Hauptjournal für das jeweilige Jahr; mit Tag "journalculinaire"
- **Kochplan**: Zentrale Kochplanung
- **Weinprotokoll**: Chronologische Weinverkostungen
- **Backprotokoll**: Dokumentation der Backergebnisse
- **Rezept-Drafts**: Mit Tags "rezept", "neuesrezept" oder "verworfenesrezept"
- **VKN-Drafts**: Verkostungsnotizen mit Tag "vkn"
- **Gäste-Drafts**: Mit Tag "besuch"
- Drafts zur Menüplanung: Tag "menüplanung"

**Beispiel:**
```
# Journal culinaire 2025

       EXAKT so schreiben! Mit aktuellem Jahr!

Tag: journalculinaire
Inhalt: wird automatisch befüllt
```

## Workspaces (empfohlen)

- **Rezepte**: Für die Rezeptverwaltung
- **Menüplanung**: Für Menüplanungen
- **Verkostungsnotizen**: Für Weinnotizen
- **Besuchsbuchführung**: Alphabetische Liste aller Gäste
- **kochen!**: Geflaggte Rezepte für die Küchenpraxis
- **Neue Rezepte**: Noch nicht getestete Rezepte
- **Journale**: Für alle Journale (auch aus älteren Jahren)

## Workflow

**Planung → Kochen → Dokumentation:**

1. Kochplan erstellen/anzeigen
2. Kochmodus aktivieren (beim Kochen)
3. Kulinarischer Tagebucheintrag (nach dem Essen)
4. Weinflasche entkorkt (falls Wein dazu)
5. Besuch war da (falls Gäste da waren)

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
Mo 27.12. - Müsli. [[Coq au Vin]], Kartoffeln, Bohnen; [[Tiramisu]] Wein: 2019 [[Côtes du Rhône]] (zu Besuch: Anna, Marcus)
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
- **Kulinarischer Tagebucheintrag**: Tägliche Essenseinträge. Menü erlaubt häufige Optionen ("Rezept gekocht", "Es gab Reste" usw.); die Auswahl "Rezept gekocht" erlaubt eine Auswahl und schließt weitere Prozession der Rezepteverwaltung an.
- **Neue Woche ins Journal**: Erstellt automatisch eine neue Woche mit formatierter Datumstabelle

### Rezept-Verwaltung
- **Neues Rezept einspeisen**: Rezepte kategorisieren und taggen
- **Hat gut geschmeckt!**: Bewertungssystem nach dem Kochen
- **Das koche ich nie wieder!**: Schlechte Rezepte aussortieren
- **Tags zuweisen:** Tags zu bestehenden Drafts hinzufügen aus einer Auswahl bereits vergebener Tags. Die Tags nutzen den Namespace `rezept`, also z.B. `rezept/suppe`, `rezept/vegetarisch` usw.

### Kochplanung
- **auf den Kochplan setzen**: Rezept zum Kochen vormerken
- **Kochplan aufräumen**: Erledigte Einträge entfernen
- **Kochplan zeigen**: Aktuellen Plan anzeigen
- **Kochmodus**: Fokus-Modus fürs Kochen (kein Bildschirm-Timeout, keine versehentlichen Bearbeitungen)
- **auf die Einkaufsliste**: Zutaten aus Rezept auswählen und zur iOS Erinnerungen-App hinzufügen

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

## Lizenz

MIT License - siehe LICENSE für Details.

---

*Die Dokumentation wurde von Claude geschrieben.*