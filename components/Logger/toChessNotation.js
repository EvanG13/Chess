const convertToChessNotation = (
  pieceName,
  startRow,
  startCol,
  destRow,
  destCol
) => {
  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const startColChar = columns[startCol];
  const destColChar = columns[destCol];
  const startRowNum = 8 - startRow;
  const destRowNum = 8 - destRow;

  return `${pieceName}${startColChar}${startRowNum}${destColChar}${destRowNum}`;
};

export default convertToChessNotation;
