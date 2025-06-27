# Wein-Verwaltung

📖 **Navigation**: [🏠 Hauptseite](../../README.md) | [⚙️ Installation](../../docs/installation.md) | [📝 Journal](../journal-verwaltung/README.md) | [🍳 Rezepte](../rezept-verwaltung/README.md)

---

Die Wein-Verwaltung ist das komplexeste System der kulinarischen Actions. Sie ermöglicht detaillierte Weinverkostungsnotizen mit automatischer Protokollierung und intelligenter Verlinkung zum kulinarischen Journal.

## 📋 Überblick

Das Wein-System besteht aus:
- **Verkostungsnotizen (VKN)** - Detaillierte Weinbewertungen
- **Quick-VKN** - Schnelle Notizen für spontane Verkostungen
- **Weinprotokoll** - Chronologische Liste aller verkosteten Weine
- **Journal-Integration** - Automatische Verlinkung zu Mahlzeiten

## 🍷 Wein-Datenstruktur

### Verkostungsnotiz-Format
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

### Weinprotokoll-Format
```
27.12.2024 - 2019 [[Weingut Name, Weinname]]
28.12.2024 - 2020 [[Château Example]], 2018 [[Another Wine]]
```

## 🔧 Actions im Detail

### 1. Weinflasche entkorkt

**Zweck**: Hauptaction für Weinverkostungen mit vollständiger VKN-Erstellung

**Intelligentes Verhalten**:
- **Datumserkennung**: Automatisch aus Journal-Zeile oder heutiges Datum
- **Jahreserkennung**: Aus Journal-Titel extrahiert
- **Workspace-Integration**: Nutzt "Verkostungsnotizen"-Workspace
- **Doppelvermeidung**: Kombiniert mehrere Weine am selben Tag

**Funktionsweise**:
1. **Kontextanalyse**: 
   - Im Journal: Nutzt Zeilen-Datum
   - Außerhalb: Heutiges Datum
   - Warnung bei falscher Verwendung

2. **Wein-Auswahl über Workspace**:
   - Öffnet "Verkostungsnotizen"-Workspace
   - Spezial-Optionen verfügbar:
     - "+++ Neuen Wein hinzufügen +++"
     - "+++ Schnell-VKN übernehmen +++"
   - Bestehende VKN zur Auswahl

3. **Drei Haupt-Modi**:

#### Modus A: Neuen Wein hinzufügen
- **Eingabe**: Jahrgang + Weingut/Wein
- **Template**: Vollständige VKN-Struktur mit Emoji-Platzhaltern
- **Automatik**: VKN wird erstellt, archiviert, getaggt
- **Verlinkung**: Journal + Weinprotokoll werden aktualisiert

#### Modus B: Schnell-VKN übernehmen
- **Voraussetzung**: Quick-VKN in Inbox vorhanden
- **Verarbeitung**: 
  - Name/Jahrgang werden validiert und korrigiert
  - Bestehende VKN wird gesucht
  - Neue VKN wird erstellt oder bestehende erweitert
- **Cleanup**: Quick-VKN wird nach Übernahme gelöscht

#### Modus C: Bestehende VKN erweitern
- **Jahrgangs-Auswahl**: Aus bereits verkosteten Jahrgängen
- **Option "Neuer Jahrgang"**: Für weitere Jahrgänge derselben Kellerei
- **Template-Einfügung**: Neue Verkostungsnotiz wird eingefügt

**Automatisierungen**:
- **Journal-Link**: `Wein: 2019 [[VKN-Name]]` wird eingefügt
- **Protokoll-Update**: Chronologische Liste wird gepflegt
- **Duplikats-Behandlung**: Mehrere Weine am selben Tag werden kombiniert
- **Formatierung**: Automatische Leerzeilen-Bereinigung

### 2. Quick VKN

**Zweck**: Schnelle Weinnotizen für spontane Verkostungen

**Funktionsweise**:
1. **Kontexterkennung**: 
   - Wenn Zeile mit "- " beginnt: Weinname extrahieren
   - Sonst: Leere Vorlage

2. **Template-Erstellung**:
   ```markdown
   # Weinname (falls erkannt)
   
   ℹ️ 
   👃 
   👄 
   💬 
   ⭐ 
   ```

3. **Draft-Erstellung**:
   - Tag `quickvkn` wird gesetzt
   - Draft bleibt in Inbox
   - Bereit für schnelle Notizen

**Verwendungszweck**:
- **Spontane Verkostungen**: Wenn keine Zeit für vollständige VKN
- **Unterwegs**: Mobile Notizen, später übernehmen
- **Batch-Processing**: Mehrere Weine sammeln, später verarbeiten

## 🔄 Typische Workflows

### Geplante Weinverkostung im Journal
```
1. Journal-Zeile des Verkostungstags auswählen
2. "Weinflasche entkorkt" ausführen
3. "+++ Neuen Wein hinzufügen +++" wählen
4. Jahrgang eingeben: "2019"
5. Weingut/Wein eingeben: "Domaine Example, Châteauneuf-du-Pape"
6. VKN wird erstellt, Journal und Protokoll aktualisiert
```

