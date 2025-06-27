# Journal-Verwaltung

📖 **Navigation**: [🏠 Hauptseite](../../README.md) | [⚙️ Installation](../../docs/installation.md) | [🍳 Rezepte](../rezept-verwaltung/README.md) | [🍷 Wein](../wein-verwaltung/README.md)

---

Das kulinarische Journal ist das Herzstück des gesamten Systems. Es dokumentiert täglich, was gekocht und gegessen wurde, und verbindet alle anderen Bereiche (Rezepte, Wein, Gäste) miteinander.

## 📋 Überblick

Das Journal-System besteht aus:
- **Einem zentralen Journal-Draft** pro Jahr
- **Wochenweiser Struktur** mit automatischen Datumstabellen
- **Täglichen Einträgen** mit verschiedenen Optionen
- **Automatischer Verlinkung** zu Rezepten, Wein und Gästen

## 🔧 Actions im Detail

### 1. Neue Woche ins Journal

**Zweck**: Erstellt automatisch eine neue Woche mit formatierter Datumstabelle

**Funktionsweise**:
- Berechnet aktuelle Kalenderwoche (KW)
- Erstellt Montag bis Sonntag mit Datumsangaben
- Fügt am Anfang des Journals ein (Position 1)
- Format: `Mo 27.12. - `, `Di 28.12. - `, etc.

**Wann verwenden**:
- Zu Wochenbeginn (meist Montag)
- Wenn neue Woche im Journal fehlt
- Bei der ersten Einrichtung des Journals

**⚠️ Voraussetzung**: 
- Draft "Journal culinaire YYYY" muss existieren (mit aktuellem Jahr!)

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

### 2. kulinarischer Tagebucheintrag

**Zweck**: Hauptaction für tägliche Essenseinträge mit vielseitigen Optionen

**Intelligentes Verhalten**:
- **Außerhalb des Journals**: Springt automatisch zum heutigen Tag
- **Im Journal**: Arbeitet mit der aktuell ausgewählten Zeile
- **Automatische Datumssuche**: Findet den heutigen Tag im Journal

**Menü-Optionen**:

#### Option 1: "OK" - Freier Eintrag
- Textfeld für beliebige Eingabe
- Direkter Text wird eingefügt
- Für einfache Notizen, Restaurants, etc.

#### Option 2: "Rezept gekocht" 
- **Rezept-Auswahl**: Öffnet Rezepte-Workspace zur Auswahl
- **Automatische Verlinkung**: Rezeptname wird eingefügt
- **Intelligente Positionierung**: `;` als Trenner wenn schon Text vorhanden
- **Bewertungsabfrage**: Bei neuen Rezepten (Tag `neuesrezept`)
  - "hat gut geschmeckt!" → entfernt `neuesrezept`-Tag
  - "das koche ich nie wieder!" → wandelt zu `verworfenesrezept`

> **💡 Integration**: Diese Option nutzt die [Rezept-Verwaltung](../rezept-verwaltung/README.md) - Rezepte müssen korrekt getaggt sein!

#### Option 3: "es gab Reste"
- Fügt `(Reste)` ein
- Für Tage mit Aufwärmgerichten

#### Option 4: "heute nicht gekocht"
- Fügt `(nichts)` ein  
- Für Tage ohne eigenes Kochen

**Automatisierungen**:
- **Flag entfernen**: Ausgewählte Rezepte werden "unflagged"
- **Sofortige Bewertung**: Neue Rezepte können direkt bewertet werden
- **Erfolgsrückmeldung**: Bestätigung der Bewertung

## 🗓️ Journal-Struktur

### Jahresjournal
```
Titel: Journal culinaire 2025
Inhalt: Chronologische Wochen, neueste oben
```

### Wochenformat
```
KW 52

Mo 27.12. - Pasta Carbonara; Tiramisu
Di 28.12. - (Reste)
Mi 29.12. - [[Coq au Vin]] Wein: 2019 [[Côtes du Rhône Rouge]]
Do 30.12. - (nichts)
Fr 31.12. - [[Silvestermenü]] (zu Besuch: Anna, Marcus)
Sa 01.01. - (Reste)
So 02.01. - [[Neujahrsbrunch]]

KW 51
...
```

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

## 🔄 Typische Workflows

