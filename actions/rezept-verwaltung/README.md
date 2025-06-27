# Rezept-Verwaltung

📖 **Navigation**: [🏠 Hauptseite](../../README.md) | [⚙️ Installation](../../docs/installation.md) | [📝 Journal](../journal-verwaltung/README.md) | [🍷 Wein](../wein-verwaltung/README.md)

---

Die Rezept-Verwaltung ist das Herzstück des kulinarischen Systems. Sie ermöglicht es, Rezepte strukturiert zu erfassen, zu bewerten und zu organisieren.

## 📋 Überblick

Das System verwaltet Rezepte in drei Lebensphasen:
1. **Neue Rezepte** (`neuesrezept`) - noch nicht getestet
2. **Bewährte Rezepte** (`rezept`) - haben gut geschmeckt  
3. **Verworfene Rezepte** (`verworfenesrezept`) - werden nicht mehr gekocht

## 🔧 Actions im Detail

### 1. neues Rezept einspeisen

**Zweck**: Strukturierte Erfassung neuer Rezepte mit automatischer Tag-Vergabe

**Workflow**:
1. Rezept in einem neuen Draft schreiben
2. Action ausführen
3. Aus vorhandenen Kategorien auswählen (z.B. `rezept/hauptgang`)
4. Rezept wird automatisch getaggt und archiviert

**Tags die automatisch gesetzt werden**:
- `rezept` - Grundtag
- `neuesrezept` - Markiert als "noch nicht getestet"
- `rezept/kategorie` - Gewählte Kategorien

**⚠️ Wichtig**: 
- Der Draft wird automatisch archiviert
- Neue Tag-Kategorien müssen manuell erstellt werden

```javascript
// Beispiel-Tags nach Ausführung:
// rezept, neuesrezept, rezept/hauptgang, rezept/fleisch
```

### 2. hat gut geschmeckt!

**Zweck**: Positive Bewertung nach dem Kochen

**Workflow**:
1. Bei einem Rezept mit Tag `neuesrezept` ausführen
2. Tag `neuesrezept` wird automatisch entfernt
3. Rezept behält nur `rezept` + Kategorien

**Ergebnis**: Rezept wird zu den "bewährten Rezepten"

### 3. das koche nie wieder!

**Zweck**: Negative Bewertung - Rezept verwerfen

**Workflow**:
1. Bei einem Rezept mit Tag `neuesrezept` ausführen
2. Alle Rezept-Tags werden entfernt
3. Tag `verworfenesrezept` wird gesetzt
4. Rezept verschwindet aus dem Rezepte-Workspace

**⚠️ Wichtig**: Verworfene Rezepte sind noch da, aber ausgeblendet

### 4. Tags zuweisen

**Zweck**: Nachträgliche Tag-Verwaltung für bestehende Rezepte

**Workflow**:
1. Bei einem beliebigen Draft ausführen
2. Aus allen verfügbaren `rezept/`-Tags auswählen
3. Gewählte Tags werden hinzugefügt
4. Draft wird **nicht** archiviert

**Unterschied zu "neues Rezept einspeisen"**:
- Fügt nur gewählte Tags hinzu
- Setzt nicht automatisch `rezept` + `neuesrezept`
- Archiviert nicht automatisch

## 🏷️ Tag-System

### Grundtags
- `rezept` - Alle aktiven Rezepte
- `neuesrezept` - Noch nicht getestete Rezepte
- `verworfenesrezept` - Nicht empfehlenswerte Rezepte

### Kategorien (Beispiele)
```
rezept/hauptgang
rezept/vorspeise  
rezept/dessert
rezept/backen
rezept/vegetarisch
rezept/fleisch
rezept/fisch
rezept/pasta
rezept/suppe
rezept/salat
```

### Eigene Kategorien erstellen
1. In Drafts: Tag-Einstellungen öffnen
2. Neuen Tag erstellen: `rezept/ihre-kategorie`
3. Tag wird automatisch in den Actions verfügbar

## 🔄 Typischer Workflow

### Neues Rezept erfassen
```
1. Draft erstellen mit Rezeptinhalt
2. "neues Rezept einspeisen" ausführen
3. Kategorien auswählen (z.B. "hauptgang", "fleisch")
4. Rezept wird archiviert mit Tags: rezept, neuesrezept, rezept/hauptgang, rezept/fleisch
```

