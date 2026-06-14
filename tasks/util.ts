export const HTML_REGEX = /(<([^>]+)>)/gi;

export const mapAbilities = (tokens: any) => {
  const tokenKeys = Object.keys(tokens);
  tokenKeys.forEach(
    (key) => (tokens[key] = tokens[key].replace(HTML_REGEX, "")),
  );
  return tokens;
};

export const removeExtraneousWhitespacesFromString = (string: string) => {
  if (!string) {
    return "";
  }

  return string.replace(/\s+/g, " ").trim();
};

export const cleanupArray = (array: string[]) => {
  if (!array) {
    return [];
  }

  return array.filter((n) => removeExtraneousWhitespacesFromString(n));
};

export const getAllChatWheelFiles = async (): Promise<string[]> => {
  interface RespData {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    _links: {
      self: string;
      git: string;
      html: string;
    };
  }

  try {
    const resp = await fetch(
      "https://api.github.com/repos/dotabuff/d2vpkr/contents/dota/scripts/chat_wheels",
    );
    const data = (await resp.json()) as RespData[];
    const result = data.map((el) => el.download_url);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
