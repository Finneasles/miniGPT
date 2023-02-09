# miniGPT

This is a console application that interacts with OpenAI's GPT-3 API through a Node.js terminal. The code includes functions and classes for generating text, formatting text, managing conversation & history.

## Prerequisites

Before getting started, you will need to sign up for an OpenAI API key and set it as an environment variable named OPENAI_KEY. Additionally, you will need to set the API endpoint as an environment variable named OPENAI_URL.

You will also need to have Node.js installed on your machine in order to run the application.

## Getting started

1. Clone the repository to your local machine:

    ```bash
    clone <repoUrl>
    ```

2. Navigate to the project directory and install the required dependencies:

    ```bash
    npm install
    ```

3. Copy the `.env.example` file to `.env` and set the environment variables for your OpenAI API key and endpoint:

    ```bash
    cp .env.example .env
    ```

    `.env` Example:

    ```bash
    # .env 
    OPENAI_KEY="sk-vTIsRCuWouyaygRRUfZT3BwowkFJx70pNbf1LjWqop0k9L"
    OPENAI_URL="https://api.openai.com/v1/models"
    ```

4. Run the application:

    ```bash
    npm run dev
    ```

## Code structure

The code includes four main components: Types, Utilities Functions, and the main ConsoleApp class.

## `ConsoleApp` Class

The ConsoleApp class implements the main logic for the application, including the ability to:

- `chooseConversation()`: Choose an active conversation or create a new one.
- `formatText`: Format the messages and display them in the console.
- `loadHistory()`: Load a history of conversations from a JSON file.
- `saveHistory`: Save the history of conversations to the JSON file after each interaction.
- `startChat()`: Send messages to the active conversation, either by typing the text or generating text with OpenAI.

### Utilities

- `generateText()`: Sends a request to the OpenAI API to generate text based on the provided OpenAiRequest object. Returns a Promise that resolves to the generated text.

- `formatText()`: Formats a string of text by adding color and style using ANSI escape codes. The function accepts parameters for color, dim, and style, and returns the formatted string.

### Types

The code defines three interface types:

- **Message**: Represents a single message in a conversation, including the text of the message, the date it was sent, and the sender.

- **Conversation**: Represents a collection of messages, including the name of the conversation and an array of Message objects.

- **OpenAiRequest**: Represents a request to the OpenAI API to generate text, including the name of the model to use, the prompt, temperature, max tokens, and optional parameters such as top_p and frequency_penalty.

## Notes

**miniGPT** provides a basic framework for building a console application that interacts with OpenAI's GPT-3 text generation API.

It's important to keep in mind that this script is designed as a starting point and may need to be modified to fit your specific use case. By following the instructions and structure outlined, you should be able to run and modify the code to suit your needs.