### Spontane Verkostung mit Quick-VKN
```
1. "Quick VKN" ausführen
2. Schnelle Notizen in Template eintragen
3. Später: "Weinflasche entkorkt" → "+++ Schnell-VKN übernehmen +++"
4. Quick-VKN wird zu vollständiger VKN konvertiert
```

### Mehrere Jahrgänge derselben Kellerei
```
1. Bei bestehender VKN: "Weinflasche entkorkt"
2. VKN aus Workspace auswählen
3. "Neuer Jahrgang" wählen
4. Jahrgang eingeben: "2020"
5. Neue Verkostungsnotiz wird zur bestehenden VKN hinzugefügt
```

### Weinabend mit mehreren Weinen
```
Tagesprotokoll wird automatisch kombiniert:
27.12.2024 - 2019 [[Wein A]], 2020 [[Wein B]], 2018 [[Wein C]]
```

## 🏗️ Voraussetzungen

### Erforderliche Drafts
```
Titel: Weinprotokoll
Inhalt: Leer beim ersten Start (wird automatisch befüllt)
Tags: Keine speziellen erforderlich
```

### Erforderlicher Workspace
```
Name: Verkostungsnotizen
Filter: Tag enthält "vkn"
```

**⚠️ Kritisch**: 
- Workspace muss **exakt** "Verkostungsnotizen" heißen
- Für Quick-VKN: Tag-Filter sollte auch `quickvkn` enthalten

### Spezial-Drafts im Workspace
Das System erwartet diese speziellen "Menü-Drafts":
```
Titel: +++ Neuen Wein hinzufügen +++
Titel: +++ Schnell-VKN übernehmen +++
```
Diese werden automatisch erkannt und lösen spezielle Funktionen aus.

## 🎯 VKN-Struktur verstehen

### Emoji-System
- **ℹ️** Info: Region, Rebsorte, Alkoholgehalt, Preis
- **👃** Nase: Bouquet, Aromen, erste Eindrücke
- **👄** Geschmack: Gaumen, Mundgefühl, Abgang
- **💬** Notizen: Freie Gedanken, Vergleiche, Kontext
- **⭐** Bewertung: Sterne, Punkte oder freie Bewertung

### Jahrgangs-Management
```markdown
# Weingut Name

## Jahrgang 2019
### verkostet am 27.12.2024
[Verkostungsnotiz]

## Jahrgang 2020  
### verkostet am 15.01.2025
[Verkostungsnotiz]
```

### Mehrfach-Verkostungen
```markdown
## Jahrgang 2019
### verkostet am 27.12.2024
[Erste Verkostung]

### verkostet am 31.12.2024
[Zweite Verkostung - Entwicklung]
```

## 📊 Protokoll-System

### Weinprotokoll-Logik
- **Chronologisch**: Neueste Einträge oben
- **Tageweise**: Alle Weine eines Tages in einer Zeile
- **Automatische Kombinierung**: Mehrere Weine werden mit Komma getrennt
- **Verlinkung**: Jeder Wein verlinkt zur entsprechenden VKN

### Beispiel-Protokoll
```
31.12.2024 - 2020 [[Champagne Dom Pérignon]], 2019 [[Barolo Brunate]]
30.12.2024 - 2018 [[Château Margaux]]
27.12.2024 - 2019 [[Domaine Example]], 2020 [[Another Wine]]
```

## 🚨 Häufige Probleme

### "Workspace nicht gefunden"
- Workspace muss exakt "Verkostungsnotizen" heißen
- Tag-Filter muss "vkn" enthalten
- Workspace muss aktiviert sein

### "Weinprotokoll nicht gefunden"
- Draft muss exakt "Weinprotokoll" heißen
- Groß-/Kleinschreibung beachten
- Draft darf nicht archiviert oder gelöscht sein

### Datumsprobleme
- **Im Journal verwenden**: Action erkennt Datum automatisch
- **Außerhalb**: Warnung wird angezeigt, aber funktioniert trotzdem
- **Falsches Jahr**: Journal-Titel muss aktuell sein

### Quick-VKN nicht gefunden
- Quick-VKN muss in Inbox sein (nicht archiviert)
- Tag `quickvkn` muss gesetzt sein
- Mindestens eine Quick-VKN muss existieren

### VKN-Formatierung gestört
- Automatische Bereinigung nach jeder Änderung
- Doppelte Leerzeilen werden entfernt
- Leerzeilen vor Überschriften werden eingefügt

## 🔧 Anpassungen

### Template anpassen
```javascript
// In WeinflascheEntkorkt.js das VKN-Template ändern:
let vkntemplate = `## Jahrgang ${vintage}
### verkostet am ${drinkdate}
Region: 
Rebsorte: 
Alkohol: 
Nase: 
Geschmack: 
Bewertung: `;
```

### Bewertungs-System erweitern
```javascript
// Quick-VKN Template in QuickVKN.js anpassen:
let template = `
Region: 
Rebsorte: 
👃 Nase: 
👄 Geschmack: 
⭐ Bewertung: /5
💰 Preis: 
📍 Bezugsquelle: `;
```

