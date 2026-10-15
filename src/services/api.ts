export interface ScanParams {
  url: string;
  brandName?: string;
  industry?: string;
  competitors?: string[];
  markets?: string[];
}

export async function runAIScan(params: ScanParams) {
  try {
    const res = await fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Scan request error:', err);
    throw err;
  }
}

export async function runQueryLabSimulation(promptQuery: string, brandName: string, competitors: string[]) {
  try {
    const res = await fetch('/api/query-lab', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promptQuery, brandName, competitors }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Query Lab simulation error:', err);
    throw err;
  }
}

export async function askLUMENIQCopilot(message: string, context: any) {
  try {
    const res = await fetch('/api/copilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Copilot request error:', err);
    throw err;
  }
}

export async function generateContentOptimizationBrief(targetQuery: string, brandName: string, contentType: string) {
  try {
    const res = await fetch('/api/optimize-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetQuery, brandName, contentType }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Content Optimizer request error:', err);
    throw err;
  }
}

export async function runBrandFactCheck(brandName: string, website: string) {
  try {
    const res = await fetch('/api/fact-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brandName, website }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Fact check request error:', err);
    throw err;
  }
}
