function forceDownload(blobUrl: string, filename: string) {
  const a = document.createElement('a');
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function downloadPhoto(url: string, filename: string) {
  try {
    const response = await fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: 'cors',
    });

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    forceDownload(blobUrl, filename);
  } catch (error) {
    console.error(error);
  }
}