### Nach dem Kochen bewerten
```
Option A - Hat geschmeckt:
1. Rezept öffnen (oder im kulinarischen Journal)
2. "hat gut geschmeckt!" ausführen  
3. Tag "neuesrezept" wird entfernt
4. Rezept ist jetzt "bewährt"

Option B - War schlecht:
1. Rezept öffnen
2. "das koche nie wieder!" ausführen
3. Rezept wird verworfen und ausgeblendet
```

### Nachträgliche Kategorisierung
```
1. Bestehendes Rezept öffnen
2. "Tags zuweisen" ausführen
3. Zusätzliche Kategorien auswählen
4. Tags werden hinzugefügt (ohne Archivierung)
```

## 🏗️ Voraussetzungen

### Erforderlicher Workspace
```
Name: Rezepte
Filter: Tag enthält "rezept"
```

**⚠️ Kritisch**: Der Workspace muss **exakt** "Rezepte" heißen!

### Empfohlener zusätzlicher Workspace: "kochen!"
```
Name: kochen!
Filter: Geflaggte Drafts UND Tag enthält "rezept"
```

Dieser Workspace zeigt nur **geflaggte Rezepte** - perfekt für die Küchenpraxis! Flaggen Sie Rezepte, die Sie akut kochen möchten, um sie schnell parat zu haben.

**So flaggen Sie Rezepte:**
- Rezept öffnen → Flag-Symbol antippen (⭐)
- Oder: In der Rezeptliste nach links wischen → "Flag"

### Keine speziellen Drafts erforderlich
Die Rezept-Verwaltung arbeitet direkt mit den erstellten Rezept-Drafts.

## 🎯 Praktische Tipps

### Rezepte organisieren
- **Nutzen Sie konsistente Kategorien**: Überlegen Sie sich ein System
- **Kombinieren Sie Tags**: Ein Rezept kann mehrere Kategorien haben
- **Archivierung**: Neue Rezepte werden automatisch archiviert - das ist gewollt!
- **Flag-System nutzen**: Flaggen Sie Rezepte, die Sie bald kochen möchten

### Workflow optimieren
- **Batch-Erfassung**: Mehrere Rezepte hintereinander einspeisen
- **Sofortige Bewertung**: Bewerten Sie Rezepte direkt nach dem Kochen
- **Küchenpraxis**: Nutzen Sie den "kochen!" Workspace für aktuelle Kochpläne
- **Integration**: Nutzen Sie "auf den Kochplan setzen!" für die Essensplanung

### WikiLinks verwenden
Verlinken Sie Rezepte untereinander mit **WikiLinks**:
```
[[Grundteig für Pizza]] → verlinkt zum Rezept "Grundteig für Pizza"
[[Tomatensauce]] → verlinkt zum Rezept "Tomatensauce"
```
**So funktioniert's**: Text in doppelten eckigen Klammern wird anklickbar und öffnet das entsprechende Rezept!

### Tag-Management
- **Einheitliche Benennung**: `rezept/hauptgang` statt `rezept/Hauptgang`
- **Logische Struktur**: Überlegen Sie sich Kategorien vorab
- **Regelmäßige Bereinigung**: Ungenutzte Tags gelegentlich entfernen

## 🔍 Suchen und Filtern

### Im Rezepte-Workspace
- **Alle Rezepte**: Standard-Ansicht (zeigt nur aktive Rezepte)
- **Neue Rezepte**: Filter auf Tag `neuesrezept`
- **Bestimmte Kategorie**: Filter auf `rezept/hauptgang`
- **Akut kochen**: Workspace "kochen!" für geflaggte Rezepte

### Kombinierte Filter
```
# Neue Hauptgerichte:
Tag enthält: "neuesrezept" UND "rezept/hauptgang"

# Vegetarische Desserts:
Tag enthält: "rezept/vegetarisch" UND "rezept/dessert"

# Zum sofortigen Kochen:
Geflaggte Drafts UND Tag enthält: "rezept"
```

### Verworfene Rezepte finden
```
# Separater Workspace oder Filter:
Tag enthält: "verworfenesrezept"
```

## 🚨 Häufige Probleme

