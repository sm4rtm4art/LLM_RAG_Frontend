import { diffLines, diffWords } from 'diff';
import type { ComparisonResult, TextPart } from '@/types/text-comparison';

// Compare two text files and return the differences
export async function compareTexts(
  text1: string,
  text2: string
): Promise<ComparisonResult> {
  // Simulate API call or heavy computation
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get line-by-line differences
  const lineDiffs = diffLines(text1, text2);

  // Create a combined text with highlighted differences
  const combinedText: TextPart[] = [];

  diffWords(text1, text2).forEach(part => {
    let type: 'unchanged' | 'added' | 'removed' = 'unchanged';
    if (part.added) {
      type = 'added';
    } else if (part.removed) {
      type = 'removed';
    }

    combinedText.push({
      text: part.value,
      type,
    });
  });

  return {
    diffLines: lineDiffs,
    combinedText,
    similarityScore: calculateSimilarity(text1, text2),
  };
}

// Extract important parts from two text files
export async function extractImportantParts(
  text1: string,
  text2: string
): Promise<string> {
  // Simulate API call or heavy computation
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real application, this would use NLP or other algorithms to extract important parts
  // For this demo, we'll create a simple extraction based on differences

  const differences = diffLines(text1, text2);

  let result = '# Wichtige Teile aus dem Textvergleich\n\n';

  // Add sections for added content
  const addedLines = differences
    .filter(part => part.added)
    .map(part => part.value);
  if (addedLines.length > 0) {
    result += '## Hinzugefügter Inhalt\n\n';
    addedLines.forEach(line => {
      result += `> ${line.trim()}\n\n`;
    });
  }

  // Add sections for removed content
  const removedLines = differences
    .filter(part => part.removed)
    .map(part => part.value);
  if (removedLines.length > 0) {
    result += '## Entfernter Inhalt\n\n';
    removedLines.forEach(line => {
      result += `> ${line.trim()}\n\n`;
    });
  }

  // Add a summary
  result += '## Zusammenfassung\n\n';
  result += `Die Texte haben ${calculateSimilarity(text1, text2).toFixed(2)}% Ähnlichkeit. `;
  result += `Es wurden ${addedLines.length} Hinzufügungen und ${removedLines.length} Entfernungen gefunden.\n\n`;

  return result;
}

// Calculate similarity between two texts (simple implementation)
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);

  const set1 = new Set(words1);
  const set2 = new Set(words2);

  const intersection = new Set([...set1].filter(word => set2.has(word)));
  const union = new Set([...set1, ...set2]);

  return (intersection.size / union.size) * 100;
}
