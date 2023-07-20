export const htmlParse = (htmlText: string): string => {
  return htmlText.replace(/(<([^>]+)>)/gi, '');
};
