export  function formatDate(iso: string | undefined) {
    if (!iso) return "-";

    const d = new Date(iso);

    if (Number.isNaN(d.getTime())) return iso;

    return d.toLocaleDateString("fr-FR");
  }