### "Workspace nicht gefunden"
- Workspace muss exakt "Rezepte" heißen
- Tag-Filter muss "rezept" enthalten
- Workspace muss aktiviert sein

### Tags erscheinen nicht in Auswahl
- Nur Tags mit Präfix `rezept/` werden angezeigt
- Tags müssen in Drafts existieren
- Bei Problemen: Action "Cancel" und Tags manuell erstellen

### Rezept verschwindet nach Bewertung
- **Normal bei "das koche nie wieder!"** - Rezept wird verworfen
- Verworfene Rezepte sind noch da, aber ausgeblendet
- Über separaten Filter mit `verworfenesrezept` wieder findbar

### Automatische Archivierung unerwünscht
- **Gewollt bei "neues Rezept einspeisen"**
- Für nachträgliche Tags: "Tags zuweisen" verwenden
- Archivierte Drafts sind über "Archiv" erreichbar

## 🔧 Anpassungen

### Neue Kategorien hinzufügen
1. Drafts öffnen → Tag-Einstellungen
2. Neuen Tag erstellen: `rezept/neue-kategorie`
3. Tag ist automatisch in Actions verfügbar

### Action-Verhalten ändern
```javascript
// In "neues Rezept einspeisen" - automatische Archivierung deaktivieren:
// Zeile entfernen/auskommentieren:
draft.isArchived = true;
```

### Bewertungs-System erweitern
Sie können weitere Bewertungs-Tags einführen:
- `rezept/favorit` - Lieblingsrezepte
- `rezept/schnell` - Schnelle Gerichte
- `rezept/aufwändig` - Komplexe Rezepte

## 📊 Integration mit anderen Actions

### Kochplanung
- **"auf den Kochplan setzen!"** - Rezept für's Kochen vormerken
- **"Kochplan zeigen"** - Geplante Rezepte anzeigen

### Kulinarisches Journal
- **"kulinarischer Tagebucheintrag"** → "Rezept gekocht" - Direkte Rezeptauswahl
- Automatische Bewertungsabfrage nach dem Kochen
- *Siehe: [Journal-Verwaltung](../journal-verwaltung/README.md#kulinarischer-tagebucheintrag)*

### Einkaufsliste
- **"auf die Einkaufsliste"** - Zutaten aus Rezepten übernehmen

### Menüplanung
- **"zur Menüplanung hinzufügen"** - Rezepte in Menüs einplanen

## 📈 Workflow-Optimierung

### Für Kochanfänger
1. **Wenige Kategorien**: Starten Sie mit `hauptgang`, `dessert`, `beilage`
2. **Sofort bewerten**: Nutzen Sie die Bewertungsfunktion konsequent
3. **Kochplan nutzen**: Planen Sie Rezepte vor
4. **Flag-System**: Flaggen Sie 2-3 Rezepte, die Sie diese Woche kochen möchten

### Für Fortgeschrittene
1. **Detaillierte Kategorien**: `rezept/italienisch`, `rezept/30min`, etc.
2. **Batch-Processing**: Mehrere Rezepte gleichzeitig erfassen
3. **Cross-Referencing**: Verknüpfung mit Weinnotizen und Gästen
4. **WikiLinks**: Verlinken Sie Grundrezepte und Komponenten untereinander

### Für Profis
1. **Eigene Tags**: Erweitern Sie das System nach Ihren Bedürfnissen
2. **Action-Anpassung**: Modifizieren Sie das Verhalten der Actions
3. **Integration**: Verbinden Sie mit externen Tools (Einkaufslisten-Apps, etc.)
4. **Workflow-Automation**: Nutzen Sie iOS Shortcuts für wiederkehrende Aufgaben

## 📖 Siehe auch

- **[📝 Journal-Verwaltung](../journal-verwaltung/README.md)** - Rezepte im täglichen Journal dokumentieren
- **[🍷 Wein-Verwaltung](../wein-verwaltung/README.md)** - Passende Weine zu Rezepten notieren
- **[⚙️ Installation](../../docs/installation.md)** - Setup-Probleme lösen
- **[🏠 Hauptseite](../../README.md)** - Zurück zur Übersicht

---

**Die Rezept-Verwaltung wächst mit Ihnen - starten Sie einfach und erweitern Sie nach Bedarf! 👨‍🍳**