import axios from "axios";

export const generateText = async (req: OpenAiRequest): Promise<string> => {
  try {
    const response = await axios.post(`${process.env.OPENAI_URL}/${req.model}/generate`, req, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(`An error occurred while generating text: ${error}`);
    if (error.response) {
      console.error(`The server responded with a status code of ${error.response.status}`);
    }
    return "";
  }
};

export const formatText = (
  text: string,
  color?: string,
  dim?: boolean,
  style?: string
): string => {
  let formattedText = "";

  if (color) {
    switch (color.toLowerCase()) {
      case "black":
        formattedText += "\x1b[30m";
        break;
      case "red":
        formattedText += "\x1b[31m";
        break;
      case "green":
        formattedText += "\x1b[32m";
        break;
      case "yellow":
        formattedText += "\x1b[33m";
        break;
      case "blue":
        formattedText += "\x1b[34m";
        break;
      case "magenta":
        formattedText += "\x1b[35m";
        break;
      case "cyan":
        formattedText += "\x1b[36m";
        break;
      case "white":
        formattedText += "\x1b[37m";
        break;
    }
  }

  if (dim) {
    formattedText += "\x1b[2m";
  }

  if (style) {
    switch (style.toLowerCase()) {
      case "bold":
        formattedText += "\x1b[1m";
        break;
      case "italic":
        formattedText += "\x1b[3m";
        break;
      case "underline":
        formattedText += "\x1b[4m";
        break;
      case "inverse":
        formattedText += "\x1b[7m";
        break;
      case "strikethrough":
        formattedText += "\x1b[9m";
        break;
    }
  }

  formattedText += text + "\x1b[0m";

  return formattedText;
};