### Wöchentlicher Start
```
1. Montags: "Neue Woche ins Journal" ausführen
2. Neue KW wird oben eingefügt
3. Woche ist bereit für tägliche Einträge
```

### Täglicher Eintrag - Einfach
```
1. "kulinarischer Tagebucheintrag" ausführen
2. Option "OK" wählen
3. Text eingeben: "Pizza bestellt"
4. Fertig
```

### Täglicher Eintrag - Rezept gekocht
```
1. "kulinarischer Tagebucheintrag" ausführen
2. Option "Rezept gekocht" wählen
3. Rezept aus Workspace auswählen
4. Bei neuem Rezept: Bewertung abgeben
5. Rezept wird verlinkt und bewertet
```

### Komplexer Eintrag (manuell)
```
1. Zum gewünschten Tag navigieren
2. Manuell ergänzen:
   "[[Coq au Vin]] Wein: 2019 [[Côtes du Rhône]] (zu Besuch: Anna)"
3. Andere Actions nutzen:
   - "Weinflasche entkorkt" für Weinnotiz
   - "Besuch war da" für Gästedokumentation
```

## 🏗️ Voraussetzungen

### Erforderlicher Draft
```
Titel: Journal culinaire 2025
       ^^^^^^^^^^^^^^^^^ 
       Exakt mit aktuellem Jahr!
Inhalt: Leer beim ersten Start
Tags: Keine speziellen erforderlich
```

**⚠️ Kritisch**: 
- Titel muss **exakt** stimmen
- Jahr muss aktuell sein
- Jährlich neuen Draft erstellen

### Erforderlicher Workspace
```
Name: Rezepte
Filter: Tag enthält "rezept"
```

Wird für Rezept-Auswahl benötigt.

## 🎯 Praktische Tipps

### Journal-Organisation
- **Neueste Woche oben**: Chronologisch rückwärts für bessere Navigation
- **Jeden Tag dokumentieren**: Auch wenn nur `(nichts)` - Kontinuität ist wichtig
- **WikiLinks nutzen**: `[[Rezeptname]]` macht Einträge anklickbar und verlinkt zu Rezepten
- **Syntax-Einstellung**: Wähle in den Editor-Einstellungen die Syntax "Journal culinaire" für besseres Highlighting

### Eintragsstrategie
- **Sofort dokumentieren**: Am besten direkt nach dem Essen
- **Abends sammeln**: Alle Mahlzeiten des Tages auf einmal
- **Wöchentlich ergänzen**: Rückblickend vervollständigen
- **Konsistente Syntax**: Nutze die Trennzeichen systematisch

### Integration optimieren
- **Vor dem Kochen**: Rezept auf Kochplan setzen
- **Während dem Kochen**: Kochmodus aktivieren
- **Nach dem Essen**: Journal-Eintrag mit Bewertung
- **Bei Weinverkostung**: Weinnotiz direkt im Journal erstellen

## 🔍 Navigation und Suche

### Im Journal navigieren
- **Aktueller Tag**: Action findet automatisch heutiges Datum
- **Manuell**: Scroll zu gewünschtem Datum
- **Suche**: Drafts-Suche nach Rezeptnamen, Daten, etc.

### Verknüpfungen folgen
- **Rezept-Links**: `[[Rezeptname]]` → Sprung zum Rezept
- **Wein-Links**: `[[Weinname]]` → Sprung zur Verkostungsnotiz
- **Gäste-Links**: Über "Besuch war da" zu Gästeprofilen


## 🔧 Anpassungen

### Jahreswechsel
```
1. Neuen Draft erstellen: "Journal culinaire 2026"
2. Altes Journal kann archiviert bleiben
3. Actions arbeiten automatisch mit neuem Jahr
```

## 📊 Integration mit anderen Actions

### Direkte Verknüpfungen
- **"Weinflasche entkorkt"**: Erstellt Wein-Link im Journal
- **"Besuch war da"**: Fügt Gäste-Information hinzu
- **"auf den Kochplan setzen!"**: Plant Rezepte für Journal-Einträge

### Workflow-Integration
```
Planung → Kochen → Dokumentation:
1. "Kochplan zeigen" - Was steht an?
2. "Kochmodus" - Während dem Kochen
3. "kulinarischer Tagebucheintrag" - Dokumentation
4. "Weinflasche entkorkt" - Falls Wein dazu
```