// CMSA
export const tex_cmsa_three_level: string =
  "X_{r}^1 - X_{r}^0 = g X_{r}^0 + \\Sigma_{i}(g_{i}-g)X_{ir}^0 + \\Sigma_{i}\\Sigma_{p}(g_{ir}-g_{i})X_{irp}^0 + \\Sigma_{i}\\Sigma_{p}(g_{irp}-g_{ir})X_{irp}^0";
export const tex_cmsa_three_level_components: string[][] = [
  //
  ["g X_{r}^0", "World Growth Effect"],
  ["\\Sigma_{i}(g_{i}-g)X_{ir}^0", "Commodity Effect"],
  ["\\Sigma_{i}\\Sigma_{p}(g_{ir}-g_{i})X_{irp}^0", "Regional Market Effect"],
  ["\\Sigma_{i}\\Sigma_{p}(g_{irp}-g_{ir})X_{irp}^0", "Competitiveness Effect"],
];

// region or partner
export const tex_cmsa_two_level_region: string =
  "X_{r}^1 - X_{r}^0 = g X_{r}^0 + \\Sigma_{p}(g_{p}-g)X_{rp}^0 + \\Sigma_{p}(g_{rp}-g_{p})X_{rp}^0";
export const tex_cmsa_two_level_region_components: string[][] = [
  //
  ["g X_{r}^0", "World Growth Effect"],
  ["\\Sigma_{p}(g_{p}-g)X_{rp}^0", "Region Effect"],
  ["\\Sigma_{p}(g_{rp}-g_{p})X_{rp}^0", "Competitiveness Effect"],
];

// commodity
export const tex_cmsa_two_level_commodity: string =
  "X_{r}^1 - X_{r}^0 = g X_{r}^0 + \\Sigma_{i}(g_{i}-g)X_{ir}^0 + \\Sigma_{i}(g_{ir}-g_{i})X_{ir}^0";
export const tex_cmsa_two_level_commodity_components: string[][] = [
  //
  ["g X_{r}^0", "World Growth Effect"],
  ["\\Sigma_{i}(g_{i}-g)X_{ir}^0", "Commodity Effect"],
  ["\\Sigma_{i}(g_{ir}-g_{i})X_{ir}^0", "Competitiveness Effect"],
];

export const tex_cmsa_one_level: string =
  "X_{r}^1 - X_{r}^0 = g X_{r}^0 + (g_{r}-g)X_{r}^0";
export const tex_cmsa_one_level_components: string[][] = [
  //
  ["g X_{r}^0", "World Growth Effect"],
  ["(g_{r}-g)X_{r}^0", "Competitiveness Effect"],
];

// general cmsa desx
export const tex_general_cmsa_dec = [
  ["x", "Export"],
  ["r", "Country"],
  ["i", "Commodity"],
  ["p", "Region or Partner"],
  ["0", "First Period"],
  ["1", "Second Period"],
  [
    "g",
    "export growth rate (if there is no r in the symbol its in the value of world exports)",
  ],
  ["g = \\frac{X^1 - X^0}{X^0}", ""],
];

// <Desc tex_symbol_string="X" explanation="Export" />
// <Desc tex_symbol_string="r" explanation="Country r" />
// <Desc tex_symbol_string="i" explanation="Commodity i" />
// <Desc tex_symbol_string="p" explanation="Partner or Region" />
// <Desc tex_symbol_string="0" explanation="First Period" />
// <Desc tex_symbol_string="1" explanation="Second Period" />
// <Desc
//   tex_symbol_string="g = \frac{X^1 - X^0}{X^0}"
//   explanation=""
// />
// <Desc
//   tex_symbol_string="g"
//   explanation="export growth rate (if there is no r in the symbol its in the value of world exports)"
// />
// RCA
export const tex_rca_classic: string = "\\frac{X_{ri} / X_{wi}}{X_{r} / X_{w}}";
export const tex_general_rca_dec = [
  ["X", "Export"],
  ["w", "World"],
  ["r", "Country"],
  ["i", "Commodity"],
];
