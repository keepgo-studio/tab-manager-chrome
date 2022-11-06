function checkUrlValid(url:string) {
  return /^https?:\/\/*/.test(url);
}

export async function crawlTextContent(url: string): Promise<string | undefined> {

  if (!checkUrlValid(url)) return undefined;

  let text: string | undefined;

  try {
    text = await fetch(url)
    .then(respond => respond.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // remove all unnecessary tags
      doc.querySelectorAll('style').forEach(e => e.remove());
      doc.querySelectorAll('script').forEach(e => e.remove());

      // remove all unnecessary spaces
      return doc.body.textContent?.replace(/[\n\r]+|[\s]{2,}/g, ' ');
    })
  } catch (err) {
    console.error(err)
  }
  return text;
}
