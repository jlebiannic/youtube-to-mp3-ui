interface IFetchFileParams {
  url: string;
  defaultFileName?: string;
}
export class FetchManager {
  static async fetchFile(params: IFetchFileParams) {
    fetch(params.url)
      .then((response) => {
        // Vérifier si la réponse est OK (200)
        if (!response.ok) {
          throw new Error("Erreur lors du téléchargement du fichier");
        }

        // Extraire le nom de fichier de l'en-tête Content-Disposition
        const contentDisposition = response.headers.get("content-disposition");
        const fileNameMatch = contentDisposition?.match(/filename=(.+)/);
        const fileName = fileNameMatch
          ? fileNameMatch[1]
          : params.defaultFileName || "file";

        // Récupérer les données binaires du corps de la réponse
        return response.blob().then((blob) => ({ blob, fileName }));
      })
      .then(({ blob, fileName }) => {
        // Créer un objet URL à partir du blob
        const downloadUrl = URL.createObjectURL(blob);

        // Créer un lien temporaire et déclencher le téléchargement
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();

        // Nettoyer l'objet URL après le téléchargement
        URL.revokeObjectURL(downloadUrl);

        // Supprimer le lien temporaire du DOM
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        throw new Error("Erreur inconnue lors du traitement du fichier");
      });
  }
}
