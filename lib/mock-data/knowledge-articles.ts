import type { KnowledgeArticleType } from "@/types/knowledge-base"

export const mockKnowledgeArticles: KnowledgeArticleType[] = [
  {
    id: "1",
    title: "Einführung in RAG-Systeme",
    content: `# Einführung in RAG-Systeme

RAG (Retrieval-Augmented Generation) ist ein Ansatz, der die Stärken von Sprachmodellen mit der Fähigkeit kombiniert, auf externe Informationen zuzugreifen.

## Wie funktioniert RAG?

1. **Retrieval**: Das System sucht relevante Dokumente oder Informationen aus einer Wissensdatenbank.
2. **Augmentation**: Die gefundenen Informationen werden dem Prompt hinzugefügt.
3. **Generation**: Das Sprachmodell generiert eine Antwort basierend auf dem erweiterten Prompt.

## Vorteile von RAG

- Reduziert Halluzinationen
- Ermöglicht den Zugriff auf aktuelle Informationen
- Verbessert die Genauigkeit der Antworten

## Anwendungsfälle

- Kundenservice-Chatbots
- Dokumentensuche
- Wissensmanagement-Systeme`,
    summary: "Eine Übersicht über Retrieval-Augmented Generation (RAG) Systeme und ihre Funktionsweise.",
    category: "technical",
    tags: ["RAG", "LLM", "NLP", "Wissensmanagement"],
    date: "2023-10-15",
    author: "Dr. Maria Schmidt",
  },
  {
    id: "2",
    title: "Optimierung von Vektordatenbanken",
    content: `# Optimierung von Vektordatenbanken für RAG-Systeme

Vektordatenbanken sind ein wesentlicher Bestandteil moderner RAG-Systeme. Dieser Artikel behandelt Optimierungsstrategien.

## Indexierungsstrategien

Die Wahl der richtigen Indexierungsstrategie kann die Leistung erheblich verbessern:

- **HNSW (Hierarchical Navigable Small World)**: Bietet einen guten Kompromiss zwischen Geschwindigkeit und Genauigkeit
- **IVF (Inverted File Index)**: Gut für sehr große Datensätze
- **PQ (Product Quantization)**: Reduziert den Speicherbedarf

## Chunking-Strategien

Das Aufteilen von Dokumenten in Chunks ist entscheidend:

- **Semantisches Chunking**: Teilt Dokumente basierend auf semantischem Inhalt auf
- **Überlappende Chunks**: Verhindert den Verlust von Kontext an Chunk-Grenzen
- **Hierarchisches Chunking**: Erstellt Chunks auf verschiedenen Detailebenen

## Leistungsoptimierung

- Verwenden Sie Caching für häufige Abfragen
- Implementieren Sie Batch-Verarbeitung für Embedding-Generierung
- Überwachen Sie die Latenz und optimieren Sie Engpässe`,
    summary:
      "Strategien zur Optimierung von Vektordatenbanken für RAG-Systeme, einschließlich Indexierung und Chunking.",
    category: "technical",
    tags: ["Vektordatenbank", "Optimierung", "HNSW", "Chunking"],
    date: "2023-11-05",
    author: "Thomas Weber",
  },
  {
    id: "3",
    title: "Rechtliche Aspekte von KI-Assistenten",
    content: `# Rechtliche Aspekte von KI-Assistenten

Der Einsatz von KI-Assistenten wirft verschiedene rechtliche Fragen auf, die Unternehmen beachten sollten.

## Datenschutz und DSGVO

- **Einwilligung**: Stellen Sie sicher, dass Nutzer der Verarbeitung ihrer Daten zustimmen
- **Zweckbindung**: Verwenden Sie Daten nur für den angegebenen Zweck
- **Datensparsamkeit**: Sammeln Sie nur notwendige Daten
- **Auskunftsrecht**: Ermöglichen Sie Nutzern Zugriff auf ihre gespeicherten Daten

## Haftungsfragen

- Wer haftet für falsche Informationen, die von einem KI-System bereitgestellt werden?
- Wie können Unternehmen Haftungsrisiken minimieren?

## Urheberrecht

- Beachtung von Urheberrechten bei der Nutzung von Trainingsdaten
- Rechtliche Einordnung von KI-generierten Inhalten

## Empfehlungen

- Führen Sie regelmäßige rechtliche Überprüfungen durch
- Dokumentieren Sie Entscheidungsprozesse
- Implementieren Sie Überwachungsmechanismen`,
    summary:
      "Überblick über rechtliche Aspekte beim Einsatz von KI-Assistenten, einschließlich Datenschutz und Haftungsfragen.",
    category: "legal",
    tags: ["Recht", "DSGVO", "Haftung", "Datenschutz"],
    date: "2023-12-10",
    author: "Dr. Julia Becker",
  },
  {
    id: "4",
    title: "Geschäftliche Vorteile von RAG-Systemen",
    content: `# Geschäftliche Vorteile von RAG-Systemen

RAG-Systeme bieten Unternehmen zahlreiche Vorteile gegenüber herkömmlichen KI-Lösungen.

## Kosteneffizienz

- **Reduzierte Trainingskosten**: Kein vollständiges Neutraining für neue Informationen erforderlich
- **Optimierte Ressourcennutzung**: Effizientere Nutzung von Rechenressourcen
- **Skalierbarkeit**: Einfache Erweiterung der Wissensbasis ohne Leistungseinbußen

## Wettbewerbsvorteile

- **Schnellere Markteinführung**: Schnellere Integration neuer Informationen
- **Verbesserte Kundenerfahrung**: Genauere und relevantere Antworten
- **Differenzierung**: Einzigartige, auf Ihr Unternehmen zugeschnittene Antworten

## ROI-Betrachtung

- Typische Amortisationszeit: 6-12 Monate
- Kosteneinsparungen durch Automatisierung von Support-Anfragen
- Umsatzsteigerung durch verbesserte Kundenzufriedenheit

## Fallstudien

- Finanzdienstleister: 40% Reduktion der Support-Anfragen
- E-Commerce: 25% höhere Konversionsrate durch bessere Produktempfehlungen
- Gesundheitswesen: 30% schnellere Informationsbeschaffung für medizinisches Personal`,
    summary:
      "Analyse der geschäftlichen Vorteile von RAG-Systemen, einschließlich Kosteneffizienz und Wettbewerbsvorteilen.",
    category: "business",
    tags: ["ROI", "Geschäftsstrategie", "Kosteneffizienz", "Fallstudien"],
    date: "2024-01-20",
    author: "Michael Schneider",
  },
  {
    id: "5",
    title: "Grundlagen der Vektorsuche",
    content: `# Grundlagen der Vektorsuche

Die Vektorsuche ist ein fundamentales Konzept in modernen RAG-Systemen und ermöglicht die effiziente Suche nach ähnlichen Inhalten.

## Was sind Vektoren?

In diesem Kontext sind Vektoren numerische Repräsentationen von Text, Bildern oder anderen Daten. Sie erfassen die semantische Bedeutung der Daten in einem mehrdimensionalen Raum.

## Ähnlichkeitsmaße

Verschiedene Metriken können verwendet werden, um die Ähnlichkeit zwischen Vektoren zu messen:

- **Kosinus-Ähnlichkeit**: Misst den Kosinus des Winkels zwischen zwei Vektoren
- **Euklidischer Abstand**: Misst die direkte Entfernung zwischen zwei Punkten
- **Dot-Produkt**: Einfache Multiplikation der Vektorkomponenten

## Embedding-Modelle

Embedding-Modelle wandeln Text in Vektoren um:

- **Word2Vec**: Klassisches Modell für Wortembeddings
- **BERT-basierte Embeddings**: Kontextbezogene Repräsentationen
- **Sentence-Transformers**: Spezialisiert auf Satzebene

## Implementierung

Grundlegende Schritte zur Implementierung einer Vektorsuche:

1. Texte in Chunks aufteilen
2. Embeddings für jeden Chunk generieren
3. Embeddings in einer Vektordatenbank speichern
4. Ähnlichkeitssuche für Benutzeranfragen durchführen`,
    summary: "Einführung in die Grundlagen der Vektorsuche, einschließlich Ähnlichkeitsmaße und Embedding-Modelle.",
    category: "technical",
    tags: ["Vektorsuche", "Embeddings", "Ähnlichkeitsmaße", "NLP"],
    date: "2024-02-15",
    author: "Dr. Andreas Müller",
  },
]
