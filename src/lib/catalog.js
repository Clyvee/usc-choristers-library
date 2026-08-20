/**
 * Catalog helpers shared by the build-time render and the client script.
 *
 * COLOUR FOLLOWS GENRE, NOT OCCASION. This is load-bearing and was decided
 * deliberately: colouring by occasion would leave every cabinet piece grey,
 * since occasion only means something for music in current rotation. Genre is
 * a permanent property of a piece, so the coding survives into the library
 * view. Ten genres collapse onto seven colour families.
 *
 * This is the ONLY colour in the interface. The UI chrome is deliberately
 * monochrome — an accent hue would collide with the genre families, and the
 * moment a second colour system appears the first one stops meaning anything.
 */
export const GENRE_COLOR = {
  "Classic / Religious": "violet",
  Christmas: "gold",
  "Filipino / Cebuano": "rust",
  "Pop / Broadway": "rose",
  "Foreign Tongue": "blue",
  USC: "green",
};

export const colorOf = (genre) => `var(--${GENRE_COLOR[genre] || "neutral"})`;

/** Filter chip order for genre. */
export const GENRE_ORDER = [
  "Classic / Religious",
  "Christmas",
  "Filipino / Cebuano",
  "Pop / Broadway",
  "Foreign Tongue",
  "USC",
];

/**
 * The order the folders tab groups by. Fixed, not alphabetical: it runs from
 * the standing commitment (Mass) through the concert calendar to the
 * occasional. Empty groups are skipped at render time.
 */
export const OCCASION_ORDER = [
  "Mass / Liturgy",
  "Christmas Concert",
  "Amore",
  "Affinity",
  "Independence Day Concert",
  "Baccalaureate Mass",
  "Easter Vigil",
  "Holy Week",
  "SBE Week",
  "Graduation",
  "Anniversary",
  "Training",
  "General Concert",
];

/**
 * Occasions that also get their own tab, in tab order. These are the recurring
 * concerts the choir prepares as a programme, so a chorister can open the one
 * they are rehearsing for without filtering.
 *
 * Adding a concert is one line here — but the occasion must already exist in
 * OCCASION_ORDER and be spelled identically to the value in the Sheet, or the
 * tab will render empty. A tab with no pieces is skipped automatically.
 */
export const CONCERT_TABS = [
  "Christmas Concert",
  "Amore",
  "Independence Day Concert",
];

/** A slug safe for a data attribute. */
export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** 3.7 -> "3:42" */
export const mmss = (m) =>
  `${Math.floor(m)}:${String(Math.round((m % 1) * 60)).padStart(2, "0")}`;

/** "2026-02-14" -> "14 Feb 2026". Parsed at local midnight so the date never slips. */
export const fmtDate = (d) =>
  d
    ? new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Never performed";

/** Easy / Medium / Hard as 1 to 3 filled dots. */
export const difficultyDots = (d) => ({ Easy: 1, Medium: 2, Hard: 3 })[d] || 0;

/** Everything the search box looks at, lowercased once at build time. */
export const haystack = (p) =>
  [
    p.title,
    p.subtitle,
    p.composer,
    p.arranger,
    p.voicing,
    p.language,
    p.genre,
    p.occasion,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export const byTitle = (a, b) => a.title.localeCompare(b.title);

/**
 * The cabinet is shelved alphabetically, so the full library is too. Anything
 * not starting with a letter files under #.
 */
export const shelfLetter = (title) => {
  const c = (title.trim()[0] || "#").toUpperCase();
  return c >= "A" && c <= "Z" ? c : "#";
};
