export const htmlParse = (htmlText: string | null): string => {
  if (!htmlText) return '';

  return htmlText.replace(/(<([^>]+)>)/gi, '');
};