### Workspace-Filter erweitern
```
# Tag-Filter für Verkostungsnotizen-Workspace:
Tag enthält: "vkn" ODER "quickvkn"
```

## 📈 Integration mit anderen Actions

### Journal-Integration
- **"kulinarischer Tagebucheintrag"**: Wein-Link wird automatisch erkannt
- **Manuelle Verlinkung**: `Wein: Jahrgang [[VKN-Name]]` Format
- **Kontextuelle Verkostung**: Datum wird aus Journal-Zeile übernommen
- *Siehe: [Journal-Verwaltung](../journal-verwaltung/README.md) für Details zur Integration*

### Menüplanung
- **"zur Menüplanung hinzufügen"**: VKN zu Menüs hinzufügen
- **Wein-Empfehlungen**: Bei Menüplanung passende Weine vorschlagen

### Gäste-Integration
- **"Besuch war da"**: Kombination mit Weinverkostung dokumentieren
- **Gemeinsame Verkostungen**: Gäste und Weine in einem Eintrag

## 🍷 Fortgeschrittene Nutzung

### Verkostungsserien
```markdown
# Barolo Vertical Tasting

## Jahrgang 2018
### verkostet am 15.01.2025
[Notizen zum 2018er]

## Jahrgang 2019  
### verkostet am 15.01.2025
[Notizen zum 2019er]

## Jahrgang 2020
### verkostet am 15.01.2025
[Notizen zum 2020er]
```

### Statistiken und Auswertung
- **Weinprotokoll durchsuchen**: Nach Regionen, Jahrgängen, Kellereien
- **Häufigkeits-Analyse**: Welche Weine werden oft verkostet?
- **Bewertungs-Trends**: Entwicklung der Bewertungen über Zeit
- **Preis-Leistung**: Korrelation zwischen Preis und Bewertung

### Backup und Export
- **VKN-Sammlung**: Alle Verkostungsnotizen als Sammlung exportieren
- **Protokoll-Archiv**: Jährliche Weinprotokolle archivieren
- **PDF-Export**: VKN für Weinclub oder Freunde teilen

### Erweiterte Quick-VKN Nutzung
```
Workflow für Weinmessen/Events:
1. Viele Quick-VKN während Event erstellen
2. Später zuhause: Batch-Übernahme mit "Schnell-VKN übernehmen"
3. Alle Event-Weine werden zu vollständigen VKN konvertiert
```

## 📖 Siehe auch

- **[📝 Journal-Verwaltung](../journal-verwaltung/README.md)** - Wein im täglichen Journal dokumentieren
- **[🍳 Rezept-Verwaltung](../rezept-verwaltung/README.md)** - Passende Rezepte zu Weinen finden
- **[⚙️ Installation](../../docs/installation.md)** - Setup-Probleme mit Workspace lösen
- **[🏠 Hauptseite](../../README.md)** - Zurück zur Übersicht

---

**Die Wein-Verwaltung wird umso wertvoller, je mehr Sie sie nutzen - Ihre persönliche Weinbibliothek wächst mit jeder Verkostung! 🍷📚**

> **💡 Profi-Tipp**: Nutzen Sie Quick-VKN für spontane Verkostungen und konvertieren Sie später zu vollständigen VKN. So verpassen Sie nie eine Verkostung und haben trotzdem strukturierte Notizen.

## 🍷 Fortgeschrittene Nutzung

### Verkostungsserien
```markdown
# Barolo Vertical Tasting

## Jahrgang 2018
### verkostet am 15.01.2025
[Notizen zum 2018er]

## Jahrgang 2019  
### verkostet am 15.01.2025
[Notizen zum 2019er]

## Jahrgang 2020
### verkostet am 15.01.2025
[Notizen zum 2020er]
```

### Statistiken und Auswertung
- **Weinprotokoll durchsuchen**: Nach Regionen, Jahrgängen, Kellereien
- **Häufigkeits-Analyse**: Welche Weine werden oft verkostet?
- **Bewertungs-Trends**: Entwicklung der Bewertungen über Zeit
- **Preis-Leistung**: Korrelation zwischen Preis und Bewertung

### Backup und Export
- **VKN-Sammlung**: Alle Verkostungsnotizen als Sammlung exportieren
- **Protokoll-Archiv**: Jährliche Weinprotokolle archivieren
- **PDF-Export**: VKN für Weinclub oder Freunde teilen

### Erweiterte Quick-VKN Nutzung
```
Workflow für Weinmessen/Events:
1. Viele Quick-VKN während Event erstellen
2. Später zuhause: Batch-Übernahme mit "Schnell-VKN übernehmen"
3. Alle Event-Weine werden zu vollständigen VKN konvertiert
```

---

**Die Wein-Verwaltung wird umso wertvoller, je mehr Sie sie nutzen - Ihre persönliche Weinbibliothek wächst mit jeder Verkostung! 🍷📚**

> **💡 Profi-Tipp**: Nutzen Sie Quick-VKN für spontane Verkostungen und konvertieren Sie später zu vollständigen VKN. So verpassen Sie nie eine Verkostung und haben trotzdem strukturierte Notizen.