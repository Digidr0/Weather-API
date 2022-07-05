export default function checkDirection(index) {
  if (22.6 < index && index < 67.5) {
    return "СВ";
  }
  if (67.6 < index && index < 112.5) {
    return "В";
  }
  if (112.6 < index && index < 157.5) {
    return "ЮВ";
  }
  if (157.6 < index && index < 202.5) {
    return "Ю";
  }
  if (202.6 < index && index < 247.5) {
    return "ЮЗ";
  }
  if (247.6 < index && index < 292.5) {
    return "З";
  }
  if (292.6 < index && index < 337.5) {
    return "СЗ";
  }
  if (337.6 < index && index < 0) {
    return "С";
  }
  if (0.1 < index && index < 22.5) {
    return "С";
  }
}
